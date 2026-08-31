import { ArchitectureScorecard, ArchitectureNodeData } from '../types';

interface NodeWithData {
  id: string;
  data: ArchitectureNodeData;
  type?: string;
  position?: { x: number; y: number };
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export function evaluateArchitecture(nodes: NodeWithData[], edges: EdgeData[]): ArchitectureScorecard {
  const criticalIssues: string[] = [];
  const warnings: string[] = [];
  const strengths: string[] = [];
  const recommendations: string[] = [];

  if (nodes.length === 0) {
    return {
      overallScore: 0,
      availability: { score: 0, feedback: 'Canvas is empty. Add components to begin evaluation.' },
      security: { score: 0, feedback: 'No security components configured.' },
      scalability: { score: 0, feedback: 'No compute or scaling components.' },
      networking: { score: 0, feedback: 'No network topology defined.' },
      disasterRecovery: { score: 0, feedback: 'No backup or DR components.' },
      costOptimization: { score: 0, feedback: 'No resources deployed.' },
      criticalIssues: ['Architecture has zero components.'],
      warnings: [],
      strengths: [],
      recommendations: ['Start by dragging a DNS or Load Balancer, Compute instances, and a Database onto the canvas.']
    };
  }

  // Identify components
  const databases = nodes.filter(n => n.data.category === 'database');
  const computes = nodes.filter(n => n.data.category === 'compute');
  const loadBalancers = nodes.filter(n => n.data.category === 'gateway' || n.data.serviceType.toLowerCase().includes('load balancer') || n.data.serviceType.toLowerCase().includes('alb'));
  const dnsOrCdns = nodes.filter(n => n.data.category === 'dns' || n.data.serviceType.toLowerCase().includes('route 53') || n.data.serviceType.toLowerCase().includes('cloudfront') || n.data.serviceType.toLowerCase().includes('dns') || n.data.serviceType.toLowerCase().includes('cdn'));
  const storages = nodes.filter(n => n.data.category === 'storage');
  const caches = nodes.filter(n => n.data.category === 'cache' || n.data.serviceType.toLowerCase().includes('redis') || n.data.serviceType.toLowerCase().includes('elasticache'));
  const securityComponents = nodes.filter(n => n.data.category === 'security' || n.data.serviceType.toLowerCase().includes('iam') || n.data.serviceType.toLowerCase().includes('firewall') || n.data.serviceType.toLowerCase().includes('vault') || n.data.serviceType.toLowerCase().includes('secret'));

  // 1. AVAILABILITY EVALUATION
  let availScore = 5;
  if (computes.length > 1 || computes.some(c => c.data.isMultiAz)) {
    availScore += 2;
    strengths.push('Compute layer has multi-instance or Multi-AZ redundancy.');
  } else if (computes.length === 1 && !computes[0].data.isMultiAz) {
    warnings.push('Single compute node detected without Multi-AZ redundancy (Single Point of Failure).');
  }

  if (databases.length > 0) {
    const hasDbHa = databases.some(db => db.data.isMultiAz || db.data.hasReplication);
    if (hasDbHa) {
      availScore += 3;
      strengths.push('Database has Multi-AZ standby or automated read replica failover.');
    } else {
      criticalIssues.push('Primary database has single point of failure (No Multi-AZ or Standby configured).');
      availScore -= 2;
    }
  } else {
    warnings.push('No dedicated persistent database layer found.');
  }
  availScore = Math.max(1, Math.min(10, availScore));

  // 2. SECURITY EVALUATION
  let secScore = 5;
  // Check if DB is directly connected to internet or ingress without app/LB
  databases.forEach(db => {
    if (!db.data.isPrivate) {
      criticalIssues.push(`Database [${db.data.label}] is not marked as Private Subnet. Databases must NEVER be directly publicly accessible.`);
      secScore -= 3;
    } else {
      secScore += 1;
    }

    if (db.data.isEncrypted) {
      secScore += 1;
      strengths.push(`Database [${db.data.label}] has Encryption at Rest (KMS/Key Vault) enabled.`);
    } else {
      warnings.push(`Database [${db.data.label}] is missing Encryption at Rest.`);
    }
  });

  storages.forEach(st => {
    if (st.data.isEncrypted) {
      secScore += 1;
      strengths.push(`Storage [${st.data.label}] enforces SSE encryption.`);
    } else {
      warnings.push(`Storage [${st.data.label}] should enforce server-side encryption and public access block.`);
    }
  });

  if (securityComponents.length > 0) {
    secScore += 2;
    strengths.push('Dedicated Security/IAM/Key Management service attached.');
  } else {
    recommendations.push('Add Secrets Manager / Key Vault / IAM policies to manage credentials securely.');
  }
  secScore = Math.max(1, Math.min(10, secScore));

  // 3. SCALABILITY EVALUATION
  let scaleScore = 4;
  if (loadBalancers.length > 0) {
    scaleScore += 3;
    strengths.push('Traffic is decoupled and distributed via Layer 4/7 Load Balancer.');
  } else if (computes.length > 0) {
    criticalIssues.push('Compute instances lack a Load Balancer or Ingress Controller for horizontal autoscaling.');
    scaleScore -= 2;
  }

  if (caches.length > 0) {
    scaleScore += 2;
    strengths.push('Caching layer (Redis/Memcached) relieves database read pressure.');
  } else {
    recommendations.push('Consider adding an in-memory caching tier (ElastiCache / Azure Redis / Memorystore) for high-read throughput.');
  }

  if (dnsOrCdns.length > 0) {
    scaleScore += 1;
    strengths.push('Edge CDN/DNS accelerates static content delivery and shields backend origin.');
  }
  scaleScore = Math.max(1, Math.min(10, scaleScore));

  // 4. NETWORKING EVALUATION
  let netScore = 5;
  if (edges.length >= nodes.length - 1 && nodes.length > 1) {
    netScore += 2;
    strengths.push('Components are logically connected via routed network paths.');
  } else if (nodes.length > 2 && edges.length === 0) {
    criticalIssues.push('Canvas nodes are disconnected. Connect components to demonstrate network flow.');
    netScore -= 3;
  }

  const hasEdgeToCompute = edges.some(e => {
    const src = nodes.find(n => n.id === e.source);
    const tgt = nodes.find(n => n.id === e.target);
    return (src?.data.category === 'gateway' || src?.data.category === 'dns') && (tgt?.data.category === 'compute' || tgt?.data.category === 'gateway');
  });

  if (hasEdgeToCompute || loadBalancers.length > 0) {
    netScore += 2;
  } else {
    warnings.push('Network ingress path from Edge -> Load Balancer -> Compute should be explicit.');
  }
  netScore = Math.max(1, Math.min(10, netScore));

  // 5. DISASTER RECOVERY (DR) EVALUATION
  let drScore = 4;
  const multiRegionNodes = nodes.filter(n => n.data.isMultiAz || n.data.hasReplication);
  const providers = new Set(nodes.map(n => n.data.provider).filter(p => p !== 'general'));

  if (providers.size > 1) {
    drScore += 3;
    strengths.push(`Multi-Cloud Architecture detected spanning: ${Array.from(providers).map(p => p.toUpperCase()).join(' & ')}.`);
  }

  if (multiRegionNodes.length >= 2) {
    drScore += 3;
    strengths.push('Cross-AZ/Cross-Region replication enabled on critical storage and database tiers.');
  } else {
    warnings.push('No cross-region replication or cold standby strategy detected. High RTO/RPO risk in regional disasters.');
    recommendations.push('Configure automated snapshots, cross-region read replicas, or multi-region object storage replication.');
  }
  drScore = Math.max(1, Math.min(10, drScore));

  // 6. COST OPTIMIZATION
  let costScore = 6;
  const isServerlessCompute = computes.some(c => c.data.serviceType.toLowerCase().includes('lambda') || c.data.serviceType.toLowerCase().includes('functions') || c.data.serviceType.toLowerCase().includes('run'));
  if (isServerlessCompute) {
    costScore += 2;
    strengths.push('Serverless event-driven compute utilized, reducing idle VM compute costs.');
  }
  if (caches.length > 0) {
    costScore += 1;
  }
  costScore = Math.max(1, Math.min(10, costScore));

  // Overall Score Calculation (Weighted)
  const overallScore = Math.round(
    availScore * 0.25 +
    secScore * 0.25 +
    scaleScore * 0.20 +
    netScore * 0.10 +
    drScore * 0.10 +
    costScore * 0.10
  );

  return {
    overallScore,
    availability: {
      score: availScore,
      feedback: availScore >= 8 ? 'High resilience against AZ failures.' : 'Availability needs attention. Add multi-AZ or standby replicas.'
    },
    security: {
      score: secScore,
      feedback: secScore >= 8 ? 'Strong private subnets & encryption at rest.' : 'Security risks found: ensure databases reside in private subnets with encryption.'
    },
    scalability: {
      score: scaleScore,
      feedback: scaleScore >= 8 ? 'Horizontally scalable architecture with load balancing and caching.' : 'Consider adding autoscaling groups and caching.'
    },
    networking: {
      score: netScore,
      feedback: netScore >= 8 ? 'Clean, well-segmented network ingress and egress path.' : 'Ensure components are properly connected with clear ingress boundaries.'
    },
    disasterRecovery: {
      score: drScore,
      feedback: drScore >= 8 ? 'Robust disaster recovery readiness with replication.' : 'Low DR protection. Formulate an active/passive or multi-region replication plan.'
    },
    costOptimization: {
      score: costScore,
      feedback: costScore >= 8 ? 'Cost-effective serverless and managed resource sizing.' : 'Review 24/7 idle VM vs serverless on-demand tradeoffs.'
    },
    criticalIssues,
    warnings,
    strengths,
    recommendations
  };
}

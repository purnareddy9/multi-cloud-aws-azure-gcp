export interface ArchitectureScenario {
  id: string;
  title: string;
  levelBadge: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';
  summary: string;
  requirements: string[];
  constraints: string[];
  recommendedNodes: Array<{
    name: string;
    provider: 'aws' | 'azure' | 'gcp' | 'general';
    category: string;
    role: string;
  }>;
  referenceArchitecture: {
    title: string;
    explanation: string;
    diagramSteps: string[];
    tradeOffs: string[];
    costEstimate: string;
  };
}

export const scenariosList: ArchitectureScenario[] = [
  {
    id: 'sc-01-beginner-web',
    title: 'Beginner: Host a Secure Corporate Web App',
    levelBadge: 'Level 11.1',
    difficulty: 'Beginner',
    summary: 'Deploy a highly available corporate WordPress/Next.js portal with HTTPS, automated database backups, and private subnet isolation.',
    requirements: [
      'Serve HTTPS traffic with automatic SSL certificate renewal',
      '99.9% uptime SLA across at least 2 Availability Zones',
      'Persistent relational database with automated daily snapshots',
      'Static assets served directly from object storage'
    ],
    constraints: [
      'Database must NEVER be reachable from the public internet',
      'Keep architecture simple with minimal management overhead'
    ],
    recommendedNodes: [
      { name: 'DNS / CDN (Route 53 + CloudFront)', provider: 'aws', category: 'dns', role: 'Edge TLS termination and static caching' },
      { name: 'Application Load Balancer (ALB)', provider: 'aws', category: 'gateway', role: 'Distributes traffic across 2 public subnets' },
      { name: 'EC2 Auto Scaling Group', provider: 'aws', category: 'compute', role: 'Stateless web tier in private subnets (min 2, max 4)' },
      { name: 'Amazon RDS PostgreSQL (Multi-AZ)', provider: 'aws', category: 'database', role: 'Primary in AZ-a, synchronous standby in AZ-b' },
      { name: 'Amazon S3 Bucket', provider: 'aws', category: 'storage', role: 'Stores uploaded PDFs and media' }
    ],
    referenceArchitecture: {
      title: 'Standard 3-Tier Multi-AZ Web Architecture',
      explanation: 'Traffic flows through CloudFront and ALB in public subnets, reaching stateless EC2 instances in private subnets, which talk to a Multi-AZ RDS database in isolated subnets.',
      diagramSteps: [
        'User -> HTTPS Route 53 / CloudFront -> ALB (Public Subnet)',
        'ALB -> EC2 Instances in Private Subnets (AZ-1 & AZ-2)',
        'EC2 -> RDS Multi-AZ Database (Isolated DB Subnet)',
        'EC2 -> S3 Gateway VPC Endpoint for zero-cost secure file storage'
      ],
      tradeOffs: [
        'Multi-AZ RDS doubles database instance cost, but guarantees automated failover in 60-120 seconds with 0 data loss.',
        'Using NAT Gateway incurs minor hourly fee, but ensures private EC2 instances can download OS security patches safely.'
      ],
      costEstimate: '~$120 - $180 / month (1 ALB, 2 t4g.small instances, db.t4g.small Multi-AZ RDS, S3 storage)'
    }
  },
  {
    id: 'sc-02-multicloud-dr',
    title: 'Multi-Cloud: AWS Primary with Azure Disaster Recovery',
    levelBadge: 'Level 11.2',
    difficulty: 'Advanced',
    summary: 'Architect a critical fintech banking core running in AWS as primary, with a cold/warm standby failover environment in Microsoft Azure to satisfy regulatory bank continuity mandates.',
    requirements: [
      'Primary transaction processing runs in AWS (us-east-1)',
      'If an entire cloud provider experiences a global blackout, failover to Azure (eastus2) within 15 minutes (RTO < 15min)',
      'Maximum acceptable data loss: 1 minute (RPO < 1min)',
      'Secure, private inter-cloud data replication without exposing traffic to the public internet'
    ],
    constraints: [
      'Regulatory audit mandates two independent cloud providers with different corporate ownership',
      'Avoid high idle compute costs in the secondary DR cloud'
    ],
    recommendedNodes: [
      { name: 'Global Traffic Manager / Cloudflare DNS', provider: 'general', category: 'dns', role: 'Health-check based global DNS failover' },
      { name: 'AWS Production EKS Cluster', provider: 'aws', category: 'compute', role: 'Active primary compute fleet' },
      { name: 'AWS Aurora PostgreSQL Primary', provider: 'aws', category: 'database', role: 'Primary write master database' },
      { name: 'Inter-Cloud IPSec VPN / Megaport Cloud Router', provider: 'general', category: 'network', role: 'Encrypted private tunnel between AWS VPC and Azure VNet' },
      { name: 'Azure Flexible PostgreSQL Standby', provider: 'azure', category: 'database', role: 'Continuous logical replication consumer' },
      { name: 'Azure AKS Standby Cluster', provider: 'azure', category: 'compute', role: 'Scaled to 1 node during normal operations; bursts to 20 nodes on failover' }
    ],
    referenceArchitecture: {
      title: 'Active / Warm-Standby Cross-Cloud Disaster Recovery',
      explanation: 'AWS runs 100% of live user traffic. Database changes stream continuously across an encrypted IPSec VPN to Azure PostgreSQL. On catastrophic AWS failure, DNS switches traffic to Azure, and Azure AKS scales up.',
      diagramSteps: [
        'Normal State: Global DNS routes 100% of traffic to AWS Application Load Balancer.',
        'Continuous Replication: AWS Aurora uses logical replication / AWS DMS to stream change data capture (CDC) over VPN to Azure PostgreSQL.',
        'Disaster Event: Global health check detects AWS total outage (3 consecutive failed probes).',
        'Failover Action: DNS automatically updates records to Azure Application Gateway IP.',
        'Compute Spin-Up: Azure AKS autoscaler expands node pool from 1 baseline node to full capacity within 3 minutes.',
        'Database Promotion: Azure PostgreSQL standby is unlocked for read/write transactions.'
      ],
      tradeOffs: [
        'Cross-cloud egress bandwidth fees apply for continuous database CDC replication.',
        'Schema migrations must be tested and applied identically on both AWS Aurora and Azure PostgreSQL engines.',
        'Warm standby in Azure incurs a modest 15-20% baseline cost, but avoids the 100% double-cost of active/active.'
      ],
      costEstimate: 'Primary AWS (~$2,500/mo) + Standby Azure (~$550/mo) + Inter-cloud VPN ($100/mo)'
    }
  },
  {
    id: 'sc-03-capstone-multicloud',
    title: 'Capstone: Enterprise Tri-Cloud Global Platform (AWS + Azure + GCP)',
    levelBadge: 'Level 11.3',
    difficulty: 'Capstone',
    summary: 'The ultimate enterprise architecture: Leverage AWS for core compute & microservices, Azure for Microsoft enterprise identity and Office integration, and GCP for petabyte-scale AI analytics and BigQuery streaming.',
    requirements: [
      'Seamless federated Single Sign-On using Microsoft Entra ID across all 3 clouds',
      'AWS EKS handles customer-facing transactional commerce APIs',
      'GCP BigQuery & Vertex AI consume real-time order streams for predictive fraud detection and analytics',
      'Unified Terraform infrastructure as code (IaC) governance and zero-trust private interconnectivity'
    ],
    constraints: [
      'Zero public internet exposure for inter-cloud database and analytics streams',
      'Unified security audit logging shipped to central SIEM'
    ],
    recommendedNodes: [
      { name: 'Microsoft Entra ID (Identity Root)', provider: 'azure', category: 'security', role: 'Central enterprise identity & OIDC federation for AWS & GCP' },
      { name: 'AWS EKS & Aurora PostgreSQL', provider: 'aws', category: 'compute', role: 'Core transactional commerce workloads' },
      { name: 'AWS Kinesis / EventBridge', provider: 'aws', category: 'gateway', role: 'Captures and streams order events' },
      { name: 'GCP Cloud Interconnect / Direct VPN', provider: 'gcp', category: 'network', role: 'Ultra-low latency private link between AWS and GCP' },
      { name: 'GCP BigQuery & Vertex AI', provider: 'gcp', category: 'database', role: 'Real-time petabyte analytics and ML fraud scoring models' }
    ],
    referenceArchitecture: {
      title: 'Tri-Cloud Best-of-Breed Enterprise Architecture',
      explanation: 'Each cloud handles what it does best: Azure governs identity, AWS runs transactional compute, and GCP powers advanced real-time AI and big data analytics.',
      diagramSteps: [
        'Identity: Entra ID acts as central IdP, federating short-lived tokens to AWS IAM and GCP Cloud IAM via Workload Identity.',
        'Transactions: End users interact with AWS EKS microservices backed by Multi-AZ Aurora.',
        'Data Streaming: EKS pushes order events to an EventBridge / Kinesis stream.',
        'Inter-Cloud Transit: Private dedicated interconnect / multi-cloud router streams events into GCP Pub/Sub with zero public IP traversal.',
        'Analytics & AI: GCP BigQuery ingests data in real-time, executing Vertex AI ML models to detect fraudulent credit card transactions and returning scores in <50ms.'
      ],
      tradeOffs: [
        'Requires sophisticated engineering team proficient across AWS IAM, Azure Entra ID, and GCP IAM.',
        'Network telemetry and distributed tracing must be unified using OpenTelemetry and a central observability vendor (Datadog/Dynatrace).'
      ],
      costEstimate: 'Enterprise Tier (Optimized based on workload specialization)'
    }
  }
];

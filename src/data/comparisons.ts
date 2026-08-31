import { ServiceComparison } from '../types';

export const serviceComparisons: ServiceComparison[] = [
  {
    id: 'compute',
    category: 'Virtual Machines & Compute',
    description: 'Direct comparison of Infrastructure as a Service (IaaS) virtual machine offerings across the Big Three.',
    aws: {
      name: 'Amazon EC2',
      badge: 'AWS EC2',
      bestFor: 'Widest variety of specialized instances (Graviton, GPU, High Memory) and mature Spot marketplace.',
      pricingModel: 'On-Demand (per-second), Compute Savings Plans (up to 66% discount), EC2 Instance Savings Plans (up to 72%), Spot Instances (up to 90%).',
      keyFeatures: [
        'Proprietary Nitro hypervisor for near-zero virtualization overhead',
        'Graviton3/4 ARM custom silicon with outstanding price/performance',
        'Placement Groups (Cluster, Spread, Partition) for HPC and HA',
        'Warm pools in Auto Scaling for near-instant boot times'
      ]
    },
    azure: {
      name: 'Azure Virtual Machines',
      badge: 'Azure VM',
      bestFor: 'Seamless integration with existing Microsoft Windows Server, SQL Server licensing, and Hybrid Benefit.',
      pricingModel: 'Pay-as-you-go, Azure Reserved VM Instances (1 or 3 year), Azure Spot Virtual Machines (up to 90% discount), Azure Hybrid Benefit.',
      keyFeatures: [
        'Azure Hybrid Benefit (use existing on-prem Windows/SQL licenses to save up to 85%)',
        'VM Scale Sets (VMSS) with automatic rolling upgrades and flexible orchestration',
        'Proximity Placement Groups for low-latency multi-VM clusters',
        'Direct integration with Azure Update Manager for OS patch automation'
      ]
    },
    gcp: {
      name: 'Google Compute Engine (GCE)',
      badge: 'GCP Compute Engine',
      bestFor: 'Fastest instance boot times (<30s), live migration during hardware maintenance, and custom machine types.',
      pricingModel: 'On-Demand (per-second), Committed Use Discounts (1 or 3 year, no upfront required), Spot VMs, Sustained Use Discounts.',
      keyFeatures: [
        'Custom Machine Types: pick exact vCPU and RAM combinations without paying for fixed preset tiers',
        'Live Migration: Google moves your running VM to another host during physical maintenance with zero downtime',
        'Spot VMs: dynamically priced spare capacity with clean 30-second shutdown notice',
        'Ultra-fast cold start booting compared to AWS and Azure'
      ]
    },
    decisionMatrix: [
      {
        scenario: 'Company has extensive existing Microsoft Windows Server and SQL Server enterprise licenses.',
        winner: 'azure',
        reason: 'Azure Hybrid Benefit allows repurposing existing on-premises licenses, slashing compute costs by up to 40-60%.'
      },
      {
        scenario: 'Workload requires non-standard CPU-to-Memory ratios (e.g. 3 vCPUs and 27 GB RAM) to minimize license fees.',
        winner: 'gcp',
        reason: 'GCP Custom Machine Types allow exact CPU/RAM sizing without forcing you to pay for the next larger standard instance tier.'
      },
      {
        scenario: 'Workload demands cutting-edge ARM architecture with massive ecosystem library support.',
        winner: 'aws',
        reason: 'AWS Graviton (Graviton3/4) has the most mature cloud ARM ecosystem with widespread Linux package optimization.'
      }
    ],
    architecturalTradeoffs: 'Choose AWS for greatest hardware specialization and Graviton efficiency; choose Azure if you have enterprise Microsoft enterprise agreements; choose GCP for live migration uptime and custom CPU/RAM granularity.'
  },
  {
    id: 'kubernetes',
    category: 'Managed Kubernetes',
    description: 'Evaluation of enterprise managed Kubernetes engines across control plane management, networking, and autoscaling.',
    aws: {
      name: 'Amazon EKS',
      badge: 'AWS EKS',
      bestFor: 'Deep integration with AWS IAM (Pod Identity/IRSA), VPC CNI native routing, and AWS security ecosystem.',
      pricingModel: '$0.10/hour per cluster control plane fee + underlying EC2/Fargate worker node compute costs.',
      keyFeatures: [
        'EKS Pod Identity & IRSA for fine-grained IAM roles mapped to K8s service accounts',
        'AWS VPC CNI assigns native VPC IP addresses directly to Kubernetes pods',
        'Karpenter: high-performance, open-source node autoscaler designed for AWS',
        'EKS Anywhere for hybrid on-premises VMware and bare-metal clusters'
      ]
    },
    azure: {
      name: 'Azure Kubernetes Service (AKS)',
      badge: 'Azure AKS',
      bestFor: 'Enterprise Microsoft ecosystems, Microsoft Entra pod identity, and hybrid cloud via Azure Arc.',
      pricingModel: 'Free tier control plane available; Standard tier ($0.10/hr) includes 99.95% uptime SLA + VM node costs.',
      keyFeatures: [
        'Free control plane tier for dev/test workloads',
        'Azure CNI powered by Cilium for high-throughput eBPF networking and network policies',
        'Virtual Nodes (powered by Azure Container Instances) for sub-second burst scaling',
        'Native integration with Microsoft Defender for Containers and Azure Monitor'
      ]
    },
    gcp: {
      name: 'Google Kubernetes Engine (GKE)',
      badge: 'GCP GKE',
      bestFor: 'Industry-leading Kubernetes maturity, GKE Autopilot (fully managed nodes & security), and rapid cluster upgrades.',
      pricingModel: 'GKE Standard ($0.10/hr control plane + node costs) or GKE Autopilot (billed strictly per Pod CPU/Memory requests).',
      keyFeatures: [
        'GKE Autopilot: completely eliminates node management, patching, and OS hardening while providing 99.99% pod SLA',
        'Original creator of Kubernetes with fastest day-0 upstream version availability',
        'Multi-Cluster Services (MCS) and GKE Fleet Management for global cross-cluster networking',
        'Native Workload Identity and Cloud Logging/Monitoring deep integration'
      ]
    },
    decisionMatrix: [
      {
        scenario: 'Team wants zero operational burden of managing Linux worker nodes, OS patching, or Kubernetes version upgrades.',
        winner: 'gcp',
        reason: 'GKE Autopilot manages the entire infrastructure lifecycle (nodes, OS, upgrades, security baselines) with per-pod resource billing.'
      },
      {
        scenario: 'Enterprise runs heavy Microsoft .NET Framework Windows containers and uses Azure DevOps CI/CD.',
        winner: 'azure',
        reason: 'AKS offers the most seamless Windows Server node pool support and Microsoft Entra authentication integration.'
      },
      {
        scenario: 'Platform engineering team requires custom eBPF networking, complex IAM policies, and Karpenter autoscaling.',
        winner: 'aws',
        reason: 'AWS EKS with Karpenter and VPC CNI provides the highest degree of infrastructure configurability and ecosystem tooling.'
      }
    ],
    architecturalTradeoffs: 'GKE is the gold standard for Kubernetes speed and hands-off Autopilot operations; EKS offers the deepest enterprise AWS ecosystem control; AKS provides the best cost-value with free control plane tiers and Microsoft stack synergy.'
  },
  {
    id: 'object-storage',
    category: 'Object Storage',
    description: 'Comparison of high-durability cloud object storage services for data lakes, backups, and media delivery.',
    aws: {
      name: 'Amazon S3',
      badge: 'AWS S3',
      bestFor: 'Proven 11 9s durability, S3 Intelligent-Tiering automatic cost optimization, and massive ecosystem tooling.',
      pricingModel: 'Tiered storage ($0.023/GB/mo standard down to $0.00099/GB/mo Glacier Deep Archive) + PUT/GET API request and egress fees.',
      keyFeatures: [
        'S3 Intelligent-Tiering automatically moves objects between frequent, infrequent, and archive tiers with zero retrieval fees',
        'S3 Object Lambda: transform data on-the-fly as it is retrieved from S3',
        'Cross-Region Replication (CRR) and Same-Region Replication (SRR) with Replication Time Control (RTC)',
        'S3 Express One Zone for single-digit millisecond latency data access for AI/ML'
      ]
    },
    azure: {
      name: 'Azure Blob Storage',
      badge: 'Azure Blob',
      bestFor: 'Azure Data Lake Storage Gen2 (hierarchical namespace) and unified analytics with Azure Synapse and Databricks.',
      pricingModel: 'Hot, Cool, Cold, and Archive access tiers with per-GB and per-operation billing.',
      keyFeatures: [
        'Hierarchical Namespace (ADLS Gen2) provides native directory operations for big data analytics',
        'Lifecycle management policies based on last modified or last accessed dates',
        'Immutable storage (WORM - Write Once, Read Many) for strict compliance and legal hold',
        'Object Replication across regions and subscriptions'
      ]
    },
    gcp: {
      name: 'Google Cloud Storage (GCS)',
      badge: 'GCP Cloud Storage',
      bestFor: 'Unified global bucket namespace, multi-region and dual-region automatic replication with single API endpoint.',
      pricingModel: 'Standard ($0.020/GB/mo), Nearline ($0.010/GB/mo), Coldline ($0.004/GB/mo), Archive ($0.0012/GB/mo).',
      keyFeatures: [
        'Dual-Region & Multi-Region Buckets: built-in automatic geo-redundancy under a single bucket name without separate replication jobs',
        'Single unified API across all storage classes (no separate Glacier vault API)',
        'Turbo Replication: 100% of data replicated to secondary region within 15 minutes',
        'Autoclass: automatic lifecycle transitions to optimize costs based on access patterns'
      ]
    },
    decisionMatrix: [
      {
        scenario: 'Organization needs big data Hadoop/Spark/Databricks analytics with atomic directory renaming.',
        winner: 'azure',
        reason: 'Azure Data Lake Storage Gen2 provides true POSIX-compliant hierarchical namespaces, eliminating expensive simulated directory copy operations.'
      },
      {
        scenario: 'Application requires simple dual-region active-active object storage without managing separate replication bucket endpoints.',
        winner: 'gcp',
        reason: 'GCS Dual-Region buckets automatically replicate data across two regions behind a single global bucket name and API.'
      },
      {
        scenario: 'Unpredictable access patterns where files may be accessed frequently this month and rarely next month.',
        winner: 'aws',
        reason: 'S3 Intelligent-Tiering automatically moves objects between tiers with zero retrieval penalties or operational overhead.'
      }
    ],
    architecturalTradeoffs: 'AWS S3 has the most extensive storage class tiers and automated intelligent lifecycle tools; Azure Blob excels in big data analytics hierarchies; GCP Cloud Storage provides the most elegant multi-region global bucket architecture.'
  },
  {
    id: 'serverless',
    category: 'Serverless Compute',
    description: 'Comparing event-driven functions and serverless container platforms across cold starts, concurrency, and timeouts.',
    aws: {
      name: 'AWS Lambda',
      badge: 'AWS Lambda',
      bestFor: 'Event-driven AWS service glue, sub-second execution, massive ecosystem integrations (SQS, DynamoDB Streams, S3).',
      pricingModel: 'Billed per million requests + duration in milliseconds (x86 or ARM Graviton architecture).',
      keyFeatures: [
        'SnapStart for Java: reduces cold start latencies from 5s down to sub-200ms using microVM snapshot caching',
        'Provisioned Concurrency for zero cold start guarantees',
        'Lambda Function URLs with built-in HTTPS endpoints and CORS',
        'Native EventBridge and DynamoDB Streams triggers'
      ]
    },
    azure: {
      name: 'Azure Functions',
      badge: 'Azure Functions',
      bestFor: 'Declarative input/output bindings, stateful serverless workflows (Durable Functions), and .NET integration.',
      pricingModel: 'Consumption Plan (pay per execution), Premium Plan (pre-warmed instances & VNet integration), Dedicated App Service Plan.',
      keyFeatures: [
        'Declarative Triggers and Bindings: connect to Cosmos DB, Blob, Service Bus with zero boilerplate SDK code',
        'Durable Functions: write stateful orchestration workflows, human-in-the-loop approvals, and fan-out/fan-in in code',
        'Azure Functions Premium Plan provides private VNet integration and dedicated pre-warmed instances',
        'Native OpenAPI/Swagger generation'
      ]
    },
    gcp: {
      name: 'Google Cloud Run',
      badge: 'GCP Cloud Run',
      bestFor: 'Container-based serverless web apps & microservices with multi-concurrency (up to 1,000 requests per container instance).',
      pricingModel: 'Billed per vCPU-second and GB-second actively processing requests, with generous free tier and scale-to-zero.',
      keyFeatures: [
        'Multi-Concurrency: a single container instance can handle hundreds of concurrent requests (unlike Lambda 1 request/instance)',
        'Runs standard Docker container images (any language, binary, or library)',
        'Built-in Traffic Splitting: route 10% of traffic to v2 container for instant Canary deployments',
        'WebSocket, HTTP/2, and gRPC streaming native support'
      ]
    },
    decisionMatrix: [
      {
        scenario: 'Team wants to deploy standard Dockerized web APIs (FastAPI, Express, Go) with automatic scale-to-zero and low cost.',
        winner: 'gcp',
        reason: 'Cloud Run handles multiple concurrent requests per container instance, drastically reducing the number of container instances needed and cutting cold starts.'
      },
      {
        scenario: 'Complex multi-step stateful business workflows requiring orchestrations, timers, and human approval steps.',
        winner: 'azure',
        reason: 'Azure Durable Functions allows writing stateful orchestrator code in C#, TypeScript, or Python directly without separate visual workflow tools.'
      },
      {
        scenario: 'Event-driven streaming pipeline processing millions of records from DynamoDB and S3 in real-time.',
        winner: 'aws',
        reason: 'AWS Lambda has native microsecond stream filtering, managed batching, and deep integration with the AWS event ecosystem.'
      }
    ],
    architecturalTradeoffs: 'GCP Cloud Run is the most versatile serverless container runtime for web APIs; Azure Functions shines with Durable stateful workflows; AWS Lambda is the unmatched king of fine-grained cloud event integration.'
  }
];

export const transitionMapAWS = [
  {
    awsConcept: 'AWS IAM Role & Instance Profile',
    azureEquivalent: 'Managed Identity (System/User Assigned) & Azure RBAC',
    gcpEquivalent: 'Service Account & Attached VM Service Account',
    keyDifference: 'AWS uses STS for short-lived tokens; Azure uses Entra ID OAuth tokens; GCP uses OAuth2 access tokens via metadata server.'
  },
  {
    awsConcept: 'Amazon VPC (Subnets are tied to a single AZ)',
    azureEquivalent: 'Azure VNet (Subnets span across all AZs in the region)',
    gcpEquivalent: 'GCP VPC (VPC is Global; Subnets are Regional)',
    keyDifference: 'In AWS you must create separate subnets per AZ. In Azure and GCP, a single subnet covers all AZs in that region.'
  },
  {
    awsConcept: 'Security Group (Stateful instance firewall)',
    azureEquivalent: 'Network Security Group / NSG (Stateful subnet/NIC firewall)',
    gcpEquivalent: 'Cloud Firewall Rules (Stateful, evaluated by target network tags)',
    keyDifference: 'AWS security groups allow referencing other security group IDs. Azure NSGs support Application Security Groups (ASGs). GCP firewalls use network tags and service accounts.'
  },
  {
    awsConcept: 'Amazon S3 (Global naming, regional buckets)',
    azureEquivalent: 'Azure Blob Storage in Storage Account',
    gcpEquivalent: 'Google Cloud Storage (GCS Buckets)',
    keyDifference: 'Azure requires creating a Storage Account parent object first. GCP provides built-in Dual-Region replication under a single bucket name.'
  },
  {
    awsConcept: 'AWS Route 53 (Managed DNS & Latency Routing)',
    azureEquivalent: 'Azure DNS + Azure Traffic Manager / Front Door',
    gcpEquivalent: 'Cloud DNS + Global External HTTP(S) Load Balancer',
    keyDifference: 'GCP achieves global routing via Anycast IP at Layer 7 instead of relying on DNS record switching.'
  }
];

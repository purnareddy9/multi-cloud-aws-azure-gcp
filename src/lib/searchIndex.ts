export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  track?: 'aws' | 'azure' | 'gcp' | 'multicloud' | 'general';
  path: string;
  tags: string[];
}

export const globalSearchDatabase: SearchResultItem[] = [
  // Fundamentals
  {
    id: 'fund-cloud-overview',
    title: 'What is Cloud Computing?',
    subtitle: 'IaaS vs PaaS vs SaaS, Public vs Private vs Hybrid & Multi-Cloud',
    category: 'Fundamentals',
    track: 'general',
    path: '/fundamentals',
    tags: ['cloud', 'iaas', 'paas', 'saas', 'hybrid', 'multicloud', 'regions', 'zones']
  },
  {
    id: 'fund-shared-responsibility',
    title: 'Shared Responsibility Model',
    subtitle: 'Who manages what in AWS, Azure, and GCP security',
    category: 'Fundamentals',
    track: 'general',
    path: '/fundamentals',
    tags: ['security', 'compliance', 'shared responsibility', 'patching', 'hardware']
  },

  // AWS Track
  {
    id: 'aws-vpc',
    title: 'AWS VPC & Networking',
    subtitle: 'Virtual Private Cloud, Subnets, Route Tables, IGW, NAT Gateway, NACLs & Security Groups',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/networking',
    tags: ['aws', 'vpc', 'cidr', 'subnet', 'nat gateway', 'igw', 'security group', 'nacl', 'route 53', 'cloudfront']
  },
  {
    id: 'aws-iam',
    title: 'AWS IAM (Identity & Access Management)',
    subtitle: 'Users, Groups, Roles, Policies, Least Privilege, MFA, AssumeRole',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/iam',
    tags: ['aws', 'iam', 'roles', 'policies', 'least privilege', 'security', 'credentials']
  },
  {
    id: 'aws-ec2',
    title: 'AWS EC2 & Auto Scaling',
    subtitle: 'Elastic Compute Cloud, Instance Types, AMI, Placement Groups, ASG',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/compute',
    tags: ['aws', 'ec2', 'compute', 'virtual machine', 'auto scaling', 'asg', 'alb']
  },
  {
    id: 'aws-eks',
    title: 'AWS EKS (Elastic Kubernetes Service)',
    subtitle: 'Managed Control Plane, Node Groups, Fargate, VPC CNI',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/kubernetes',
    tags: ['aws', 'eks', 'kubernetes', 'containers', 'k8s', 'fargate']
  },
  {
    id: 'aws-lambda',
    title: 'AWS Lambda (Serverless Compute)',
    subtitle: 'Event-driven execution, concurrency, cold starts, API Gateway integration',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/serverless',
    tags: ['aws', 'lambda', 'serverless', 'api gateway', 'eventbridge', 'sqs', 'sns']
  },
  {
    id: 'aws-s3',
    title: 'AWS S3 (Simple Storage Service)',
    subtitle: 'Object storage, Storage Classes, Lifecycle rules, Versioning, Replication',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/storage',
    tags: ['aws', 's3', 'storage', 'object storage', 'glacier', 'lifecycle', 'bucket policy']
  },
  {
    id: 'aws-rds',
    title: 'AWS RDS & Aurora',
    subtitle: 'Managed Relational Databases, Multi-AZ Standby, Read Replicas, Serverless Aurora',
    category: 'AWS Track',
    track: 'aws',
    path: '/aws/databases',
    tags: ['aws', 'rds', 'aurora', 'postgres', 'mysql', 'database', 'multi-az', 'read replica']
  },

  // Azure Track
  {
    id: 'azure-vnet',
    title: 'Azure Virtual Network (VNet)',
    subtitle: 'Subnets, NSG (Network Security Groups), Route Tables, Azure Bastion, NAT Gateway',
    category: 'Azure Track',
    track: 'azure',
    path: '/azure/networking',
    tags: ['azure', 'vnet', 'subnet', 'nsg', 'asg', 'azure bastion', 'vpn gateway', 'expressroute']
  },
  {
    id: 'azure-entra',
    title: 'Microsoft Entra ID & Azure RBAC',
    subtitle: 'Tenants, Subscriptions, Management Groups, Service Principals, Managed Identities',
    category: 'Azure Track',
    track: 'azure',
    path: '/azure/identity',
    tags: ['azure', 'entra id', 'active directory', 'rbac', 'managed identity', 'service principal']
  },
  {
    id: 'azure-vm',
    title: 'Azure Virtual Machines & VMSS',
    subtitle: 'VM Scale Sets, Availability Sets, Proximity Placement, Azure Compute Gallery',
    category: 'Azure Track',
    track: 'azure',
    path: '/azure/compute',
    tags: ['azure', 'vm', 'virtual machines', 'vmss', 'scale set', 'availability zone']
  },
  {
    id: 'azure-aks',
    title: 'Azure Kubernetes Service (AKS)',
    subtitle: 'Managed K8s, Azure CNI vs Kubenet, Virtual Nodes, Microsoft Entra pod identity',
    category: 'Azure Track',
    track: 'azure',
    path: '/azure/kubernetes',
    tags: ['azure', 'aks', 'kubernetes', 'k8s', 'containers', 'azure cni']
  },
  {
    id: 'azure-blob',
    title: 'Azure Blob Storage & Data Lake',
    subtitle: 'Block Blobs, Append Blobs, Hot/Cool/Cold/Archive tiers, Immutability, Private Endpoints',
    category: 'Azure Track',
    track: 'azure',
    path: '/azure/storage',
    tags: ['azure', 'blob', 'storage', 'data lake', 'archive', 'private endpoint']
  },
  {
    id: 'azure-sql',
    title: 'Azure SQL & Cosmos DB',
    subtitle: 'Azure SQL Managed Instance, Elastic Pools, Cosmos DB Multi-Region Active/Active',
    category: 'Azure Track',
    track: 'azure',
    path: '/azure/databases',
    tags: ['azure', 'azure sql', 'cosmos db', 'nosql', 'multi-region', 'geo-replication']
  },

  // GCP Track
  {
    id: 'gcp-vpc',
    title: 'GCP VPC & Global Networking',
    subtitle: 'Global VPC networks, Regional subnets, Cloud Armor, Cloud NAT, Interconnect',
    category: 'GCP Track',
    track: 'gcp',
    path: '/gcp/networking',
    tags: ['gcp', 'vpc', 'global vpc', 'cloud armor', 'cloud nat', 'interconnect', 'cloud load balancing']
  },
  {
    id: 'gcp-iam',
    title: 'Google Cloud IAM & Projects',
    subtitle: 'Organizations, Folders, Projects, Service Accounts, Workload Identity Federation',
    category: 'GCP Track',
    track: 'gcp',
    path: '/gcp/iam',
    tags: ['gcp', 'iam', 'projects', 'service accounts', 'workload identity', 'organization policies']
  },
  {
    id: 'gcp-gke',
    title: 'Google Kubernetes Engine (GKE)',
    subtitle: 'GKE Autopilot vs Standard, Multi-cluster Services, Workload Identity, Anthos',
    category: 'GCP Track',
    track: 'gcp',
    path: '/gcp/kubernetes',
    tags: ['gcp', 'gke', 'kubernetes', 'autopilot', 'k8s', 'anthos', 'containers']
  },
  {
    id: 'gcp-cloud-run',
    title: 'GCP Cloud Run & Functions',
    subtitle: 'Fully managed serverless container execution, concurrency, scale-to-zero',
    category: 'GCP Track',
    track: 'gcp',
    path: '/gcp/serverless',
    tags: ['gcp', 'cloud run', 'cloud functions', 'serverless', 'containers', 'scale to zero']
  },
  {
    id: 'gcp-gcs',
    title: 'Google Cloud Storage (GCS)',
    subtitle: 'Unified object storage, Standard/Nearline/Coldline/Archive, Dual-region replication',
    category: 'GCP Track',
    track: 'gcp',
    path: '/gcp/storage',
    tags: ['gcp', 'cloud storage', 'gcs', 'buckets', 'object storage', 'dual region']
  },
  {
    id: 'gcp-spanner',
    title: 'GCP Cloud Spanner & Cloud SQL',
    subtitle: 'Globally distributed ACID relational database with 99.999% SLA, TrueTime API',
    category: 'GCP Track',
    track: 'gcp',
    path: '/gcp/databases',
    tags: ['gcp', 'spanner', 'cloud sql', 'truetime', 'acid', 'globally distributed']
  },

  // Comparison & Tools
  {
    id: 'compare-compute',
    title: 'Compute Comparison: EC2 vs Azure VM vs Compute Engine',
    subtitle: 'Direct architecture & pricing tradeoff analysis',
    category: 'Comparisons',
    path: '/compare',
    tags: ['compare', 'ec2', 'azure vm', 'compute engine', 'virtual machines']
  },
  {
    id: 'compare-k8s',
    title: 'Kubernetes Comparison: EKS vs AKS vs GKE',
    subtitle: 'Control plane SLAs, CNI plugins, pricing, autoscaling speed',
    category: 'Comparisons',
    path: '/compare',
    tags: ['compare', 'eks', 'aks', 'gke', 'kubernetes', 'k8s']
  },
  {
    id: 'compare-storage',
    title: 'Object Storage Comparison: S3 vs Blob vs Cloud Storage',
    subtitle: 'Egress costs, storage classes, global buckets, replication',
    category: 'Comparisons',
    path: '/compare',
    tags: ['compare', 's3', 'blob storage', 'cloud storage', 'storage']
  },
  {
    id: 'tool-decision-engine',
    title: 'Cloud Decision Engine: Which Cloud Should I Choose?',
    subtitle: 'Interactive questionnaire and scoring engine for your workload',
    category: 'Interactive Tools',
    path: '/decision-engine',
    tags: ['decision', 'which cloud', 'chooser', 'aws vs azure vs gcp', 'recommendation']
  },
  {
    id: 'tool-architecture-lab',
    title: 'Interactive Architecture Designer & Validator',
    subtitle: 'Drag and drop React Flow canvas with real-time scoring and SPOF detection',
    category: 'Interactive Tools',
    path: '/lab',
    tags: ['lab', 'designer', 'canvas', 'diagram', 'review', 'react flow', 'validator']
  },
  {
    id: 'tool-transition',
    title: 'I Know AWS → Teach Me Azure / GCP',
    subtitle: 'Mental model translation bridge for experienced cloud engineers',
    category: 'Interactive Tools',
    path: '/transition',
    tags: ['transition', 'aws to azure', 'aws to gcp', 'migration', 'mental model']
  },
  {
    id: 'topic-ha',
    title: 'High Availability (HA) Architecture Patterns',
    subtitle: 'Multi-AZ redundancy, Auto-Healing, N+1 capacity, and fault domain isolation',
    category: 'High Availability',
    path: '/ha',
    tags: ['ha', 'high availability', 'multi-az', 'redundancy', 'fault tolerance', 'auto healing']
  },
  {
    id: 'topic-dr',
    title: 'Disaster Recovery (DR) Strategies & RPO/RTO',
    subtitle: 'Backup & Restore, Pilot Light, Warm Standby, Active/Active Multi-Region',
    category: 'Disaster Recovery',
    path: '/dr',
    tags: ['dr', 'disaster recovery', 'rpo', 'rto', 'pilot light', 'warm standby', 'active active', 'failover']
  },
  {
    id: 'tool-interviews',
    title: 'Cloud Architect Interview Simulator & 50+ Question Bank',
    subtitle: 'Practice scenario defense, trade-offs, and requirement clarification',
    category: 'Interviews',
    path: '/interviews',
    tags: ['interview', 'questions', 'system design', 'tradeoffs', 'hld', 'lld', 'mock interview']
  }
];

export function searchAcademy(query: string): SearchResultItem[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  
  return globalSearchDatabase.filter(item => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }).slice(0, 10);
}

import { LessonModule } from '../types';

export const awsLessons: LessonModule[] = [
  {
    id: 'aws-01-fundamentals',
    slug: 'fundamentals',
    level: 1,
    track: 'aws',
    category: 'Architecture Foundations',
    title: 'AWS Global Infrastructure & Management',
    subtitle: 'Understanding Regions, AZs, Edge PoPs, AWS Organizations & Control Tower',
    estimatedMinutes: 20,
    iconName: 'Globe',
    whatIsIt: 'AWS Global Infrastructure is the world\'s most comprehensive physical and logical cloud network, spanning 30+ geographic regions, 100+ Availability Zones, and 450+ Edge CloudFront Points of Presence.',
    whyExists: 'Allows companies to run applications globally with sub-millisecond local latency, absolute data sovereignty compliance (e.g. GDPR), and 99.999% fault tolerance against localized disasters.',
    simpleExplanation: 'Think of AWS as a global chain of interconnected ultra-secure data center complexes. A Region is a major city cluster, an Availability Zone is an independent bunker data center inside that city, and Edge locations are local branch posts near your customers.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Global Edge (CloudFront PoPs)', type: 'edge', details: '450+ edge locations worldwide' },
        { id: '2', label: 'AWS Region: us-east-1', type: 'region', details: 'Geographic boundary' },
        { id: '3', label: 'AZ: us-east-1a', type: 'az', details: 'Isolated datacenter A' },
        { id: '4', label: 'AZ: us-east-1b', type: 'az', details: 'Isolated datacenter B' }
      ],
      flow: [
        { from: '1', to: '2', label: 'AWS Private Backbone' },
        { from: '2', to: '3', label: 'Cross-AZ Fiber (<2ms)' },
        { from: '2', to: '4', label: 'Cross-AZ Fiber (<2ms)' }
      ]
    },
    realWorldExample: 'Netflix streams video catalogs through AWS CloudFront Edge locations close to viewers, while running its recommendation and transcoding compute engines across multiple AWS US and EU regions.',
    architectureExample: {
      title: 'Multi-AZ High Availability Ingress',
      description: 'Route 53 latency-based routing directs global traffic to the nearest healthy AWS region, where an ALB distributes traffic across 3 distinct AZ subnets.',
      flow: [
        'User initiates HTTPS request -> Route 53 DNS resolves closest region IP',
        'CloudFront caches edge assets; dynamic requests pass through AWS backbone',
        'Application Load Balancer health-checks targets across us-east-1a, 1b, and 1c',
        'Auto Scaling group dynamically spawns EC2 instances in healthy AZs'
      ]
    },
    whenToUse: [
      'When building enterprise web applications requiring 99.99% availability SLA.',
      'When strict data residency regulations require customer data to stay inside specific sovereign borders.',
      'When global audience demands low latency static asset delivery via CDN.'
    ],
    whenNotToUse: [
      'Do not spread low-traffic single-user internal batch scripts across multiple expensive regions.',
      'Avoid deploying databases in distant regions if synchronous zero-latency write locking is required.'
    ],
    advantages: [
      'Largest global cloud footprint with unmatched partner and service ecosystem.',
      'Isolated fault domains (each AZ has independent power, transit, and cooling).',
      'Massive scale economies resulting in frequent price reductions.'
    ],
    disadvantages: [
      'Complex billing and thousands of service configuration permutations.',
      'Cross-AZ and cross-region data transfer fees can accumulate quickly if unmonitored.'
    ],
    cloudEquivalents: {
      aws: 'AWS Region & Availability Zone',
      azure: 'Azure Region & Availability Zones (3 AZs per region)',
      gcp: 'GCP Region & Zones (e.g. us-central1-a/b/c)',
      notes: 'All 3 major clouds have converged on 3+ AZs per primary region.'
    },
    commonMistakes: [
      {
        mistake: 'Assuming us-east-1a in Account A is the same physical building as us-east-1a in Account B.',
        consequence: 'AZ names are randomly mapped per account to prevent load skewing.',
        fix: 'Use AZ IDs (e.g., use1-az1) to coordinate physical locations across multiple AWS accounts.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'AWS CLI: Querying Available Regions & AZs',
      scenario: 'Verify available AZs in us-east-1 and list AZ IDs for VPC planning.',
      cliCommand: 'aws ec2 describe-availability-zones --region us-east-1 --query "AvailabilityZones[].{ZoneName:ZoneName,ZoneId:ZoneId,State:State}" --output table',
      expectedOutcome: 'Returns table with us-east-1a (use1-az1), us-east-1b (use1-az2), us-east-1c (use1-az4) in "available" status.',
      steps: [
        '1. Set target region to us-east-1',
        '2. Run ec2 describe-availability-zones filtering for active states',
        '3. Map ZoneId across secondary accounts for multi-account VPC peering'
      ]
    },
    scenarioChallenge: {
      title: 'Architecting for a Regional Outage',
      problem: 'Your e-commerce application has an RTO of 5 minutes and an RPO of 0 for AZ failure, and RTO of 1 hour for regional failure. What is the optimal architecture?',
      constraints: ['Zero data loss on local hardware failure', 'Cost-effective regional failover'],
      options: [
        {
          id: 'a',
          text: 'Single AZ in us-east-1 with hourly S3 snapshots',
          isCorrect: false,
          explanation: 'Single AZ does not meet RTO of 5 minutes or RPO of 0 on local failure.'
        },
        {
          id: 'b',
          text: 'Multi-AZ RDS + ALB across 3 AZs in primary region, with cross-region read replica in secondary region (Pilot Light / Warm Standby)',
          isCorrect: true,
          explanation: 'Correct! Multi-AZ synchronous replication provides RPO=0 and automated failover for AZ outage, while the cross-region replica provides cost-effective regional disaster recovery.'
        },
        {
          id: 'c',
          text: 'Full Active/Active across 5 regions with synchronous multi-master database',
          isCorrect: false,
          explanation: 'Synchronous cross-region writes violate the speed of light latency and incur massive unnecessary cost.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How do you design an AWS architecture that guarantees 99.99% availability?',
        whyAsked: 'Tests understanding of high availability math and fault domain isolation.',
        answer: 'Deploy compute across at least 3 Availability Zones behind an Application Load Balancer with Auto Scaling. Use Multi-AZ RDS/Aurora with synchronous primary-standby replication. Store static assets in S3 behind CloudFront. Ensure subnets and route tables are balanced across all 3 AZs.',
        architecturalDefense: 'Even if an entire AZ suffers a catastrophic utility power failure, the remaining two AZs automatically handle 100% of traffic without manual intervention or data loss.',
        keyPoints: ['Multi-AZ ALB', 'Multi-AZ RDS synchronous standby', 'S3 + CloudFront caching', 'Cross-AZ health checks']
      }
    ],
    keyTakeaways: [
      'AWS Regions are geographically separate; AZs are physically separate data centers within a region.',
      'Cross-AZ fiber latency is under 2ms; cross-region latency is bounded by geographic distance.',
      'Always design for Multi-AZ as the baseline for production high availability.'
    ]
  },
  {
    id: 'aws-02-iam',
    slug: 'iam',
    level: 1,
    track: 'aws',
    category: 'Security & Identity',
    title: 'AWS IAM: Users, Roles, Policies & Least Privilege',
    subtitle: 'Zero Trust authentication, JSON policies, AssumeRole & Instance Profiles',
    estimatedMinutes: 25,
    iconName: 'Shield',
    whatIsIt: 'AWS Identity and Access Management (IAM) is the central security control plane that securely controls authentication (who can sign in) and authorization (what permissions they have) across all AWS resources.',
    whyExists: 'Without centralized IAM, developers would embed hardcoded credentials, causing disastrous security breaches and compliance failures.',
    simpleExplanation: 'IAM is the security guard, keycard issuer, and permission ledger for your entire AWS account. A User is a person; a Role is a temporary security badge you wear when doing a specific job; a Policy is the written rulebook stating exactly which doors you can open.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'EC2 Instance Profile', type: 'resource', details: 'App Server' },
        { id: '2', label: 'STS (Security Token Service)', type: 'iam', details: 'Issues temp credentials' },
        { id: '3', label: 'S3 Bucket (App Data)', type: 'storage', details: 'Target resource' }
      ],
      flow: [
        { from: '1', to: '2', label: 'AssumeRole (ec2-s3-read-role)' },
        { from: '2', to: '1', label: 'Short-lived token (1h)' },
        { from: '1', to: '3', label: 'GetObject with temp token' }
      ]
    },
    realWorldExample: 'An EC2 web application needs to read images from an S3 bucket. Instead of storing AWS access keys in a `.env` file, an IAM Role is attached to the EC2 instance profile. The AWS SDK automatically requests temporary 1-hour credentials via AWS STS.',
    architectureExample: {
      title: 'Least-Privilege Cross-Account Role Assumption',
      description: 'A CI/CD GitHub Actions runner assumes a scoped IAM role in the Production AWS account using OpenID Connect (OIDC) with zero permanent secrets.',
      flow: [
        'GitHub Actions runner requests OIDC JWT token from GitHub',
        'Runner presents JWT token to AWS STS AssumeRoleWithWebIdentity',
        'AWS IAM validates GitHub repo name, branch, and audience against trust policy',
        'STS returns 15-minute temporary session credentials with restricted deploy permissions'
      ]
    },
    whenToUse: [
      'Mandatory for every person, service, container, and Lambda function accessing AWS.',
      'Use IAM Roles with OIDC for automated CI/CD pipelines (GitHub Actions, GitLab, Jenkins).',
      'Use IAM Permission Boundaries and AWS Organizations SCPs for enterprise governance.'
    ],
    whenNotToUse: [
      'Never generate long-lived IAM User Access Keys for backend applications or containers.',
      'Never use the Root Account for daily administrative tasks.'
    ],
    advantages: [
      'Fine-grained JSON policy evaluation with ABAC (Attribute-Based Access Control).',
      'Native integration with AWS STS for automatic credential rotation.',
      'Free of charge (included with AWS account).'
    ],
    disadvantages: [
      'Complex policy grammar with explicit deny overriding allow.',
      'Easy to accidentally grant overly permissive `s3:*` or `*` wildcards.'
    ],
    cloudEquivalents: {
      aws: 'AWS IAM (Users, Roles, Policies)',
      azure: 'Microsoft Entra ID + Azure RBAC (Service Principals & Managed Identities)',
      gcp: 'Google Cloud IAM (Service Accounts & Roles)',
      notes: 'AWS IAM Roles = Azure Managed Identities = GCP Service Accounts.'
    },
    commonMistakes: [
      {
        mistake: 'Hardcoding AWS Access Key ID and Secret Access Key in application source code.',
        consequence: 'Bots scan GitHub repositories in seconds and hijack accounts for crypto-mining.',
        fix: 'Use IAM Instance Profiles for EC2, IRSA (IAM Roles for Service Accounts) for EKS, or IAM Execution Roles for Lambda.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Writing a Least-Privilege IAM Policy',
      scenario: 'Create a JSON IAM policy that grants read-only access to a specific bucket `company-financial-reports` and enforces TLS/HTTPS encryption.',
      terraformCode: `resource "aws_iam_policy" "s3_read_policy" {
  name        = "FinancialReportsReadOnly"
  description = "Allows secure read-only access to reports bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:ListBucket"]
        Resource = [
          "arn:aws:s3:::company-financial-reports",
          "arn:aws:s3:::company-financial-reports/*"
        ]
        Condition = {
          Bool = { "aws:SecureTransport": "true" }
        }
      }
    ]
  })
}`,
      expectedOutcome: 'App can list and read files over HTTPS, and is rejected if unencrypted HTTP or write operations are attempted.',
      steps: [
        '1. Specify exact bucket and object ARNs',
        '2. Limit Actions strictly to GetObject and ListBucket',
        '3. Add aws:SecureTransport condition to enforce SSL/TLS'
      ]
    },
    scenarioChallenge: {
      title: 'Container Credential Security',
      problem: 'Your team runs 50 microservices on an Amazon EKS Kubernetes cluster. Each microservice needs access to different AWS resources (DynamoDB tables, S3 buckets). How do you grant access securely without sharing credentials?',
      constraints: ['No permanent access keys', 'Strict isolation between microservices'],
      options: [
        {
          id: 'a',
          text: 'Attach an IAM role to the EC2 Worker Node with permissions for all 50 microservices',
          isCorrect: false,
          explanation: 'Violates least privilege. Any compromised container on the worker node could access all 50 microservices\' AWS resources.'
        },
        {
          id: 'b',
          text: 'Use EKS Pod Identity / IRSA (IAM Roles for Service Accounts) to map individual Kubernetes ServiceAccounts to distinct IAM Roles',
          isCorrect: true,
          explanation: 'Correct! IRSA injects temporary AWS STS credentials directly into specific pods, ensuring complete least-privilege isolation.'
        },
        {
          id: 'c',
          text: 'Store IAM user credentials in Kubernetes Secrets and mount as environment variables',
          isCorrect: false,
          explanation: 'Permanent IAM user keys require manual rotation and increase credential exposure risk.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the difference between an IAM User and an IAM Role?',
        whyAsked: 'Fundamental cloud security design test.',
        answer: 'An IAM User represents a permanent identity (person or legacy service) with permanent credentials (password or long-lived access keys). An IAM Role is an identity that does not have permanent credentials; it is temporarily assumed by users, applications, or AWS services via AWS STS, which issues short-lived temporary tokens that automatically expire.',
        architecturalDefense: 'IAM Roles eliminate credential theft risk because temporary tokens expire in 15 minutes to 1 hour and require zero manual key rotation.',
        keyPoints: ['Permanent credentials vs STS temporary tokens', 'AssumeRole API', 'Instance Profiles & IRSA']
      }
    ],
    keyTakeaways: [
      'Always follow the Principle of Least Privilege: grant only the exact actions and resources needed.',
      'Prefer IAM Roles over permanent IAM Users.',
      'Explicit Deny always wins in AWS IAM policy evaluation logic.'
    ]
  },
  {
    id: 'aws-03-networking',
    slug: 'networking',
    level: 1,
    track: 'aws',
    category: 'Networking & Content Delivery',
    title: 'AWS VPC: Subnets, Gateways, Route Tables & Security Groups',
    subtitle: 'Building secure, isolated enterprise network topologies in the cloud',
    estimatedMinutes: 30,
    iconName: 'Network',
    whatIsIt: 'Amazon Virtual Private Cloud (Amazon VPC) gives you complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.',
    whyExists: 'Enterprises require isolated private networks in the cloud that mimic their on-premises datacenters with strict perimeter firewalls, private databases, and controlled internet breakout.',
    simpleExplanation: 'A VPC is your private virtual walled garden in AWS. Inside, you divide the land into public subnets (stores facing the street) and private subnets (secure underground vaults). An Internet Gateway is the front door, and a NAT Gateway is a one-way exit turnstile.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Internet Gateway (IGW)', type: 'gateway', details: 'Public Ingress/Egress' },
        { id: '2', label: 'Public Subnet (ALB)', type: 'subnet', details: '10.0.1.0/24' },
        { id: '3', label: 'NAT Gateway', type: 'gateway', details: 'Outbound Only for Private' },
        { id: '4', label: 'Private App Subnet', type: 'subnet', details: '10.0.2.0/24 (EC2/EKS)' },
        { id: '5', label: 'Isolated DB Subnet', type: 'subnet', details: '10.0.3.0/24 (RDS Multi-AZ)' }
      ],
      flow: [
        { from: '1', to: '2', label: 'HTTPS 443' },
        { from: '2', to: '4', label: 'Port 8080 (Security Group)' },
        { from: '4', to: '3', label: 'Outbound Updates' },
        { from: '3', to: '1', label: 'NAT to Internet' },
        { from: '4', to: '5', label: 'Port 5432 (Postgres)' }
      ]
    },
    realWorldExample: 'A banking application places its Application Load Balancers in public subnets, its microservices on EC2 in private subnets, and its PostgreSQL databases in isolated subnets with zero internet access.',
    architectureExample: {
      title: 'Standard Production 3-Tier VPC Architecture',
      description: 'A dual-AZ VPC containing 2 Public Subnets, 2 Private App Subnets, and 2 Isolated Database Subnets with redundant NAT Gateways.',
      flow: [
        'VPC CIDR: 10.0.0.0/16 across us-east-1a and us-east-1b',
        'Public Subnets (10.0.1.0/24, 10.0.2.0/24) route 0.0.0.0/0 to Internet Gateway (IGW)',
        'Private Subnets (10.0.10.0/24, 10.0.20.0/24) route 0.0.0.0/0 to NAT Gateways in each AZ',
        'Isolated DB Subnets (10.0.100.0/24, 10.0.200.0/24) have no route to 0.0.0.0/0'
      ]
    },
    whenToUse: [
      'Standard baseline for all production AWS environments.',
      'When you need private secure communication with on-premises networks via AWS Direct Connect or Site-to-Site VPN.',
      'When isolating multi-tenant workloads or staging/production environments.'
    ],
    whenNotToUse: [
      'Do not expose databases in public subnets with public IPs under any circumstance.',
      'Do not use single NAT Gateway for multi-AZ production workloads if high availability is critical.'
    ],
    advantages: [
      'Complete network layer isolation and granular firewall filtering.',
      'High bandwidth (up to 100 Gbps ENA) between instances.',
      'Seamless hybrid cloud connectivity via Transit Gateway.'
    ],
    disadvantages: [
      'NAT Gateways incur an hourly charge plus per-GB data processing fees.',
      'CIDR planning mistakes are painful to fix later if IP ranges overlap with on-prem networks.'
    ],
    cloudEquivalents: {
      aws: 'AWS VPC (Regional, Subnets are AZ-specific)',
      azure: 'Azure Virtual Network / VNet (Regional, Subnets span whole region)',
      gcp: 'GCP VPC (Global by default, Subnets are Regional)',
      notes: 'AWS Subnets are strictly tied to a single AZ; Azure & GCP subnets span multiple AZs.'
    },
    commonMistakes: [
      {
        mistake: 'Confusing Security Groups (Stateful) with Network ACLs (Stateless).',
        consequence: 'Blocking return traffic in Security Groups or forgetting ephemeral ports in NACLs.',
        fix: 'Security Groups are stateful (if inbound allowed, outbound response is automatically allowed). NACLs are stateless and evaluate rules by line number.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Production Multi-AZ VPC',
      scenario: 'Deploy a secure 3-tier VPC with public and private subnets across 2 Availability Zones.',
      terraformCode: `module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.20.0/24"]
  database_subnets= ["10.0.100.0/24", "10.0.200.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false # High Availability: 1 NAT per AZ
  enable_vpn_gateway = false

  tags = {
    Environment = "production"
  }
}`,
      expectedOutcome: 'Provisions isolated VPC with 2 public subnets (IGW), 2 private subnets (redundant NAT Gateways), and 2 isolated DB subnets.',
      steps: [
        '1. Allocate non-overlapping /16 CIDR block',
        '2. Define subnets in pairs across 2 AZs',
        '3. Enable NAT Gateway per AZ for resilient outbound connectivity'
      ]
    },
    scenarioChallenge: {
      title: 'Securing an RDS Database',
      problem: 'Your security auditor reports that the production PostgreSQL database is accessible from the internet. How do you remediate this architecture without breaking application connectivity?',
      constraints: ['Zero internet access for database', 'Application EC2 instances must still connect'],
      options: [
        {
          id: 'a',
          text: 'Move RDS to private/isolated subnets, set PubliclyAccessible=false, and configure RDS Security Group to only allow Port 5432 from App Security Group ID',
          isCorrect: true,
          explanation: 'Correct! Moving to private subnets with Security Group referencing the App Security Group enforces complete network isolation.'
        },
        {
          id: 'b',
          text: 'Keep RDS in public subnet and add a password to PostgreSQL',
          isCorrect: false,
          explanation: 'Extremely dangerous. Public databases are constantly attacked by automated brute-force bots.'
        },
        {
          id: 'c',
          text: 'Put an Application Load Balancer directly in front of the PostgreSQL database',
          isCorrect: false,
          explanation: 'ALBs operate at Layer 7 (HTTP/HTTPS) and do not route Layer 4 PostgreSQL traffic.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'Explain the difference between a Security Group and a Network ACL (NACL) in AWS.',
        whyAsked: 'Tests deep understanding of AWS network security layers.',
        answer: 'A Security Group operates at the virtual instance/ENI level, is stateful (return traffic is automatically allowed regardless of outbound rules), and supports rules based on other Security Group IDs. A Network ACL operates at the subnet boundary, is stateless (inbound and outbound rules must be explicitly configured, including ephemeral ports 1024-65535), and processes rules in numerical order with explicit allow and deny.',
        architecturalDefense: 'We use Security Groups for fine-grained micro-segmentation between app tiers, and NACLs as a coarse subnet-level firewall (e.g. blocking known malicious IP ranges).',
        keyPoints: ['Instance level vs Subnet level', 'Stateful vs Stateless', 'Security Group ID referencing vs CIDR matching']
      }
    ],
    keyTakeaways: [
      'A VPC is your private virtual datacenter in the cloud.',
      'Public Subnets route to an Internet Gateway; Private Subnets route outbound to a NAT Gateway.',
      'Always place databases in private, non-routable subnets.'
    ]
  },
  {
    id: 'aws-04-compute',
    slug: 'compute',
    level: 1,
    track: 'aws',
    category: 'Compute & Auto Scaling',
    title: 'AWS EC2, Instance Types & Auto Scaling Groups',
    subtitle: 'Right-sizing virtual machines, Spot vs On-Demand, and target tracking autoscaling',
    estimatedMinutes: 25,
    iconName: 'Cpu',
    whatIsIt: 'Amazon Elastic Compute Cloud (Amazon EC2) provides scalable virtual computing capacity in the AWS cloud. Auto Scaling Groups (ASG) automatically adjust the number of EC2 instances based on demand.',
    whyExists: 'Eliminates the need to invest in hardware up front, so you can develop and deploy applications faster and scale up or down automatically as traffic changes.',
    simpleExplanation: 'EC2 is renting a virtual computer in an AWS data center. You pick how many CPU cores and RAM gigabytes you need (Instance Types). An Auto Scaling Group is like an automatic autopilot that turns on more computers when traffic spikes, and shuts them down when traffic drops to save money.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'CloudWatch Metric', type: 'monitoring', details: 'Average CPU > 70%' },
        { id: '2', label: 'Auto Scaling Policy', type: 'scaling', details: 'Target Tracking' },
        { id: '3', label: 'ASG: Min 2, Max 10', type: 'asg', details: 'Spans AZ-a and AZ-b' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Trigger Alarm' },
        { from: '2', to: '3', label: 'Launch EC2 Instance' }
      ]
    },
    realWorldExample: 'An online ticketing platform experiences 1,000 requests/minute on normal days, but surges to 500,000 requests/minute during a concert ticket sale. Auto Scaling expands the fleet from 4 instances to 60 instances within minutes, then shrinks back down when the sale ends.',
    architectureExample: {
      title: 'Resilient Multi-AZ Auto Scaling with ALB',
      description: 'An Application Load Balancer balances traffic across an EC2 Auto Scaling Group distributed evenly across 3 Availability Zones with mixed On-Demand and Spot instances.',
      flow: [
        'ALB conducts health checks on EC2 target group',
        'Auto Scaling maintains minimum baseline of 3 On-Demand instances for stability',
        'Burst capacity scales up using Spot Instances for 70% cost discount',
        'Unhealthy instances are terminated and automatically replaced in healthy AZs'
      ]
    },
    whenToUse: [
      'Monolithic legacy applications that require full control over OS, kernel modules, or custom file systems.',
      'High-performance computing (HPC), machine learning GPU training, or memory-intensive databases (SAP HANA).',
      'Long-running persistent background workers.'
    ],
    whenNotToUse: [
      'Short-lived event-driven tasks (use AWS Lambda instead for zero idle costs).',
      'Standard microservices that can be containerized on AWS ECS / Fargate or EKS.'
    ],
    advantages: [
      'Hundreds of specialized instance types (General, Compute, Memory, Storage, Accelerated GPU).',
      'Graviton (ARM-based) processors providing up to 40% better price-performance.',
      'Flexible purchasing options (On-Demand, Reserved Instances, Savings Plans, Spot).'
    ],
    disadvantages: [
      'You are responsible for OS patching, security updates, and log shipping.',
      'Slower scaling response time (minutes to boot OS) compared to serverless/containers (milliseconds/seconds).'
    ],
    cloudEquivalents: {
      aws: 'Amazon EC2 & EC2 Auto Scaling',
      azure: 'Azure Virtual Machines & VM Scale Sets (VMSS)',
      gcp: 'Google Compute Engine (GCE) & Managed Instance Groups (MIGs)',
      notes: 'All 3 provide on-demand, spot, and committed-use discount pricing models.'
    },
    commonMistakes: [
      {
        mistake: 'Using On-Demand pricing for predictable 24/7 steady-state workloads.',
        consequence: 'Wasting up to 72% of infrastructure budget.',
        fix: 'Purchase AWS Compute Savings Plans or 1-3 year Reserved Instances for baseline capacity.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Configuring an Auto Scaling Launch Template',
      scenario: 'Define a Launch Template specifying Amazon Linux 2023, t4g.medium (Graviton ARM), and user data script to install web server.',
      terraformCode: `resource "aws_launch_template" "app_lt" {
  name_prefix   = "app-server-"
  image_id      = "ami-0123456789abcdef0" # Amazon Linux 2023 (ARM)
  instance_type = "t4g.medium"

  iam_instance_profile {
    name = "EC2AppRole"
  }

  user_data = base64encode(<<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y nginx
              systemctl enable --now nginx
              EOF
  )

  monitoring {
    enabled = true # Detailed CloudWatch 1-minute metrics
  }
}`,
      expectedOutcome: 'Launch template ready to be attached to an ASG across multiple AZs.',
      steps: [
        '1. Choose cost-efficient Graviton ARM instance type',
        '2. Attach IAM instance profile',
        '3. Provide automated bootstrapping via User Data'
      ]
    },
    scenarioChallenge: {
      title: 'Batch Image Processing Cost Optimization',
      problem: 'A media company processes 50,000 video files every night between 1 AM and 5 AM. The jobs are stateless, idempotent, and can tolerate occasional interruptions. How do you design this with minimal cost?',
      constraints: ['Lowest possible cost', 'Fault-tolerant batch processing'],
      options: [
        {
          id: 'a',
          text: 'Run 20 large On-Demand EC2 instances 24/7',
          isCorrect: false,
          explanation: 'Extremely wasteful. Instances sit idle 20 hours a day at full On-Demand price.'
        },
        {
          id: 'b',
          text: 'Use an Auto Scaling Group with 100% EC2 Spot Instances consuming tasks from an Amazon SQS queue, scaling to zero when queue is empty',
          isCorrect: true,
          explanation: 'Correct! Spot instances offer up to 90% savings for fault-tolerant workloads, and SQS ensures tasks are retried if a spot instance is reclaimed.'
        },
        {
          id: 'c',
          text: 'Buy a 3-year upfront Reserved Instance',
          isCorrect: false,
          explanation: 'Reserved instances require paying for 24/7 commitment, unsuitable for short overnight batches.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How do you choose between On-Demand, Savings Plans, and Spot Instances in a production architecture?',
        whyAsked: 'Assesses financial and architectural optimization skills (FinOps).',
        answer: 'We use a blended strategy: (1) Compute Savings Plans for predictable baseline capacity (e.g. 10 instances running 24/7) to save up to 66-72%. (2) On-Demand for unpredictable spikes where interruption is unacceptable. (3) Spot Instances for stateless batch processing, CI/CD runners, and scalable container worker nodes where tasks are idempotent and can tolerate the 2-minute termination warning.',
        architecturalDefense: 'This tiered strategy reduces total cloud compute spend by 50-70% while guaranteeing 100% reliability for core customer-facing transactions.',
        keyPoints: ['Baseline vs Spikes vs Batch', 'Savings Plans vs Reserved Instances', 'Spot interruption handling']
      }
    ],
    keyTakeaways: [
      'Instance types are categorized by workload (General: t4g/m6g, Compute: c6g, Memory: r6g).',
      'Auto Scaling Groups guarantee high availability by self-healing failed instances.',
      'Blend Savings Plans (baseline) with Spot Instances (batch/burst) for optimal FinOps.'
    ]
  },
  {
    id: 'aws-05-storage',
    slug: 'storage',
    level: 1,
    track: 'aws',
    category: 'Storage',
    title: 'AWS Storage: S3, EBS Volumes & EFS File Systems',
    subtitle: 'Choosing between Object (S3), Block (EBS), and Shared File (EFS) Storage',
    estimatedMinutes: 25,
    iconName: 'HardDrive',
    whatIsIt: 'AWS provides three primary storage models: S3 for unbounded object storage, EBS for low-latency block volumes attached to EC2 instances, and EFS for shared elastic NFS file systems accessible across hundreds of instances simultaneously.',
    whyExists: 'Different workloads require different storage semantics: databases require sub-millisecond block IOPS (EBS), static assets need massive scale durability (S3), and content management systems require shared POSIX file mounts (EFS).',
    simpleExplanation: 'S3 is an infinite digital warehouse accessible via web URLs (HTTP GET/PUT). EBS is a dedicated SSD drive plugged directly into one server. EFS is a shared network hard drive that dozens of servers can read and write to at the same time.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Amazon S3 (Objects)', type: 'storage', details: '11 9s Durability, HTTP API' },
        { id: '2', label: 'Amazon EBS (Block)', type: 'storage', details: 'Attached to EC2, low IOPS lag' },
        { id: '3', label: 'Amazon EFS (File NFS)', type: 'storage', details: 'Multi-AZ shared POSIX mount' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Snapshot backup' },
        { from: '3', to: '2', label: 'Mounted via NFS' }
      ]
    },
    realWorldExample: 'An enterprise WordPress cluster stores uploaded photos in S3 (cached via CloudFront), runs its database on an EC2 instance with an io2 Block Express EBS volume, and shares theme PHP files across 10 web instances via EFS.',
    architectureExample: {
      title: 'Tiered Storage Architecture',
      description: 'S3 Intelligent-Tiering automatically cycles cold objects to Glacier, while active EC2 instances read shared assets from multi-AZ EFS mounts.',
      flow: [
        'Users upload PDFs -> S3 bucket with SSE-KMS encryption',
        'S3 Lifecycle rule transitions files unaccessed for 90 days to Glacier Deep Archive',
        'EC2 instances mount EFS filesystem (10.0.10.5) with bursting throughput'
      ]
    },
    whenToUse: [
      'Use S3 for media, data lakes, static web hosting, and disaster recovery backups.',
      'Use EBS for database files (PostgreSQL/MySQL), root operating system disks, and high IOPS workloads.',
      'Use EFS when multiple EC2 instances or EKS pods must share a single POSIX-compliant filesystem.'
    ],
    whenNotToUse: [
      'Do not use EBS across multiple instances unless using Multi-Attach on specific Nitro cluster configurations.',
      'Do not run high-transaction relational databases directly on EFS due to NFS latency overhead.'
    ],
    advantages: [
      'S3 provides 99.999999999% (11 9s) durability.',
      'EFS automatically scales storage up and down with zero pre-provisioning.',
      'EBS gp3 allows configuring IOPS and Throughput independently of disk size.'
    ],
    disadvantages: [
      'EFS per-GB pricing is higher than EBS and S3.',
      'S3 API request fees (PUT/GET) can add up during high-frequency small-file operations.'
    ],
    cloudEquivalents: {
      aws: 'S3 (Object) | EBS (Block) | EFS (File)',
      azure: 'Blob Storage | Azure Managed Disks | Azure Files',
      gcp: 'Cloud Storage (GCS) | Persistent Disk (PD) | Filestore',
      notes: 'S3 = Azure Blob = GCP Cloud Storage; EBS = Azure Managed Disk = GCP Persistent Disk.'
    },
    commonMistakes: [
      {
        mistake: 'Using gp2 EBS volumes instead of modern gp3 volumes.',
        consequence: 'Paying 20% more for lower baseline performance.',
        fix: 'Migrate all EBS volumes to gp3 (baseline 3,000 IOPS and 125 MB/s included free).'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Provisioning S3 with Intelligent-Tiering & KMS',
      scenario: 'Create a secure S3 bucket with default KMS encryption and automatic lifecycle transitions.',
      terraformCode: `resource "aws_s3_bucket" "data_lake" {
  bucket = "company-analytics-lake-prod"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_kms" {
  bucket = aws_s3_bucket.data_lake.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}`,
      expectedOutcome: 'S3 bucket created with mandatory KMS encryption at rest.',
      steps: ['1. Define bucket', '2. Attach SSE-KMS encryption rule', '3. Apply public access block']
    },
    scenarioChallenge: {
      title: 'Shared Storage for Microservices',
      problem: 'You are migrating a legacy CMS that requires multiple Linux servers to read and write to the same `/var/www/uploads` folder simultaneously. What storage service should you select?',
      constraints: ['Shared POSIX access across multiple instances', 'Automated cross-AZ resilience'],
      options: [
        {
          id: 'a',
          text: 'Amazon EBS gp3 volume attached to all instances',
          isCorrect: false,
          explanation: 'Standard EBS volumes can only be attached to a single EC2 instance in a single AZ.'
        },
        {
          id: 'b',
          text: 'Amazon Elastic File System (EFS) mounted via NFS across all EC2 instances',
          isCorrect: true,
          explanation: 'Correct! EFS provides multi-AZ shared POSIX file access for multiple instances concurrently.'
        },
        {
          id: 'c',
          text: 'Instance Store ephemeral disk',
          isCorrect: false,
          explanation: 'Instance store is temporary and lost when the instance is stopped.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'Explain the architectural differences between S3, EBS, and EFS.',
        whyAsked: 'Tests ability to choose the right storage tier for specific workload constraints.',
        answer: 'S3 is an HTTP REST-based object store with 11 9s durability and infinite scalability, ideal for static files and backups. EBS is a low-latency block-level storage volume mounted directly to a single EC2 instance, ideal for OS root drives and databases. EFS is a managed NFS shared file system that can be mounted simultaneously by thousands of EC2 instances and EKS pods across multiple AZs.',
        architecturalDefense: 'Selecting the proper storage tier prevents performance bottlenecks (e.g. running DB on EFS) and reduces costs by up to 90% (e.g. offloading images from EBS to S3).',
        keyPoints: ['Object vs Block vs File', 'S3 HTTP API vs EBS block device vs EFS NFS', 'Single instance vs Multi-instance sharing']
      }
    ],
    keyTakeaways: [
      'S3 for unstructured objects, EBS for single-instance block storage, EFS for shared multi-instance files.',
      'Always use gp3 over gp2 for EBS volumes.',
      'Enforce S3 Block Public Access and KMS encryption at rest.'
    ]
  },
  {
    id: 'aws-06-databases',
    slug: 'databases',
    level: 1,
    track: 'aws',
    category: 'Databases & In-Memory',
    title: 'AWS Databases: RDS, Aurora, DynamoDB & ElastiCache',
    subtitle: 'Managed Relational vs NoSQL vs In-Memory Caching Architecture',
    estimatedMinutes: 30,
    iconName: 'Database',
    whatIsIt: 'AWS provides specialized database engines: RDS for managed relational engines (Postgres/MySQL), Aurora for cloud-native 5x throughput with 128TB auto-scaling storage, DynamoDB for single-digit millisecond NoSQL, and ElastiCache (Redis) for sub-millisecond in-memory caching.',
    whyExists: 'No single database fits every workload. Decoupling transactional relational data from key-value sessions and in-memory caches unlocks extreme scale and resilience.',
    simpleExplanation: 'RDS is a cloud-managed PostgreSQL/MySQL server. Aurora is RDS on steroids with a custom distributed storage engine. DynamoDB is an ultra-fast NoSQL database that never slows down regardless of scale. ElastiCache is super-fast RAM memory sitting in front of your database.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'ElastiCache Redis', type: 'cache', details: '<1ms Read Cache' },
        { id: '2', label: 'Amazon Aurora (Primary)', type: 'database', details: 'Writes in AZ-1' },
        { id: '3', label: 'Aurora Read Replica', type: 'database', details: 'Reads in AZ-2' },
        { id: '4', label: 'DynamoDB', type: 'database', details: 'Shopping Carts / Sessions' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Cache Miss -> Read DB' },
        { from: '2', to: '3', label: 'Shared Storage Sync (<10ms lag)' }
      ]
    },
    realWorldExample: 'Airbnb caches search results in ElastiCache Redis, stores user profile transactions in Aurora PostgreSQL Multi-AZ, and stores high-frequency clickstream and user sessions in DynamoDB.',
    architectureExample: {
      title: 'High-Throughput Aurora & Redis Topology',
      description: 'Application reads from Redis; cache misses query Aurora Read Endpoint distributed across 3 AZs; writes go strictly to Aurora Primary Writer.',
      flow: [
        'App checks Redis for user profile (hit rate: 92%)',
        'On cache miss, app queries Aurora Reader Endpoint (spread across 3 AZs)',
        'Order placement writes directly to Aurora Writer Endpoint',
        'Aurora automatically replicates 6 copies of data across 3 AZs at storage layer'
      ]
    },
    whenToUse: [
      'Use Aurora for enterprise transactional applications requiring ACID compliance and automated failover.',
      'Use DynamoDB for massive scale, serverless applications, key-value lookup, and shopping carts.',
      'Use ElastiCache (Redis) to offload 90% of read traffic from databases.'
    ],
    whenNotToUse: [
      'Do not use DynamoDB if your application requires complex SQL JOINs across 10 tables.',
      'Do not expose database ports (5432, 3306, 6379) to public subnets.'
    ],
    advantages: [
      'Aurora provides up to 5x throughput of standard MySQL and 3x PostgreSQL.',
      'DynamoDB offers automatic multi-region global replication with DynamoDB Global Tables.',
      'Multi-AZ RDS handles automated failover in under 60 seconds with 0 data loss.'
    ],
    disadvantages: [
      'Aurora pricing is higher than standard RDS for small low-traffic workloads.',
      'DynamoDB requires careful partition key design to prevent hot partitions.'
    ],
    cloudEquivalents: {
      aws: 'RDS / Aurora | DynamoDB | ElastiCache Redis',
      azure: 'Azure SQL / Cosmos DB | Azure Redis Cache',
      gcp: 'Cloud SQL / Spanner | Firestore | Memorystore',
      notes: 'Aurora = Azure SQL MI = GCP Cloud SQL/Spanner; DynamoDB = Cosmos DB = Firestore.'
    },
    commonMistakes: [
      {
        mistake: 'Directing all read queries to the Aurora Primary Writer instance.',
        consequence: 'Writer CPU reaches 100%, causing checkout transaction timeouts.',
        fix: 'Split database connection strings: send writes to Writer Endpoint and reads to Reader Endpoint.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Aurora PostgreSQL Multi-AZ Cluster',
      scenario: 'Deploy an Aurora PostgreSQL cluster with 1 writer and 2 auto-scaling read replicas in private subnets.',
      terraformCode: `resource "aws_rds_cluster" "aurora" {
  cluster_identifier      = "aurora-prod-cluster"
  engine                  = "aurora-postgresql"
  engine_version          = "15.4"
  database_name           = "production_db"
  master_username         = "dbadmin"
  manage_master_user_password = true # Auto-managed in AWS Secrets Manager

  db_subnet_group_name    = "db-private-subnets"
  storage_encrypted       = true
  deletion_protection     = true
}`,
      expectedOutcome: 'Aurora cluster deployed with encrypted multi-AZ distributed storage.',
      steps: ['1. Create RDS Cluster', '2. Enable KMS encryption', '3. Use Secrets Manager for password']
    },
    scenarioChallenge: {
      title: 'Preventing Database Flash Sale Crash',
      problem: 'During a 1-hour flash sale, your MySQL database receives 50,000 read queries/sec for product listings. The database is freezing. What is the fastest architectural remedy?',
      constraints: ['Zero application code rewrite', 'Immediate read offload'],
      options: [
        {
          id: 'a',
          text: 'Upgrade to a 128 vCPU primary instance and reboot the server during the sale',
          isCorrect: false,
          explanation: 'Rebooting causes downtime during the sale, and vertical scaling still hits connection limits.'
        },
        {
          id: 'b',
          text: 'Add an ElastiCache Redis caching cluster and add 3 Aurora Read Replicas to absorb read traffic',
          isCorrect: true,
          explanation: 'Correct! In-memory Redis caching offloads 90% of read queries, while read replicas distribute remaining search requests.'
        },
        {
          id: 'c',
          text: 'Migrate the entire application to DynamoDB 10 minutes before the sale',
          isCorrect: false,
          explanation: 'Rewriting relational schemas to NoSQL requires significant application rewrites.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does Amazon Aurora achieve faster failover and higher throughput than standard RDS Multi-AZ?',
        whyAsked: 'Assesses deep knowledge of cloud-native database storage architecture.',
        answer: 'Standard RDS uses synchronous physical block-level replication to a standby instance in another AZ (failover takes 60-120 seconds). Aurora separates compute from storage: its distributed storage tier replicates 6 copies of data across 3 AZs continuously at the SSD disk layer. Compute instances share this underlying virtual storage pool, allowing an Aurora Read Replica to be promoted to Primary Writer in under 15-30 seconds with zero storage sync lag.',
        architecturalDefense: 'Decoupling compute from storage eliminates write amplification and prevents primary database stall during heavy writes.',
        keyPoints: ['Compute/Storage separation', '6 storage copies across 3 AZs', 'Sub-30s failover']
      }
    ],
    keyTakeaways: [
      'Use Aurora for mission-critical relational data requiring sub-30s failover.',
      'Use DynamoDB for unbounded scale and sub-10ms key-value latency.',
      'Always cache read-heavy data in ElastiCache Redis.'
    ]
  },
  {
    id: 'aws-07-loadbalancing',
    slug: 'loadbalancing',
    level: 1,
    track: 'aws',
    category: 'Networking & Content Delivery',
    title: 'AWS Elastic Load Balancing: ALB vs NLB vs GWLB',
    subtitle: 'Layer 7 HTTP vs Layer 4 TCP/UDP vs Layer 3 Bump-in-the-Wire Firewalls',
    estimatedMinutes: 20,
    iconName: 'Globe',
    whatIsIt: 'Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets (EC2, containers, IP addresses, Lambda functions) across multiple Availability Zones.',
    whyExists: 'Provides single DNS entry point, TLS certificate termination, health check routing, and elastic traffic distribution.',
    simpleExplanation: 'ALB is a smart Layer 7 traffic cop that inspects HTTP URLs and headers (e.g. routing `/api` to microservice A and `/images` to microservice B). NLB is an ultra-fast Layer 4 firehose that forwards raw TCP/UDP packets with millions of requests per second at microsecond latency. GWLB routes all traffic through third-party security inspection appliances.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Application Load Balancer (ALB)', type: 'gateway', details: 'Layer 7 (HTTP/HTTPS, Path Routing)' },
        { id: '2', label: 'Network Load Balancer (NLB)', type: 'gateway', details: 'Layer 4 (TCP/UDP, Millions RPS, Static IP)' },
        { id: '3', label: 'Gateway Load Balancer (GWLB)', type: 'gateway', details: 'Layer 3 (Inline Security Appliance Inspection)' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Choose based on OSI Layer' }
      ]
    },
    realWorldExample: 'A video streaming platform uses ALB for its web and mobile REST APIs to route by path (`/browse`, `/auth`), while using NLB for live gaming WebSocket servers requiring ultra-low millisecond TCP latency and static Anycast IPs.',
    architectureExample: {
      title: 'Path-Based Microservices Routing on ALB',
      description: 'A single ALB listens on port 443 with an ACM SSL certificate and routes traffic to target groups based on URL paths.',
      flow: [
        'Request to api.company.com/orders -> Routes to EKS Orders Target Group',
        'Request to api.company.com/users -> Routes to EC2 Users Target Group',
        'Request to api.company.com/checkout -> Routes to Lambda Function Target'
      ]
    },
    whenToUse: [
      'Use ALB for HTTP/HTTPS web apps, microservices, container routing, and gRPC.',
      'Use NLB for extreme performance, gaming, financial trading, static Elastic IP needs, or non-HTTP protocols (TCP/UDP/TLS).',
      'Use GWLB to deploy inline third-party firewall appliances (Palo Alto, Fortinet, Check Point).'
    ],
    whenNotToUse: [
      'Do not use Classic Load Balancer (CLB) in modern architectures (deprecated).',
      'Do not use ALB for raw TCP socket protocols (use NLB).'
    ],
    advantages: [
      'ALB natively integrates with AWS WAF for DDoS and SQL injection defense.',
      'NLB can handle sudden traffic spikes of millions of RPS without pre-warming.',
      'Built-in health checks automatically route traffic away from failed instances.'
    ],
    disadvantages: [
      'ALB IP addresses change dynamically (requires CNAME/Alias records, not static A records).',
      'NLB does not inspect HTTP headers, cookies, or URL paths.'
    ],
    cloudEquivalents: {
      aws: 'ALB (Layer 7) | NLB (Layer 4)',
      azure: 'Application Gateway (Layer 7) | Azure Load Balancer (Layer 4)',
      gcp: 'Global External HTTP(S) LB (Layer 7) | Network Passthrough LB (Layer 4)',
      notes: 'ALB = Azure App Gateway = GCP External HTTP(S) LB.'
    },
    commonMistakes: [
      {
        mistake: 'Trying to assign a static Elastic IP address directly to an Application Load Balancer.',
        consequence: 'ALB does not support static IPs; IPs scale dynamically across AZs.',
        fix: 'Place an NLB or AWS Global Accelerator in front of the ALB if static client IP allowlisting is required.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'AWS CLI: Describing Load Balancers',
      scenario: 'Query active Application Load Balancers and check target group health.',
      cliCommand: 'aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/app-tg/abcdef',
      expectedOutcome: 'Returns target health: State=healthy for all EC2 instances across AZ-1 and AZ-2.',
      steps: ['1. List ALBs', '2. Inspect target group ARNs', '3. Verify healthy target count']
    },
    scenarioChallenge: {
      title: 'Real-Time Financial Gaming Protocol',
      problem: 'An ultra-low latency real-time multiplayer gaming server requires 500,000 simultaneous TCP socket connections, static whitelisted IP addresses for corporate partners, and sub-millisecond packet routing. Which load balancer do you choose?',
      constraints: ['Extreme Layer 4 TCP performance', 'Static public IP requirement'],
      options: [
        {
          id: 'a',
          text: 'Application Load Balancer (ALB)',
          isCorrect: false,
          explanation: 'ALB operates at Layer 7, introduces HTTP parsing latency, and does not support static IPs.'
        },
        {
          id: 'b',
          text: 'Network Load Balancer (NLB)',
          isCorrect: true,
          explanation: 'Correct! NLB operates at Layer 4, provides ultra-low latency, handles millions of RPS, and supports static Elastic IPs per AZ.'
        },
        {
          id: 'c',
          text: 'Route 53 round-robin DNS directly to EC2 instances',
          isCorrect: false,
          explanation: 'DNS round-robin does not provide instant health check failover and exposes individual VM IPs.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'When would you architect a system with Network Load Balancer (NLB) in front of an Application Load Balancer (ALB)?',
        whyAsked: 'Advanced cloud networking architecture pattern.',
        answer: 'You place an NLB in front of an ALB when: (1) Corporate clients require a static whitelisted IP address (NLB provides static Elastic IPs per AZ, whereas ALB IPs change dynamically); (2) You need PrivateLink to expose an ALB-backed service privately across VPCs; (3) You want AWS Global Accelerator with static Anycast IPs terminating at the edge and forwarding to the ALB.',
        architecturalDefense: 'This combines the static IP and extreme Layer 4 throughput of NLB with the rich URL path-based routing, header rewriting, and WAF protection of ALB.',
        keyPoints: ['Static Elastic IP requirement', 'AWS PrivateLink support', 'Layer 4 + Layer 7 hybrid design']
      }
    ],
    keyTakeaways: [
      'ALB for Layer 7 HTTP/HTTPS microservices and path routing.',
      'NLB for Layer 4 TCP/UDP extreme throughput and static IPs.',
      'Always deploy load balancers across multiple Availability Zones.'
    ]
  },
  {
    id: 'aws-10-kubernetes',
    slug: 'kubernetes',
    level: 1,
    track: 'aws',
    category: 'Containers & Kubernetes',
    title: 'AWS EKS: Managed Kubernetes, Pod Identity & Karpenter',
    subtitle: 'Production Kubernetes architecture with IRSA, VPC CNI & Next-Gen Autoscaling',
    estimatedMinutes: 30,
    iconName: 'Layers',
    whatIsIt: 'Amazon Elastic Kubernetes Service (Amazon EKS) is a managed Kubernetes service that runs the upstream Kubernetes control plane across multiple AWS Availability Zones with automated patching and high availability.',
    whyExists: 'Running unmanaged Kubernetes on raw EC2 requires managing etcd quorums, certificate rotations, and control plane HA. EKS automates this with enterprise AWS security and networking integration.',
    simpleExplanation: 'EKS is like having a team of Kubernetes site reliability engineers managing the control plane brain (etcd and API servers) for you. You simply deploy your containerized worker nodes and pods.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'EKS Managed Control Plane', type: 'k8s', details: 'Multi-AZ etcd & API Server (99.95% SLA)' },
        { id: '2', label: 'Managed Node Group (AZ-1)', type: 'compute', details: 'EC2 Worker Nodes' },
        { id: '3', label: 'Managed Node Group (AZ-2)', type: 'compute', details: 'EC2 Worker Nodes' },
        { id: '4', label: 'Karpenter Autoscaler', type: 'scaling', details: 'Sub-second JIT Node Provisioner' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Kubelet TLS' },
        { from: '1', to: '3', label: 'Kubelet TLS' },
        { from: '4', to: '2', label: 'Launches Right-Sized Node' }
      ]
    },
    realWorldExample: 'Snapchat runs over 300,000 cores across AWS EKS clusters, using Karpenter to provision right-sized Graviton EC2 instances on-the-fly to handle live video messaging traffic.',
    architectureExample: {
      title: 'Enterprise EKS Cluster Architecture',
      description: 'Private EKS cluster with AWS VPC CNI allocating secondary subnet IPs to pods, Karpenter autoscaling, and IRSA for least-privilege IAM.',
      flow: [
        'EKS API Server configured with Private Endpoint Access',
        'Pods receive native VPC IP addresses via AWS VPC CNI',
        'Pod assumes IAM role via EKS Pod Identity / OIDC federation',
        'Karpenter provisions Spot/On-Demand mixed nodes based on unschedulable pod resource requests'
      ]
    },
    whenToUse: [
      'Standardizing on vendor-neutral container orchestration across clouds.',
      'Complex microservice topologies with service meshes (Istio/Linkerd).',
      'High-density container workloads scaling up and down dynamically.'
    ],
    whenNotToUse: [
      'Simple web APIs that can run with zero operational overhead on AWS ECS or AWS Lambda.',
      'Teams with no dedicated platform engineering or Kubernetes operations expertise.'
    ],
    advantages: [
      '99.95% control plane uptime SLA.',
      'Deep AWS integration (VPC CNI, AWS Load Balancer Controller, EKS Pod Identity).',
      'Karpenter provides significantly faster and cheaper node autoscaling than Cluster Autoscaler.'
    ],
    disadvantages: [
      '$0.10/hour per cluster control plane fee.',
      'VPC CNI can cause IP exhaustion in small subnets if secondary CIDRs are not planned.'
    ],
    cloudEquivalents: {
      aws: 'Amazon EKS',
      azure: 'Azure Kubernetes Service (AKS)',
      gcp: 'Google Kubernetes Engine (GKE)',
      notes: 'GKE has Autopilot; EKS offers Karpenter and deep IAM IRSA integration.'
    },
    commonMistakes: [
      {
        mistake: 'Using standard Kubernetes Secrets for database passwords without encryption.',
        consequence: 'Secrets are stored in plaintext base64 in etcd.',
        fix: 'Enable EKS Envelope Encryption with AWS KMS and use AWS Secrets Manager with External Secrets Operator.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Provisioning an EKS Cluster',
      scenario: 'Deploy a production EKS cluster with managed node groups and KMS secret encryption.',
      terraformCode: `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.0.0"

  cluster_name    = "production-eks"
  cluster_version = "1.28"

  vpc_id     = "vpc-01234567"
  subnet_ids = ["subnet-1a", "subnet-1b", "subnet-1c"]

  eks_managed_node_groups = {
    general = {
      instance_types = ["t4g.medium"]
      min_size       = 2
      max_size       = 10
      desired_size   = 3
    }
  }
}`,
      expectedOutcome: 'EKS cluster created across 3 AZs with Graviton managed node group.',
      steps: ['1. Define cluster module', '2. Assign private subnets', '3. Configure managed node group']
    },
    scenarioChallenge: {
      title: 'Kubernetes Pod Security Isolation',
      problem: 'In your EKS cluster, the Payment pod needs access to S3 bucket `payments-vault`, while the Analytics pod needs access to `analytics-data`. How do you enforce this?',
      constraints: ['Zero shared credentials', 'Enforce least privilege at pod level'],
      options: [
        {
          id: 'a',
          text: 'Grant the EC2 Worker Node IAM Role full access to both buckets',
          isCorrect: false,
          explanation: 'Violates isolation: Any compromised pod on the worker node can access payments data.'
        },
        {
          id: 'b',
          text: 'Use EKS Pod Identity / IRSA to map distinct IAM Roles to each pod\'s Kubernetes ServiceAccount',
          isCorrect: true,
          explanation: 'Correct! IRSA ensures each pod only receives short-lived STS tokens for its specific IAM role.'
        },
        {
          id: 'c',
          text: 'Hardcode AWS access keys in pod environment variables',
          isCorrect: false,
          explanation: 'Security anti-pattern.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does AWS VPC CNI work in EKS, and how do you prevent VPC IP exhaustion?',
        whyAsked: 'Key Kubernetes network architecture question.',
        answer: 'AWS VPC CNI assigns native private IPv4 addresses from your VPC subnets directly to Kubernetes pods via Secondary Elastic Network Interfaces (ENIs). In small subnets, hundreds of pods can quickly exhaust all available IPs. To prevent exhaustion: (1) Attach a secondary non-routable CIDR block (e.g. 100.64.0.0/10 CGNAT range) to the VPC dedicated for pods; (2) Configure prefix delegation (`ENABLE_PREFIX_DELEGATION=true`) to allocate /28 IP prefixes per ENI; (3) Migrate to IPv6 EKS clusters.',
        architecturalDefense: 'Custom networking with secondary CIDRs isolates pod IP churn from core corporate subnet allocations while preserving native routing speed without NAT overlay overhead.',
        keyPoints: ['Secondary ENI allocation', 'Prefix delegation', 'Custom networking with 100.64.0.0/10 CIDR']
      }
    ],
    keyTakeaways: [
      'EKS manages the Kubernetes control plane with a 99.95% SLA.',
      'Use Karpenter for fast, cost-effective node provisioning.',
      'Always use EKS Pod Identity / IRSA for least-privilege cloud access.'
    ]
  },
  {
    id: 'aws-11-serverless',
    slug: 'serverless',
    level: 1,
    track: 'aws',
    category: 'Serverless & Application Integration',
    title: 'AWS Serverless: Lambda, API Gateway & EventBridge',
    subtitle: 'Building event-driven architectures with zero server management and automatic scaling',
    estimatedMinutes: 25,
    iconName: 'Zap',
    whatIsIt: 'AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application without provisioning or managing servers. Paired with API Gateway and EventBridge, it forms the backbone of modern serverless architectures.',
    whyExists: 'Eliminates 100% of server management, operating system patching, and idle capacity costs. You pay strictly for execution time measured in milliseconds.',
    simpleExplanation: 'Instead of keeping a computer running 24/7 waiting for work, Lambda is code that sleeps. When an event arrives (a web request, a file uploaded to S3, a message on a queue), AWS spins up a microVM in milliseconds, runs your function, and immediately shuts down.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Amazon API Gateway', type: 'gateway', details: 'REST / HTTP API Endpoint' },
        { id: '2', label: 'AWS Lambda (Node/Python/Go)', type: 'compute', details: 'Executes in ms, scales to 10k' },
        { id: '3', label: 'Amazon DynamoDB', type: 'database', details: 'Serverless NoSQL Storage' },
        { id: '4', label: 'Amazon EventBridge', type: 'gateway', details: 'Event-driven message bus' }
      ],
      flow: [
        { from: '1', to: '2', label: 'HTTPS Request' },
        { from: '2', to: '3', label: 'Read/Write Data' },
        { from: '2', to: '4', label: 'Publish Event' }
      ]
    },
    realWorldExample: 'iRobot uses AWS Lambda and API Gateway to process billions of IoT events daily from millions of connected Roomba vacuum cleaners, scaling automatically during holidays without provisioning a single EC2 server.',
    architectureExample: {
      title: 'Event-Driven Serverless Microservice',
      description: 'API Gateway triggers Lambda, which writes to DynamoDB and publishes an event to EventBridge, triggering asynchronous invoice generation and email notifications.',
      flow: [
        'Client sends POST /checkout -> API Gateway validates JWT token',
        'Lambda processes payment and writes order to DynamoDB',
        'DynamoDB Stream triggers EventBridge event bus',
        'EventBridge routes order event to Inventory Lambda and Email SNS Notification in parallel'
      ]
    },
    whenToUse: [
      'Event-driven asynchronous tasks (S3 file processing, DynamoDB streams, SQS workers).',
      'REST and GraphQL APIs with spiky or unpredictable traffic.',
      'Scheduled cron tasks (EventBridge Scheduler).'
    ],
    whenNotToUse: [
      'Long-running computational jobs exceeding Lambda\'s 15-minute maximum execution timeout (use ECS/Batch).',
      'Ultra-high steady-state traffic where 24/7 dedicated container instances are more cost-effective.'
    ],
    advantages: [
      'Zero cost when idle (scales to true zero).',
      'Automatic scaling from 1 request to 10,000+ concurrent executions in seconds.',
      'Built-in fault tolerance across multiple Availability Zones.'
    ],
    disadvantages: [
      'Cold start latency (100ms - 2s) on initial invocation of un-warmed runtimes.',
      '15-minute maximum execution timeout per invocation.'
    ],
    cloudEquivalents: {
      aws: 'AWS Lambda | Amazon API Gateway',
      azure: 'Azure Functions | Azure API Management',
      gcp: 'Cloud Functions / Cloud Run | Apigee',
      notes: 'GCP Cloud Run allows multi-concurrency (up to 1,000 requests per container), whereas Lambda allocates 1 instance per concurrent request.'
    },
    commonMistakes: [
      {
        mistake: 'Putting relational database connections inside Lambda handler without connection pooling.',
        consequence: '1,000 concurrent Lambdas open 1,000 DB connections, crashing RDS with connection exhaustion.',
        fix: 'Use Amazon RDS Proxy to pool and share database connections across serverless Lambda functions.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Writing a Serverless Python Lambda Function',
      scenario: 'Deploy an event-driven Python Lambda function integrated with DynamoDB.',
      terraformCode: `resource "aws_lambda_function" "api_handler" {
  filename      = "lambda.zip"
  function_name = "ProcessOrder"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "python3.11"
  architectures = ["arm64"] # Graviton for 20% cost savings

  environment {
    variables = {
      TABLE_NAME = "OrdersTable"
    }
  }
}`,
      expectedOutcome: 'Serverless Lambda function deployed with ARM64 architecture.',
      steps: ['1. Write Python handler', '2. Package into zip', '3. Attach execution role']
    },
    scenarioChallenge: {
      title: 'Eliminating Cold Start Latency for Checkout API',
      problem: 'Your Java-based serverless checkout API experiences a 3-second cold start when traffic spikes. Customer conversion is dropping. What is the recommended architectural solution?',
      constraints: ['Maintain serverless architecture', 'Reduce latency to under 200ms'],
      options: [
        {
          id: 'a',
          text: 'Set up an hourly ping script to keep the function awake',
          isCorrect: false,
          explanation: 'Pinging only keeps a single container warm and does not help when traffic spikes across hundreds of concurrent containers.'
        },
        {
          id: 'b',
          text: 'Enable AWS Lambda SnapStart (or Provisioned Concurrency) for the Java Lambda function',
          isCorrect: true,
          explanation: 'Correct! SnapStart caches pre-initialized microVM snapshots, reducing Java cold starts from 3 seconds to under 200ms with zero code changes.'
        },
        {
          id: 'c',
          text: 'Rewrite the entire application in Assembly',
          isCorrect: false,
          explanation: 'Impractical.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How do you handle relational database connection limits with AWS Lambda?',
        whyAsked: 'High-frequency cloud serverless architecture interview question.',
        answer: 'Because Lambda functions scale horizontally by launching independent microVMs, 1,000 concurrent requests will spawn 1,000 Lambda instances, overwhelming RDS PostgreSQL/MySQL connection limits. To solve this: (1) Deploy Amazon RDS Proxy in the VPC between Lambda and RDS to maintain a pooled pool of persistent connections; (2) Or use a serverless native database like Amazon Aurora Serverless v2 with Data API (HTTP REST connection) or Amazon DynamoDB.',
        architecturalDefense: 'RDS Proxy reduces database memory overhead by 70% and preserves existing SQL business logic while enabling serverless elasticity.',
        keyPoints: ['Connection pool exhaustion', 'Amazon RDS Proxy', 'Aurora Serverless v2 Data API']
      }
    ],
    keyTakeaways: [
      'Lambda scales automatically to zero when idle.',
      'Use RDS Proxy when connecting Lambda to relational databases.',
      'Use SnapStart or Provisioned Concurrency to eliminate cold starts.'
    ]
  }
];

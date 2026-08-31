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
  }
];

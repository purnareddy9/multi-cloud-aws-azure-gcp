import { LessonModule } from '../types';

export const gcpLessons: LessonModule[] = [
  {
    id: 'gcp-01-fundamentals',
    slug: 'fundamentals',
    level: 3,
    track: 'gcp',
    category: 'Architecture Foundations',
    title: 'GCP Resource Hierarchy: Organizations, Folders & Projects',
    subtitle: 'Understanding the Google Cloud Resource Manager tree and IAM inheritance',
    estimatedMinutes: 20,
    iconName: 'Boxes',
    whatIsIt: 'The Google Cloud Resource Hierarchy is a tree structure (Organization -> Folders -> Projects -> Resources) where all IAM policies and Organization Policies are inherited downwards.',
    whyExists: 'In GCP, every single resource (VM, Cloud Storage bucket, GKE cluster) must belong to exactly one Project. The hierarchy provides centralized governance, billing account attachment, and security enforcement across thousands of projects.',
    simpleExplanation: 'Think of GCP like a family tree: The Organization is the family head (tied to your company domain e.g. company.com); Folders are business departments (Engineering, Sales); Projects are individual applications; and Resources are the items inside those projects. Rules made by parents automatically pass down to the children!',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Organization: acme.com', type: 'org', details: 'Root Domain' },
        { id: '2', label: 'Folder: Production Workloads', type: 'folder', details: 'Policy Boundary' },
        { id: '3', label: 'Project: prj-ecommerce-prod', type: 'project', details: 'Project ID + Billing' },
        { id: '4', label: 'Resources: GKE, Cloud SQL, GCS', type: 'resource', details: 'Active Cloud Assets' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Org Policy: Restrict Public IPs' },
        { from: '2', to: '3', label: 'IAM Roles Inherited' },
        { from: '3', to: '4', label: 'Billed to attached Billing Account' }
      ]
    },
    realWorldExample: 'An international retail bank sets an Organization Policy at the root domain preventing anyone in any folder from creating public Cloud Storage buckets or creating VMs with external IP addresses.',
    architectureExample: {
      title: 'GCP Enterprise Multi-Project Hierarchy',
      description: 'Shared VPC Host Project in a Core Networking folder with separate Service Projects for Payments, Analytics, and Frontend applications.',
      flow: [
        'Root Org enforces uniform security policies and billing account linkage',
        'Core Networking Folder hosts Shared VPC with centralized Cloud NAT and Interconnect',
        'Application Folders contain isolated Projects with fine-grained developer IAM',
        'Resources in Service Projects attach directly to subnets in the Host Project'
      ]
    },
    whenToUse: [
      'Every GCP deployment requires at least one Project attached to a Billing Account.',
      'Use Folders to group projects by department (Engineering, Finance) or environment (Dev, Stage, Prod).',
      'Use Organization Policies to enforce guardrails across all child projects automatically.'
    ],
    whenNotToUse: [
      'Do not put multiple unrelated microservices in a single project if they need separate billing or IAM isolation.',
      'Do not grant IAM roles at the Organization level unless the user is an enterprise security auditor or admin.'
    ],
    advantages: [
      'Cleanest global resource model: every resource has a globally unique project ID.',
      'Shared VPC enables multi-project networking without complex peering mesh.',
      'Organization Policies can strictly prevent misconfigurations (e.g. disable default VPC creation).'
    ],
    disadvantages: [
      'Project IDs are globally unique across all Google Cloud customers and can never be changed once created.',
      'Quotas are scoped per-project, requiring quota increase requests for new large projects.'
    ],
    cloudEquivalents: {
      aws: 'AWS Organizations (Root -> Organizational Units -> Accounts)',
      azure: 'Azure (Management Groups -> Subscriptions -> Resource Groups)',
      gcp: 'GCP (Organization -> Folders -> Projects)',
      notes: 'GCP Projects are equivalent to AWS Accounts and Azure Subscriptions.'
    },
    commonMistakes: [
      {
        mistake: 'Confusing Project Name with Project ID and Project Number.',
        consequence: 'Code scripts or Terraform fail because Project Name is purely display metadata, whereas Project ID is the immutable global identifier.',
        fix: 'Always reference the immutable Project ID in CLI, APIs, and Terraform.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'gcloud CLI: Creating a Project and Linking Billing',
      scenario: 'Create a new project `prj-analytics-prod-987` and attach it to the corporate billing account.',
      cliCommand: 'gcloud projects create prj-analytics-prod-987 --name="Analytics Prod" --folder=1234567890 && gcloud beta billing projects link prj-analytics-prod-987 --billing-account=012345-6789AB-CDEF01',
      expectedOutcome: 'Project created inside designated folder and enabled for resource provisioning with billing attached.',
      steps: [
        '1. Ensure gcloud auth is configured with Organization Admin role',
        '2. Run gcloud projects create with unique project ID and parent folder',
        '3. Link enterprise billing account'
      ]
    },
    scenarioChallenge: {
      title: 'Enterprise Multi-Project Networking in GCP',
      problem: 'Your company has 20 development teams running microservices in GCP. Security requires that the central networking team controls all IP ranges, firewalls, and VPN connections, while developers can deploy VMs and GKE clusters without network admin rights. What is the recommended GCP architecture?',
      constraints: ['Centralized network control', 'Autonomous developer deployments'],
      options: [
        {
          id: 'a',
          text: 'Put all 20 development teams in a single GCP project with full Owner permissions',
          isCorrect: false,
          explanation: 'Violates least privilege; developers could modify firewalls and interfere with other teams.'
        },
        {
          id: 'b',
          text: 'Deploy a Shared VPC Architecture with a Host Project managed by the network team, and attach each development team\'s Project as a Service Project',
          isCorrect: true,
          explanation: 'Correct! Shared VPC allows the central network team to manage VPCs, subnets, and firewalls in the Host Project, while developers deploy resources into shared subnets in their respective Service Projects.'
        },
        {
          id: 'c',
          text: 'Create 20 separate VPCs and peer each VPC to every other VPC in a full mesh',
          isCorrect: false,
          explanation: 'Creates a complex 190-peering mesh that is unmaintainable and hits peering limits.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does IAM inheritance work in the Google Cloud Resource Hierarchy, and what happens when an IAM role is granted at the Folder level?',
        whyAsked: 'Assesses understanding of GCP security governance and inheritance semantics.',
        answer: 'IAM policy inheritance in GCP is purely additive and cascades downwards from Organization -> Folders -> Projects -> Resources. If a user is granted the roles/viewer role at a Folder, they automatically possess roles/viewer across every project and resource inside that folder and all sub-folders. You cannot explicitly revoke an inherited permission at a lower level (child project); you can only grant additional permissions.',
        architecturalDefense: 'Because child nodes cannot revoke parent permissions, we apply the absolute minimum baseline roles at the Org and Folder levels, and grant project-specific roles strictly at the Project level.',
        keyPoints: ['Additive inheritance', 'Cannot revoke inherited parent role', 'Org -> Folder -> Project -> Resource']
      }
    ],
    keyTakeaways: [
      'Every GCP resource belongs to a Project.',
      'The hierarchy flows Organization -> Folders -> Projects -> Resources.',
      'Shared VPC enables centralized networking across multiple independent projects.'
    ]
  },
  {
    id: 'gcp-02-networking',
    slug: 'networking',
    level: 3,
    track: 'gcp',
    category: 'Networking & Content Delivery',
    title: 'GCP Global VPC & Cloud Load Balancing',
    subtitle: 'Global Anycast IP addressing, Global VPC networks, and Cloud Armor DDoS protection',
    estimatedMinutes: 25,
    iconName: 'Network',
    whatIsIt: 'A GCP Virtual Private Cloud (VPC) network is global by default, meaning a single VPC spans across every Google Cloud region worldwide without requiring inter-region peering or transit gateways.',
    whyExists: 'Allows multi-region applications to communicate privately across Google\'s global private fiber backbone with sub-millisecond switching and a single global Anycast IP address for load balancing.',
    simpleExplanation: 'In AWS and Azure, networks are tied to one region. In GCP, your VPC is a global highway system. A VM in Iowa and a VM in Tokyo on the same VPC can talk directly to each other using internal private IPs (10.0.1.5 -> 10.0.2.8) across Google\'s private undersea cables with zero public internet exposure!',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Single Global Anycast IP: 34.120.x.x', type: 'anycast', details: 'Google Edge Network' },
        { id: '2', label: 'Region: us-central1 (Iowa)', type: 'region', details: 'Subnet: 10.1.0.0/24' },
        { id: '3', label: 'Region: europe-west1 (Belgium)', type: 'region', details: 'Subnet: 10.2.0.0/24' },
        { id: '4', label: 'Region: asia-east1 (Taiwan)', type: 'region', details: 'Subnet: 10.3.0.0/24' }
      ],
      flow: [
        { from: '1', to: '2', label: 'North America Users' },
        { from: '1', to: '3', label: 'European Users' },
        { from: '1', to: '4', label: 'Asian Users' }
      ]
    },
    realWorldExample: 'Spotify uses GCP Global External HTTP(S) Load Balancer with a single Anycast IPv4 address. Users worldwide hit the nearest Google Point of Presence and get routed over Google\'s private fiber backbone to the closest healthy backend compute cluster.',
    architectureExample: {
      title: 'Global Multi-Region Web Application Architecture',
      description: 'Single Anycast Global External Load Balancer with Cloud Armor WAF routing to GKE backends in US, Europe, and Asia with cross-region failover.',
      flow: [
        'User connects to single global frontend IP (34.102.x.x)',
        'Cloud Armor evaluates WAF rules and blocks SQL injection / DDoS',
        'Google Front End (GFE) terminates TLS at local edge and forwards to nearest backend',
        'If us-central1 backend cluster fails, traffic automatically fails over to europe-west1 with 0 DNS TTL propagation delay'
      ]
    },
    whenToUse: [
      'Global web applications requiring lowest latency and instant failover without DNS caching delays.',
      'Multi-region workloads that need to communicate privately over internal RFC1918 IPs.',
      'When building modern containerized workloads on GKE with Cloud Load Balancing.'
    ],
    whenNotToUse: [
      'Do not use Auto-mode VPC for enterprise production (it creates a /20 subnet in every single region, causing IP exhaustion).',
      'Always use Custom-mode VPC for production architectures.'
    ],
    advantages: [
      'Single Global Anycast IP routes traffic worldwide without GeoDNS latency or client caching problems.',
      'Google\'s private backbone carries traffic from nearest Edge PoP, bypassing congested public internet transit.',
      'VPC networks are global; no inter-region VPC peering setup needed.'
    ],
    disadvantages: [
      'Cloud Load Balancing health check IP ranges (35.191.0.0/16 and 130.211.0.0/22) must be explicitly allowed in firewalls.',
      'Cross-region egress costs apply when traffic moves across continents.'
    ],
    cloudEquivalents: {
      aws: 'AWS Global Accelerator + Application Load Balancer + Route 53',
      azure: 'Azure Front Door + Azure Application Gateway',
      gcp: 'Google Cloud Global External HTTP(S) Load Balancer',
      notes: 'GCP provides true Layer 7 global anycast natively at the load balancer layer.'
    },
    commonMistakes: [
      {
        mistake: 'Using Default / Auto-mode VPC in production.',
        consequence: 'Creates subnets in all regions using predictable 10.128.0.0/9 ranges that conflict with on-premises VPNs and other peered networks.',
        fix: 'Always create Custom-mode VPCs and explicitly define only the subnets and CIDR blocks you need.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: GCP Custom Global VPC with Regional Subnets',
      scenario: 'Provision a custom-mode global VPC with subnets in us-central1 and europe-west1.',
      terraformCode: `resource "google_compute_network" "custom_vpc" {
  name                    = "vpc-global-prod"
  auto_create_subnetworks = false # Mandatory for production
  routing_mode            = "GLOBAL"
}

resource "google_compute_subnetwork" "subnet_us" {
  name          = "snet-us-central1"
  ip_cidr_range = "10.50.1.0/24"
  region        = "us-central1"
  network       = google_compute_network.custom_vpc.id
}

resource "google_compute_subnetwork" "subnet_eu" {
  name          = "snet-europe-west1"
  ip_cidr_range = "10.50.2.0/24"
  region        = "europe-west1"
  network       = google_compute_network.custom_vpc.id
}`,
      expectedOutcome: 'Custom global VPC with zero default subnets, only provisioning explicit regional subnets.',
      steps: [
        '1. Set auto_create_subnetworks to false',
        '2. Define global routing mode',
        '3. Create non-overlapping regional subnets'
      ]
    },
    scenarioChallenge: {
      title: 'Zero-DNS-Delay Global Failover',
      problem: 'Your company runs a global financial trading dashboard. If the US region experiences an outage, traffic from US users must reroute to Europe within 2 seconds without waiting for ISP DNS caches to expire. How do you design this in GCP?',
      constraints: ['Instant failover under 2 seconds', 'No DNS TTL delay'],
      options: [
        {
          id: 'a',
          text: 'Use Cloud DNS with 60-second TTL record failover',
          isCorrect: false,
          explanation: 'DNS TTL takes 60-300 seconds to propagate across global ISPs, causing downtime.'
        },
        {
          id: 'b',
          text: 'Deploy Google Cloud Global External HTTP(S) Load Balancer with backends in both US and Europe regions',
          isCorrect: true,
          explanation: 'Correct! The Global Load Balancer uses a single Anycast IP. If health checks detect US backends are unhealthy, the Google Front End immediately diverts incoming connections to European backends in milliseconds with zero DNS involvement.'
        },
        {
          id: 'c',
          text: 'Use a Bash script to change IP addresses on the DNS server during an alert',
          isCorrect: false,
          explanation: 'Manual, brittle, and still subject to DNS caching.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How is a Google Cloud VPC fundamentally different from an AWS VPC or Azure VNet?',
        whyAsked: 'Key discriminator question for senior multi-cloud architects.',
        answer: 'In AWS and Azure, a VPC/VNet is strictly regional (confined to a single geographic region). In GCP, a VPC is a GLOBAL entity that spans all Google regions worldwide. While subnets are regional in GCP, resources in different regions on the same GCP VPC can communicate over Google\'s private global fiber network using private RFC1918 IP addresses without needing VPNs, VPC peering, or transit gateways.',
        architecturalDefense: 'This global networking model simplifies multi-region architectures, eliminates cross-region peering overhead, and pairs with Global Anycast Load Balancing for instant cross-region traffic shifting.',
        keyPoints: ['Global VPC scope vs Regional VPC scope', 'Private global backbone', 'Native Anycast IP load balancing']
      }
    ],
    keyTakeaways: [
      'GCP VPCs are global; subnets are regional.',
      'Google Cloud Global Load Balancing uses a single Anycast IP to route users to the closest healthy region.',
      'Always disable auto-mode subnet creation in production.'
    ]
  }
];

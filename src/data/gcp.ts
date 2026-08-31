import { LessonModule } from '../types';

export const gcpLessons: LessonModule[] = [
  {
    id: 'gcp-01-fundamentals',
    slug: 'fundamentals',
    level: 3,
    track: 'gcp',
    category: 'Architecture Foundations',
    title: 'GCP Resource Hierarchy: Organizations, Folders & Projects',
    subtitle: 'Mastering Resource Manager, Project IDs, and Global Backbone Infrastructure',
    estimatedMinutes: 20,
    iconName: 'Sparkles',
    whatIsIt: 'The Google Cloud Resource Hierarchy is a structured tree model (Organization -> Folders -> Projects -> Resources) where all resources belong to a specific Project, and Organization Policies and IAM permissions inherit downwards automatically.',
    whyExists: 'Enables central enterprise IT governance, automated policy guardrails, and flexible billing account linkage across thousands of projects.',
    simpleExplanation: 'GCP organizes everything around Projects. An Organization is your entire company; Folders are your departments (e.g. Finance, Engineering); and a Project is an isolated container where your VMs, GKE clusters, and Cloud Storage buckets actually live.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Organization: company.com', type: 'org', details: 'Root Node (GCP Org Admin)' },
        { id: '2', label: 'Folder: Production Workloads', type: 'folder', details: 'Inherits Org Policies' },
        { id: '3', label: 'Project: prj-analytics-prod', type: 'project', details: 'Project Number & ID' },
        { id: '4', label: 'Resources (BigQuery, GKE, GCS)', type: 'resource', details: 'Project Scoped' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Inherits Policies' },
        { from: '2', to: '3', label: 'Linked to Billing Account' },
        { from: '3', to: '4', label: 'Contains Resources' }
      ]
    },
    realWorldExample: 'Spotify manages hundreds of microservices by giving each engineering squad its own GCP Project, allowing squads to deploy independently while the central security team enforces zero public IPs using Folder-level Organization Policies.',
    architectureExample: {
      title: 'Enterprise GCP Landing Zone Hierarchy',
      description: 'Hierarchical structure with Shared VPC Host Project in a Common folder and Spoke Service Projects in Production and Non-Production folders.',
      flow: [
        'Root Org enforces Location Restriction (e.g. US/EU regions only)',
        'Host Project in Shared VPC manages global routing and firewalls',
        'Service Projects deploy GKE and Compute instances into Host VPC subnets',
        'Centralized Cloud Billing Account aggregates invoicing across all projects'
      ]
    },
    whenToUse: [
      'Use Projects as the fundamental boundary for all GCP resource creation, IAM, and billing.',
      'Use Folders to group projects by business department or environment (Dev/Test/Prod).',
      'Use Organization Policies to enforce guardrails (e.g. disable default service account key creation).'
    ],
    whenNotToUse: [
      'Do not put Dev and Prod workloads inside the same GCP Project.',
      'Do not rely on Project Names for automation (use immutable Project IDs or Project Numbers).'
    ],
    advantages: [
      'Google Cloud Private Fiber Backbone carries traffic privately without touching the public internet.',
      'Organization Policies provide instant policy enforcement across hundreds of projects.',
      'Subnets and VPCs can be shared seamlessly across multiple projects via Shared VPC.'
    ],
    disadvantages: [
      'Project IDs are globally unique across all Google Cloud customers worldwide and cannot be changed.',
      'Deleting a project places it in a 30-day soft-delete state before permanent deletion.'
    ],
    cloudEquivalents: {
      aws: 'AWS Organizations (Root -> OU -> Accounts)',
      azure: 'Azure (Management Groups -> Subscriptions -> Resource Groups)',
      gcp: 'GCP (Organization -> Folders -> Projects)',
      notes: 'GCP Project = AWS Account = Azure Subscription.'
    },
    commonMistakes: [
      {
        mistake: 'Using the default Google Compute Engine service account with Editor role in production.',
        consequence: 'Default service account has excessive write/delete permissions across the entire project.',
        fix: 'Create custom, least-privilege service accounts for each workload and disable automatic default account creation.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'gcloud CLI: Creating a GCP Project and Linking Billing',
      scenario: 'Create a new project `prj-ecommerce-prod` and link it to the corporate billing account.',
      cliCommand: 'gcloud projects create prj-ecommerce-prod-102 --name="E-Commerce Prod" --folder=1234567890 && gcloud beta billing projects link prj-ecommerce-prod-102 --billing-account=012345-6789AB-CDEF01',
      expectedOutcome: 'Project created under specified folder and activated for resource deployment.',
      steps: ['1. Run gcloud projects create', '2. Link billing account ID', '3. Enable required Google APIs (Compute, GKE, Cloud SQL)']
    },
    scenarioChallenge: {
      title: 'Multi-Project Network Architecture in GCP',
      problem: 'An enterprise wants 20 separate development teams to run GKE clusters in their own isolated projects, while the central network team controls all subnets, CIDR blocks, VPNs, and firewall rules in one place. How do you design this in GCP?',
      constraints: ['Central network control', 'Project isolation for dev teams'],
      options: [
        {
          id: 'a',
          text: 'Set up GCP Shared VPC: Define a Host Project for the network team, and attach the 20 dev projects as Service Projects',
          isCorrect: true,
          explanation: 'Correct! Shared VPC allows a central host project to own the VPC network and subnets while delegating subnet usage to service projects.'
        },
        {
          id: 'b',
          text: 'Create 20 separate VPCs and build a 20-way full VPC peering mesh',
          isCorrect: false,
          explanation: 'VPC peering meshes are difficult to manage and hit peering limits.'
        },
        {
          id: 'c',
          text: 'Put all 20 teams into a single project with Owner roles',
          isCorrect: false,
          explanation: 'Violates least privilege and isolation.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does GCP Shared VPC differ from standard VPC Peering?',
        whyAsked: 'Key GCP networking and governance architecture concept.',
        answer: 'Shared VPC allows an organization to connect resources from multiple GCP projects (Service Projects) to a common, centralized Virtual Private Cloud network (Host Project). All subnets, routes, and firewalls are managed centrally by network admins. VPC Peering connects two separate, distinct VPC networks together. Shared VPC maintains a single unified network boundary across projects with zero peering overhead.',
        architecturalDefense: 'Shared VPC enforces centralized network governance and eliminates CIDR fragmentation while giving application teams autonomy within their own projects.',
        keyPoints: ['Host Project vs Service Projects', 'Centralized network administration', 'Single VPC boundary across projects']
      }
    ],
    keyTakeaways: [
      'GCP hierarchy: Organization -> Folders -> Projects -> Resources.',
      'All GCP resources live inside a Project.',
      'Use Shared VPC to centralize networking across multi-project environments.'
    ]
  },
  {
    id: 'gcp-02-identity',
    slug: 'iam',
    level: 3,
    track: 'gcp',
    category: 'Security & Identity',
    title: 'Google Cloud IAM: Service Accounts & Workload Identity',
    subtitle: 'Role hierarchy (Primitive, Predefined, Custom), Service Account Keys & OIDC Federation',
    estimatedMinutes: 25,
    iconName: 'Key',
    whatIsIt: 'Google Cloud IAM (Identity and Access Management) lets administrators authorize who (identity) can take what action (role/permission) on which resource.',
    whyExists: 'Enables fine-grained access control across Google Cloud services and eliminates permanent service account key security risks via Workload Identity.',
    simpleExplanation: 'IAM in GCP works like a formula: "Member + Role = Access on Resource". A Service Account is a special account used by an application (not a human) to make authorized Google API calls.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'GKE Pod / Cloud Run', type: 'compute', details: 'Kubernetes ServiceAccount' },
        { id: '2', label: 'GCP Workload Identity', type: 'iam', details: 'Exchanges K8s token for GCP token' },
        { id: '3', label: 'GCS Bucket / BigQuery', type: 'storage', details: 'Roles: roles/storage.objectViewer' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Presents K8s OIDC JWT' },
        { from: '2', to: '1', label: 'Returns short-lived OAuth token' },
        { from: '1', to: '3', label: 'Queries data' }
      ]
    },
    realWorldExample: 'A BigQuery analytics pipeline running on GKE uses Workload Identity to query petabytes of customer telemetry without a single JSON service account private key file stored on disk.',
    architectureExample: {
      title: 'Zero-Trust Workload Identity Architecture',
      description: 'Container pod on GKE impersonates a Google Cloud Service Account with storage.admin role via metadata server token interception.',
      flow: [
        'Pod requests token from GKE metadata server (169.254.169.254)',
        'GKE validates namespace and K8s ServiceAccount name',
        'GCP IAM returns temporary Google OAuth2 token (expires in 1 hour)',
        'Pod accesses BigQuery and Cloud Storage with least-privilege credentials'
      ]
    },
    whenToUse: [
      'Mandatory for all Google Cloud authorization.',
      'Always use Workload Identity Federation for external workloads (AWS, GitHub Actions) and GKE pods.',
      'Use Predefined Roles (e.g. roles/storage.objectViewer) instead of Primitive Roles (Viewer/Editor/Owner).'
    ],
    whenNotToUse: [
      'NEVER download downloadable JSON Service Account Private Keys for production workloads.',
      'Do not assign primitive `Editor` or `Owner` roles at the project level.'
    ],
    advantages: [
      'Workload Identity completely eliminates JSON key file leak vulnerabilities.',
      'Policy inheritance down the Org -> Folder -> Project tree ensures rapid governance.',
      'Conditional IAM bindings support IP, date, and resource tag constraints.'
    ],
    disadvantages: [
      'Primitive roles (Owner/Editor/Viewer) are overly broad and should never be used in production.',
      'Custom roles require maintenance when Google updates underlying service permissions.'
    ],
    cloudEquivalents: {
      aws: 'AWS IAM (Roles & Policies) | EKS IRSA',
      azure: 'Microsoft Entra ID + Azure RBAC | Managed Identities',
      gcp: 'Google Cloud IAM (Service Accounts & Roles) | Workload Identity',
      notes: 'GCP Service Account = AWS IAM Role = Azure Managed Identity.'
    },
    commonMistakes: [
      {
        mistake: 'Downloading a JSON Service Account Key and checking it into GitHub.',
        consequence: 'Bots discover the key within seconds and use your billing account to mine cryptocurrency.',
        fix: 'Enforce the Organization Policy `constraints/iam.disableServiceAccountKeyCreation` and use Workload Identity.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'gcloud CLI: Creating a Service Account & Binding Predefined Role',
      scenario: 'Create a dedicated service account `sa-bigquery-reader` and grant it BigQuery Data Viewer role.',
      cliCommand: 'gcloud iam service-accounts create sa-bigquery-reader --display-name="BigQuery Read Only SA" && gcloud projects add-iam-policy-binding prj-analytics-prod --member="serviceAccount:sa-bigquery-reader@prj-analytics-prod.iam.gserviceaccount.com" --role="roles/bigquery.dataViewer"',
      expectedOutcome: 'Service account created and bound strictly to BigQuery read permissions.',
      steps: ['1. Create service account', '2. Add IAM policy binding with predefined role', '3. Attach to Compute or GKE']
    },
    scenarioChallenge: {
      title: 'Securing GitHub Actions CI/CD to Deploy to GCP',
      problem: 'Your team wants GitHub Actions to deploy container images to Google Artifact Registry. Security mandates that no static JSON service account keys may be stored in GitHub Secrets. How do you configure authentication?',
      constraints: ['Zero static secret keys', 'Automated secure token exchange'],
      options: [
        {
          id: 'a',
          text: 'Set up GCP Workload Identity Federation with GitHub as the OIDC Identity Provider',
          isCorrect: true,
          explanation: 'Correct! Workload Identity Federation exchanges GitHub Actions\' OIDC token for short-lived GCP access tokens with zero persistent keys.'
        },
        {
          id: 'b',
          text: 'Generate a JSON key, base64 encode it, and store in GitHub Actions Secrets',
          isCorrect: false,
          explanation: 'Violates the mandate against static keys.'
        },
        {
          id: 'c',
          text: 'Make the Artifact Registry repository completely public',
          isCorrect: false,
          explanation: 'Extremely dangerous security anti-pattern.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the difference between Primitive Roles, Predefined Roles, and Custom Roles in GCP IAM?',
        whyAsked: 'Fundamental cloud security design test.',
        answer: 'Primitive Roles (Owner, Editor, Viewer) are legacy, coarse-grained roles that apply broadly across ALL services in a project. Predefined Roles (e.g. roles/storage.objectAdmin, roles/compute.networkAdmin) are granular roles maintained by Google for specific services following least privilege. Custom Roles allow you to bundle exact individual API permissions when predefined roles are too broad or narrow.',
        architecturalDefense: 'In enterprise production, Primitive Roles are strictly prohibited because Editor grants write and delete access to every database and VM across the project.',
        keyPoints: ['Coarse vs Granular', 'Primitive (legacy) vs Predefined (Google managed) vs Custom (user curated)']
      }
    ],
    keyTakeaways: [
      'Always use Predefined Roles following the Principle of Least Privilege.',
      'Use Workload Identity to eliminate static JSON service account keys.',
      'IAM bindings inherit down the Org -> Folder -> Project tree.'
    ]
  },
  {
    id: 'gcp-03-networking',
    slug: 'networking',
    level: 3,
    track: 'gcp',
    category: 'Networking & Content Delivery',
    title: 'GCP Global VPC, Subnets & Cloud Load Balancing',
    subtitle: 'Global VPC architecture, Anycast single IP routing, Cloud Armor & Cloud Interconnect',
    estimatedMinutes: 30,
    iconName: 'Network',
    whatIsIt: 'Unlike AWS and Azure where a VPC is confined to a single geographic region, a Google Cloud VPC is inherently Global by default. Subnets inside a GCP VPC are regional and span across all Availability Zones in that region.',
    whyExists: 'Allows deploying multi-region architectures with private, sub-millisecond inter-region communication over Google\'s private global fiber network without needing complex VPNs or transit gateways.',
    simpleExplanation: 'Imagine a private company network that automatically spans the entire planet with a single IP address space. A VM in us-central1 (Iowa) can talk privately to a VM in europe-west1 (Belgium) using private RFC1918 IPs with zero public internet traversal.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Global Anycast IP (Single Frontend IP)', type: 'gateway', details: 'Terminates at closest Google PoP' },
        { id: '2', label: 'Subnet US (10.128.0.0/20)', type: 'subnet', details: 'us-central1 (Iowa)' },
        { id: '3', label: 'Subnet EU (10.132.0.0/20)', type: 'subnet', details: 'europe-west1 (Belgium)' },
        { id: '4', label: 'Subnet Asia (10.140.0.0/20)', type: 'subnet', details: 'asia-east1 (Taiwan)' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Routes to closest healthy region' },
        { from: '1', to: '3', label: 'Cross-Region Overflow' },
        { from: '2', to: '3', label: 'Private Global Backbone (<90ms)' }
      ]
    },
    realWorldExample: 'Google Search and YouTube route billions of users through a single Anycast IP. GCP Global Cloud Load Balancing gives enterprise customers the exact same global Anycast infrastructure: 1 IP address routes users to the nearest backend in US, Europe, or Asia with automatic DDoS mitigation via Cloud Armor.',
    architectureExample: {
      title: 'Global Multi-Region Web Application Architecture',
      description: 'Single Anycast Global External HTTP(S) Load Balancer distributing traffic to Managed Instance Groups in US and Europe with automatic regional overflow failover.',
      flow: [
        'User in Paris resolves global Anycast IP (34.120.x.x)',
        'Traffic enters Google Edge PoP in Paris over premium tier fiber',
        'Global LB routes request to europe-west1 backend MIG',
        'If europe-west1 reaches 100% capacity, traffic seamlessly overflows to us-central1'
      ]
    },
    whenToUse: [
      'Global multi-region web applications and APIs requiring single IP DNS routing.',
      'When high-bandwidth, low-latency private inter-region communication is required.',
      'Use Cloud Armor for Layer 7 WAF, rate limiting, and DDoS defense.'
    ],
    whenNotToUse: [
      'Do not use Auto Mode VPC in production (creates large /20 subnets in every region, wasting IP space; use Custom Mode VPC).',
      'Do not expose backend database ports directly to the internet.'
    ],
    advantages: [
      'Global VPC eliminates complex inter-region peering and transit gateways.',
      'Global Anycast Load Balancing provides single IP with sub-second regional failover.',
      'Google Premium Network Tier routes packets across Google\'s private fiber backbone.'
    ],
    disadvantages: [
      'Inter-region data egress charges apply when transferring data across continents.',
      'Firewall rules in GCP are global by default (requires network tags for scoping).'
    ],
    cloudEquivalents: {
      aws: 'AWS VPC (Regional) + Route 53 Latency Routing + Global Accelerator',
      azure: 'Azure VNet (Regional) + Azure Front Door (Global Anycast)',
      gcp: 'GCP VPC (Global) + Global Cloud Load Balancing (Single Anycast IP)',
      notes: 'GCP is the only cloud where the core VPC network is natively global.'
    },
    commonMistakes: [
      {
        mistake: 'Using "Auto Mode" VPC in an enterprise environment.',
        consequence: 'Auto VPC creates predefined subnets in all 35+ regions, creating CIDR conflicts with corporate on-premises networks.',
        fix: 'Always create "Custom Mode" VPCs with explicitly planned RFC1918 CIDR blocks.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Custom Mode Global VPC with US and EU Subnets',
      scenario: 'Provision a production Custom Mode VPC with private subnets in Iowa and Belgium.',
      terraformCode: `resource "google_compute_network" "custom_vpc" {
  name                    = "vpc-prod-global"
  auto_create_subnetworks = false # Custom mode
}

resource "google_compute_subnetwork" "subnet_us" {
  name          = "snet-us-central1"
  ip_cidr_range = "10.10.0.0/20"
  region        = "us-central1"
  network       = google_compute_network.custom_vpc.id
  private_ip_google_access = true
}

resource "google_compute_subnetwork" "subnet_eu" {
  name          = "snet-europe-west1"
  ip_cidr_range = "10.20.0.0/20"
  region        = "europe-west1"
  network       = google_compute_network.custom_vpc.id
  private_ip_google_access = true
}`,
      expectedOutcome: 'Global VPC created with private inter-region routing enabled out-of-the-box.',
      steps: ['1. Set auto_create_subnetworks = false', '2. Define regional subnets', '3. Enable Private Google Access']
    },
    scenarioChallenge: {
      title: 'Global Anycast Single IP Web Ingress',
      problem: 'Your company needs to serve a mobile application API to 10 million users across US, Europe, and Japan. You need a single public IP address in DNS, automatic routing to the nearest region, and instant failover if a region experiences an outage. How do you design this on GCP?',
      constraints: ['Single frontend public IP', 'Sub-second multi-region failover'],
      options: [
        {
          id: 'a',
          text: 'Deploy GCP Global External Application Load Balancer with backends in US, Europe, and Asia Managed Instance Groups',
          isCorrect: true,
          explanation: 'Correct! GCP Global Application Load Balancer uses a single Anycast IP address advertised from all Google Edge PoPs globally, routing to the closest healthy backend automatically.'
        },
        {
          id: 'b',
          text: 'Use 3 separate regional load balancers and configure DNS round-robin in GoDaddy',
          isCorrect: false,
          explanation: 'DNS round-robin causes slow TTL caching failover (minutes/hours) and does not route users to the closest region.'
        },
        {
          id: 'c',
          text: 'Deploy a single VM in Iowa and route all global traffic to it',
          isCorrect: false,
          explanation: 'Single point of failure and severe cross-continent latency.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does Google Cloud\'s Global Anycast Load Balancing differ from AWS and Azure traditional load balancing?',
        whyAsked: 'Assesses deep knowledge of GCP\'s unique global networking architecture.',
        answer: 'AWS and Azure traditional load balancers (ALB, Azure App Gateway) are regional, requiring multiple regional load balancer instances coupled with DNS latency routing (Route 53) or edge overlay services (Global Accelerator, Front Door). In GCP, the Global External HTTP(S) Load Balancer is natively global, presenting a single Anycast IP address announced worldwide via BGP across all Google edge Points of Presence. Traffic enters Google\'s high-speed private fiber backbone at the nearest edge PoP to the user and is routed to the closest healthy backend compute region.',
        architecturalDefense: 'This eliminates DNS TTL caching failover delays and provides true instant cross-region overflow routing with zero DNS reconfiguration.',
        keyPoints: ['Single Anycast IP vs Regional DNS endpoints', 'Traffic enters Google edge immediately (Premium Tier)', 'Automatic regional overflow']
      }
    ],
    keyTakeaways: [
      'GCP VPC is natively Global; Subnets are Regional.',
      'Global Load Balancing provides a single Anycast IP with sub-second failover.',
      'Always use Custom Mode VPCs in production.'
    ]
  },
  {
    id: 'gcp-04-compute',
    slug: 'compute',
    level: 3,
    track: 'gcp',
    category: 'Compute & Auto Scaling',
    title: 'Google Compute Engine (GCE) & Managed Instance Groups (MIGs)',
    subtitle: 'Custom machine types, Spot VMs, Live Migration, and Regional Auto Scaling',
    estimatedMinutes: 25,
    iconName: 'Cpu',
    whatIsIt: 'Google Compute Engine (GCE) delivers virtual machines running on Google\'s worldwide infrastructure. Managed Instance Groups (MIGs) allow you to operate identical apps on multiple VMs with automated healing, scaling, and rolling updates across zones.',
    whyExists: 'Enables running legacy enterprise workloads, high-performance computing, custom Linux/Windows stacks, and distributed batch computing with Google\'s industry-leading Live Migration technology.',
    simpleExplanation: 'Compute Engine lets you rent virtual computers in Google data centers. A unique superpower is Live Migration: when Google needs to perform hardware maintenance on a physical server, it moves your running VM to another server in real-time without restarting or dropping connections!',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Regional Managed Instance Group', type: 'mig', details: 'Auto-Scales across Zones a, b, c' },
        { id: '2', label: 'Auto-Healing Health Check', type: 'monitoring', details: 'Restarts unhealthy VMs in 60s' },
        { id: '3', label: 'Custom Machine Type', type: 'compute', details: 'Exact vCPU & RAM (e.g. 6 vCPU, 22 GB)' }
      ],
      flow: [
        { from: '2', to: '1', label: 'Recreates failed VM' },
        { from: '1', to: '3', label: 'Spawns Right-Sized VMs' }
      ]
    },
    realWorldExample: 'Twitter / X processes analytics using Compute Engine Spot VMs with custom vCPU/RAM ratios, saving millions of dollars compared to fixed-size VM pricing while handling massive traffic surges during global breaking news events.',
    architectureExample: {
      title: 'Regional MIG with Auto-Healing & Rolling Canary Updates',
      description: 'Regional Managed Instance Group distributed across 3 zones in us-central1 with auto-healing and progressive rolling updates.',
      flow: [
        'Instance template defines application container or startup script',
        'Regional MIG balances instances evenly across us-central1-a, b, and c',
        'Health check detects hung process -> auto-healing replaces instance in under 90s',
        'Rolling update deploys new version to 10% canary batch before updating entire fleet'
      ]
    },
    whenToUse: [
      'Enterprise workloads requiring specific non-standard vCPU and RAM combinations (Custom Machine Types).',
      'Compute-heavy workloads benefiting from Google\'s Live Migration with zero maintenance downtime.',
      'Cost-sensitive batch processing using Google Spot VMs (60-91% discount).'
    ],
    whenNotToUse: [
      'Stateless microservices that can be containerized on Google Cloud Run or GKE.',
      'Simple event-driven scripts (use Cloud Functions).'
    ],
    advantages: [
      'Live Migration: Google maintains physical host servers without rebooting your VMs.',
      'Custom Machine Types: Pay only for the exact vCPUs and RAM your application needs (no wasted headroom).',
      'Sub-minute boot times with Google\'s optimized Linux images.'
    ],
    disadvantages: [
      'You are responsible for operating system updates, firewall rules, and guest OS security.',
      'Slower scaling response time than serverless Cloud Run.'
    ],
    cloudEquivalents: {
      aws: 'Amazon EC2 & EC2 Auto Scaling Groups',
      azure: 'Azure Virtual Machines & VM Scale Sets (VMSS)',
      gcp: 'Google Compute Engine (GCE) & Managed Instance Groups (MIGs)',
      notes: 'GCP is the only cloud that offers arbitrary Custom Machine Types (e.g., 5 vCPUs, 19 GB RAM).'
    },
    commonMistakes: [
      {
        mistake: 'Using Zonal MIGs instead of Regional MIGs for production web services.',
        consequence: 'A single zone outage brings down the entire application fleet.',
        fix: 'Always use Regional MIGs (spread across 3 zones) with auto-healing for production.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'gcloud CLI: Creating an Instance Template and Regional MIG',
      scenario: 'Deploy a Regional Managed Instance Group with autoscaling based on CPU utilization.',
      cliCommand: 'gcloud compute instance-templates create tmpl-web-prod --machine-type=e2-medium --image-family=debian-11 --image-project=debian-cloud && gcloud compute instance-groups managed create mig-web-prod --template=tmpl-web-prod --size=3 --region=us-central1',
      expectedOutcome: 'Regional MIG created with 3 instances distributed across zones in us-central1.',
      steps: ['1. Create Instance Template', '2. Create Regional MIG', '3. Configure Autoscaling policy']
    },
    scenarioChallenge: {
      title: 'Optimizing Non-Standard Memory Requirements',
      problem: 'An in-memory cache application requires exactly 6 vCPUs and 48 GB of RAM. On AWS and Azure, you must purchase a 16 vCPU / 64 GB instance, wasting 10 vCPUs. How does GCP solve this?',
      constraints: ['Zero wasted vCPU compute cost', 'Exact memory provisioning'],
      options: [
        {
          id: 'a',
          text: 'Provision a GCP Custom Machine Type with exactly 6 vCPUs and 48 GB RAM',
          isCorrect: true,
          explanation: 'Correct! GCP Compute Engine allows you to create custom machine types with custom CPU and RAM ratios, saving up to 50% on wasted compute overhead.'
        },
        {
          id: 'b',
          text: 'Buy 6 individual small 1-vCPU VMs and glue them with glue code',
          isCorrect: false,
          explanation: 'Impractical.'
        },
        {
          id: 'c',
          text: 'Run the database on a smartphone',
          isCorrect: false,
          explanation: 'Invalid.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is Google Compute Engine Live Migration, and why is it significant for architecture SLAs?',
        whyAsked: 'Tests architectural knowledge of cloud infrastructure reliability.',
        answer: 'Live Migration is a GCP capability that automatically moves running virtual machines from one physical host server to another in the same datacenter during host hardware, network, or kernel maintenance events. The guest OS and applications continue running with zero downtime, zero reboot, and only milliseconds of CPU throttling.',
        architecturalDefense: 'On other clouds, host maintenance requires VM reboot or maintenance windows. Live Migration eliminates maintenance downtime and protects uptime SLAs for legacy stateful single-instance systems.',
        keyPoints: ['Zero reboot during hardware maintenance', 'Preserves running memory state', 'Protects 99.99% availability SLAs']
      }
    ],
    keyTakeaways: [
      'GCE Live Migration keeps VMs running during Google hardware maintenance.',
      'Use Custom Machine Types to tailor exact CPU/RAM ratios.',
      'Always use Regional MIGs across multiple zones for production high availability.'
    ]
  },
  {
    id: 'gcp-08-kubernetes',
    slug: 'kubernetes',
    level: 3,
    track: 'gcp',
    category: 'Containers & Kubernetes',
    title: 'Google Kubernetes Engine (GKE): Autopilot vs Standard & Workload Identity',
    subtitle: 'The gold standard managed Kubernetes platform with zero node ops and multi-cluster routing',
    estimatedMinutes: 30,
    iconName: 'Layers',
    whatIsIt: 'Google Kubernetes Engine (GKE) is Google\'s fully managed Kubernetes service. GKE was built by the original creators of Kubernetes and provides industry-leading features like GKE Autopilot (fully hands-off node and control plane management) and GKE Standard.',
    whyExists: 'Kubernetes was originally developed by Google based on 15+ years of internal Borg experience. GKE provides the most advanced, automated, and secure Kubernetes environment in the cloud.',
    simpleExplanation: 'GKE is Kubernetes running on the home turf of the engineers who invented Kubernetes. With GKE Autopilot, you don\'t manage servers at all—you just submit your pod YAML, and Google automatically provisions, secures, and right-sizes the infrastructure per pod.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'GKE Autopilot Control Plane', type: 'k8s', details: 'Google Managed & SLA 99.95%' },
        { id: '2', label: 'Pod: Payment Service', type: 'compute', details: 'Billed per Pod vCPU/RAM' },
        { id: '3', label: 'Pod: Inventory Service', type: 'compute', details: 'Auto-Scaled & Hardened' },
        { id: '4', label: 'GCP Workload Identity', type: 'iam', details: 'Passwordless Cloud IAM' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Provisions Right-Sized Node' },
        { from: '2', to: '4', label: 'Assumes GCP Service Account' }
      ]
    },
    realWorldExample: 'Niantic (Pokémon GO) launched on GKE, scaling dynamically to handle 50x their initial traffic estimates (over 1 billion players) on day one without crashing, powered by GKE\'s rapid horizontal pod and node scaling.',
    architectureExample: {
      title: 'Production GKE Autopilot with Multi-Cluster Ingress',
      description: 'Private GKE Autopilot cluster with Workload Identity, Cloud Armor security policies, and Global Anycast Multi-Cluster Ingress.',
      flow: [
        'Client hits Global Anycast IP -> Cloud Armor inspects for SQLi / OWASP attacks',
        'Multi-Cluster Ingress routes traffic to nearest healthy GKE cluster',
        'GKE Autopilot scales pods and nodes dynamically with zero OS management',
        'Pods query Cloud SQL via private RFC1918 VPC peering'
      ]
    },
    whenToUse: [
      'GKE Autopilot is the recommended default for 90% of Kubernetes workloads on GCP.',
      'Complex microservice architectures with service mesh (Anthos / Google Cloud Service Mesh).',
      'AI/ML workloads utilizing Google Cloud TPUs (Tensor Processing Units) and NVIDIA GPUs on GKE.'
    ],
    whenNotToUse: [
      'Simple single-container web applications that fit perfectly on Google Cloud Run (which has zero Kubernetes overhead).',
      'Workloads requiring low-level kernel module modifications on worker nodes.'
    ],
    advantages: [
      'GKE Autopilot charges per Pod resource requests (vCPU/RAM/Storage), not for unutilized VM capacity.',
      'Fastest node autoscaling and cluster upgrade automation in the industry.',
      'Best-in-class Workload Identity integration with Google Cloud IAM.'
    ],
    disadvantages: [
      '$0.10/hour cluster management fee (first zonal cluster per billing account is free).',
      'GKE Autopilot restricts certain cluster-admin privileges (e.g. running privileged containers).'
    ],
    cloudEquivalents: {
      aws: 'Amazon EKS & AWS Fargate',
      azure: 'Azure Kubernetes Service (AKS)',
      gcp: 'Google Kubernetes Engine (GKE Autopilot & Standard)',
      notes: 'GKE Autopilot is the most mature fully hands-off Kubernetes managed offering.'
    },
    commonMistakes: [
      {
        mistake: 'Using unmanaged GKE Standard with fixed-size node pools and forgetting to configure Cluster Autoscaler.',
        consequence: 'Pods remain in Pending state during traffic surges due to insufficient node capacity.',
        fix: 'Use GKE Autopilot or enable Cluster Autoscaler with Node Auto-Provisioning (NAP).'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'gcloud CLI: Creating a Production GKE Autopilot Cluster',
      scenario: 'Deploy a secure GKE Autopilot cluster in us-central1 with private nodes and Workload Identity enabled.',
      cliCommand: 'gcloud container clusters create-auto gke-prod-autopilot --region=us-central1 --network=vpc-prod-global --subnetwork=snet-us-central1 --enable-private-nodes',
      expectedOutcome: 'GKE Autopilot cluster deployed with automated security hardening and pod-based billing.',
      steps: ['1. Run clusters create-auto', '2. Attach custom VPC and private subnet', '3. Connect via kubectl']
    },
    scenarioChallenge: {
      title: 'Choosing Between GKE Autopilot and GKE Standard',
      problem: 'Your company is adopting Kubernetes on GCP. The team has 2 developers and 0 full-time DevOps engineers. They want Kubernetes compliance and pod security baselines enforced out-of-the-box with zero node maintenance. What is the recommended cluster mode?',
      constraints: ['Zero node ops overhead', 'Automatic security hardening'],
      options: [
        {
          id: 'a',
          text: 'GKE Autopilot',
          isCorrect: true,
          explanation: 'Correct! GKE Autopilot manages the entire infrastructure (control plane, worker nodes, OS patching, security hardening, and right-sizing), allowing small teams to focus 100% on container workloads.'
        },
        {
          id: 'b',
          text: 'GKE Standard with manually managed raw VMs',
          isCorrect: false,
          explanation: 'Requires significant manual node and OS maintenance.'
        },
        {
          id: 'c',
          text: 'Install vanilla Kubernetes on Compute Engine using kubeadm',
          isCorrect: false,
          explanation: 'Massive operational complexity.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the architectural difference between GKE Autopilot and GKE Standard?',
        whyAsked: 'Tests modern Kubernetes platform engineering expertise.',
        answer: 'In GKE Standard, you manage the worker node pools (choosing machine types, OS images, scaling triggers, and node upgrades) and pay for the underlying Compute Engine VM instances regardless of whether pods fill them. In GKE Autopilot, Google manages the entire infrastructure (nodes, OS patching, security hardening, auto-repair, and scaling). You pay strictly for the CPU, memory, and storage requested by your running pods with zero node management overhead.',
        architecturalDefense: 'Autopilot enforces Google\'s security best practices by default (disallowing privileged containers, enforcing Workload Identity) and eliminates idle node cost waste.',
        keyPoints: ['Node management responsibility', 'Per-VM vs Per-Pod billing', 'Automated security hardening']
      }
    ],
    keyTakeaways: [
      'GKE is the gold standard managed Kubernetes platform.',
      'GKE Autopilot removes 100% of node management and charges per pod.',
      'Always use Workload Identity for pod-to-GCP authentication.'
    ]
  },
  {
    id: 'gcp-09-serverless',
    slug: 'serverless',
    level: 3,
    track: 'gcp',
    category: 'Serverless & Application Integration',
    title: 'Google Cloud Run & Cloud Functions: Serverless Container Mastery',
    subtitle: 'Container-native serverless with multi-concurrency, scale-to-zero, and Eventarc integration',
    estimatedMinutes: 25,
    iconName: 'Zap',
    whatIsIt: 'Google Cloud Run is a fully managed serverless compute platform that enables you to run containerized applications directly on top of Google\'s scalable infrastructure with automatic scaling from zero to thousands of instances in seconds.',
    whyExists: 'Traditional serverless platforms (like AWS Lambda) force code into proprietary function runtimes. Cloud Run accepts ANY standard OCI container image (Docker) written in any language or framework, with built-in multi-concurrency.',
    simpleExplanation: 'Cloud Run is the ultimate serverless platform: if you can put your code inside a Docker container, Cloud Run will run it, give it a free HTTPS web address, automatically scale it up when traffic arrives, and scale it down to zero when nobody is using it (so you pay $0!).',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'HTTPS Request / Eventarc', type: 'gateway', details: 'Auto-SSL & Custom Domains' },
        { id: '2', label: 'Cloud Run Container (Docker)', type: 'compute', details: 'Handles up to 1,000 reqs/instance' },
        { id: '3', label: 'Cloud SQL / Firestore', type: 'database', details: 'Serverless Data Tier' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Invokes on port 8080' },
        { from: '2', to: '3', label: 'Direct VPC Egress' }
      ]
    },
    realWorldExample: 'The New York Times deploys hundreds of internal newsroom tools and public reader APIs on Google Cloud Run, allowing journalists and developers to deploy container microservices in seconds with zero cluster management.',
    architectureExample: {
      title: 'Serverless Event-Driven Microservice Pipeline',
      description: 'Image upload to Cloud Storage triggers Eventarc, which invokes a Cloud Run container to generate thumbnails and save metadata in Firestore.',
      flow: [
        'User uploads image to GCS bucket `user-uploads`',
        'GCS publishes `google.cloud.storage.object.v1.finalized` event',
        'Eventarc routes event via HTTPS POST to Cloud Run image processor',
        'Cloud Run scales from 0 instances, processes image, and writes to Firestore'
      ]
    },
    whenToUse: [
      'REST APIs, web applications, background workers, and microservices packaged in Docker containers.',
      'Workloads that benefit from multi-concurrency (handling multiple simultaneous requests per container instance).',
      'Event-driven processing with Google Eventarc.'
    ],
    whenNotToUse: [
      'Long-running streaming connections exceeding Cloud Run\'s 60-minute maximum request timeout.',
      'Complex multi-container pods requiring local localhost shared volume mounts (use GKE).'
    ],
    advantages: [
      'Multi-Concurrency: A single Cloud Run container instance can handle up to 1,000 concurrent requests (unlike AWS Lambda which is 1 request per container).',
      'Runs any language, library, or binary packaged in a standard Docker container.',
      'Scales to true zero with zero idle cost.'
    ],
    disadvantages: [
      'Cold starts on initial container invocation (mitigated by setting minimum instances: `min-instances=1`).',
      'Maximum 60-minute request processing timeout.'
    ],
    cloudEquivalents: {
      aws: 'AWS App Runner / AWS Lambda',
      azure: 'Azure Container Apps / Azure Functions',
      gcp: 'Google Cloud Run / Cloud Functions (2nd Gen)',
      notes: 'Cloud Run is widely considered the pioneer of containerized serverless computing.'
    },
    commonMistakes: [
      {
        mistake: 'Leaving Cloud Run concurrency at 1 (treating it like AWS Lambda).',
        consequence: 'Spawns hundreds of unnecessary container instances, increasing costs and hitting quota limits.',
        fix: 'Configure concurrency (e.g. `concurrency=80`) so a single container instance handles multiple simultaneous requests.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'gcloud CLI: Deploying a Container to Cloud Run with Scale-to-Zero',
      scenario: 'Deploy a public Node.js container to Cloud Run with automatic HTTPS and memory limits.',
      cliCommand: 'gcloud run deploy svc-order-api --image=gcr.io/prj-ecommerce-prod/order-api:v1 --platform=managed --region=us-central1 --allow-unauthenticated --concurrency=80 --min-instances=0 --max-instances=50',
      expectedOutcome: 'Service deployed with live HTTPS URL and multi-concurrency enabled.',
      steps: ['1. Build container image', '2. Execute gcloud run deploy', '3. Configure concurrency and autoscaling limits']
    },
    scenarioChallenge: {
      title: 'High-Concurrency Serverless API Cost Optimization',
      problem: 'Your REST API receives 1,000 requests per second. On AWS Lambda, this requires 1,000 concurrent Lambda function executions. How does Cloud Run achieve dramatic cost savings for this workload?',
      constraints: ['Reduce serverless container cost', 'Handle 1,000 RPS'],
      options: [
        {
          id: 'a',
          text: 'Cloud Run supports multi-concurrency (e.g. 100 requests per container), so only 10 container instances are needed to handle 1,000 RPS, reducing compute cost by up to 90%',
          isCorrect: true,
          explanation: 'Correct! Because Node.js, Go, and Java web servers are non-blocking, a single Cloud Run container can multiplex 80-100 concurrent requests, drastically reducing the total number of running instances.'
        },
        {
          id: 'b',
          text: 'Cloud Run is free for everyone forever',
          isCorrect: false,
          explanation: 'Incorrect.'
        },
        {
          id: 'c',
          text: 'Turn off the API during peak hours',
          isCorrect: false,
          explanation: 'Invalid.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'Why is Google Cloud Run\'s multi-concurrency model an architectural advantage over AWS Lambda standard concurrency?',
        whyAsked: 'Tests deep comparative knowledge of serverless execution models.',
        answer: 'AWS Lambda allocates 1 dedicated microVM per active concurrent request. If 500 requests arrive at once, Lambda launches 500 microVMs, multiplying memory allocations and potentially overwhelming backend databases. Google Cloud Run allows a single container instance to process up to 1,000 concurrent requests simultaneously (typically 80-100 in production).',
        architecturalDefense: 'Multi-concurrency reduces container cold starts, shrinks the total number of required container instances by 80-90%, and prevents database connection pool exhaustion.',
        keyPoints: ['1 request per container (Lambda) vs up to 1000 requests per container (Cloud Run)', 'Database connection efficiency', 'Cost reduction']
      }
    ],
    keyTakeaways: [
      'Cloud Run runs any Docker container as a serverless service.',
      'Take full advantage of multi-concurrency (80-100 reqs/instance).',
      'Scales seamlessly to zero when idle.'
    ]
  }
];

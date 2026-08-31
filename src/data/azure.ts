import { LessonModule } from '../types';

export const azureLessons: LessonModule[] = [
  {
    id: 'azure-01-fundamentals',
    slug: 'fundamentals',
    level: 2,
    track: 'azure',
    category: 'Architecture Foundations',
    title: 'Azure Hierarchy: Subscriptions, Resource Groups & Regions',
    subtitle: 'Mastering Management Groups, Subscriptions, Resource Groups & Geographies',
    estimatedMinutes: 20,
    iconName: 'LayoutGrid',
    whatIsIt: 'The Azure Resource Hierarchy is a 4-level organizational structure (Management Groups -> Subscriptions -> Resource Groups -> Resources) that governs billing, policy enforcement (Azure Policy), and access control (Azure RBAC) across an enterprise.',
    whyExists: 'Large enterprises have hundreds of departments and applications; without a clear hierarchy, tracking cloud costs, enforcing security baselines, and delegating permissions becomes chaotic.',
    simpleExplanation: 'Think of Azure like a giant corporate skyscraper: Management Groups are the corporate divisions; Subscriptions are the departmental credit cards and billing boundaries; Resource Groups are individual project storage rooms; and Resources (VMs, SQL databases) are the equipment inside those rooms.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Root Management Group', type: 'mgmt', details: 'Enterprise Tenant' },
        { id: '2', label: 'Production Subscription', type: 'sub', details: 'Billing & Quota Boundary' },
        { id: '3', label: 'RG: rg-ecommerce-prod-eastus', type: 'rg', details: 'Lifecycle Container' },
        { id: '4', label: 'Resources (AKS, Azure SQL, VNet)', type: 'resource', details: 'Live Deployments' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Inherits Azure Policies' },
        { from: '2', to: '3', label: 'Inherits RBAC' },
        { from: '3', to: '4', label: 'Shares Lifecycle' }
      ]
    },
    realWorldExample: 'A global healthcare conglomerate uses Management Groups to enforce HIPAA compliance policies across all US Subscriptions. Each hospital division gets its own Subscription for billing chargebacks, and each application has a dedicated Resource Group.',
    architectureExample: {
      title: 'Azure Enterprise Landing Zone Architecture',
      description: 'Hub-and-spoke topology organized into Management Groups (Platform vs Application Workloads) with centralized firewall and shared services.',
      flow: [
        'Root Tenant enforces MFA and Conditional Access via Entra ID',
        'Platform Subscription hosts Hub VNet with Azure Firewall and ExpressRoute',
        'Spoke Subscriptions host isolated production workloads with peered VNets',
        'Azure Policy automatically audits and enforces tag compliance and encryption'
      ]
    },
    whenToUse: [
      'Use Resource Groups to group resources that share the same lifecycle (create together, update together, delete together).',
      'Use Subscriptions as billing boundaries and quota limits for different business units or environments (Dev/Test/Prod).',
      'Use Management Groups to manage compliance across multiple subscriptions at scale.'
    ],
    whenNotToUse: [
      'Do not mix Production and Dev/Test resources inside the same Resource Group.',
      'Do not treat Resource Groups as network boundaries (they are logical management containers, not firewalls).'
    ],
    advantages: [
      'Cleanest multi-subscription governance model among the major clouds.',
      'Resource Groups allow 1-click deletion of entire project environments during cleanup.',
      'Azure Policy enforces compliance at scale without writing complex custom code.'
    ],
    disadvantages: [
      'Moving resources between subscriptions or resource groups can have dependency limitations.',
      'Subscription-level quotas (e.g. core limits) can require support ticket increases.'
    ],
    cloudEquivalents: {
      aws: 'AWS Organizations (OU -> Accounts -> Resource Groups)',
      azure: 'Azure (Management Groups -> Subscriptions -> Resource Groups)',
      gcp: 'GCP Resource Hierarchy (Organization -> Folders -> Projects)',
      notes: 'Azure Subscriptions = AWS Accounts = GCP Projects.'
    },
    commonMistakes: [
      {
        mistake: 'Deploying resources in different regions than their parent Resource Group location.',
        consequence: 'Resource Group location only stores metadata; outages in the metadata region can block management operations even if resources are in a healthy region.',
        fix: 'Keep Resource Group metadata in the same region as the primary resources inside it.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Azure CLI: Creating an Enterprise Resource Group & Applying Tags',
      scenario: 'Create a resource group in East US with mandatory cost-center and environment tags.',
      cliCommand: 'az group create --name rg-payments-prod-eastus --location eastus --tags Environment=Production CostCenter=Finance-102 Owner=CloudTeam',
      expectedOutcome: 'Resource group created with provisioningState: Succeeded and metadata tags indexed.',
      steps: [
        '1. Login using az login with appropriate subscription context',
        '2. Execute az group create specifying name, region, and tags',
        '3. Verify via az group show'
      ]
    },
    scenarioChallenge: {
      title: 'Multi-Environment Isolation in Azure',
      problem: 'An enterprise wants to ensure that developers cannot accidentally modify production resources, and that development costs are billed to a separate budget code. What is the recommended Azure hierarchy design?',
      constraints: ['Strict IAM isolation', 'Separate billing invoices'],
      options: [
        {
          id: 'a',
          text: 'Put Dev and Prod in the same Subscription and use different Resource Group names',
          isCorrect: false,
          explanation: 'Putting Dev and Prod in the same subscription mixes billing and increases risk of accidental privilege escalation.'
        },
        {
          id: 'b',
          text: 'Create separate Subscriptions for Dev and Prod under separate Management Groups, applying strict RBAC and billing invoice separation',
          isCorrect: true,
          explanation: 'Correct! Subscriptions provide hard billing, security, and quota isolation, which is the Azure best practice.'
        },
        {
          id: 'c',
          text: 'Create a single virtual machine with separate folders for Dev and Prod',
          isCorrect: false,
          explanation: 'Completely unscalable and violates enterprise security isolation.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the relationship between an Azure Subscription and a Microsoft Entra ID Tenant?',
        whyAsked: 'Tests fundamental Azure identity and architecture boundaries.',
        answer: 'A Microsoft Entra ID (formerly Azure AD) tenant is the identity directory representing an organization. An Azure Subscription is a billing and resource container. An Entra ID tenant can have multiple Azure Subscriptions associated with it for billing and access control, but each Azure Subscription trusts exactly ONE Entra ID tenant for authentication.',
        architecturalDefense: 'This 1-to-many relationship enables a single corporate identity directory to govern multiple Dev, Staging, and Prod subscriptions with single sign-on (SSO) and centralized MFA.',
        keyPoints: ['Tenant = Identity', 'Subscription = Billing & Resources', '1-to-many trust relationship']
      }
    ],
    keyTakeaways: [
      'Azure hierarchy: Management Group -> Subscription -> Resource Group -> Resource.',
      'Subscriptions act as billing and quota boundaries.',
      'Resource Groups group items sharing a common operational lifecycle.'
    ]
  },
  {
    id: 'azure-02-identity',
    slug: 'identity',
    level: 2,
    track: 'azure',
    category: 'Security & Identity',
    title: 'Microsoft Entra ID, Azure RBAC & Managed Identities',
    subtitle: 'Cloud identity governance, Service Principals, and passwordless authentication',
    estimatedMinutes: 25,
    iconName: 'Key',
    whatIsIt: 'Microsoft Entra ID (formerly Azure Active Directory) is Microsoft\'s cloud-based identity and access management service. Azure RBAC (Role-Based Access Control) manages authorization to Azure resources.',
    whyExists: 'Provides secure, centralized single sign-on (SSO), conditional access policies (e.g. requiring MFA or compliant corporate devices), and passwordless machine authentication.',
    simpleExplanation: 'Entra ID is the digital passport office that proves who you are (Authentication). Azure RBAC is the visa stamp that decides what you are allowed to do (Authorization). Managed Identity gives your VM or container its own automatic passport without needing passwords.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Azure VM / App Service', type: 'compute', details: 'System-Assigned Managed Identity' },
        { id: '2', label: 'Microsoft Entra ID', type: 'iam', details: 'Issues OAuth2 Bearer Token' },
        { id: '3', label: 'Azure Key Vault / Azure SQL', type: 'security', details: 'RBAC: Key Vault Secrets User' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Request token from IMDS endpoint' },
        { from: '2', to: '1', label: 'Return short-lived OAuth token' },
        { from: '1', to: '3', label: 'Access Secret with Bearer token' }
      ]
    },
    realWorldExample: 'An ASP.NET Core API hosted in Azure App Service connects to an Azure SQL Database. Using Managed Identity, the API connects using Microsoft Entra database authentication with zero connection strings or passwords stored in app settings.',
    architectureExample: {
      title: 'Zero-Trust Managed Identity Secrets Retrieval',
      description: 'Microservice running in Azure Kubernetes Service (AKS) uses Workload Identity to fetch secrets from Azure Key Vault without storing credentials in Kubernetes secrets.',
      flow: [
        'AKS Pod requests token via projected service account token',
        'Entra ID validates pod identity federation',
        'Pod acquires Azure Key Vault Secrets User role token',
        'Pod pulls database credentials dynamically and decrypts in-memory'
      ]
    },
    whenToUse: [
      'Mandatory for all Azure resource authorization and corporate user access.',
      'Always use Managed Identities (System-Assigned or User-Assigned) for Azure-to-Azure authentication.',
      'Use Conditional Access to enforce MFA and geo-blocking on corporate logins.'
    ],
    whenNotToUse: [
      'Never store client secrets / passwords in source code or environment variables.',
      'Do not grant Owner or Contributor at the Subscription level when Resource Group level suffices.'
    ],
    advantages: [
      'Seamless integration with Microsoft 365, Windows, and enterprise Active Directory.',
      'Managed Identities completely eliminate credential management and rotation headaches.',
      'Granular built-in and custom RBAC roles.'
    ],
    disadvantages: [
      'Role assignments at root scopes take a few minutes to propagate globally.',
      'Licensing tiers (Entra ID Free vs P1 vs P2) affect advanced security features like Privileged Identity Management (PIM).'
    ],
    cloudEquivalents: {
      aws: 'AWS IAM Roles & AWS IAM Identity Center (SSO)',
      azure: 'Microsoft Entra ID + Azure RBAC + Managed Identities',
      gcp: 'Google Cloud IAM & Service Accounts',
      notes: 'Azure System-Assigned Managed Identity = AWS IAM Instance Profile = GCP Attached Service Account.'
    },
    commonMistakes: [
      {
        mistake: 'Using a single Service Principal with broad Contributor rights across all CI/CD pipelines.',
        consequence: 'A compromise of one repository allows attacker to delete production resources across the subscription.',
        fix: 'Use OpenID Connect (OIDC) Workload Identity Federation scoped strictly to specific GitHub repository branches.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Azure CLI: Assigning Managed Identity to a VM and granting Key Vault Access',
      scenario: 'Enable System-Assigned Managed Identity on an existing VM and grant it Key Vault Secrets Officer role.',
      cliCommand: 'az vm identity assign --name vm-backend-prod --resource-group rg-app-prod && az role assignment create --assignee <VM_PRINCIPAL_ID> --role "Key Vault Secrets User" --scope /subscriptions/xxx/resourceGroups/rg-app-prod/providers/Microsoft.KeyVault/vaults/kv-prod',
      expectedOutcome: 'VM receives its own enterprise object ID in Entra ID and can retrieve secrets seamlessly.',
      steps: [
        '1. Enable identity on the virtual machine',
        '2. Obtain the generated principalId',
        '3. Create RBAC assignment scoped to the Key Vault'
      ]
    },
    scenarioChallenge: {
      title: 'Passwordless Azure SQL Connectivity',
      problem: 'Your security architect mandates that zero database passwords or connection string secrets may be saved on disk or in source code. How do you configure an Azure App Service to connect to Azure SQL Database?',
      constraints: ['Zero passwords in config', 'Automated token rotation'],
      options: [
        {
          id: 'a',
          text: 'Store the SQL admin password in Azure Key Vault and read it at startup',
          isCorrect: false,
          explanation: 'Still uses password-based SQL authentication and requires credentials in the connection string.'
        },
        {
          id: 'b',
          text: 'Enable System-Assigned Managed Identity on App Service, add the identity as an Entra ID user in Azure SQL with db_datareader/writer permissions, and connect using Entra ID token authentication',
          isCorrect: true,
          explanation: 'Correct! This implements true passwordless authentication where Entra ID automatically handles token generation and rotation behind the scenes.'
        },
        {
          id: 'c',
          text: 'Hardcode the connection string in an encrypted file on the server',
          isCorrect: false,
          explanation: 'Violates basic security compliance.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the difference between a System-Assigned Managed Identity and a User-Assigned Managed Identity in Azure?',
        whyAsked: 'Tests practical architectural knowledge of Azure identity patterns.',
        answer: 'A System-Assigned Managed Identity is tied directly to the lifecycle of a single Azure resource (e.g. one VM). When the VM is deleted, Entra ID automatically deletes the identity. A User-Assigned Managed Identity is created as an independent standalone Azure resource that can be shared across multiple VMs or services and persists independently of any single VM.',
        architecturalDefense: 'Use System-Assigned for isolated 1-to-1 workloads; use User-Assigned for multi-node clusters or VM scale sets where all instances need identical permissions to avoid creating dozens of separate RBAC assignments.',
        keyPoints: ['Lifecycle binding', '1-to-1 vs 1-to-many sharing', 'Independent persistence']
      }
    ],
    keyTakeaways: [
      'Entra ID handles Authentication; Azure RBAC handles Authorization.',
      'Managed Identities eliminate the need for developers to manage or rotate cloud credentials.',
      'Always scope RBAC permissions to the lowest possible level (Resource or Resource Group).'
    ]
  },
  {
    id: 'azure-03-networking',
    slug: 'networking',
    level: 2,
    track: 'azure',
    category: 'Networking & Content Delivery',
    title: 'Azure Virtual Networks (VNet), Subnets & NSGs',
    subtitle: 'Architecting resilient hub-and-spoke topologies with Azure Firewall and Private Endpoints',
    estimatedMinutes: 30,
    iconName: 'Network',
    whatIsIt: 'Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure. VNets enable Azure resources to securely communicate with each other, the internet, and on-premises networks.',
    whyExists: 'Provides secure isolation, private IP addressing, cross-region peering, and granular traffic inspection via Network Security Groups and Azure Firewall.',
    simpleExplanation: 'An Azure VNet is your private network estate. Unlike AWS where subnets are locked to a single data center, an Azure subnet automatically stretches across all Availability Zones in that region! NSGs act like security guards at each subnet doorway.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Hub VNet (10.0.0.0/16)', type: 'hub', details: 'Azure Firewall & VPN' },
        { id: '2', label: 'Spoke VNet App (10.1.0.0/16)', type: 'spoke', details: 'App Services & VMs' },
        { id: '3', label: 'Private Endpoint', type: 'endpoint', details: 'Azure SQL (10.1.2.5)' }
      ],
      flow: [
        { from: '1', to: '2', label: 'VNet Peering (Low latency)' },
        { from: '2', to: '3', label: 'Private Link (No Public IP)' }
      ]
    },
    realWorldExample: 'A bank deploys a Hub-and-Spoke topology where all outbound internet traffic from 20 spoke application VNets is forced through an Azure Firewall in the Hub VNet using User Defined Routes (UDRs) for deep packet inspection and URL filtering.',
    architectureExample: {
      title: 'Enterprise Hub-and-Spoke with Private Link',
      description: 'Centralized Hub VNet connected via ExpressRoute to on-premises datacenter, peered to application spoke VNets with Private Endpoints for PaaS services.',
      flow: [
        'On-premises users connect over 10 Gbps ExpressRoute to Hub Gateway',
        'Hub VNet Azure Firewall inspects and routes traffic to Spoke VNet',
        'Spoke VMs communicate with Azure Storage and Azure SQL via Private Endpoints',
        'Zero public IP addresses exposed on databases or backend services'
      ]
    },
    whenToUse: [
      'Standard for all Azure production workloads.',
      'Use VNet Peering to connect multiple VNets with high speed and zero gateway transit bottleneck.',
      'Use Azure Private Endpoints to connect to Azure PaaS services (Storage, SQL, Cosmos DB) via private IP.'
    ],
    whenNotToUse: [
      'Do not create overlapping IP address spaces if VNets will ever be peered or connected to on-premises.',
      'Do not use public endpoints for sensitive databases or storage accounts.'
    ],
    advantages: [
      'Subnets naturally span all Availability Zones in the region without AZ fragmentation.',
      'VNet Peering is high-bandwidth, low-latency, and uses the Microsoft global private backbone.',
      'Private Link secures PaaS services against data exfiltration.'
    ],
    disadvantages: [
      'Azure Firewall and VPN Gateways can be costly for small workloads.',
      'VNet Peering is non-transitive by default (requires UDRs or Virtual WAN for transit routing).'
    ],
    cloudEquivalents: {
      aws: 'AWS VPC (Subnets are AZ-locked; uses VPC Endpoints/Privatelink)',
      azure: 'Azure VNet (Subnets are Region-wide; uses Private Endpoints/Private Link)',
      gcp: 'GCP VPC (VPC is Global; Subnets are Regional)',
      notes: 'Azure subnets span all AZs in a region, making multi-AZ VM placement simpler.'
    },
    commonMistakes: [
      {
        mistake: 'Assuming VNet peering is transitive (e.g. VNet A peers with VNet B, and B peers with C, thinking A can talk to C).',
        consequence: 'Packets from VNet A to VNet C are silently dropped.',
        fix: 'Use Azure Virtual WAN or configure an NVA (Network Virtual Appliance / Azure Firewall) with User Defined Routes in VNet B.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Azure VNet with Subnet & NSG',
      scenario: 'Deploy a Virtual Network with a backend subnet and Network Security Group blocking inbound internet.',
      terraformCode: `resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-prod-eastus"
  location            = "eastus"
  resource_group_name = "rg-network-prod"
  address_space       = ["10.10.0.0/16"]
}

resource "azurerm_subnet" "backend" {
  name                 = "snet-backend"
  resource_group_name  = "rg-network-prod"
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.10.1.0/24"]
}

resource "azurerm_network_security_group" "nsg_backend" {
  name                = "nsg-backend"
  location            = "eastus"
  resource_group_name = "rg-network-prod"

  security_rule {
    name                       = "AllowAppSubnetInbound"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "8080"
    source_address_prefix      = "10.10.0.0/24"
    destination_address_prefix = "*"
  }
}`,
      expectedOutcome: 'VNet created with backend subnet protected by NSG allowing only internal web tier traffic.',
      steps: [
        '1. Allocate /16 address space',
        '2. Define /24 backend subnet',
        '3. Attach NSG with priority 100 allow rule'
      ]
    },
    scenarioChallenge: {
      title: 'Preventing Data Exfiltration in Azure',
      problem: 'An Azure VM in a private subnet needs to write sensitive customer records to an Azure Storage Account. Compliance requires that no traffic traverses the public internet and malicious insiders cannot redirect data to their personal external Azure storage accounts. How do you solve this?',
      constraints: ['Zero public internet routing', 'Prevent data exfiltration to unauthorized accounts'],
      options: [
        {
          id: 'a',
          text: 'Use Azure Service Endpoints with Public IP allowlists',
          isCorrect: false,
          explanation: 'Service Endpoints still use public IP routing to the Azure multi-tenant storage front-end and do not fully prevent data exfiltration to external accounts without complex policies.'
        },
        {
          id: 'b',
          text: 'Deploy an Azure Private Endpoint for the specific Storage Account inside the VM subnet, and disable public network access on the storage account',
          isCorrect: true,
          explanation: 'Correct! Azure Private Endpoint assigns a private RFC1918 IP inside your VNet directly to that specific storage resource, eliminating internet exposure and preventing exfiltration.'
        },
        {
          id: 'c',
          text: 'Attach a public IP to the VM and use an SSH tunnel',
          isCorrect: false,
          explanation: 'Violates private network mandate.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the difference between an Azure Service Endpoint and an Azure Private Endpoint?',
        whyAsked: 'High-frequency Azure cloud architecture interview question.',
        answer: 'An Azure Service Endpoint provides secure, direct connectivity to Azure PaaS services over the Azure backbone by optimizing route tables, but the traffic still addresses the public IP of the Azure PaaS service. An Azure Private Endpoint assigns a dedicated private IP address (NIC) from your own VNet directly to that specific instance of the PaaS service via Azure Private Link.',
        architecturalDefense: 'Private Endpoints are strictly superior for enterprise security because they bring the PaaS service inside your private address space, completely block public internet access, and prevent data exfiltration to other tenants.',
        keyPoints: ['Public IP vs Private RFC1918 IP', 'Subnet-level route vs dedicated private NIC', 'Data exfiltration protection']
      }
    ],
    keyTakeaways: [
      'Azure VNets are regional and their subnets naturally span all Availability Zones in the region.',
      'Use Hub-and-Spoke topologies for scalable multi-VNet architectures.',
      'Use Private Endpoints to bring PaaS services securely inside your private network.'
    ]
  },
  {
    id: 'azure-04-compute',
    slug: 'compute',
    level: 2,
    track: 'azure',
    category: 'Compute & Auto Scaling',
    title: 'Azure Virtual Machines & Virtual Machine Scale Sets (VMSS)',
    subtitle: 'Enterprise Windows/Linux compute, Availability Zones, and Spot VM optimization',
    estimatedMinutes: 25,
    iconName: 'Cpu',
    whatIsIt: 'Azure Virtual Machines provide on-demand, high-scale virtualized computing resources. Virtual Machine Scale Sets (VMSS) allow you to create and manage a group of identical, load-balanced, auto-scaling VMs across Availability Zones.',
    whyExists: 'Enables running legacy enterprise applications, Windows Server workloads, Active Directory Domain Controllers, and large-scale scalable backend clusters with automated OS image updates.',
    simpleExplanation: 'Azure VM is your dedicated server in the cloud. VMSS is an automatic fleet manager that spins up 5, 50, or 500 identical copies of your server across multiple power zones whenever website traffic jumps.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Azure Load Balancer', type: 'gateway', details: 'Layer 4 / App Gateway' },
        { id: '2', label: 'VMSS Instance (Zone 1)', type: 'compute', details: 'D4s_v5 Ubuntu/Windows' },
        { id: '3', label: 'VMSS Instance (Zone 2)', type: 'compute', details: 'D4s_v5 Ubuntu/Windows' },
        { id: '4', label: 'VMSS Instance (Zone 3)', type: 'compute', details: 'D4s_v5 Ubuntu/Windows' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Zone-Redundant LB' },
        { from: '1', to: '3', label: 'Zone-Redundant LB' },
        { from: '1', to: '4', label: 'Zone-Redundant LB' }
      ]
    },
    realWorldExample: 'An enterprise ERP software vendor hosts 1,000 Windows Server VMs across VM Scale Sets in Azure, using Azure Compute Gallery to roll out monthly patched golden images automatically with rolling zero-downtime upgrades.',
    architectureExample: {
      title: 'Zone-Redundant VMSS with Application Gateway',
      description: 'Layer 7 Application Gateway distributes traffic across a VM Scale Set spanning 3 Azure Availability Zones with auto-healing and Spot VM mixed scaling.',
      flow: [
        'Client requests arrive at Azure Application Gateway with WAF enabled',
        'App Gateway health checks probe backend VMSS instances on port 80/443',
        'VMSS scales from 3 to 30 instances during traffic surges',
        'Spot VMs provide 80% discounted burst compute alongside regular baseline VMs'
      ]
    },
    whenToUse: [
      'Windows Server, Active Directory, SQL Server, and legacy enterprise software.',
      'High-performance SAP HANA, Oracle databases, and GPU AI training clusters.',
      'When you require custom operating system kernel configurations and local drivers.'
    ],
    whenNotToUse: [
      'Microservice applications that can run in lightweight containers on AKS or Azure Container Apps.',
      'Short-lived event-driven functions (use Azure Functions).'
    ],
    advantages: [
      'Best-in-class support for Microsoft Windows Server, SQL Server licensing, and Azure Hybrid Benefit.',
      'VMSS Automatic OS Upgrades patch VMs with zero manual administrator effort.',
      'Proximity Placement Groups guarantee sub-millisecond network latency between VM nodes.'
    ],
    disadvantages: [
      'Operating system maintenance and patching overhead.',
      'Boot times (minutes) are slower than containers (seconds).'
    ],
    cloudEquivalents: {
      aws: 'Amazon EC2 & EC2 Auto Scaling Groups',
      azure: 'Azure Virtual Machines & VM Scale Sets (VMSS)',
      gcp: 'Google Compute Engine (GCE) & Managed Instance Groups (MIGs)',
      notes: 'Azure Hybrid Benefit allows reusing on-prem Windows Server / SQL Server licenses for up to 85% discount.'
    },
    commonMistakes: [
      {
        mistake: 'Deploying standalone single VMs without Availability Zones in production.',
        consequence: 'Single VM without zones has a 99.9% SLA compared to 99.99% for Multi-Zone VMSS.',
        fix: 'Always deploy production VMs across Availability Zones (Zones 1, 2, 3) using VMSS.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Azure CLI: Deploying a Multi-Zone VMSS',
      scenario: 'Create an Ubuntu Linux VM Scale Set spread evenly across 3 Availability Zones.',
      cliCommand: 'az vmss create --resource-group rg-compute-prod --name vmss-app --image Ubuntu2204 --zones 1 2 3 --instance-count 3 --generate-ssh-keys',
      expectedOutcome: 'VMSS deployed with 3 instances distributed across Zones 1, 2, and 3.',
      steps: ['1. Specify Resource Group', '2. Set --zones 1 2 3 for multi-zone HA', '3. Provision VMSS fleet']
    },
    scenarioChallenge: {
      title: 'Enterprise Windows License Cost Optimization',
      problem: 'Your enterprise has 200 on-premises Windows Server and SQL Server core licenses with Software Assurance. Migrating to Azure at standard on-demand pricing exceeds budget. How do you optimize?',
      constraints: ['Reduce compute and license costs', 'Maintain compliance'],
      options: [
        {
          id: 'a',
          text: 'Apply Azure Hybrid Benefit (AHB) combined with 3-year Azure Reserved VM Instances',
          isCorrect: true,
          explanation: 'Correct! Azure Hybrid Benefit waives the Windows/SQL license fee, and Reserved Instances save up to 72% on base compute, delivering up to 85% total cost reduction.'
        },
        {
          id: 'b',
          text: 'Run unactivated Windows Server copies',
          isCorrect: false,
          explanation: 'Illegal and non-compliant.'
        },
        {
          id: 'c',
          text: 'Purchase standard On-Demand Linux VMs',
          isCorrect: false,
          explanation: 'Does not support legacy Windows Server dependencies.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'What is the architectural difference between an Azure Availability Set and Azure Availability Zones?',
        whyAsked: 'Tests knowledge of Azure fault domains and modern high availability design.',
        answer: 'An Availability Set is a logical grouping within a single datacenter that separates VMs across physical Fault Domains (separate racks, power, and switches) and Update Domains (maintenance groups) for 99.95% SLA. Availability Zones are physically separate data centers within an Azure region with independent power, cooling, and fiber for 99.99% SLA.',
        architecturalDefense: 'For modern production architectures, Availability Zones are the standard choice to protect against entire datacenter building outages, while Availability Sets are reserved for legacy regions lacking multi-zone support.',
        keyPoints: ['Single datacenter racks (Availability Set) vs separate datacenter buildings (Availability Zones)', '99.95% vs 99.99% SLA']
      }
    ],
    keyTakeaways: [
      'Use VMSS across Availability Zones 1, 2, and 3 for 99.99% compute SLA.',
      'Leverage Azure Hybrid Benefit and Reserved Instances for dramatic enterprise savings.',
      'Use Azure Compute Gallery for standardized golden VM image distribution.'
    ]
  },
  {
    id: 'azure-05-storage',
    slug: 'storage',
    level: 2,
    track: 'azure',
    category: 'Storage',
    title: 'Azure Blob Storage, Data Lake & Azure Files',
    subtitle: 'Massive object storage, hierarchical namespaces (ADLS Gen2), and cloud SMB/NFS file shares',
    estimatedMinutes: 25,
    iconName: 'HardDrive',
    whatIsIt: 'Azure Storage provides massively scalable object storage (Blob Storage), cloud-native file shares (Azure Files), big data analytics storage (Azure Data Lake Storage Gen2), and disk storage for VMs.',
    whyExists: 'Enterprises need durable, secure, and cost-effective storage for unstructured media files, backups, enterprise file shares (SMB/NFS), and multi-petabyte analytics data lakes.',
    simpleExplanation: 'Blob Storage is an ocean of files accessible via web URLs. Azure Files is a shared network drive that multiple Windows and Linux servers can mount via SMB/NFS. ADLS Gen2 is Blob Storage with real folders designed for super-fast big data analytics (Databricks/Synapse).',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Azure Blob Storage (Hot/Cool/Cold/Archive)', type: 'storage', details: '16 9s Durability (GRS)' },
        { id: '2', label: 'Azure Files (SMB/NFS)', type: 'storage', details: 'Mounted across Windows/Linux VMs' },
        { id: '3', label: 'ADLS Gen2 Data Lake', type: 'storage', details: 'Hierarchical Namespace for Big Data' }
      ],
      flow: [
        { from: '1', to: '3', label: 'Enables Hierarchical Namespace' }
      ]
    },
    realWorldExample: 'A financial institution ingests 50TB of stock trade logs daily into Azure Blob Storage with Hot tier, uses Lifecycle Management to move logs to Cold tier after 30 days and Archive tier after 365 days, saving over $150,000 annually.',
    architectureExample: {
      title: 'Secure Multi-Tier Storage Architecture',
      description: 'Blob storage with Geo-Redundant Storage (GRS), Customer-Managed Keys (CMK) in Azure Key Vault, and Private Endpoints.',
      flow: [
        'App writes files to Storage Account via Private Endpoint (10.1.3.4)',
        'Storage encrypts data at rest using Azure Key Vault HSM keys',
        'Lifecycle policy moves unread blobs to Cool tier after 30 days',
        'GRS automatically replicates 3 copies to primary region and 3 copies to secondary paired region'
      ]
    },
    whenToUse: [
      'Use Blob Storage for images, videos, documents, backups, and static website hosting.',
      'Use Azure Files when migrating on-premises file servers (Active Directory SMB shares) to cloud.',
      'Use ADLS Gen2 for Azure Synapse, Databricks, and Apache Spark big data pipelines.'
    ],
    whenNotToUse: [
      'Do not use Blob Storage as block disk for virtual machine operating systems (use Azure Managed Disks).',
      'Do not access Archive tier blobs for real-time applications (rehydration takes hours).'
    ],
    advantages: [
      'Up to 16 9s (99.99999999999999%) durability with Geo-Redundant Storage (GZRS).',
      'Native immutable storage (WORM - Write Once, Read Many) for financial compliance.',
      'Lifecycle management policies automatically cut storage costs.'
    ],
    disadvantages: [
      'Rehydrating blobs from Archive tier incurs data retrieval costs and latency delays.',
      'High-frequency small blob operations can accumulate API transaction fees.'
    ],
    cloudEquivalents: {
      aws: 'Amazon S3 (Object) | Amazon EFS (File) | AWS EBS (Block)',
      azure: 'Azure Blob Storage | Azure Files | Azure Managed Disks',
      gcp: 'Google Cloud Storage (GCS) | Cloud Filestore | Persistent Disk',
      notes: 'Azure Storage Accounts unify Blobs, Files, Queues, and Tables under one management resource.'
    },
    commonMistakes: [
      {
        mistake: 'Leaving "Allow Blob Public Access" enabled on the Storage Account.',
        consequence: 'Accidental public URL exposure of sensitive internal documents.',
        fix: 'Disable public blob access at the storage account level and enforce Private Endpoints.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Azure Storage Account with Private Endpoint',
      scenario: 'Deploy a secure Azure Storage Account with TLS 1.2 minimum and GRS replication.',
      terraformCode: `resource "azurerm_storage_account" "sa" {
  name                     = "stproddataeastus01"
  resource_group_name      = "rg-storage-prod"
  location                 = "eastus"
  account_tier             = "Standard"
  account_replication_type = "GRS" # Geo-Redundant Storage
  min_tls_version          = "TLS1_2"
  allow_nested_items_to_be_public = false
}`,
      expectedOutcome: 'Storage account provisioned with zero public access and cross-region replication.',
      steps: ['1. Create storage account', '2. Enforce TLS 1.2', '3. Disable public blob access']
    },
    scenarioChallenge: {
      title: 'Compliance Data Retention Architecture',
      problem: 'SEC regulations require financial records to be retained for 7 years without the possibility of deletion or modification, even by a Subscription Administrator with Root privileges. How do you implement this in Azure?',
      constraints: ['Zero modification/deletion possible', 'Audit-proof compliance'],
      options: [
        {
          id: 'a',
          text: 'Configure an Azure Storage Time-Based Retention Policy with a Legal Hold and lock the policy in Compliance Mode',
          isCorrect: true,
          explanation: 'Correct! Immutable Blob Storage in locked Compliance Mode guarantees Write Once, Read Many (WORM) storage that cannot be deleted or overwritten by anyone, including Microsoft support or subscription owners.'
        },
        {
          id: 'b',
          text: 'Ask the IT team not to delete any files for 7 years',
          isCorrect: false,
          explanation: 'Does not satisfy regulatory WORM compliance.'
        },
        {
          id: 'c',
          text: 'Save files on local VM hard drives with read-only permissions',
          isCorrect: false,
          explanation: 'Subject to hardware failure and admin tampering.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'Explain the difference between LRS, ZRS, GRS, and GZRS in Azure Storage.',
        whyAsked: 'Tests deep understanding of Azure data durability and disaster recovery replication.',
        answer: 'LRS (Locally Redundant) keeps 3 copies within a single datacenter (protects against disk failure). ZRS (Zone-Redundant) keeps 3 copies across 3 distinct Availability Zones in the same region (protects against datacenter outage). GRS (Geo-Redundant) keeps 3 copies in primary region (LRS) and asynchronously replicates 3 copies to a paired secondary region (protects against regional disaster). GZRS (Geo-Zone-Redundant) combines both: 3 copies across 3 AZs in primary region, plus 3 copies in secondary region.',
        architecturalDefense: 'For enterprise mission-critical data, GZRS provides the ultimate 16 9s durability with zero single-region or single-zone vulnerability.',
        keyPoints: ['LRS (1 DC, 3 copies)', 'ZRS (3 AZs, 3 copies)', 'GRS (2 Regions, 6 copies)', 'GZRS (3 AZs + 2nd Region)']
      }
    ],
    keyTakeaways: [
      'Blob Storage for objects, Azure Files for shared SMB/NFS mounts, ADLS Gen2 for analytics.',
      'Use GRS or GZRS for cross-region disaster recovery durability.',
      'Enforce Private Endpoints and disable public blob access.'
    ]
  },
  {
    id: 'azure-06-databases',
    slug: 'databases',
    level: 2,
    track: 'azure',
    category: 'Databases & In-Memory',
    title: 'Azure SQL, Cosmos DB & Azure Database for PostgreSQL',
    subtitle: 'Managed SQL Databases, Elastic Pools, and Globally Distributed Multi-Master NoSQL',
    estimatedMinutes: 30,
    iconName: 'Database',
    whatIsIt: 'Azure provides managed database engines: Azure SQL Database (cloud-native serverless & elastic pools), Azure SQL Managed Instance (100% on-premises SQL Server compatibility), Azure Cosmos DB (globally distributed NoSQL with single-digit millisecond latency), and Azure Database for PostgreSQL.',
    whyExists: 'Automates database provisioning, high availability, automated backups, patching, and multi-region replication while eliminating database administrator manual chores.',
    simpleExplanation: 'Azure SQL is a managed SQL Server database in the cloud. Cosmos DB is Microsoft\'s world-scale NoSQL database that can replicate data across 50 global regions simultaneously with instant reads and writes.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'Azure Cosmos DB (Global)', type: 'database', details: 'Multi-Region Active/Active (<10ms SLA)' },
        { id: '2', label: 'Azure SQL Managed Instance', type: 'database', details: 'VNet Native, 100% SQL Server Feature Parity' },
        { id: '3', label: 'Azure Cache for Redis', type: 'cache', details: 'Sub-millisecond In-Memory Caching' }
      ],
      flow: [
        { from: '3', to: '2', label: 'Cache Miss Queries DB' }
      ]
    },
    realWorldExample: 'ASOS processes global e-commerce checkouts using Azure Cosmos DB with multi-region active/active replication, providing instant responsive checkout for millions of European, US, and Asian shoppers with zero cross-continent latency.',
    architectureExample: {
      title: 'Cosmos DB Multi-Region Active/Active Topology',
      description: 'Multi-region deployment where write traffic is accepted locally in US East, Europe West, and Southeast Asia, with automatic conflict resolution.',
      flow: [
        'User in London writes cart item to Azure Cosmos DB West Europe endpoint',
        'Cosmos DB multi-master replicates write to US and Asia in <50ms',
        'Conflicts resolved via Last-Write-Wins (LWW) timestamp rule',
        '99.999% availability backed by financially backed SLA'
      ]
    },
    whenToUse: [
      'Use Azure SQL Database for modern relational web applications and SaaS with Elastic Pools.',
      'Use Azure SQL Managed Instance for migrating legacy on-prem SQL Server databases with linked servers and SQL Agent jobs.',
      'Use Cosmos DB for global web scale, real-time gaming, shopping carts, and IoT telemetry.'
    ],
    whenNotToUse: [
      'Do not use Cosmos DB if you require complex cross-table relational SQL JOINs across 20 tables.',
      'Do not expose database ports over public internet without Private Endpoints.'
    ],
    advantages: [
      'Cosmos DB provides 99.999% SLA for both reads and writes across multiple regions.',
      'Azure SQL Auto-tuning automatically creates indexes and fixes query regressions using AI.',
      'Elastic Pools allow sharing database compute resources across hundreds of customer tenant databases to save costs.'
    ],
    disadvantages: [
      'Cosmos DB provisioned throughput (RU/s - Request Units) requires careful partition key design.',
      'Azure SQL Managed Instance takes longer to provision (typically 30-45 minutes).'
    ],
    cloudEquivalents: {
      aws: 'Amazon RDS & Aurora | DynamoDB | ElastiCache',
      azure: 'Azure SQL & SQL MI | Azure Cosmos DB | Azure Cache for Redis',
      gcp: 'Cloud SQL & Cloud Spanner | Firestore | Memorystore',
      notes: 'Azure Cosmos DB = AWS DynamoDB / Aurora Global = GCP Cloud Spanner / Firestore.'
    },
    commonMistakes: [
      {
        mistake: 'Choosing a poor partition key in Cosmos DB (e.g. low-cardinality keys like Gender or Country).',
        consequence: 'Creates hot partitions that throttle requests with HTTP 429 Too Many Requests.',
        fix: 'Choose high-cardinality partition keys with balanced read/write distribution (e.g. userId or deviceId).'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Azure SQL Database with Zone Redundancy',
      scenario: 'Deploy an Azure SQL Server and Database with Zone Redundancy enabled across 3 AZs.',
      terraformCode: `resource "azurerm_mssql_server" "sql_server" {
  name                         = "sql-prod-eastus-01"
  resource_group_name          = "rg-data-prod"
  location                     = "eastus"
  version                      = "12.0"
  azuread_administrator {
    login_username = "CloudAdmin"
    object_id      = "00000000-0000-0000-0000-000000000000"
  }
}

resource "azurerm_mssql_database" "db" {
  name           = "orders_db"
  server_id      = azurerm_mssql_server.sql_server.id
  sku_name       = "GP_Gen5_4"
  zone_redundant = true # Deploy across 3 AZs
}`,
      expectedOutcome: 'Azure SQL database deployed with automated multi-zone synchronous replication.',
      steps: ['1. Provision SQL server with Entra ID admin', '2. Set zone_redundant = true', '3. Attach Private Endpoint']
    },
    scenarioChallenge: {
      title: 'Migrating Legacy On-Prem SQL Server to Azure',
      problem: 'An enterprise application relies on SQL Server Agent jobs, cross-database queries, Service Broker, and Windows authentication. The migration deadline is 3 weeks. What is the fastest and lowest-risk migration target?',
      constraints: ['Zero code rewrites', 'Full SQL Server feature parity'],
      options: [
        {
          id: 'a',
          text: 'Azure Cosmos DB with Mongo API',
          isCorrect: false,
          explanation: 'Cosmos DB is a NoSQL engine and does not support SQL Server features.'
        },
        {
          id: 'b',
          text: 'Azure SQL Managed Instance (SQL MI)',
          isCorrect: true,
          explanation: 'Correct! Azure SQL Managed Instance offers near 100% compatibility with SQL Server on-premises, supporting SQL Agent, cross-database queries, and CLR with zero application rewrites.'
        },
        {
          id: 'c',
          text: 'Azure Table Storage',
          isCorrect: false,
          explanation: 'Table storage is a simple key-value store.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does Azure Cosmos DB offer 5 different Consistency Levels, and how do you choose among them?',
        whyAsked: 'Deep distributed systems and CAP theorem architecture test.',
        answer: 'Unlike traditional databases that offer only Strong (CP) or Eventual (AP) consistency, Cosmos DB offers 5 well-defined consistency levels: Strong, Bounded Staleness, Session, Consistent Prefix, and Eventual. Session is the default and most popular because it guarantees Read-Your-Own-Writes within a user session with low latency. Bounded Staleness guarantees lag bounds (e.g. max 5 seconds or 100 versions lag) across regions.',
        architecturalDefense: 'Allowing developers to dial consistency per workload prevents overpaying in latency for unnecessary strong consistency while guaranteeing correctness for critical banking transactions.',
        keyPoints: ['Strong vs Bounded Staleness vs Session vs Consistent Prefix vs Eventual', 'Latency/Consistency trade-off']
      }
    ],
    keyTakeaways: [
      'Azure SQL Database for modern cloud-native apps; SQL Managed Instance for legacy on-prem migrations.',
      'Cosmos DB for global active/active multi-region NoSQL with 99.999% SLA.',
      'Always use Private Endpoints and Entra ID authentication for databases.'
    ]
  },
  {
    id: 'azure-08-kubernetes',
    slug: 'kubernetes',
    level: 2,
    track: 'azure',
    category: 'Containers & Kubernetes',
    title: 'Azure Kubernetes Service (AKS): Cilium, Workload Identity & KEDA',
    subtitle: 'Production Kubernetes on Azure with Azure CNI, Pod Identity & Event-Driven Autoscaling',
    estimatedMinutes: 30,
    iconName: 'Layers',
    whatIsIt: 'Azure Kubernetes Service (AKS) is Microsoft\'s managed container orchestration service that simplifies deploying, managing, and scaling containerized applications using Kubernetes with built-in Azure security and governance.',
    whyExists: 'Eliminates the complexity of managing Kubernetes master nodes, etcd clusters, and security patches while providing deep integration with Microsoft Entra ID and Azure Virtual Networks.',
    simpleExplanation: 'AKS is like having Microsoft maintain the brain of your Kubernetes cluster (the Control Plane is free!). You only pay for the worker node virtual machines that run your container pods.',
    visualDiagramType: 'flow',
    diagramData: {
      nodes: [
        { id: '1', label: 'AKS Managed Control Plane', type: 'k8s', details: 'Free / SLA 99.95%, Managed etcd' },
        { id: '2', label: 'User Node Pool (Linux Zone 1,2,3)', type: 'compute', details: 'Runs Application Pods' },
        { id: '3', label: 'System Node Pool', type: 'compute', details: 'CoreDNS, Cilium, Metrics' },
        { id: '4', label: 'KEDA Event-Driven Autoscaler', type: 'scaling', details: 'Scales based on Azure Service Bus' }
      ],
      flow: [
        { from: '1', to: '2', label: 'Kubelet TLS API' },
        { from: '4', to: '2', label: 'Scales Pod Count' }
      ]
    },
    realWorldExample: 'Mercedes-Benz runs its connected vehicle software on AKS clusters across multiple Azure regions, using Azure CNI powered by Cilium for ultra-fast eBPF network security and high throughput telemetry processing.',
    architectureExample: {
      title: 'Enterprise AKS Private Cluster Architecture',
      description: 'Private AKS cluster with API server isolated inside VNet, Azure CNI Overlay, Workload Identity, and Azure Key Vault Secrets Store CSI driver.',
      flow: [
        'AKS API Server accessible only via Private Endpoint inside Hub VNet',
        'Pods use Azure CNI Overlay to eliminate VNet IP address exhaustion',
        'Pods authenticate to Azure resources via Entra ID Workload Identity',
        'KEDA scales pods from 0 to 100 based on message count in Azure Service Bus queue'
      ]
    },
    whenToUse: [
      'Enterprise container microservice platforms with complex orchestration requirements.',
      'Workloads using Kubernetes ecosystem tools (Helm, ArgoCD, Istio, Prometheus, KEDA).',
      'Hybrid cloud migrations using Azure Arc.'
    ],
    whenNotToUse: [
      'Simple web applications that can run with zero cluster management on Azure Container Apps or App Service.',
      'Teams lacking Kubernetes operational expertise.'
    ],
    advantages: [
      'Free cluster management control plane (optional paid Uptime SLA for 99.95%).',
      'Azure CNI powered by Cilium brings high-performance eBPF networking and security.',
      'Seamless Microsoft Entra ID integration and Azure RBAC for Kubernetes authorization.'
    ],
    disadvantages: [
      'Kubernetes complexity requires operational governance (upgrades, ingress controllers, observability).',
      'Legacy Azure CNI consumes large numbers of private VNet IPs (use Azure CNI Overlay to resolve).'
    ],
    cloudEquivalents: {
      aws: 'Amazon EKS',
      azure: 'Azure Kubernetes Service (AKS)',
      gcp: 'Google Kubernetes Engine (GKE)',
      notes: 'AKS control plane is free by default; AWS EKS charges $0.10/hour per cluster.'
    },
    commonMistakes: [
      {
        mistake: 'Using legacy Azure CNI in small subnets without planning for pod IP allocation.',
        consequence: 'Subnet IP exhaustion prevents nodes and pods from launching.',
        fix: 'Use Azure CNI Overlay, which assigns pods private IPs from a separate overlay CIDR while conserving VNet IPs.'
      }
    ],
    handsOn: {
      type: 'simulation',
      title: 'Terraform: Provisioning an AKS Cluster with Managed Identity & OIDC',
      scenario: 'Deploy a production AKS cluster with System-Assigned identity, OIDC issuer, and Azure CNI Overlay.',
      terraformCode: `resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-prod-eastus"
  location            = "eastus"
  resource_group_name = "rg-aks-prod"
  dns_prefix          = "aksprod"
  oidc_issuer_enabled = true
  workload_identity_enabled = true

  default_node_pool {
    name       = "systempool"
    node_count = 3
    vm_size    = "Standard_D4s_v5"
    zones      = ["1", "2", "3"]
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
    network_plugin_mode = "overlay"
  }
}`,
      expectedOutcome: 'Production AKS cluster provisioned with multi-zone HA and Workload Identity.',
      steps: ['1. Enable OIDC and Workload Identity', '2. Configure Azure CNI Overlay', '3. Deploy 3-zone node pool']
    },
    scenarioChallenge: {
      title: 'Event-Driven Pod Autoscaling based on Queue Depth',
      problem: 'Your video encoding service in AKS needs to scale from 0 to 500 pods when 50,000 video encoding tasks land in an Azure Service Bus queue, and scale back to 0 when empty. Standard Kubernetes Horizontal Pod Autoscaler (HPA) only scales on CPU/Memory. How do you implement this?',
      constraints: ['Scale to zero', 'Scale directly on Azure Service Bus queue length'],
      options: [
        {
          id: 'a',
          text: 'Deploy KEDA (Kubernetes Event-driven Autoscaling) with an Azure Service Bus ScaledObject trigger',
          isCorrect: true,
          explanation: 'Correct! KEDA is built into AKS and can scale deployments directly based on external queue metrics, including scaling to true zero when the queue is empty.'
        },
        {
          id: 'b',
          text: 'Write an infinite bash loop on a VM that runs kubectl scale',
          isCorrect: false,
          explanation: 'Fragile and unmaintainable.'
        },
        {
          id: 'c',
          text: 'Over-provision 500 nodes 24/7',
          isCorrect: false,
          explanation: 'Extremely costly.'
        }
      ]
    },
    interviewQuestions: [
      {
        question: 'How does Microsoft Entra Workload Identity work in AKS to replace legacy pod identity?',
        whyAsked: 'Key Kubernetes security architecture question for Azure architects.',
        answer: 'Microsoft Entra Workload Identity uses Kubernetes Service Account token projection and OpenID Connect (OIDC) federation. When a pod starts, Kubernetes injects a signed service account JWT token. The Azure SDK presents this token to Microsoft Entra ID, which validates the OIDC issuer and exchanges the token for an Azure Entra access token with scoped RBAC permissions.',
        architecturalDefense: 'Unlike legacy pod identity (NMI/MIC), Workload Identity requires no daemonsets on nodes, eliminates metadata intercept proxy latency, and supports multi-node and multi-tenant scaling cleanly.',
        keyPoints: ['OIDC token exchange', 'Service Account token projection', 'No daemonset overhead']
      }
    ],
    keyTakeaways: [
      'AKS control plane is free with optional 99.95% SLA.',
      'Use Azure CNI Overlay to prevent VNet IP exhaustion.',
      'Use Entra Workload Identity and KEDA for modern cloud-native AKS architectures.'
    ]
  }
];

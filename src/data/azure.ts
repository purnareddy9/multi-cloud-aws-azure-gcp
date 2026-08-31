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
    source_address_prefix      = "10.10.0.0/24" # Web Subnet only
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
  }
];

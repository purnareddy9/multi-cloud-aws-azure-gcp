export interface FundamentalTopic {
  id: string;
  title: string;
  badge: string;
  summary: string;
  diagram: string;
  content: {
    heading: string;
    explanation: string;
    keyPoints: string[];
    comparisonTable?: { headers: string[]; rows: string[][] };
  }[];
  interviewQuestion: {
    question: string;
    answer: string;
  };
}

export const fundamentalsData: FundamentalTopic[] = [
  {
    id: 'what-is-cloud',
    title: '1. What is Cloud Computing & Why Companies Use It?',
    badge: 'Level 0.1',
    summary: 'Understand the fundamental shift from on-premises capital expenses (CapEx) to elastic on-demand operational expenses (OpEx).',
    diagram: `
+-------------------------------------------------------------+
|                     On-Demand Cloud Model                   |
|                                                             |
|   Users ---> [ Internet ] ---> [ Global Cloud Infrastructure]|
|                                      |                      |
|            +---------------+---------+---------+            |
|            v               v                   v            |
|        Compute          Storage             Database        |
|      (EC2/VM/GCE)    (S3/Blob/GCS)      (RDS/SQL/Spanner)   |
+-------------------------------------------------------------+
`,
    content: [
      {
        heading: 'The Core Definition',
        explanation: 'Cloud computing is the on-demand delivery of IT resources (compute, storage, database, networking) over the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical servers and data centers, companies rent computing power and storage as needed.',
        keyPoints: [
          'On-Demand Self Service: Provision resources instantly without human intervention.',
          'Broad Network Access: Access capabilities over standard internet protocols from any device.',
          'Resource Pooling: Multi-tenant model dynamically assigning physical resources to multiple customers.',
          'Rapid Elasticity: Automatically scale up or down based on actual live demand.',
          'Measured Service: Pay only for resources actively consumed (per-second or per-hour billing).'
        ]
      },
      {
        heading: 'Why Companies Migrate to Cloud (CapEx vs OpEx)',
        explanation: 'In traditional on-premises setups, companies had to forecast traffic 3-5 years ahead, purchase expensive hardware upfront (CapEx), rent physical space, and pay for 24/7 cooling and maintenance regardless of actual usage. Cloud converts this into flexible operational expenses (OpEx).',
        keyPoints: [
          'Zero upfront capital expenditure: No massive hardware purchases.',
          'Speed & Agility: Launch new global environments in minutes instead of months.',
          'Stop guessing capacity: Automatically scale with traffic spikes (e.g. Black Friday).',
          'Global footprint: Deploy in 30+ regions worldwide with a few clicks.'
        ]
      }
    ],
    interviewQuestion: {
      question: 'How would you explain the difference between CapEx and OpEx to a non-technical stakeholder, and why cloud is advantageous?',
      answer: 'CapEx (Capital Expenditure) is money spent upfront to buy physical assets like servers, data center racks, and power generators that depreciate over years. If your traffic drops or surges, you either waste money or crash. OpEx (Operational Expenditure) is pay-as-you-go utility pricing for services used today. Cloud enables companies to treat infrastructure like electricity: turn it on when needed, scale instantly, and turn it off when idle.'
    }
  },
  {
    id: 'cloud-service-models',
    title: '2. IaaS vs PaaS vs SaaS & Shared Responsibility',
    badge: 'Level 0.2',
    summary: 'Master the three cloud service models and understand exactly where cloud provider responsibility ends and customer responsibility begins.',
    diagram: `
+-------------------------------------------------------------+
|               The Cloud Responsibility Model                |
+-------------------+--------------------+--------------------+
|  IaaS             |  PaaS              |  SaaS              |
|  (Infrastructure) |  (Platform)        |  (Software)        |
+-------------------+--------------------+--------------------+
| Customer:         | Customer:          | Customer:          |
|  * App Code       |  * App Code        |  * User Identity   |
|  * OS Patching    |  * App Config      |  * Data Access     |
|  * Network Rules  |  * Data & Schemas  |                    |
| Provider:         | Provider:          | Provider:          |
|  * Hardware       |  * Hardware        |  * Entire Stack!   |
|  * Hypervisor     |  * OS & Runtime    |  * App & Platform  |
|  * Datacenter     |  * Scaling & DB    |  * Maintenance     |
+-------------------+--------------------+--------------------+
`,
    content: [
      {
        heading: 'Understanding the Spectrum',
        explanation: 'Cloud services fall along a spectrum of abstraction. With IaaS you control the operating system and network; with PaaS the cloud manages the OS and runtime; with SaaS the cloud manages the entire application.',
        keyPoints: [
          'IaaS Examples: AWS EC2, Azure Virtual Machines, GCP Compute Engine.',
          'PaaS Examples: AWS Elastic Beanstalk, Azure App Service, GCP Cloud Run / App Engine.',
          'SaaS Examples: Microsoft 365, Google Workspace, Salesforce, Snowflake.'
        ],
        comparisonTable: {
          headers: ['Layer', 'On-Premises', 'IaaS (EC2 / VM)', 'PaaS (Cloud Run / App Svc)', 'SaaS (Gmail / M365)'],
          rows: [
            ['Applications', 'You', 'You', 'You', 'Cloud Provider'],
            ['Data', 'You', 'You', 'You', 'You (Config/Data)'],
            ['Runtime', 'You', 'You', 'Cloud Provider', 'Cloud Provider'],
            ['Middleware', 'You', 'You', 'Cloud Provider', 'Cloud Provider'],
            ['O/S & Patching', 'You', 'You', 'Cloud Provider', 'Cloud Provider'],
            ['Virtualization', 'You', 'Cloud Provider', 'Cloud Provider', 'Cloud Provider'],
            ['Servers & Storage', 'You', 'Cloud Provider', 'Cloud Provider', 'Cloud Provider'],
            ['Networking & DC', 'You', 'Cloud Provider', 'Cloud Provider', 'Cloud Provider']
          ]
        }
      },
      {
        heading: 'The Shared Responsibility Model Rule of Thumb',
        explanation: 'The Cloud Provider is responsible for "Security OF the Cloud" (physical data centers, hardware, hypervisors, cables, power). The Customer is responsible for "Security IN the Cloud" (customer data, IAM credentials, OS patching on VMs, firewall security group rules, network encryption).',
        keyPoints: [
          'If an S3 bucket or Azure Blob is made public with sensitive data, it is 100% customer misconfiguration, not AWS/Azure failure.',
          'If a physical hard drive in an AWS datacenter catches fire, AWS handles replacement with zero customer data loss due to provider redundancy.'
        ]
      }
    ],
    interviewQuestion: {
      question: 'A database on an EC2 instance was hacked due to an unpatched Linux kernel vulnerability. Who was responsible under the Shared Responsibility Model?',
      answer: 'The customer was responsible. EC2 is an IaaS service. AWS is responsible for physical host security and hypervisor maintenance, but the customer owns the guest operating system, security patches, firewall configurations, and user access inside the VM.'
    }
  },
  {
    id: 'regions-and-zones',
    title: '3. Regions, Availability Zones & Edge Locations',
    badge: 'Level 0.3',
    summary: 'The physical building blocks of global cloud architectures and how to design for high availability.',
    diagram: `
+-------------------------------------------------------------+
|                    Global Cloud Hierarchy                   |
|                                                             |
|   [ GLOBAL EDGE NETWORK ] (CloudFront / Cloudflare CDN)     |
|               |                                             |
|               v                                             |
|   [ REGION: us-east-1 (N. Virginia) ]                       |
|   +-----------------+ +-----------------+ +----------------+|
|   | AZ 1 (1a)       | | AZ 2 (1b)       | | AZ 3 (1c)      ||
|   | [Data Center A] | | [Data Center B] | | [Data Center C]||
|   | [Data Center X] | | [Data Center Y] | | [Data Center Z]||
|   +--------+--------+ +--------+--------+ +--------+-------+|
|            +-------------------+-------------------+        |
|                 Ultra-Low Latency Fiber (<2ms)              |
+-------------------------------------------------------------+
`,
    content: [
      {
        heading: 'Regions vs Availability Zones (AZs)',
        explanation: 'A Region is a distinct geographical area (e.g. us-east-1 in Virginia, westeurope in Netherlands, asia-south1 in Mumbai). Each Region contains multiple (usually 3+) physically separated, isolated Availability Zones. Each AZ contains one or more physical data centers with independent power, cooling, and networking.',
        keyPoints: [
          'AZs are separated by physical distance (miles apart) to protect against localized disasters (floods, power grid failure).',
          'AZs within the same region are interconnected with ultra-low latency, high-bandwidth private fiber optic networking (<1-2ms round-trip).',
          'Edge Locations are worldwide Points of Presence (PoPs) used by CDNs to cache static content and terminate TLS connections close to end-users.'
        ]
      }
    ],
    interviewQuestion: {
      question: 'What is the architectural difference between deploying across multiple Availability Zones vs deploying across multiple Regions?',
      answer: 'Deploying across multiple AZs provides High Availability (HA) against datacenter-level hardware, cooling, or power failures with synchronous low-latency replication (<2ms). Deploying across multiple Regions provides Disaster Recovery (DR) and global low-latency for international users, but requires asynchronous replication due to speed-of-light physical distance latency.'
    }
  }
];

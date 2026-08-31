export interface InterviewScenario {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Senior Architect' | 'Multi-Cloud Principal';
  timeLimitMinutes: number;
  problemStatement: string;
  businessContext: string;
  requirements: {
    functional: string[];
    nonFunctional: {
      rps: string;
      availability: string;
      rpo: string;
      rto: string;
      budget: string;
    };
  };
  stages: {
    stageNumber: number;
    stageName: string;
    prompt: string;
    options: {
      id: string;
      label: string;
      details: string;
      score: number;
      feedback: string;
    }[];
  }[];
  modelArchitectureSummary: string;
  architecturalDefense: string;
}

export const interviewScenarios: InterviewScenario[] = [
  {
    id: 'interview-ecommerce-ha',
    title: 'Design a High-Traffic Global E-Commerce Platform',
    level: 'Senior Architect',
    timeLimitMinutes: 20,
    problemStatement: 'You are interviewing for a Lead Cloud Architect position. The interviewer asks: "Design an e-commerce platform that handles 100,000 requests/second during flash sales, guarantees 99.99% availability, and protects against database corruption with zero data loss."',
    businessContext: 'The company sells high-demand apparel. Black Friday flash sales cause 20x traffic spikes. Any downtime during a sale costs $100,000 per minute.',
    requirements: {
      functional: [
        'Product browsing catalog (read-heavy, 90% of traffic)',
        'Shopping cart & checkout (write-heavy, ACID transaction integrity)',
        'Image and video media gallery delivery',
        'Order confirmation asynchronous processing'
      ],
      nonFunctional: {
        rps: '100,000 peak RPS',
        availability: '99.99% (less than 52 minutes downtime per year)',
        rpo: '0 (zero financial transaction loss)',
        rto: '< 5 minutes on AZ failure, < 30 minutes on Regional failure',
        budget: 'Optimize with caching to avoid over-provisioned database instances'
      }
    },
    stages: [
      {
        stageNumber: 1,
        stageName: 'Step 1: Ingress & Caching Strategy',
        prompt: 'How will you absorb the 90% read-heavy product catalog traffic before it reaches your backend databases?',
        options: [
          {
            id: '1a',
            label: 'Route all requests directly to an Auto Scaling EC2 fleet with direct PostgreSQL queries',
            details: 'Scale the database up to a massive 128 vCPU instance to handle all read queries.',
            score: 2,
            feedback: 'Anti-pattern: Sending 100k RPS directly to a relational database causes database connection pool exhaustion and crashes under flash sale spikes.'
          },
          {
            id: '1b',
            label: 'Deploy Global CDN (CloudFront/Cloud CDN) + Multi-AZ In-Memory Cache (Redis/ElastiCache) in front of Read Replicas',
            details: 'Edge CDN caches static product images and HTML; Redis caches product catalog JSON with TTL; read replicas handle cache-misses.',
            score: 10,
            feedback: 'Excellent! Offloading 90% of reads to CDN and Redis protects the database tier and keeps API response times under 15ms.'
          },
          {
            id: '1c',
            label: 'Store the entire product catalog in browser local storage for every user',
            details: 'Download the entire 100,000 item inventory on first visit.',
            score: 1,
            feedback: 'Unrealistic: High payload size, stalls initial page load, and causes stale out-of-stock data.'
          }
        ]
      },
      {
        stageNumber: 2,
        stageName: 'Step 2: Database Tier & Transaction Safety',
        prompt: 'How will you guarantee ACID compliance for checkout while preventing database bottlenecks during order placement?',
        options: [
          {
            id: '2a',
            label: 'Multi-AZ Amazon Aurora Serverless v2 / Azure SQL Managed Instance with Read Replicas and Asynchronous SQS/Service Bus Queue for Fulfillment',
            details: 'ACID transactions happen on Aurora Primary; read queries route to Aurora Reader Endpoint; payment confirmation pushes order message to SQS for async inventory/shipping processing.',
            score: 10,
            feedback: 'Top-tier architecture! Decoupling checkout placement from asynchronous background fulfillment ensures the database never locks up.'
          },
          {
            id: '2b',
            label: 'Single MySQL database instance on an EC2 instance in a public subnet',
            details: 'Keep everything simple on one big server.',
            score: 1,
            feedback: 'Critical failure: Single point of failure, zero high availability, vulnerable to public exploits.'
          }
        ]
      },
      {
        stageNumber: 3,
        stageName: 'Step 3: Disaster Recovery & Regional Failover',
        prompt: 'What is your strategy if the primary AWS/Azure/GCP region experiences a catastrophic power grid collapse?',
        options: [
          {
            id: '3a',
            label: 'Pilot Light / Warm Standby in a secondary region with automated cross-region database replication and Route 53 / Global Anycast DNS failover',
            details: 'Secondary region maintains scaled-down compute and continuous cross-region read replication. In a disaster, Route 53 health check flips DNS and Auto Scaling expands the secondary compute fleet.',
            score: 10,
            feedback: 'Outstanding! Meets RTO < 30 minutes and RPO < 1 minute while keeping secondary region idle compute costs minimal.'
          },
          {
            id: '3b',
            label: 'Restore from nightly backup tape archive after the primary region comes back online',
            details: 'Wait for primary region to recover then manually import SQL dump.',
            score: 2,
            feedback: 'Violates RTO and RPO requirements completely; results in 24 hours of lost transactions.'
          }
        ]
      }
    ],
    modelArchitectureSummary: `
1. Edge Tier: Amazon CloudFront / Azure Front Door with WAF rules blocking DDoS and SQL injection.
2. Ingress Tier: Multi-AZ Application Load Balancer terminating TLS 1.3.
3. Compute Tier: Elastic Kubernetes Service (EKS) / AKS across 3 Availability Zones with Horizontal Pod Autoscaler (HPA) and Karpenter.
4. Caching Tier: Redis Cluster (ElastiCache / Azure Redis) in Multi-AZ configuration for catalog caching.
5. Database Tier: Amazon Aurora PostgreSQL Multi-AZ with automated failover and 3 auto-scaling read replicas.
6. Decoupling: Amazon SQS queue buffering orders for asynchronous payment processing and warehouse event streams.
7. DR Strategy: Cross-Region Aurora Read Replica in secondary region (Pilot Light DR) with Route 53 health-check DNS failover.
    `,
    architecturalDefense: 'By separating read traffic (handled by CDN and Redis) from write traffic (handled by Multi-AZ Aurora with SQS buffering), we eliminate database locks. In the event of an AZ outage, Aurora fails over in <30 seconds with 0 data loss. In a regional disaster, our Pilot Light cross-region replica can be promoted in under 5 minutes.'
  }
];

export const interviewQuestionBank = [
  {
    id: 'q1',
    category: 'Architecture',
    difficulty: 'Senior',
    question: 'Why would you choose an asynchronous event-driven architecture with SQS/PubSub over synchronous REST microservice calls?',
    answer: 'Synchronous REST calls create tight temporal coupling, cascading failures, and thread blocking: if Service C is slow or down, Service A and B fail. An asynchronous queue decouples the producer from the consumer, acts as a shock absorber during traffic spikes (buffering bursts without dropping requests), and enables independent scaling and resilient retries with Dead Letter Queues (DLQs).'
  },
  {
    id: 'q2',
    category: 'Networking',
    difficulty: 'Intermediate',
    question: 'How do you prevent IP exhaustion in large AWS/Azure/GCP Kubernetes clusters?',
    answer: 'In AWS EKS with VPC CNI, pods consume secondary private IPs from the VPC subnet. To prevent exhaustion: (1) Allocate a secondary non-routable CIDR block (e.g. 100.64.0.0/10 CGNAT) for pod subnets; (2) In Azure AKS, use Azure CNI Overlay or Cilium; (3) In GCP GKE, use VPC-native clusters with custom alias IP secondary ranges.'
  },
  {
    id: 'q3',
    category: 'Security',
    difficulty: 'Senior',
    question: 'How does an EC2 instance or Azure VM obtain temporary credentials without storing keys in files or environment variables?',
    answer: 'Via the Instance Metadata Service (IMDSv2 at 169.254.169.254 in AWS, or 169.254.169.254 in Azure). When an IAM Role or Managed Identity is attached, the AWS/Azure SDK queries the local link-local IMDS endpoint. The cloud control plane verifies the VM\'s identity and issues a short-lived cryptographically signed token that is refreshed automatically.'
  },
  {
    id: 'q4',
    category: 'Multi-Cloud',
    difficulty: 'Principal',
    question: 'When is multi-cloud architecture justified, and when is it an expensive architectural anti-pattern?',
    answer: 'Justified when: (1) Mandatory regulatory compliance requires vendor diversification (e.g. EU DORA for financial institutions); (2) Unique best-of-breed capabilities (e.g. GCP BigQuery for analytics + AWS for core infrastructure); (3) M&A integration where companies already operate on different clouds. Anti-pattern when: Attempting active-active cross-cloud synchronous workloads without business need, which incurs massive cross-cloud egress costs, complex networking latency, fractured IAM, and lowest-common-denominator feature lock-in.'
  },
  {
    id: 'q5',
    category: 'Disaster Recovery',
    difficulty: 'Senior',
    question: 'What is the difference between RPO and RTO, and how do they determine your cloud disaster recovery pattern?',
    answer: 'RPO (Recovery Point Objective) is the maximum acceptable data loss measured in time (e.g. "we can lose at most 5 minutes of data"). RTO (Recovery Time Objective) is the maximum acceptable downtime to restore service (e.g. "the site must be back online within 15 minutes"). A low RPO (<1s) demands synchronous multi-AZ or low-lag cross-region replication. A low RTO (<5min) requires Pilot Light, Warm Standby, or Multi-Region Active/Active, whereas higher RTOs (hours) can use cheap Backup & Restore.'
  }
];

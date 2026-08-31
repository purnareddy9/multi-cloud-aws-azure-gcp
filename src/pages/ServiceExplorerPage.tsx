import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Cpu, Network, Shield, HardDrive, Database, 
  Layers, Zap, Globe, ArrowRight, ExternalLink, Sparkles, Terminal
} from 'lucide-react';

interface ServiceDefinition {
  id: string;
  name: string;
  cloud: 'aws' | 'azure' | 'gcp';
  category: 'Compute' | 'Networking' | 'Storage' | 'Databases' | 'Security' | 'Kubernetes' | 'Serverless';
  shortDesc: string;
  equivalentService: string;
  learnPath: string;
  tags: string[];
}

const serviceCatalog: ServiceDefinition[] = [
  // Compute
  {
    id: 'aws-ec2',
    name: 'AWS EC2',
    cloud: 'aws',
    category: 'Compute',
    shortDesc: 'Scalable virtual compute instances with Graviton ARM support and Auto Scaling Groups.',
    equivalentService: 'Azure Virtual Machines | GCP Compute Engine',
    learnPath: '/aws/compute',
    tags: ['vm', 'compute', 'virtual machine', 'ec2', 'asg']
  },
  {
    id: 'azure-vm',
    name: 'Azure Virtual Machines',
    cloud: 'azure',
    category: 'Compute',
    shortDesc: 'Enterprise Windows/Linux VMs with VM Scale Sets (VMSS) and Azure Hybrid Benefit.',
    equivalentService: 'AWS EC2 | GCP Compute Engine',
    learnPath: '/azure/compute',
    tags: ['vm', 'compute', 'virtual machine', 'vmss', 'windows']
  },
  {
    id: 'gcp-gce',
    name: 'GCP Compute Engine',
    cloud: 'gcp',
    category: 'Compute',
    shortDesc: 'High-performance VMs with Custom Machine Types and live hardware migration.',
    equivalentService: 'AWS EC2 | Azure Virtual Machines',
    learnPath: '/gcp/compute',
    tags: ['vm', 'compute', 'gce', 'custom machine types', 'mig']
  },

  // Networking
  {
    id: 'aws-vpc',
    name: 'AWS VPC',
    cloud: 'aws',
    category: 'Networking',
    shortDesc: 'Regional private cloud network with AZ-specific subnets, NAT Gateways, and Security Groups.',
    equivalentService: 'Azure VNet | GCP Global VPC',
    learnPath: '/aws/networking',
    tags: ['vpc', 'network', 'cidr', 'subnet', 'nat gateway']
  },
  {
    id: 'azure-vnet',
    name: 'Azure Virtual Network (VNet)',
    cloud: 'azure',
    category: 'Networking',
    shortDesc: 'Regional private network where subnets span all Availability Zones with NSG firewalls.',
    equivalentService: 'AWS VPC | GCP Global VPC',
    learnPath: '/azure/networking',
    tags: ['vnet', 'network', 'nsg', 'subnet', 'private link']
  },
  {
    id: 'gcp-vpc',
    name: 'GCP Global VPC',
    cloud: 'gcp',
    category: 'Networking',
    shortDesc: 'Natively Global VPC spanning all world regions with private fiber routing and Anycast LB.',
    equivalentService: 'AWS VPC | Azure VNet',
    learnPath: '/gcp/networking',
    tags: ['global vpc', 'network', 'anycast', 'cloud armor']
  },

  // Storage
  {
    id: 'aws-s3',
    name: 'AWS S3',
    cloud: 'aws',
    category: 'Storage',
    shortDesc: 'Industry-standard object store with 11 9s durability, Intelligent-Tiering, and Glacier.',
    equivalentService: 'Azure Blob Storage | GCP Cloud Storage',
    learnPath: '/aws/storage',
    tags: ['s3', 'storage', 'object storage', 'glacier', 'buckets']
  },
  {
    id: 'azure-blob',
    name: 'Azure Blob Storage',
    cloud: 'azure',
    category: 'Storage',
    shortDesc: 'Object storage with Hot/Cool/Archive tiers, immutable WORM storage, and ADLS Gen2.',
    equivalentService: 'AWS S3 | GCP Cloud Storage',
    learnPath: '/azure/storage',
    tags: ['blob', 'storage', 'adls', 'data lake', 'immutable']
  },
  {
    id: 'gcp-gcs',
    name: 'Google Cloud Storage (GCS)',
    cloud: 'gcp',
    category: 'Storage',
    shortDesc: 'Unified global object storage with Dual-Region high availability and turbo replication.',
    equivalentService: 'AWS S3 | Azure Blob Storage',
    learnPath: '/gcp/fundamentals',
    tags: ['gcs', 'cloud storage', 'buckets', 'dual-region']
  },

  // Databases
  {
    id: 'aws-rds',
    name: 'AWS RDS & Aurora',
    cloud: 'aws',
    category: 'Databases',
    shortDesc: 'Cloud-native PostgreSQL/MySQL with distributed storage, 5x speed, and sub-30s failover.',
    equivalentService: 'Azure SQL Managed Instance | GCP Cloud SQL & Spanner',
    learnPath: '/aws/databases',
    tags: ['rds', 'aurora', 'sql', 'database', 'postgres', 'mysql']
  },
  {
    id: 'azure-sql',
    name: 'Azure SQL & Cosmos DB',
    cloud: 'azure',
    category: 'Databases',
    shortDesc: 'Managed SQL Server with Elastic Pools and Cosmos DB Multi-Region Active/Active NoSQL.',
    equivalentService: 'AWS Aurora & DynamoDB | GCP Cloud Spanner & Firestore',
    learnPath: '/azure/databases',
    tags: ['azure sql', 'cosmos db', 'sql server', 'nosql', 'multi-region']
  },
  {
    id: 'gcp-spanner',
    name: 'GCP Cloud Spanner & Cloud SQL',
    cloud: 'gcp',
    category: 'Databases',
    shortDesc: 'Globally distributed ACID relational database powered by atomic TrueTime clocks with 99.999% SLA.',
    equivalentService: 'AWS Aurora Global | Azure Cosmos DB Strong Consistency',
    learnPath: '/gcp/fundamentals',
    tags: ['spanner', 'cloud sql', 'truetime', 'acid', 'database']
  },

  // Kubernetes
  {
    id: 'aws-eks',
    name: 'AWS EKS',
    cloud: 'aws',
    category: 'Kubernetes',
    shortDesc: 'Managed Kubernetes control plane with VPC CNI, EKS Pod Identity, and Karpenter autoscaler.',
    equivalentService: 'Azure AKS | GCP GKE',
    learnPath: '/aws/kubernetes',
    tags: ['eks', 'kubernetes', 'karpenter', 'containers', 'k8s']
  },
  {
    id: 'azure-aks',
    name: 'Azure Kubernetes Service (AKS)',
    cloud: 'azure',
    category: 'Kubernetes',
    shortDesc: 'Free managed Kubernetes control plane with Cilium eBPF CNI, KEDA autoscaler, and Entra Workload Identity.',
    equivalentService: 'AWS EKS | GCP GKE',
    learnPath: '/azure/kubernetes',
    tags: ['aks', 'kubernetes', 'cilium', 'keda', 'k8s']
  },
  {
    id: 'gcp-gke',
    name: 'Google Kubernetes Engine (GKE)',
    cloud: 'gcp',
    category: 'Kubernetes',
    shortDesc: 'Gold standard managed Kubernetes with GKE Autopilot (zero node management) and multi-cluster ingress.',
    equivalentService: 'AWS EKS | Azure AKS',
    learnPath: '/gcp/kubernetes',
    tags: ['gke', 'kubernetes', 'autopilot', 'containers', 'k8s']
  },

  // Serverless
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    cloud: 'aws',
    category: 'Serverless',
    shortDesc: 'Event-driven serverless functions scaling to thousands of executions with RDS Proxy support.',
    equivalentService: 'Azure Functions | GCP Cloud Run',
    learnPath: '/aws/serverless',
    tags: ['lambda', 'serverless', 'api gateway', 'eventbridge']
  },
  {
    id: 'azure-functions',
    name: 'Azure Functions',
    cloud: 'azure',
    category: 'Serverless',
    shortDesc: 'Event-driven serverless compute with Durable Functions stateful orchestration and VNet integration.',
    equivalentService: 'AWS Lambda | GCP Cloud Functions',
    learnPath: '/azure/identity',
    tags: ['functions', 'serverless', 'durable functions', 'event grid']
  },
  {
    id: 'gcp-cloudrun',
    name: 'Google Cloud Run',
    cloud: 'gcp',
    category: 'Serverless',
    shortDesc: 'Serverless Docker container execution with multi-concurrency (up to 1,000 reqs/instance) and scale-to-zero.',
    equivalentService: 'AWS App Runner / Lambda | Azure Container Apps',
    learnPath: '/gcp/serverless',
    tags: ['cloud run', 'serverless', 'docker', 'containers', 'concurrency']
  }
];

export const ServiceExplorerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCloud, setSelectedCloud] = useState<'all' | 'aws' | 'azure' | 'gcp'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Compute', 'Networking', 'Storage', 'Databases', 'Kubernetes', 'Serverless'];

  const filteredServices = useMemo(() => {
    return serviceCatalog.filter(svc => {
      const matchesCloud = selectedCloud === 'all' || svc.cloud === selectedCloud;
      const matchesCategory = selectedCategory === 'all' || svc.category === selectedCategory;
      const matchesQuery = 
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.equivalentService.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCloud && matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCloud, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
              <Search className="w-3.5 h-3.5" /> Interactive Service Registry
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-100">Global Cloud Service Explorer</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Search, compare, and explore equivalent services across AWS, Microsoft Azure, and Google Cloud Platform.
            </p>
          </div>

          <Link
            to="/lab"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Terminal className="w-4 h-4" /> Open in Architecture Lab
          </Link>
        </div>

        {/* Live Search Input */}
        <div className="mt-6 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by service name (EC2, VPC, Kubernetes, S3, Spanner, Blob, Lambda)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 shadow-inner"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-800/80">
          {/* Cloud Provider Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            {[
              { id: 'all', label: 'All Clouds' },
              { id: 'aws', label: 'AWS', color: 'text-amber-400' },
              { id: 'azure', label: 'Azure', color: 'text-blue-400' },
              { id: 'gcp', label: 'GCP', color: 'text-sky-400' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCloud(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCloud === tab.id
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={tab.color}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const isAws = service.cloud === 'aws';
          const isAzure = service.cloud === 'azure';
          const isGcp = service.cloud === 'gcp';

          return (
            <div
              key={service.id}
              className={`p-6 rounded-2xl bg-slate-900/90 border transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                isAws ? 'border-amber-500/30 hover:border-amber-500/60 hover:shadow-amber-950/20' :
                isAzure ? 'border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-950/20' :
                'border-sky-500/30 hover:border-sky-500/60 hover:shadow-sky-950/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${
                    isAws ? 'bg-amber-950/60 text-amber-400 border-amber-500/30' :
                    isAzure ? 'bg-blue-950/60 text-blue-400 border-blue-500/30' :
                    'bg-sky-950/60 text-sky-400 border-sky-500/30'
                  }`}>
                    {service.cloud.toUpperCase()} • {service.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">16-Point Deep Dive</span>
                </div>

                <h3 className="text-xl font-black text-slate-100">{service.name}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{service.shortDesc}</p>

                {/* Cloud Equivalent Preview */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Equivalent Cloud Services:
                  </span>
                  <div className="text-xs text-cyan-300 font-medium">{service.equivalentService}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <Link
                  to={service.learnPath}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
                >
                  Learn Service <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </Link>
                <Link
                  to="/lab"
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-all"
                  title="Design in Architecture Lab"
                >
                  <Terminal className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
          <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <div className="text-sm font-bold text-slate-300">No matching cloud services found</div>
          <p className="text-xs text-slate-400 mt-1">Try searching for keywords like EC2, VPC, Kubernetes, S3, or Storage.</p>
        </div>
      )}
    </div>
  );
};

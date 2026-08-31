import React, { useState } from 'react';
import { CloudProvider } from '../../types';
import { Plus, Server, Database, Globe, HardDrive, Shield, Radio, Cpu, Layers } from 'lucide-react';

interface PaletteItem {
  provider: CloudProvider;
  serviceType: string;
  category: 'compute' | 'storage' | 'database' | 'network' | 'security' | 'gateway' | 'dns' | 'cache';
  defaultLabel: string;
  isMultiAz?: boolean;
  isEncrypted?: boolean;
  isPrivate?: boolean;
  hasReplication?: boolean;
}

const paletteItems: PaletteItem[] = [
  // AWS Components
  { provider: 'aws', serviceType: 'Application Load Balancer (ALB)', category: 'gateway', defaultLabel: 'AWS ALB', isMultiAz: true, isPrivate: false },
  { provider: 'aws', serviceType: 'EC2 Auto Scaling Group', category: 'compute', defaultLabel: 'AWS EC2 ASG', isMultiAz: true, isPrivate: true },
  { provider: 'aws', serviceType: 'Amazon EKS (Kubernetes)', category: 'compute', defaultLabel: 'AWS EKS', isMultiAz: true, isPrivate: true },
  { provider: 'aws', serviceType: 'AWS Lambda (Serverless)', category: 'compute', defaultLabel: 'AWS Lambda', isMultiAz: true, isPrivate: true },
  { provider: 'aws', serviceType: 'Amazon RDS PostgreSQL', category: 'database', defaultLabel: 'RDS Multi-AZ', isMultiAz: true, isEncrypted: true, isPrivate: true, hasReplication: true },
  { provider: 'aws', serviceType: 'Amazon DynamoDB', category: 'database', defaultLabel: 'DynamoDB Global', isMultiAz: true, isEncrypted: true, hasReplication: true },
  { provider: 'aws', serviceType: 'Amazon S3 Bucket', category: 'storage', defaultLabel: 'S3 Standard', isEncrypted: true, isPrivate: true },
  { provider: 'aws', serviceType: 'Amazon Route 53 (DNS)', category: 'dns', defaultLabel: 'Route 53 DNS', isMultiAz: true, isPrivate: false },
  { provider: 'aws', serviceType: 'ElastiCache Redis', category: 'cache', defaultLabel: 'Redis Cluster', isMultiAz: true, isPrivate: true },

  // Azure Components
  { provider: 'azure', serviceType: 'Azure Application Gateway', category: 'gateway', defaultLabel: 'Azure App Gateway', isMultiAz: true, isPrivate: false },
  { provider: 'azure', serviceType: 'Azure Virtual Machines (VMSS)', category: 'compute', defaultLabel: 'Azure VMSS', isMultiAz: true, isPrivate: true },
  { provider: 'azure', serviceType: 'Azure Kubernetes Service (AKS)', category: 'compute', defaultLabel: 'Azure AKS', isMultiAz: true, isPrivate: true },
  { provider: 'azure', serviceType: 'Azure Functions', category: 'compute', defaultLabel: 'Azure Functions', isMultiAz: true, isPrivate: true },
  { provider: 'azure', serviceType: 'Azure SQL Database', category: 'database', defaultLabel: 'Azure SQL MI', isMultiAz: true, isEncrypted: true, isPrivate: true },
  { provider: 'azure', serviceType: 'Azure Cosmos DB', category: 'database', defaultLabel: 'Cosmos DB', isMultiAz: true, isEncrypted: true, hasReplication: true },
  { provider: 'azure', serviceType: 'Azure Blob Storage', category: 'storage', defaultLabel: 'Azure Blob', isEncrypted: true, isPrivate: true },
  { provider: 'azure', serviceType: 'Azure Key Vault', category: 'security', defaultLabel: 'Key Vault', isEncrypted: true, isPrivate: true },

  // GCP Components
  { provider: 'gcp', serviceType: 'Cloud Load Balancing (Anycast)', category: 'gateway', defaultLabel: 'GCP Global LB', isMultiAz: true, isPrivate: false },
  { provider: 'gcp', serviceType: 'Compute Engine (MIG)', category: 'compute', defaultLabel: 'GCP Compute MIG', isMultiAz: true, isPrivate: true },
  { provider: 'gcp', serviceType: 'Google Kubernetes Engine (GKE)', category: 'compute', defaultLabel: 'GKE Autopilot', isMultiAz: true, isPrivate: true },
  { provider: 'gcp', serviceType: 'Google Cloud Run', category: 'compute', defaultLabel: 'Cloud Run', isMultiAz: true, isPrivate: true },
  { provider: 'gcp', serviceType: 'Google Cloud SQL', category: 'database', defaultLabel: 'Cloud SQL HA', isMultiAz: true, isEncrypted: true, isPrivate: true },
  { provider: 'gcp', serviceType: 'Google Cloud Spanner', category: 'database', defaultLabel: 'Cloud Spanner', isMultiAz: true, isEncrypted: true, hasReplication: true },
  { provider: 'gcp', serviceType: 'Google Cloud Storage (GCS)', category: 'storage', defaultLabel: 'GCS Dual-Region', isEncrypted: true, isPrivate: true },
  { provider: 'gcp', serviceType: 'Cloud Armor (WAF)', category: 'security', defaultLabel: 'Cloud Armor', isPrivate: false },

  // Generic / Multi-Cloud Transit
  { provider: 'general', serviceType: 'Global DNS / Cloudflare', category: 'dns', defaultLabel: 'Global DNS', isPrivate: false },
  { provider: 'general', serviceType: 'Inter-Cloud IPSec VPN / Gateway', category: 'network', defaultLabel: 'Cloud VPN Tunnel', isEncrypted: true, isPrivate: true }
];

interface NodePaletteProps {
  onAddNode: (item: PaletteItem) => void;
}

export const NodePalette: React.FC<NodePaletteProps> = ({ onAddNode }) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'aws' | 'azure' | 'gcp' | 'general'>('all');

  const filtered = selectedTab === 'all' 
    ? paletteItems 
    : paletteItems.filter(p => p.provider === selectedTab);

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" /> Component Palette
        </h3>
      </div>

      {/* Cloud Filter Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-slate-950/70 rounded-lg mb-3 text-xs font-semibold">
        {(['all', 'aws', 'azure', 'gcp', 'general'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`py-1 rounded capitalize transition-colors ${
              selectedTab === tab
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Component Grid */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onAddNode(item)}
            className="group flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className={`p-1.5 rounded-md text-xs font-bold border ${
                item.provider === 'aws' ? 'bg-amber-950/50 text-amber-400 border-amber-500/30' :
                item.provider === 'azure' ? 'bg-blue-950/50 text-blue-400 border-blue-500/30' :
                item.provider === 'gcp' ? 'bg-sky-950/50 text-sky-400 border-sky-500/30' :
                'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {item.provider.toUpperCase()}
              </div>
              <div className="truncate">
                <div className="text-xs font-medium text-slate-200 truncate group-hover:text-cyan-300">
                  {item.defaultLabel}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {item.serviceType}
                </div>
              </div>
            </div>
            <button className="p-1 rounded bg-slate-800 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/50 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="pt-2 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400 text-center">
        Click any component to place on canvas
      </div>
    </div>
  );
};

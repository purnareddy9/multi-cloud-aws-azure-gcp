import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ArchitectureNodeData } from '../../types';
import { 
  Server, Database, Shield, Globe, HardDrive, 
  Cpu, Layers, Zap, Key, Radio, Lock, Eye, EyeOff
} from 'lucide-react';

const getCategoryIcon = (category: string, serviceType: string) => {
  const s = serviceType.toLowerCase();
  if (s.includes('lambda') || s.includes('functions') || s.includes('run')) return <Zap className="w-5 h-5" />;
  if (s.includes('k8s') || s.includes('eks') || s.includes('aks') || s.includes('gke')) return <Layers className="w-5 h-5" />;
  if (category === 'compute') return <Cpu className="w-5 h-5" />;
  if (category === 'database') return <Database className="w-5 h-5" />;
  if (category === 'storage') return <HardDrive className="w-5 h-5" />;
  if (category === 'gateway' || category === 'dns') return <Globe className="w-5 h-5" />;
  if (category === 'security') return <Shield className="w-5 h-5" />;
  if (category === 'cache') return <Radio className="w-5 h-5" />;
  return <Server className="w-5 h-5" />;
};

const getProviderBadge = (provider: string) => {
  switch (provider) {
    case 'aws':
      return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">AWS</span>;
    case 'azure':
      return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">AZURE</span>;
    case 'gcp':
      return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">GCP</span>;
    default:
      return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-500/20 text-slate-300 border border-slate-500/30">GENERIC</span>;
  }
};

const getBorderColor = (provider: string) => {
  switch (provider) {
    case 'aws': return 'border-amber-500/50 hover:border-amber-400 shadow-amber-500/10';
    case 'azure': return 'border-blue-500/50 hover:border-blue-400 shadow-blue-500/10';
    case 'gcp': return 'border-sky-500/50 hover:border-sky-400 shadow-sky-500/10';
    default: return 'border-slate-600 hover:border-slate-400 shadow-slate-500/10';
  }
};

export const CustomCloudNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as ArchitectureNodeData;
  const isSelected = selected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : '';

  return (
    <div className={`relative min-w-[200px] max-w-[240px] rounded-xl bg-slate-900/95 border backdrop-blur-md p-3.5 shadow-xl transition-all ${getBorderColor(nodeData.provider)} ${isSelected}`}>
      {/* React Flow Handles for Connecting Edges */}
      <Handle type="target" position={Position.Top} className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900" />
      <Handle type="target" position={Position.Left} className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
            {getCategoryIcon(nodeData.category, nodeData.serviceType)}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 truncate max-w-[110px]" title={nodeData.label}>
              {nodeData.label}
            </div>
            <div className="text-[10px] text-slate-400 truncate max-w-[110px]" title={nodeData.serviceType}>
              {nodeData.serviceType}
            </div>
          </div>
        </div>
        {getProviderBadge(nodeData.provider)}
      </div>

      {/* Configuration Badges */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
        {nodeData.isMultiAz && (
          <span className="inline-flex items-center text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30" title="Deployed across Multiple Availability Zones">
            Multi-AZ
          </span>
        )}
        {nodeData.isEncrypted ? (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30" title="Encrypted at rest with KMS">
            <Lock className="w-2.5 h-2.5" /> Encrypted
          </span>
        ) : (
          <span className="inline-flex items-center text-[9px] font-medium px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30" title="No encryption detected">
            No SSE
          </span>
        )}
        {nodeData.isPrivate ? (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1.5 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30" title="Isolated in Private Subnet">
            <EyeOff className="w-2.5 h-2.5" /> Private
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30" title="Publicly accessible / Ingress tier">
            <Eye className="w-2.5 h-2.5" /> Public
          </span>
        )}
        {nodeData.hasReplication && (
          <span className="inline-flex items-center text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
            Replication
          </span>
        )}
      </div>
    </div>
  );
});

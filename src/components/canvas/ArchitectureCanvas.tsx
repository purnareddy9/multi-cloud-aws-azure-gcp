import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

import { CustomCloudNode } from './CustomCloudNode';
import { NodePalette } from './NodePalette';
import { ArchitectureValidator } from './ArchitectureValidator';
import { evaluateArchitecture } from '../../lib/architectureEvaluator';
import { saveArchitectureToStorage } from '../../lib/progressStore';
import { ArchitectureScorecard } from '../../types';
import { 
  Play, Download, Save, RefreshCw, Trash2, 
  Sparkles, Layers, Check, LayoutTemplate
} from 'lucide-react';

const nodeTypes = {
  cloudNode: CustomCloudNode,
};

// Pre-built Architecture Templates
const templates = {
  threeTier: {
    name: 'AWS 3-Tier Multi-AZ HA',
    nodes: [
      { id: '1', type: 'cloudNode', position: { x: 350, y: 30 }, data: { label: 'Route 53 DNS', provider: 'aws', serviceType: 'DNS / CDN', category: 'dns', isMultiAz: true, isPrivate: false } },
      { id: '2', type: 'cloudNode', position: { x: 350, y: 150 }, data: { label: 'AWS ALB', provider: 'aws', serviceType: 'Application Load Balancer', category: 'gateway', isMultiAz: true, isPrivate: false } },
      { id: '3', type: 'cloudNode', position: { x: 180, y: 280 }, data: { label: 'EC2 App AZ-1', provider: 'aws', serviceType: 'EC2 ASG', category: 'compute', isMultiAz: true, isPrivate: true } },
      { id: '4', type: 'cloudNode', position: { x: 520, y: 280 }, data: { label: 'EC2 App AZ-2', provider: 'aws', serviceType: 'EC2 ASG', category: 'compute', isMultiAz: true, isPrivate: true } },
      { id: '5', type: 'cloudNode', position: { x: 350, y: 420 }, data: { label: 'Redis Cache', provider: 'aws', serviceType: 'ElastiCache Redis', category: 'cache', isMultiAz: true, isPrivate: true } },
      { id: '6', type: 'cloudNode', position: { x: 350, y: 550 }, data: { label: 'RDS PostgreSQL Multi-AZ', provider: 'aws', serviceType: 'RDS Multi-AZ', category: 'database', isMultiAz: true, isEncrypted: true, isPrivate: true, hasReplication: true } },
      { id: '7', type: 'cloudNode', position: { x: 620, y: 550 }, data: { label: 'S3 Media Storage', provider: 'aws', serviceType: 'S3 Standard', category: 'storage', isEncrypted: true, isPrivate: true } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', label: 'HTTPS 443' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e4-7', source: '4', target: '7' }
    ]
  },
  multiCloudDR: {
    name: 'Multi-Cloud AWS + Azure DR',
    nodes: [
      { id: '1', type: 'cloudNode', position: { x: 360, y: 30 }, data: { label: 'Global Traffic Mgr', provider: 'general', serviceType: 'Global DNS', category: 'dns', isPrivate: false } },
      { id: '2', type: 'cloudNode', position: { x: 160, y: 160 }, data: { label: 'AWS ALB Primary', provider: 'aws', serviceType: 'ALB', category: 'gateway', isMultiAz: true, isPrivate: false } },
      { id: '3', type: 'cloudNode', position: { x: 560, y: 160 }, data: { label: 'Azure App Gateway DR', provider: 'azure', serviceType: 'App Gateway', category: 'gateway', isMultiAz: true, isPrivate: false } },
      { id: '4', type: 'cloudNode', position: { x: 160, y: 300 }, data: { label: 'AWS EKS Primary', provider: 'aws', serviceType: 'EKS Cluster', category: 'compute', isMultiAz: true, isPrivate: true } },
      { id: '5', type: 'cloudNode', position: { x: 560, y: 300 }, data: { label: 'Azure AKS Standby', provider: 'azure', serviceType: 'AKS Cluster', category: 'compute', isMultiAz: true, isPrivate: true } },
      { id: '6', type: 'cloudNode', position: { x: 160, y: 460 }, data: { label: 'AWS Aurora Primary', provider: 'aws', serviceType: 'Aurora PostgreSQL', category: 'database', isMultiAz: true, isEncrypted: true, isPrivate: true } },
      { id: '7', type: 'cloudNode', position: { x: 360, y: 460 }, data: { label: 'IPSec Cloud VPN', provider: 'general', serviceType: 'Inter-Cloud Tunnel', category: 'network', isEncrypted: true, isPrivate: true } },
      { id: '8', type: 'cloudNode', position: { x: 560, y: 460 }, data: { label: 'Azure SQL Standby', provider: 'azure', serviceType: 'Flexible PostgreSQL', category: 'database', isMultiAz: true, isEncrypted: true, isPrivate: true, hasReplication: true } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', label: '100% Primary' },
      { id: 'e1-3', source: '1', target: '3', label: 'Failover' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-8', source: '5', target: '8' },
      { id: 'e6-7', source: '6', target: '7', label: 'CDC stream' },
      { id: 'e7-8', source: '7', target: '8', label: 'Replication' }
    ]
  }
};

export const ArchitectureCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(templates.threeTier.nodes);
  const [edges, setEdges] = useState<Edge[]>(templates.threeTier.edges);
  const [scorecard, setScorecard] = useState<ArchitectureScorecard | null>(null);
  const [showValidator, setShowValidator] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [archName, setArchName] = useState('My Cloud Architecture');

  const canvasRef = useRef<HTMLDivElement>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, animated: true, style: { stroke: '#38bdf8' } }, eds)),
    []
  );

  const handleAddNodeFromPalette = (item: any) => {
    const id = `node_${Date.now()}`;
    const newNode: Node = {
      id,
      type: 'cloudNode',
      position: { x: 300 + Math.random() * 80, y: 200 + Math.random() * 80 },
      data: {
        label: item.defaultLabel,
        provider: item.provider,
        serviceType: item.serviceType,
        category: item.category,
        isMultiAz: !!item.isMultiAz,
        isEncrypted: !!item.isEncrypted,
        isPrivate: !!item.isPrivate,
        hasReplication: !!item.hasReplication
      }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleRunEvaluation = () => {
    // Run evaluation engine
    const res = evaluateArchitecture(nodes as any, edges as any);
    setScorecard(res);
    setShowValidator(true);

    if (res.overallScore >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSaveArchitecture = () => {
    const res = evaluateArchitecture(nodes as any, edges as any);
    saveArchitectureToStorage(archName, nodes, edges, res.overallScore);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExportPNG = () => {
    if (!canvasRef.current) return;
    const reactFlowElement = canvasRef.current.querySelector('.react-flow__viewport') as HTMLElement;
    if (!reactFlowElement) return;

    toPng(reactFlowElement, {
      backgroundColor: '#030712',
      quality: 0.95
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `${archName.toLowerCase().replace(/\s+/g, '-')}-architecture.png`;
      link.href = dataUrl;
      link.click();
    }).catch(err => {
      console.error('Failed to export canvas', err);
    });
  };

  const handleLoadTemplate = (templateKey: 'threeTier' | 'multiCloudDR') => {
    const tpl = templates[templateKey];
    setNodes(tpl.nodes);
    setEdges(tpl.edges);
    setArchName(tpl.name);
    setScorecard(null);
    setShowValidator(false);
  };

  const handleClearCanvas = () => {
    setNodes([]);
    setEdges([]);
    setScorecard(null);
    setShowValidator(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-950">
      {/* Top Action Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 z-10">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={archName}
            onChange={(e) => setArchName(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-semibold text-slate-100 focus:outline-none focus:border-cyan-400 min-w-[240px]"
          />
          {/* Template Dropdown / Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <LayoutTemplate className="w-3.5 h-3.5" /> Templates:
            </span>
            <button
              onClick={() => handleLoadTemplate('threeTier')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
            >
              AWS 3-Tier HA
            </button>
            <button
              onClick={() => handleLoadTemplate('multiCloudDR')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
            >
              Multi-Cloud DR
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunEvaluation}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" /> Evaluate Architecture
          </button>
          <button
            onClick={handleSaveArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 text-cyan-400" />}
            {isSaved ? 'Saved Locally!' : 'Save'}
          </button>
          <button
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
            title="Export Architecture as PNG Image"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" /> Export PNG
          </button>
          <button
            onClick={handleClearCanvas}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace (Palette + Canvas + Validator) */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Left Palette */}
        <div className="w-64 h-full p-2.5 shrink-0 z-10">
          <NodePalette onAddNode={handleAddNodeFromPalette} />
        </div>

        {/* Center React Flow Canvas */}
        <div ref={canvasRef} className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            maxZoom={2}
          >
            <Background color="#1e293b" gap={20} size={1} variant={BackgroundVariant.Dots} />
            <Controls className="!bg-slate-900 !border-slate-800 !text-slate-200" />
          </ReactFlow>
        </div>

        {/* Right Validator Panel */}
        {showValidator && scorecard && (
          <div className="w-96 h-full p-2.5 shrink-0 z-10 transition-all">
            <ArchitectureValidator scorecard={scorecard} onClose={() => setShowValidator(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

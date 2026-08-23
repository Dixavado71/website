import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { NodeProps } from '@xyflow/react';
import type { FlowNodeData } from '../../store/flowStore';
import { useFlowStore } from '../../store/flowStore';
import Sidebar from './Sidebar';
import NodeConfigPanel from './NodeConfigPanel';
import './FlowBuilder.css';

const nodeTypes = {
  custom: CustomNode,
};

function CustomNode({ id, data }: NodeProps) {
  const flowData = data as FlowNodeData;
  const { setSelectedNode } = useFlowStore();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'trigger': return '⚡';
      case 'message': return '💬';
      case 'condition': return '🔀';
      case 'delay': return '⏱️';
      case 'action': return '🔧';
      case 'webhook': return '🌐';
      default: return '📍';
    }
  };

  return (
    <div 
      className={`custom-node ${flowData.type}`}
      onClick={() => setSelectedNode({ id, data: flowData, position: { x: 0, y: 0 }, type: 'custom' } as any)}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
      />
      
      <div className="node-header">
        <span className="node-icon-small">{getIcon(flowData.type)}</span>
        <span className="node-title">{flowData.label}</span>
      </div>
      
      {flowData.config && Object.keys(flowData.config).length > 0 && (
        <div className="node-content">
          {flowData.config.keyword && <p>Palavra-chave: {flowData.config.keyword}</p>}
          {flowData.config.message && <p className="truncate">Msg: {flowData.config.message}</p>}
          {flowData.config.delay && <p>Atraso: {flowData.config.delay}s</p>}
          {flowData.config.url && <p className="truncate">URL: {flowData.config.url}</p>}
        </div>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
      />
    </div>
  );
}

export default function FlowBuilder() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    addNode,
  } = useFlowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as any;
      if (!type) return;

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'custom',
        position,
        data: {
          label: getNodeLabel(type),
          type: type as any,
          config: getDefaultConfig(type),
        } as FlowNodeData,
      };

      addNode(newNode as any);
    },
    [addNode]
  );

  const getNodeLabel = (type: string) => {
    const labels: Record<string, string> = {
      trigger: 'Gatilho',
      message: 'Mensagem',
      condition: 'Condição',
      delay: 'Atraso',
      action: 'Ação',
      webhook: 'Webhook',
    };
    return labels[type] || 'Nó';
  };

  const getDefaultConfig = (type: string) => {
    switch (type) {
      case 'trigger':
        return { triggerType: 'keyword', keyword: '' };
      case 'message':
        return { message: '', mediaUrl: '' };
      case 'condition':
        return { conditions: [] };
      case 'delay':
        return { delay: 5 };
      case 'action':
        return { actionType: 'tag', tagName: '' };
      case 'webhook':
        return { url: '', method: 'POST' };
      default:
        return {};
    }
  };

  return (
    <div className="flow-builder-container">
      {/* Top Bar */}
      <div className="flow-top-bar">
        <div className="flow-title-group">
          <h2>
            <span>🤖</span>
            Flow Builder
          </h2>
          <span>Crie automações visuais para WhatsApp</span>
        </div>
        <div className="flow-actions">
          <button className="action-btn secondary" title="Carregar fluxo">
            📂 Carregar
          </button>
          <button className="action-btn secondary" title="Exportar JSON">
            📤 Exportar
          </button>
          <button className="action-btn primary" title="Salvar fluxo">
            💾 Salvar
          </button>
          <button className="action-btn success" title="Testar fluxo">
            ▶️ Testar
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flow-workspace">
        {/* Barra Lateral de Nós */}
        <Sidebar />
        
        {/* Canvas do React Flow */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes as any}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#cbd5e1', strokeWidth: 2 },
            }}
          >
            <Controls />
            <MiniMap 
              nodeColor={(node: any) => {
                const type = node.data?.type as string;
                const colors: Record<string, string> = {
                  trigger: '#f59e0b',
                  message: '#3b82f6',
                  condition: '#8b5cf6',
                  delay: '#f97316',
                  action: '#10b981',
                  webhook: '#ec4899',
                };
                return colors[type] || '#6b7280';
              }}
            />
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
        
        {/* Painel de Configuração */}
        <NodeConfigPanel />
      </div>
    </div>
  );
}

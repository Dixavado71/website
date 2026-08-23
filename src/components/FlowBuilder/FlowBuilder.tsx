import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore, FlowNodeData } from '../../store/flowStore';

const nodeTypes = {
  custom: CustomNode,
};

function CustomNode({ id, data }: NodeProps) {
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

  const getColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-yellow-500';
      case 'message': return 'bg-blue-500';
      case 'condition': return 'bg-purple-500';
      case 'delay': return 'bg-orange-500';
      case 'action': return 'bg-green-500';
      case 'webhook': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 min-w-[200px] cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => setSelectedNode({ id, data, position: { x: 0, y: 0 }, type: 'custom' })}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-blue-500 !w-3 !h-3"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <div className={`${getColor(data.type)} w-8 h-8 rounded-full flex items-center justify-center text-white`}>
          {getIcon(data.type)}
        </div>
        <span className="font-semibold text-gray-800 dark:text-white">{data.label}</span>
      </div>
      
      {data.config && Object.keys(data.config).length > 0 && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          {data.config.keyword && <p>Palavra-chave: {data.config.keyword}</p>}
          {data.config.message && <p className="truncate">Msg: {data.config.message}</p>}
          {data.config.delay && <p>Atraso: {data.config.delay}s</p>}
        </div>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-blue-500 !w-3 !h-3"
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
    setNodes,
    addNode,
    setSelectedNode,
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

      addNode(newNode);
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
    <div className="w-full h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900">
      <ReactFlow
        nodes={nodes}
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
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        }}
        className="dark:[&_.react-flow__node]:text-white"
      >
        <Controls className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
        <MiniMap 
          nodeColor={(node) => {
            const type = node.data?.type as string;
            const colors: Record<string, string> = {
              trigger: '#eab308',
              message: '#3b82f6',
              condition: '#a855f7',
              delay: '#f97316',
              action: '#22c55e',
              webhook: '#ec4899',
            };
            return colors[type] || '#6b7280';
          }}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
        <Background color="#888" gap={16} />
      </ReactFlow>
    </div>
  );
}

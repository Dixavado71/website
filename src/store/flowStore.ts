import { create } from 'zustand';
import { Connection, Edge, Node, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

export type NodeType = 
  | 'trigger' 
  | 'message' 
  | 'condition' 
  | 'delay' 
  | 'action' 
  | 'webhook';

export interface FlowNodeData {
  label: string;
  type: NodeType;
  config?: Record<string, any>;
}

export interface FlowState {
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  selectedNode: Node<FlowNodeData> | null;
  isPanelOpen: boolean;
  
  // Actions
  setNodes: (nodes: Node<FlowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: any[]) => void;
  onEdgesChange: (changes: any[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node<FlowNodeData>) => void;
  updateNode: (id: string, data: Partial<FlowNodeData>) => void;
  deleteNode: (id: string) => void;
  setSelectedNode: (node: Node<FlowNodeData> | null) => void;
  setIsPanelOpen: (open: boolean) => void;
  loadFlow: (nodes: Node<FlowNodeData>[], edges: Edge[]) => void;
  clearFlow: () => void;
  exportFlow: () => object;
}

const initialNodes: Node<FlowNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 0 },
    data: { label: 'Início', type: 'trigger', config: { triggerType: 'keyword', keyword: 'ola' } },
  },
];

const initialEdges: Edge[] = [];

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  isPanelOpen: false,

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection) => {
    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      }, get().edges),
    });
  },
  
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
      isPanelOpen: false,
    });
  },
  
  updateNode: (id, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
  
  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNode: null,
    });
  },
  
  setSelectedNode: (node) => {
    set({ selectedNode: node, isPanelOpen: !!node });
  },
  
  setIsPanelOpen: (open) => {
    set({ isPanelOpen: open });
  },
  
  loadFlow: (nodes, edges) => {
    set({ nodes, edges });
  },
  
  clearFlow: () => {
    set({ nodes: [], edges: [], selectedNode: null });
  },
  
  exportFlow: () => {
    const { nodes, edges } = get();
    return { nodes, edges, version: '1.0', exportedAt: new Date().toISOString() };
  },
}));

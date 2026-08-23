import FlowBuilder from './FlowBuilder';
import Sidebar from './Sidebar';
import NodeConfigPanel from './NodeConfigPanel';

export default function FlowBuilderWrapper() {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar com nós arrastáveis */}
      <Sidebar />
      
      {/* Canvas do Flow Builder */}
      <div className="flex-1 relative">
        <FlowBuilder />
      </div>
      
      {/* Painel de configuração do nó selecionado */}
      <NodeConfigPanel />
    </div>
  );
}

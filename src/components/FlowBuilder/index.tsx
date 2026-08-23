import React from 'react';
import FlowBuilder from './FlowBuilder';
import Sidebar from './Sidebar';
import NodeConfigPanel from './NodeConfigPanel';
import FlowToolbar from './FlowToolbar';

export default function FlowBuilderWrapper() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Toolbar superior */}
      <FlowToolbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar com nós arrastáveis */}
        <Sidebar />
        
        {/* Canvas do Flow Builder */}
        <div className="flex-1 relative">
          <FlowBuilder />
        </div>
        
        {/* Painel de configuração do nó selecionado */}
        <NodeConfigPanel />
      </div>
    </div>
  );
}

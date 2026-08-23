import React from 'react';
import DraggableNode from './DraggableNode';

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const nodeTypes = [
    { type: 'trigger', label: 'Gatilho', icon: '⚡', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { type: 'message', label: 'Mensagem', icon: '💬', color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'condition', label: 'Condição', icon: '🔀', color: 'bg-purple-500 hover:bg-purple-600' },
    { type: 'delay', label: 'Atraso', icon: '⏱️', color: 'bg-orange-500 hover:bg-orange-600' },
    { type: 'action', label: 'Ação', icon: '🔧', color: 'bg-green-500 hover:bg-green-600' },
    { type: 'webhook', label: 'Webhook', icon: '🌐', color: 'bg-pink-500 hover:bg-pink-600' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🧩 Nós Disponíveis
      </h3>
      
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
        Arraste os nós para o canvas para criar seu fluxo de automação
      </p>

      <div className="space-y-1">
        {nodeTypes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
            color={node.color}
          />
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
          💡 Dicas
        </h4>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Arraste nós do painel esquerdo</li>
          <li>• Conecte os nós arrastando das alças</li>
          <li>• Clique em um nó para editar</li>
          <li>• Use o mini-mapa para navegar</li>
        </ul>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
          📊 Tipos de Nós
        </h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
          <div>
            <strong className="text-yellow-600 dark:text-yellow-400">Gatilho:</strong>
            <p>Inicia o fluxo baseado em eventos</p>
          </div>
          <div>
            <strong className="text-blue-600 dark:text-blue-400">Mensagem:</strong>
            <p>Envia mensagens automáticas</p>
          </div>
          <div>
            <strong className="text-purple-600 dark:text-purple-400">Condição:</strong>
            <p>Cria ramificações no fluxo</p>
          </div>
          <div>
            <strong className="text-orange-600 dark:text-orange-400">Atraso:</strong>
            <p>Adiciona pausas temporizadas</p>
          </div>
          <div>
            <strong className="text-green-600 dark:text-green-400">Ação:</strong>
            <p>Executa ações como tags</p>
          </div>
          <div>
            <strong className="text-pink-600 dark:text-pink-400">Webhook:</strong>
            <p>Integra com APIs externas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

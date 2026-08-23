import { useFlowStore } from '../../store/flowStore';

export default function NodeConfigPanel() {
  const { selectedNode, updateNode, deleteNode, setIsPanelOpen, exportFlow } = useFlowStore();

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-600 p-4">
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          <p className="text-4xl mb-2">👈</p>
          <p>Selecione um nó para editar</p>
          <p className="text-sm mt-2">ou arraste novos nós da barra lateral</p>
        </div>
        
        <div className="mt-8 border-t border-gray-300 dark:border-gray-600 pt-4">
          <button
            onClick={() => {
              const flow = exportFlow();
              console.log('Flow exportado:', flow);
              alert('Fluxo exportado! Veja o console para detalhes.');
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            📤 Exportar Fluxo
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    updateNode(selectedNode.id, {
      config: {
        ...selectedNode.data.config,
        [key]: value,
      },
    });
  };

  const renderConfigFields = () => {
    const { type, config } = selectedNode.data;

    switch (type) {
      case 'trigger':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Gatilho
              </label>
              <select
                value={config?.triggerType || 'keyword'}
                onChange={(e) => handleChange('triggerType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="keyword">Palavra-chave</option>
                <option value="time">Horário</option>
                <option value="webhook">Webhook</option>
              </select>
            </div>
            
            {config?.triggerType === 'keyword' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Palavra-chave
                </label>
                <input
                  type="text"
                  value={config?.keyword || ''}
                  onChange={(e) => handleChange('keyword', e.target.value)}
                  placeholder="Ex: ola, info, preco"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}
          </>
        );

      case 'message':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mensagem
              </label>
              <textarea
                value={config?.message || ''}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL da Mídia (opcional)
              </label>
              <input
                type="text"
                value={config?.mediaUrl || ''}
                onChange={(e) => handleChange('mediaUrl', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </>
        );

      case 'condition':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Condições (JSON)
            </label>
            <textarea
              value={JSON.stringify(config?.conditions || [], null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleChange('conditions', parsed);
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs resize-none"
            />
          </div>
        );

      case 'delay':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Atraso (segundos)
            </label>
            <input
              type="number"
              value={config?.delay || 5}
              onChange={(e) => handleChange('delay', parseInt(e.target.value) || 0)}
              min="0"
              max="3600"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'action':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Ação
              </label>
              <select
                value={config?.actionType || 'tag'}
                onChange={(e) => handleChange('actionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="tag">Adicionar Tag</option>
                <option value="remove_tag">Remover Tag</option>
                <option value="assign">Atribuir Atendente</option>
                <option value="variable">Definir Variável</option>
              </select>
            </div>
            
            {(config?.actionType === 'tag' || config?.actionType === 'remove_tag') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome da Tag
                </label>
                <input
                  type="text"
                  value={config?.tagName || ''}
                  onChange={(e) => handleChange('tagName', e.target.value)}
                  placeholder="Ex: cliente, lead, vip"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}
          </>
        );

      case 'webhook':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL do Webhook
              </label>
              <input
                type="url"
                value={config?.url || ''}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://api.exemplo.com/webhook"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Método HTTP
              </label>
              <select
                value={config?.method || 'POST'}
                onChange={(e) => handleChange('method', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </>
        );

      default:
        return <p className="text-gray-500">Sem configuração disponível</p>;
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-600 p-4 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Configurar Nó
        </h3>
        <button
          onClick={() => setIsPanelOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">
            {selectedNode.data.type === 'trigger' && '⚡'}
            {selectedNode.data.type === 'message' && '💬'}
            {selectedNode.data.type === 'condition' && '🔀'}
            {selectedNode.data.type === 'delay' && '⏱️'}
            {selectedNode.data.type === 'action' && '🔧'}
            {selectedNode.data.type === 'webhook' && '🌐'}
          </span>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
          />
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          ID: {selectedNode.id} | Tipo: {selectedNode.data.type}
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
        {renderConfigFields()}
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => {
            const flow = exportFlow();
            console.log('Flow exportado:', flow);
            alert('Fluxo exportado com sucesso!');
          }}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>📤</span> Exportar
        </button>
        
        <button
          onClick={() => deleteNode(selectedNode.id)}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>🗑️</span> Excluir Nó
        </button>
      </div>
    </div>
  );
}

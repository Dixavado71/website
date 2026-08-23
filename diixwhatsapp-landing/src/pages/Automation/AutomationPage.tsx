import { useState } from 'react';
import FlowBuilderWrapper from '../../components/FlowBuilder';
import { useFlowStore } from '../../store/flowStore';

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<'builder' | 'list'>('builder');
  const { exportFlow, clearFlow } = useFlowStore();

  const handleExport = () => {
    const flow = exportFlow();
    const dataStr = JSON.stringify(flow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fluxo-automacao-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              🤖 Automação de Fluxos
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Crie e gerencie fluxos de automação para WhatsApp
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'builder'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🎨 Builder
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'list'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📋 Meus Fluxos
              </button>
            </div>

            {/* Actions */}
            <button
              onClick={handleExport}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>📤</span> Exportar
            </button>
            
            <button
              onClick={() => {
                if (confirm('Tem certeza que deseja limpar o fluxo atual?')) {
                  clearFlow();
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>🗑️</span> Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'builder' ? (
          <FlowBuilderWrapper />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Meus Fluxos Salvos
            </h2>
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <p className="text-4xl mb-4">📂</p>
              <p>Nenhum fluxo salvo ainda</p>
              <p className="text-sm mt-2">
                Crie seu primeiro fluxo no builder e exporte para salvar
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Fluxos Ativos</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Mensagens Enviadas</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">0</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Conversão</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0%</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Tempo Médio</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">0s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

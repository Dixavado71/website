import React from 'react';
import { useFlowStore } from '../../store/flowStore';
import { useI18n } from '../../i18n/I18nContext';

interface FlowToolbarProps {
  onImport?: (data: any) => void;
}

export default function FlowToolbar({ onImport }: FlowToolbarProps) {
  const { exportFlow, loadFlow, clearFlow } = useFlowStore();
  const { t } = useI18n();

  const handleExport = () => {
    const flow = exportFlow();
    const dataStr = JSON.stringify(flow, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fluxo-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const flow = JSON.parse(event.target?.result as string);
          if (flow.nodes && flow.edges) {
            loadFlow(flow.nodes, flow.edges);
            if (onImport) onImport(flow);
          } else {
            alert('Arquivo inválido!');
          }
        } catch (err) {
          alert('Erro ao ler arquivo JSON');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleSave = () => {
    const flow = exportFlow();
    localStorage.setItem('flowBuilder_current', JSON.stringify(flow));
    alert(t('flow.saved'));
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('flowBuilder_current');
    if (saved) {
      try {
        const flow = JSON.parse(saved);
        loadFlow(flow.nodes, flow.edges);
      } catch (err) {
        alert('Erro ao carregar fluxo salvo');
      }
    } else {
      alert(t('flow.no_saved_flow'));
    }
  };

  const handleClear = () => {
    if (confirm(t('flow.confirm_clear'))) {
      clearFlow();
    }
  };

  const validateFlow = () => {
    const { nodes, edges } = useFlowStore.getState();
    const errors: string[] = [];

    // Verifica se tem pelo menos um nó
    if (nodes.length === 0) {
      errors.push('O fluxo deve ter pelo menos um nó');
    }

    // Verifica se tem um gatilho
    const hasTrigger = nodes.some(n => n.data.type === 'trigger');
    if (!hasTrigger) {
      errors.push('O fluxo precisa de um nó gatilho (⚡)');
    }

    // Verifica conexões órfãs
    const connectedNodeIds = new Set<string>();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const orphanNodes = nodes.filter(
      n => !connectedNodeIds.has(n.id) && nodes.length > 1
    );

    if (orphanNodes.length > 0) {
      errors.push(`${orphanNodes.length} nó(s) estão desconectados`);
    }

    if (errors.length > 0) {
      alert(`⚠️ Problemas encontrados:\n\n${errors.join('\n')}`);
      return false;
    }

    alert('✅ Fluxo válido!');
    return true;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          🔄 {t('flow.builder')}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
          title={t('flow.save')}
        >
          💾 {t('flow.save')}
        </button>

        <button
          onClick={handleLoad}
          className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
          title={t('flow.load')}
        >
          📂 {t('flow.load')}
        </button>

        <button
          onClick={handleExport}
          className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
          title={t('flow.export')}
        >
          📤 {t('flow.export')}
        </button>

        <button
          onClick={handleImport}
          className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
          title={t('flow.import')}
        >
          📥 {t('flow.import')}
        </button>

        <button
          onClick={validateFlow}
          className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
          title={t('flow.validate')}
        >
          ✅ {t('flow.validate')}
        </button>

        <button
          onClick={handleClear}
          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
          title={t('flow.clear')}
        >
          🗑️ {t('flow.clear')}
        </button>
      </div>
    </div>
  );
}

import React from 'react';

interface DraggableNodeProps {
  type: string;
  label: string;
  icon: string;
  color: string;
}

export default function DraggableNode({ type, label, icon, color }: DraggableNodeProps) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className={`${color} text-white p-3 rounded-lg cursor-grab active:cursor-grabbing hover:shadow-lg transition-all mb-2 flex items-center gap-2`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

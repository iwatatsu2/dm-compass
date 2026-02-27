import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

export type AlertType = 'danger' | 'warning' | 'info' | 'success';

interface AlertBoxProps {
  type: AlertType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const alertStyles: Record<AlertType, { bg: string; border: string; icon: React.ReactNode; textColor: string }> = {
  danger: {
    bg: 'bg-red-950/30',
    border: 'border-red-700',
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    textColor: 'text-red-100',
  },
  warning: {
    bg: 'bg-yellow-950/30',
    border: 'border-yellow-700',
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    textColor: 'text-yellow-100',
  },
  info: {
    bg: 'bg-blue-950/30',
    border: 'border-blue-700',
    icon: <Info className="w-5 h-5 text-blue-500" />,
    textColor: 'text-blue-100',
  },
  success: {
    bg: 'bg-green-950/30',
    border: 'border-green-700',
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    textColor: 'text-green-100',
  },
};

export function AlertBox({ type, title, children, className = '' }: AlertBoxProps) {
  const style = alertStyles[type];

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-4 ${style.textColor} ${className}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-0.5">{style.icon}</div>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

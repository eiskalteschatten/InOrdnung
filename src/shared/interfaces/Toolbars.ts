import React, { ButtonHTMLAttributes } from 'react';

export interface ToolbarConfig extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  primary?: boolean;
  dropdown?: React.ReactNode;
}

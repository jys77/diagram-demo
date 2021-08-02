import React from 'react';

export interface Component {
  name: string;
  label: string;
  props?: any;
  icon: string;
  style?: React.CSSProperties;
}

export interface AnchorPointsProps {
  height: number;
  width: number;
  top: number;
  left: number;
  setShowAnchorPoints: React.Dispatch<React.SetStateAction<boolean>>;
  stageContent: DOMRect | { top: number; left: number; height: number; width: number; },
}

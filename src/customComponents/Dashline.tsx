import React from 'react';
import { useDashLineModel } from '../store';

const DashLine = () => {
  const { pos } = useDashLineModel();
  const lineProps: React.SVGProps<SVGLineElement> = {
    x1: pos.start.x,
    y1: pos.start.y,
    x2: pos.end.x,
    y2: pos.end.y,
    strokeWidth: 1,
    stroke: '#ACB1B5',
    strokeDasharray: '5,5',
    markerEnd: 'url(#arrow)',
  };
  return <line {...lineProps} />;
};

export default DashLine;

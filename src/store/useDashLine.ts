import { useState } from 'react';
import { createModel } from 'hox';
import { DashLinePos } from './interfaces';

const useDashLine = () => {
  const [pos, setPos] = useState<DashLinePos>({ start: {}, end: {} } as DashLinePos);
  const [showDashLine, setShowDashLine] = useState<boolean>(false);
  const clearPos = () => {
    setPos({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 0,
        y: 0,
      },
    });
  };
  return {
    pos,
    setPos,
    clearPos,
    showDashLine,
    setShowDashLine,
  };
};

export default createModel(useDashLine);

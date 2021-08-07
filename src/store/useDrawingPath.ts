import { useState } from 'react';
import { createModel } from 'hox';
import { AnchorPath } from './interfaces';

const useDrawingPath = () => {
  const [path, setPath] = useState<Omit<AnchorPath, 'pathId'>>({
    x1: null,
    x2: null,
    y1: null,
    y2: null,
    fromId: null,
    toId: null,
    fromEdge: null,
    toEdge: null,
  });
  const clearPath = () => {
    setPath({
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      fromId: null,
      toId: null,
      fromEdge: null,
      toEdge: null,
    });
  };
  return {
    clearPath,
    path,
    setPath,
  };
};

export default createModel(useDrawingPath);

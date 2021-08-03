import { useState, useEffect } from 'react';
import { createModel } from 'hox';
import useAnchorPathsModel from './useAnchorPaths';
import { AnchorPath } from './interfaces';
import { generatePathId } from '../utils';

const useDrawingPath = () => {
  const { addAnchorPath } = useAnchorPathsModel();
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
  useEffect(() => {
    if (!Object.values(path).includes(null) && path.fromId !== path.toId) {
      const pathId = generatePathId();
      addAnchorPath({ ...path, pathId });
    }
  }, [path]);
  return {
    clearPath,
    path,
    setPath,
  };
};

export default createModel(useDrawingPath);

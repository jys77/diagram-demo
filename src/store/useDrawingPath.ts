import { useState, useEffect } from 'react';
import { createModel } from 'hox';
import useAnchorPathsModel from './useAnchorPaths';
import { AnchorPath } from './interfaces';

const useDrawingPath = () => {
  const { addAnchorPath } = useAnchorPathsModel();
  const [path, setPath] = useState<AnchorPath>({
    x1: null, x2: null, y1: null, y2: null, fromId: null, toId: null,
  });
  const clearPath = () => {
    setPath({
      x1: null, x2: null, y1: null, y2: null, fromId: null, toId: null,
    });
  };
  useEffect(() => {
    if (!Object.values(path).includes(null)) {
      // const id = generatePathId();
      addAnchorPath(path);
    }
  }, [path]);
  return {
    clearPath,
    path,
    setPath,
  };
};

export default createModel(useDrawingPath);

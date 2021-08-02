import { useState } from 'react';
import { createModel } from 'hox';
import { AnchorPath } from './interfaces';
import { deepClone } from '../utils';

const useAnchorPaths = () => {
  const [anchorPathData, setAnchorPathData] = useState<AnchorPath[]>([]);
  const addAnchorPath = (anchorPath: AnchorPath) => {
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      cloneData.push(anchorPath);
      return cloneData;
    });
  };
  return {
    anchorPathData,
    addAnchorPath,
  };
};

export default createModel(useAnchorPaths);

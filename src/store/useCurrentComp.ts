import { useState } from 'react';
import { createModel } from 'hox';
import { CompDataItem } from './interfaces';

const useCurrentComp = () => {
  const [currentComp, setCurrentComp] = useState<CompDataItem | null>(null);
  return {
    currentComp,
    setCurrentComp,
  };
};

export default createModel(useCurrentComp);

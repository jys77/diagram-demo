import { useState } from 'react';
import { createModel } from 'hox';
import { CompDataItem } from './interfaces';
import { deepClone } from '../utils';

const useCompData = () => {
  const [compData, setCompData] = useState<CompDataItem[]>([] as CompDataItem[]);
  const addComponent = (component: CompDataItem) => {
    setCompData((prevState) => {
      const tempData = deepClone(prevState);
      tempData.push(component);
      return tempData;
    });
  };
  return {
    compData,
    addComponent,
  };
};

export default createModel(useCompData);

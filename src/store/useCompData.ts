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

  const changeComponent = (id: number, changedComp: CompDataItem) => {
    const compIdx = compData.findIndex((item) => item.id === id);
    if (compIdx > -1) {
      setCompData((prevState) => {
        const changed = deepClone(prevState);
        changed.splice(compIdx, 1, changedComp);
        return changed;
      });
    }
  };

  return {
    compData,
    setCompData,
    addComponent,
    changeComponent,
  };
};

export default createModel(useCompData);

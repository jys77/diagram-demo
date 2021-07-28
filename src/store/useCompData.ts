import { useState } from 'react';
import { createModel } from 'hox';
import { CompDataItem } from './interfaces';
import { deepClone } from '../utils';

const useCompData = () => {
  const [compData, setCompData] = useState<CompDataItem[]>([] as CompDataItem[]);

  const addComponent = (component: CompDataItem): CompDataItem[] => {
    let tempData: CompDataItem[] = [];
    setCompData((prevState) => {
      tempData = deepClone(prevState);
      tempData.push(component);
      return tempData;
    });
    return tempData;
  };

  const changeComponent = (id: number, changedComp?: CompDataItem): CompDataItem[] => {
    const compIdx = compData.findIndex((item) => item.id === id);
    let tempData: CompDataItem[] = compData;
    if (compIdx > -1) {
      setCompData((prevState) => {
        tempData = deepClone(prevState);
        if (changedComp) {
          tempData.splice(compIdx, 1, changedComp);
        } else {
          tempData.splice(compIdx, 1);
        }
        return tempData;
      });
    }
    return tempData;
  };

  return {
    compData,
    setCompData,
    addComponent,
    changeComponent,
  };
};

export default createModel(useCompData);

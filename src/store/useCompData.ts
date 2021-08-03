import { useState } from 'react';
import { createModel } from 'hox';
import { CompDataItem } from './interfaces';
import { deepClone } from '../utils';
import useAnchorPathsModel from './useAnchorPaths';

const useCompData = () => {
  const [compData, setCompData] = useState<CompDataItem[]>([] as CompDataItem[]);
  const { changeAnchorPaths, deleteAnchorPaths } = useAnchorPathsModel();

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
          const {
            style: {
              top,
              left,
              width,
              height,
            },
          } = changedComp as { style: { top: number; left: number; width: number; height: number } };
          changeAnchorPaths({
            shapeId: id,
            top,
            left,
            width,
            height,
          });
        } else {
          tempData.splice(compIdx, 1);
          deleteAnchorPaths(id);
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

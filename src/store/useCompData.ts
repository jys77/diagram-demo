import { useState } from 'react';
import { createModel } from 'hox';
import { CompDataItem } from './interfaces';
import { deepClone } from '../utils';
import useAnchorPathsModel from './useAnchorPaths';

const useCompData = () => {
  const [compData, setCompData] = useState<CompDataItem[]>([] as CompDataItem[]);
  const { changeAnchorPaths, deleteAnchorPaths } = useAnchorPathsModel();

  const addComponent = (component: CompDataItem) => {
    setCompData((prevState) => {
      const tempData = deepClone(prevState);
      tempData.push(component);
      return tempData;
    });
  };

  const changeComponent = (
    id: number,
    changedComp: CompDataItem,
  ) => {
    const compIdx = compData.findIndex((item) => item.id === id);
    setCompData((prevState) => {
      const tempData = deepClone(prevState);
      if (compIdx > -1) {
        tempData.splice(compIdx, 1, changedComp);
      }
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
      return tempData;
    });
  };

  const deleteComponent = (id: number) => {
    const compIdx = compData.findIndex((item) => item.id === id);
    setCompData((prevState) => {
      const tempData = deepClone(prevState);
      if (compIdx > -1) {
        tempData.splice(compIdx, 1);
      }
      deleteAnchorPaths(id);
      return tempData;
    });
  };

  return {
    compData,
    setCompData,
    addComponent,
    changeComponent,
    deleteComponent,
  };
};

export default createModel(useCompData);

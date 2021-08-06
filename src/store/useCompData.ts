import { useState, useRef } from 'react';
import { createModel } from 'hox';
import { AnchorPath, CompDataItem } from './interfaces';
import { deepClone } from '../utils';
import useAnchorPathsModel from './useAnchorPaths';

const useCompData = () => {
  const [compData, setCompData] = useState<CompDataItem[]>([] as CompDataItem[]);
  const { changeAnchorPaths, deleteAnchorPaths } = useAnchorPathsModel();
  const compDataRef = useRef<CompDataItem[]>([]);

  const addComponent = (component: CompDataItem): CompDataItem[] => {
    // let tempData: CompDataItem[] = [];
    setCompData((prevState) => {
      compDataRef.current = deepClone(prevState);
      compDataRef.current.push(component);
      return compDataRef.current;
    });
    return compDataRef.current;
  };

  const changeComponent = (id: number, changedComp?: CompDataItem): { compData: CompDataItem[]; anchorPaths: AnchorPath[] } => {
    const compIdx = compData.findIndex((item) => item.id === id);
    let tempData: CompDataItem[] = [];
    let anchorPaths: AnchorPath[] = [];
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
          anchorPaths = changeAnchorPaths({
            shapeId: id,
            top,
            left,
            width,
            height,
          });
        } else {
          tempData.splice(compIdx, 1);
          anchorPaths = deleteAnchorPaths(id);
        }
        return tempData;
      });
    }
    return {
      compData: tempData,
      anchorPaths,
    };
  };

  return {
    compData,
    setCompData,
    addComponent,
    changeComponent,
  };
};

export default createModel(useCompData);

import { createModel } from 'hox';
import { useState, useEffect } from 'react';
import useCompDataModel from './useCompData';
import useAnchorPathsModel from './useAnchorPaths';
import { CompDataItem, AnchorPath } from './interfaces';
import { deepClone } from '../utils';

const useSnapshot = () => {
  const { setCompData, compData } = useCompDataModel();
  const { setAnchorPathData, anchorPathData } = useAnchorPathsModel();
  const [snapshotData, setSnapshotData] = useState<(CompDataItem | AnchorPath)[][]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(-1);
  const [recordCount, setRecordCount] = useState<number>(0);

  useEffect(() => {
    console.log(snapshotData);
  }, [snapshotData]);

  const recordSnapshot = (snapshot: (CompDataItem | AnchorPath)[]) => {
    if (Array.isArray(snapshot)) {
      setSnapshotData(((prevState) => {
        const cloneSnapshot = deepClone(prevState);
        cloneSnapshot[snapshotIndex + 1] = snapshot;
        return cloneSnapshot.slice(0, snapshotIndex + 2);
      }));
      setSnapshotIndex(snapshotIndex + 1);
    }
  };

  useEffect(() => {
    if (recordCount !== 0) {
      recordSnapshot([...compData, ...anchorPathData]);
    }
  }, [recordCount]);

  const canUndo = snapshotIndex >= 0;
  const canRedo = snapshotIndex < snapshotData.length - 1;

  const undo = () => {
    if (canUndo) {
      const prevSnapshot = snapshotData[snapshotIndex - 1] || [];
      const prevCompData: CompDataItem[] = [];
      const prevAnchorPaths: AnchorPath[] = [];
      [...prevSnapshot].forEach((item: CompDataItem | AnchorPath) => {
        if (Object.prototype.hasOwnProperty.call(item, 'id')) {
          prevCompData.push(item as CompDataItem);
        } else if (Object.prototype.hasOwnProperty.call(item, 'pathId')) {
          prevAnchorPaths.push(item as AnchorPath);
        }
      });
      setCompData(prevCompData);
      setAnchorPathData(prevAnchorPaths);
      setSnapshotIndex(snapshotIndex - 1);
    }
  };

  const redo = () => {
    if (canRedo) {
      const nextSnapshot = snapshotData[snapshotIndex + 1] || [];
      const nextCompData: CompDataItem[] = [];
      const nextAnchorPaths: AnchorPath[] = [];
      [...nextSnapshot].forEach((item: CompDataItem | AnchorPath) => {
        if (Object.prototype.hasOwnProperty.call(item, 'id')) {
          nextCompData.push(item as CompDataItem);
        } else if (Object.prototype.hasOwnProperty.call(item, 'pathId')) {
          nextAnchorPaths.push(item as AnchorPath);
        }
      });
      setCompData(nextCompData);
      setAnchorPathData(nextAnchorPaths);
      setSnapshotIndex((snapshotIndex + 1));
    }
  };

  return {
    snapshotData,
    snapshotIndex,
    setRecordCount,
    recordSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};

export default createModel(useSnapshot);

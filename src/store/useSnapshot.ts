import { createModel } from 'hox';
import { useState } from 'react';
import useCompDataModel from './useCompData';
import { CompDataItem } from './interfaces';
import { deepClone } from '../utils';

const useSnapshot = () => {
  const { setCompData } = useCompDataModel();
  const [snapshotData, setSnapshotData] = useState<CompDataItem[][]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(-1);

  const recordSnapshot = (compData: CompDataItem[]) => {
    setSnapshotData(((prevState) => {
      const cloneSnapshotData = deepClone(prevState);
      cloneSnapshotData[snapshotIndex + 1] = compData;
      return cloneSnapshotData.slice(0, snapshotIndex + 2);
    }));
    setSnapshotIndex(snapshotIndex + 1);
  };

  const canUndo = snapshotIndex >= 0;
  const canRedo = snapshotIndex < snapshotData.length - 1;

  const undo = () => {
    if (canUndo) {
      setCompData(snapshotData[snapshotIndex - 1] || []);
      setSnapshotIndex(snapshotIndex - 1);
    }
  };

  const redo = () => {
    if (canRedo) {
      setCompData(snapshotData[snapshotIndex + 1]);
      setSnapshotIndex((snapshotIndex + 1));
    }
  };

  return {
    recordSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};

export default createModel(useSnapshot);

import React, { useEffect } from 'react';
import styles from './App.module.less';
import {
  Toolbar, LeftSide, Stage, RightSide,
} from './components';
import 'antd/dist/antd.css';
import { AnchorPath, CompDataItem } from './store/interfaces';
import { useAnchorPathsModel, useCompDataModel, useSnapshotModel } from './store';

const App: React.FC = () => {
  const { setCompData } = useCompDataModel();
  const { setAnchorPathData } = useAnchorPathsModel();
  const { setRecordCount } = useSnapshotModel();

  // load saved data
  useEffect(() => {
    const savedData = JSON.parse(window.localStorage.getItem('data') || '[]');
    if (savedData.length < 1) {
      return;
    }
    const compData: CompDataItem[] = [];
    const anchorPaths: AnchorPath[] = [];
    [...savedData].forEach((item: CompDataItem | AnchorPath) => {
      if (Object.prototype.hasOwnProperty.call(item, 'id')) {
        compData.push(item as CompDataItem);
      } else if (Object.prototype.hasOwnProperty.call(item, 'pathId')) {
        anchorPaths.push(item as AnchorPath);
      }
    });
    setCompData(compData);
    setAnchorPathData(anchorPaths);
    setRecordCount(1);
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.ToolbarContainer}>
        <Toolbar />
      </div>
      <div className={styles.MainWindow}>
        <LeftSide />
        <Stage />
        <RightSide />
      </div>
    </div>
  );
};

export default App;

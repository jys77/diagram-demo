import React from 'react';
import styles from './App.module.less';
// eslint-disable-next-line object-curly-newline
import { Toolbar, LeftSide, Stage, RightSide } from './components';
import 'antd/dist/antd.css';

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
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

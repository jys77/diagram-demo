import React from 'react';
import { Card, Tabs } from 'antd';
import styles from './index.module.less';
import CompStyleSettings from './CompStyleSettings';
import { useCurrentCompModel } from '../../store';

const { TabPane } = Tabs;

const RightSide: React.FC = () => {
  const { currentComp } = useCurrentCompModel();
  return (
    <Card className={styles.RightSideContainer}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Style" key="1">
          {currentComp ? <CompStyleSettings /> : 'Please select a shape.'}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default RightSide;

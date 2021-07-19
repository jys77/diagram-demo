import React, { BaseSyntheticEvent } from 'react';
import { Card } from 'antd';
import componentList from '../../customComponents/componentList';

import styles from './index.module.less';

const LeftSide: React.FC = () => {
  const onDragStart = (e: BaseSyntheticEvent & { dataTransfer: any }) => {
    console.log(e);
    e.dataTransfer.setData('index', e.target.dataset.index);
  };
  return (
    <Card className={styles.LeftSideContainer}>
      <div onDragStart={onDragStart}>
        {componentList.map((comp, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`comp-item-${index}`} draggable data-index={index}>
            <div>{comp.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeftSide;

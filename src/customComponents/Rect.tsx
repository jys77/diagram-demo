import React from 'react';
import { CompDataItem } from '../store/interfaces';
import Text from './Text';
import styles from './index.module.less';

const Rect: React.FC<CompDataItem> = (compDataItem) => (
  <div className={styles.Rect}>
    <Text {...compDataItem} />
  </div>
);

export default Rect;

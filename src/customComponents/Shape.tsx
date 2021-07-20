import React from 'react';
import { CompDataItem } from '../store/interfaces';
import styles from './index.module.less';

const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'rb', 'lb'];

const Shape: React.FC<CompDataItem> = ({ style, children }) => {
  const getPointStyle = (point: string) => {
    const {
      width,
      height,
      top: preTop,
      left: preLeft,
    } = style as { width: number | string; height: number | string; top: string | number; left: string | number };
    let left = 0;
    let top = 0;
    const hasT = /t/.test(point);
    const hasR = /r/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);

    if (point.length === 2) {
      left = hasL ? Number(preLeft) : Number(width) + Number(preLeft);
      top = hasT ? Number(preTop) : Number(height) + Number(preTop);
    } else {
      if (hasT || hasB) {
        left = Number(width) / 2 + Number(preLeft);
        top = hasT ? Number(preTop) : Number(height) + Number(preTop);
      }
      if (hasL || hasR) {
        top = Number(height) / 2 + Number(preTop);
        left = hasL ? Number(preLeft) : Number(width) + Number(preLeft);
      }
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
      marginLeft: '-4px',
      marginTop: '-4px',
    };
  };

  return (
    <div className={styles.Shape}>
      {pointList.map((point) => (
        <div key={point} className={styles.ShapePoint} style={getPointStyle(point)} />
      ))}
      {children}
    </div>
  );
};

export default Shape;

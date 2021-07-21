import React, { useState, useEffect } from 'react';
import { CompDataItem } from '../store/interfaces';
import styles from './index.module.less';
import { useCurrentCompModel, useCompDataModel } from '../store';

const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'rb', 'lb'];

const Shape: React.FC<CompDataItem> = ({ children, ...compDataItem }) => {
  const stageContent = document.querySelector('#stageContent')?.getBoundingClientRect() || {
    top: 0, left: 0, height: 0, width: 0,
  };
  const { currentComp, setCurrentComp } = useCurrentCompModel();
  const { changeComponent } = useCompDataModel();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(currentComp?.id === compDataItem.id);
  }, [currentComp]);

  const getPointStyle = (point: string) => {
    const {
      width,
      height,
      top: preTop,
      left: preLeft,
    } = compDataItem.style as {
      width: number | string;
      height: number | string;
      top: string | number;
      left: string | number;
    };
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

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentComp(compDataItem);
    const pos = { ...compDataItem.style };
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    const move = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;

      // eslint-disable-next-line no-nested-ternary
      pos.top = currY - startY + startTop >= stageContent.top
        ? currY - startY + startTop <= stageContent.top + stageContent.height - Number(compDataItem.style?.height)
          ? currY - startY + startTop
          : stageContent.top + stageContent.height - Number(compDataItem.style?.height)
        : pos.top = stageContent.top;

      // eslint-disable-next-line no-nested-ternary
      pos.left = currX - startX + startLeft >= stageContent.left
        ? currX - startX + startLeft <= stageContent.left + stageContent.width - Number(compDataItem.style?.width)
          ? currX - startX + startLeft
          : stageContent.left + stageContent.width - Number(compDataItem.style?.width)
        : stageContent.left;

      changeComponent(compDataItem.id, { ...compDataItem, style: { ...pos } });
    };
    const up = () => {
      setCurrentComp(compDataItem);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  return (
    <div className={styles.Shape} onMouseDown={onMouseDown}>
      {isActive ? pointList.map((point) => (
        <div key={point} className={styles.ShapePoint} style={getPointStyle(point)} />
      )) : null}
      {children}
    </div>
  );
};

export default Shape;

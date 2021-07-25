import React, { useState, useEffect } from 'react';
import { CompDataItem } from '../store/interfaces';
import styles from './index.module.less';
import { useCurrentCompModel, useCompDataModel, useSnapshotModel } from '../store';

const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'rb', 'lb'] as const;
type Point = typeof pointList[number];

enum CURSOR {
  t = 'n-resize',
  r = 'e-resize',
  b = 's-resize',
  l = 'w-resize',
  lt = 'nw-resize',
  rt = 'ne-resize',
  rb = 'se-resize',
  lb = 'sw-resize',
}

const Shape: React.FC<CompDataItem> = ({ children, ...compDataItem }) => {
  const stageContent = document.querySelector('#stageContent')?.getBoundingClientRect() || {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  };
  const { currentComp, setCurrentComp } = useCurrentCompModel();
  const { changeComponent } = useCompDataModel();
  const { recordSnapshot } = useSnapshotModel();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(currentComp?.id === compDataItem.id);
  }, [currentComp]);

  const getPointStyle = (point: Point) => {
    const { width, height } = compDataItem.style as {
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
      left = hasL ? 0 : Number(width);
      top = hasT ? 0 : Number(height);
    } else {
      if (hasT || hasB) {
        left = Number(width) / 2;
        top = hasT ? 0 : Number(height);
      }
      if (hasL || hasR) {
        top = Number(height) / 2;
        left = hasL ? 0 : Number(width);
      }
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
      marginLeft: '-4px',
      marginTop: '-4px',
      cursor: CURSOR[point],
    };
  };

  const mouseDownOnShapeHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentComp(compDataItem);
    const pos = { ...compDataItem.style };
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    let snapshot: CompDataItem[] = [];

    const move = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;

      // eslint-disable-next-line no-nested-ternary
      pos.top =
        currY - startY + startTop >= stageContent.top
          ? currY - startY + startTop <= stageContent.top + stageContent.height - Number(compDataItem.style?.height)
            ? currY - startY + startTop
            : stageContent.top + stageContent.height - Number(compDataItem.style?.height)
          : stageContent.top;

      // eslint-disable-next-line no-nested-ternary
      pos.left =
        currX - startX + startLeft >= stageContent.left
          ? currX - startX + startLeft <= stageContent.left + stageContent.width - Number(compDataItem.style?.width)
            ? currX - startX + startLeft
            : stageContent.left + stageContent.width - Number(compDataItem.style?.width)
          : stageContent.left;

      snapshot = changeComponent(compDataItem.id, { ...compDataItem, style: { ...pos } });
    };
    const up = () => {
      setCurrentComp(compDataItem);
      recordSnapshot(snapshot);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const mouseDownOnPointHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, point: string) => {
    e.preventDefault();
    e.stopPropagation();

    const hasT = /t/.test(point);
    const hasL = /l/.test(point);

    const startX = e.clientX;
    const startY = e.clientY;
    const pos = { ...compDataItem.style };
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);
    const startHeight = Number(pos.height);
    const startWidth = Number(pos.width);

    let snapshot: CompDataItem[] = [];

    const move = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const offsetX = currX - startX;
      const offsetY = currY - startY;
      pos.height = hasT ? Math.abs(startHeight - offsetY) : startHeight + offsetY;
      pos.width = hasL ? Math.abs(startWidth - offsetX) : startWidth + offsetX;
      pos.top = hasT ? startTop + offsetY : startTop;
      pos.left = hasL ? startLeft + offsetX : startLeft;
      snapshot = changeComponent(compDataItem.id, { ...compDataItem, style: { ...pos } });
    };

    const up = () => {
      setCurrentComp(compDataItem);
      recordSnapshot(snapshot);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  return (
    <div className={styles.Shape} style={compDataItem.style} onMouseDown={mouseDownOnShapeHandler}>
      {isActive
        ? pointList.map((point) => (
            <div
              key={point}
              className={styles.ShapePoint}
              style={getPointStyle(point)}
              onMouseDown={(e) => mouseDownOnPointHandler(e, point)}
            />
          ))
        : null}
      {children}
    </div>
  );
};

export default Shape;

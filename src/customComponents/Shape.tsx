import React, { useState, useEffect } from 'react';
import { AnchorPath, CompDataItem } from '../store/interfaces';
import AnchorPoints from './AnchorPoints';
import { AnchorPointsProps } from './interfaces';
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
  const [showAnchorPoints, setShowAnchorPoints] = useState<boolean>(false);

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

    let snapshot: (CompDataItem | AnchorPath)[] = [];

    const move = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;

      if (currX === startX && currY === startY) {
        return;
      }

      // eslint-disable-next-line no-nested-ternary
      pos.top = currY - startY + startTop >= stageContent.top
        ? currY - startY + startTop <= stageContent.top + stageContent.height - Number(compDataItem.style?.height)
          ? currY - startY + startTop
          : stageContent.top + stageContent.height - Number(compDataItem.style?.height)
        : stageContent.top;

      // eslint-disable-next-line no-nested-ternary
      pos.left = currX - startX + startLeft >= stageContent.left
        ? currX - startX + startLeft <= stageContent.left + stageContent.width - Number(compDataItem.style?.width)
          ? currX - startX + startLeft
          : stageContent.left + stageContent.width - Number(compDataItem.style?.width)
        : stageContent.left;

      const { compData, anchorPaths } = changeComponent(compDataItem.id, { ...compDataItem, style: { ...pos } });
      snapshot = [...compData, ...anchorPaths];
    };
    const up = () => {
      setCurrentComp(compDataItem);
      if (snapshot.length > 0) {
        recordSnapshot(snapshot);
      }
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

    let snapshot: (CompDataItem | AnchorPath)[] = [];

    const move = (moveEvent: MouseEvent) => {
      const currX = moveEvent.clientX;
      const currY = moveEvent.clientY;
      const offsetX = currX - startX;
      const offsetY = currY - startY;

      if (offsetX === 0 && offsetY === 0) {
        return;
      }

      pos.height = hasT ? Math.abs(startHeight - offsetY) : startHeight + offsetY;
      pos.width = hasL ? Math.abs(startWidth - offsetX) : startWidth + offsetX;
      pos.top = hasT ? startTop + offsetY : startTop;
      pos.left = hasL ? startLeft + offsetX : startLeft;

      // if the point is on the mid edge, don't resize the length of the edge.
      if (point === 't' || point === 'b') {
        pos.width = startWidth;
      } else if (point === 'l' || point === 'r') {
        pos.height = startHeight;
      }

      const { compData, anchorPaths } = changeComponent(compDataItem.id, { ...compDataItem, style: { ...pos } });
      snapshot = [...compData, ...anchorPaths];
    };

    const up = () => {
      setCurrentComp(compDataItem);
      if (snapshot.length > 0) {
        recordSnapshot(snapshot);
      }
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const mouseOverOnShapeHandler = () => {
    setShowAnchorPoints(true);
  };

  const anchorPointsProps: AnchorPointsProps = {
    width: compDataItem.style?.width as number,
    height: compDataItem.style?.height as number,
    top: compDataItem.style?.top as number,
    left: compDataItem.style?.left as number,
    setShowAnchorPoints,
    stageContent,
    shapeId: compDataItem.id,
  };

  const mouseMoveOutsideField = (e: MouseEvent) => {
    const left = compDataItem.style?.left as number || 0;
    const top = compDataItem.style?.top as number || 0;
    const width = compDataItem.style?.width as number || 0;
    const height = compDataItem.style?.height as number || 0;
    const xRange: [number, number] = [left - 20, left + width + 20];
    const yRange: [number, number] = [top - 20, top + height + 20];
    if (e.clientX < xRange[0] || e.clientX > xRange[1] || e.clientY < yRange[0] || e.clientY > yRange[1]) {
      if (showAnchorPoints) {
        setShowAnchorPoints(false);
        window.removeEventListener('mousemove', mouseMoveOutsideField);
      }
    }
  };

  window.addEventListener('mousemove', mouseMoveOutsideField);

  return (
    <>
      <div
        className={styles.Shape}
        style={compDataItem.style}
        onMouseDown={mouseDownOnShapeHandler}
        onMouseEnter={mouseOverOnShapeHandler}
      >
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
      {showAnchorPoints && <AnchorPoints {...anchorPointsProps} />}
    </>
  );
};

export default Shape;

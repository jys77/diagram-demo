import React from 'react';
import styles from './index.module.less';
import { AnchorPointsProps } from './interfaces';
import { useDashLineModel } from '../store';
import { DashLinePos } from '../store/interfaces';

const anchorList = ['t', 'b', 'l', 'r'] as const;
type Anchor = typeof anchorList[number];

const AnchorPoints: React.FC<AnchorPointsProps> = ({
  height,
  width,
  top,
  left,
  setShowAnchorPoints,
  stageContent,
}) => {
  const { setPos, setShowDashLine, clearPos } = useDashLineModel();

  const getAnchorStyle = (anchor: Anchor) => {
    let anchorTop;
    let anchorLeft;
    switch (anchor) {
      case 't':
        anchorLeft = left + width / 2;
        anchorTop = top - 10;
        break;
      case 'b':
        anchorLeft = left + width / 2;
        anchorTop = top + height + 10;
        break;
      case 'l':
        anchorLeft = left - 10;
        anchorTop = top + height / 2;
        break;
      case 'r':
        anchorLeft = left + width + 10;
        anchorTop = top + height / 2;
        break;
      default:
        anchorTop = top;
        anchorLeft = left;
    }
    return {
      left: anchorLeft,
      top: anchorTop,
    };
  };

  const mouseDownOnAnchorPointHandler = (anchor: Anchor) => {
    // flag that makes anchor points hide and dash line shows after moving
    let flag = 1;
    const topInSvg = top - stageContent.top;
    const leftInSvg = left - stageContent.left;
    const pos: DashLinePos = { start: {}, end: {} } as DashLinePos;
    switch (anchor) {
      case 't':
        pos.start.x = leftInSvg + width / 2;
        pos.start.y = topInSvg;
        break;
      case 'b':
        pos.start.x = leftInSvg + width / 2;
        pos.start.y = topInSvg + height;
        break;
      case 'l':
        pos.start.x = leftInSvg;
        pos.start.y = topInSvg + height / 2;
        break;
      case 'r':
        pos.start.x = leftInSvg + width;
        pos.start.y = topInSvg + height / 2;
        break;
      default:
        pos.start.x = leftInSvg;
        pos.start.y = topInSvg;
    }
    const move = (e: MouseEvent) => {
      if (flag) {
        flag = 0;
        setShowAnchorPoints(false);
        setShowDashLine(true);
      }
      pos.end.x = e.clientX - stageContent.left;
      pos.end.y = e.clientY - stageContent.top;
      setPos({ start: { x: pos.start.x, y: pos.start.y }, end: { x: pos.end.x, y: pos.end.y } });
    };

    const up = () => {
      setShowDashLine(false);
      clearPos();
      flag = 1;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  return (
    <div>
      {anchorList.map((anchor) => (
        <div
          onMouseDown={() => mouseDownOnAnchorPointHandler(anchor)}
          key={`anchor-${anchor}`}
          className={styles.ShapeAnchor}
          style={getAnchorStyle(anchor)}
        />
      ))}
    </div>
  );
};

export default AnchorPoints;

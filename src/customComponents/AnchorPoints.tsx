import React from 'react';
import styles from './index.module.less';
import { AnchorPointsProps } from './interfaces';
import {
  useDashLineModel,
  useDrawingPathModel,
  useAnchorPathsModel,
  useSnapshotModel,
} from '../store';
import { AnchorPath, DashLinePos } from '../store/interfaces';
import { deepClone, generatePathId } from '../utils';

const anchorList = ['t', 'b', 'l', 'r'] as const;
type Anchor = typeof anchorList[number];

const AnchorPoints: React.FC<AnchorPointsProps> = ({
  height,
  width,
  top,
  left,
  setShowAnchorPoints,
  stageContent,
  shapeId,
}) => {
  const { setPos, setShowDashLine, clearPos } = useDashLineModel();
  const { clearPath, setPath } = useDrawingPathModel();
  const { addAnchorPath } = useAnchorPathsModel();
  const { setRecordCount } = useSnapshotModel();

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
  // mouse down on an anchor point to start generating a path
  const mouseDownOnAnchorPointHandler = (anchor: Anchor) => {
    // flag that makes anchor points hide and dash line shows after moving
    let flag = 1;
    const topInSvg = top - stageContent.top;
    const leftInSvg = left - stageContent.left;
    const pos: DashLinePos = { start: {}, end: {} } as DashLinePos;

    // clear previous anchor path first
    clearPath();

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
      let clonePath!: Omit<AnchorPath, 'pathId'>;

      // save path with starting (x1,y1) and fromId
      setPath((prevState) => {
        clonePath = deepClone(prevState);
        clonePath.x1 = pos.start.x;
        clonePath.y1 = pos.start.y;
        clonePath.fromId = shapeId;
        clonePath.fromEdge = anchor;
        return clonePath;
      });
      const pathId = generatePathId();
      addAnchorPath({ ...clonePath, pathId });
      if (!Object.values(clonePath).includes(null) && clonePath.fromId !== clonePath.toId) {
        setRecordCount((prevState) => prevState + 1);
      }

      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  // mouse up on an anchor point to end a generating path
  const mouseUpOverAnchorHandler = (anchor: Anchor) => {
    let x2: number | null;
    let y2: number | null;
    const topInSvg = top - stageContent.top;
    const leftInSvg = left - stageContent.left;
    switch (anchor) {
      case 't':
        x2 = leftInSvg + width / 2;
        y2 = topInSvg;
        break;
      case 'b':
        x2 = leftInSvg + width / 2;
        y2 = topInSvg + height;
        break;
      case 'l':
        x2 = leftInSvg;
        y2 = topInSvg + height / 2;
        break;
      case 'r':
        x2 = leftInSvg + width;
        y2 = topInSvg + height / 2;
        break;
      default:
        x2 = null;
        y2 = null;
    }

    setPath((prevState) => {
      const clonePath = deepClone(prevState);
      clonePath.x2 = x2;
      clonePath.y2 = y2;
      clonePath.toId = shapeId;
      clonePath.toEdge = anchor;
      return clonePath;
    });
  };

  return (
    <div>
      {anchorList.map((anchor) => (
        <div
          onMouseDown={() => mouseDownOnAnchorPointHandler(anchor)}
          onMouseUp={() => mouseUpOverAnchorHandler(anchor)}
          key={`anchor-${anchor}`}
          className={styles.ShapeAnchor}
          style={getAnchorStyle(anchor)}
        />
      ))}
    </div>
  );
};

export default AnchorPoints;

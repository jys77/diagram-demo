import React, { useState } from 'react';
import { useAnchorPathsModel, useSnapshotModel } from '../store';
import styles from './index.module.less';

const AnchorPaths: React.FC = () => {
  const { anchorPathData, removeAnchorPath } = useAnchorPathsModel();
  const { setRecordCount } = useSnapshotModel();
  const [selectedPathId, setSelectedPathId] = useState<number | null>(null);
  const selectPath = (pathId: number) => {
    setSelectedPathId(pathId);
  };
  const onBlurPath = () => {
    setSelectedPathId(null);
  };
  const onKeyDownOnPath = (e: React.KeyboardEvent) => {
    if (e.code === 'Delete' && selectedPathId !== null) {
      removeAnchorPath(selectedPathId);
      setRecordCount((prevState) => prevState + 1);
      setSelectedPathId(null);
    }
  };
  return (
    <>
      {anchorPathData.map((path, index) => {
        const {
          x1, y1, x2, y2, toEdge,
        } = path as any;
        let cp1X: number;
        let cp1Y: number;
        let cp2X: number;
        let cp2Y: number;
        // control points set to the mid edge
        if (toEdge === 'l' || toEdge === 'r') {
          cp1X = (x2 - x1) / 2 + x1;
          cp1Y = y1;
          cp2X = cp1X;
          cp2Y = y2;
        } else {
          cp1X = x1;
          cp1Y = (y2 - y1) / 2 + y1;
          cp2X = x2;
          cp2Y = cp1Y;
        }

        const pathProps: React.SVGProps<SVGPathElement> = {
          d: `M ${x1}, ${y1} C ${cp1X}, ${cp1Y} ${cp2X}, ${cp2Y} ${x2}, ${y2}`,
          strokeWidth: selectedPathId === path.pathId ? 2 : 1,
          stroke: selectedPathId === path.pathId ? '#0077ff' : '#ACB1B5',
          fill: 'none',
          markerEnd: selectedPathId === path.pathId ? 'url(#arrow_hover)' : 'url(#arrow)',
        };
        return (
          <path
            key={`${x1},${y1}-${x2},${y2}`}
            className={styles.Path}
            onClick={() => selectPath(path.pathId)}
            tabIndex={index}
            onBlur={onBlurPath}
            onKeyDown={onKeyDownOnPath}
            {...pathProps}
          />
        );
      })}
    </>
  );
};

export default AnchorPaths;

import React, { useState } from 'react';
import { useAnchorPathsModel } from '../store';
import styles from './index.module.less';

const AnchorPaths = () => {
  const { anchorPathData, removeAnchorPath } = useAnchorPathsModel();
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
    }
  };
  return (
    <>
      {anchorPathData.map((path, index) => {
        const {
          x1, y1, x2, y2,
        } = path as any;
          // control points set to the mid edge
        const cp1X = (x2 - x1) / 2 + x1;
        const cp1Y = y1;
        const cp2X = cp1X;
        const cp2Y = y2;
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

import React from 'react';
import { useAnchorPathsModel } from '../store';

const AnchorPaths = () => {
  const { anchorPathData } = useAnchorPathsModel();
  return (
    <>
      {anchorPathData.map((path) => {
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
          strokeWidth: 1,
          stroke: '#ACB1B5',
          fill: 'none',
          markerEnd: 'url(#arrow)',
        };
        return <path key={`${x1},${y1}-${x2},${y2}`} {...pathProps} />;
      })}
    </>
  );
};

export default AnchorPaths;

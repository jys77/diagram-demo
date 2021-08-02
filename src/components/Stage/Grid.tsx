import React from 'react';
import { DashLine, AnchorPaths } from '../../customComponents';
import { useDashLineModel } from '../../store';

const Grid = () => {
  const { showDashLine } = useDashLineModel();
  return (
    <svg className="grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse">
          <path
            d="M 7.236328125 0 L 0 0 0 7.236328125"
            fill="none"
            stroke="rgba(207, 207, 207, 0.3)"
            strokeWidth="1"
          />
        </pattern>
        <pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse">
          <rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)" />
          <path
            d="M 36.181640625 0 L 0 0 0 36.181640625"
            fill="none"
            stroke="rgba(186, 186, 186, 0.5)"
            strokeWidth="1"
          />
        </pattern>
        <marker
          id="arrow"
          markerUnits="strokeWidth"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto"
        >
          <path id="markerId" d="M0,0 L0,10 L10,5 z" fill="#ACB1B5" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {showDashLine && <DashLine />}
      <AnchorPaths />
    </svg>
  );
};

export default Grid;

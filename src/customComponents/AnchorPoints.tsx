import React from 'react';
import styles from './index.module.less';

export interface AnchorPointsProps {
  height: number;
  width: number;
  top: number;
  left: number;
}

const anchorList = ['t', 'b', 'l', 'r'] as const;
type Anchor = typeof anchorList[number];

const AnchorPoints: React.FC<AnchorPointsProps> = ({
  height, width, top, left,
}) => {
  const getAnchorStyle = (anchor: Anchor) => {
    let anchorTop;
    let anchorLeft;
    switch (anchor) {
      case 't':
        anchorLeft = left + width / 2;
        anchorTop = top - 10;
        console.log({ top, anchorTop });
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
  return (
    <div>
      {anchorList.map((anchor) => (
        <div key={`anchor-${anchor}`} className={styles.ShapeAnchor} style={getAnchorStyle(anchor)} />
      ))}
    </div>
  );
};

export default AnchorPoints;

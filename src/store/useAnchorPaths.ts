import { useState } from 'react';
import { createModel } from 'hox';
import { AnchorPath } from './interfaces';
import { deepClone } from '../utils';

const useAnchorPaths = () => {
  const stageContent = document.querySelector('#stageContent')?.getBoundingClientRect() || {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  };
  const [anchorPathData, setAnchorPathData] = useState<AnchorPath[]>([]);
  const addAnchorPath = (anchorPath: AnchorPath) => {
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      cloneData.push(anchorPath);
      return cloneData;
    });
  };
  const changeAnchorPaths = ({
    shapeId,
    top,
    left,
    width,
    height,
  }: {
    shapeId: number;
    top: number;
    left: number;
    width: number;
    height: number;
  }) => {
    const topInSvg = top - stageContent.top;
    const leftInSvg = left - stageContent.left;
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      return cloneData.map((path: AnchorPath) => {
        if (path.fromId === shapeId) {
          const { fromEdge } = path;
          let x1: number;
          let y1: number;
          switch (fromEdge) {
            case 't':
              x1 = leftInSvg + width / 2;
              y1 = topInSvg;
              break;
            case 'b':
              x1 = leftInSvg + width / 2;
              y1 = topInSvg + height;
              break;
            case 'l':
              x1 = leftInSvg;
              y1 = topInSvg + height / 2;
              break;
            case 'r':
              x1 = leftInSvg + width;
              y1 = topInSvg + height / 2;
              break;
            default:
              x1 = path.x1 as number;
              y1 = path.y1 as number;
          }
          return { ...path, x1, y1 };
        }
        if (path.toId === shapeId) {
          const { toEdge } = path;
          let x2: number;
          let y2: number;
          switch (toEdge) {
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
              x2 = path.x2 as number;
              y2 = path.y2 as number;
          }
          return { ...path, x2, y2 };
        }
        return path;
      });
    });
  };

  const deleteAnchorPaths = (shapeId: number) => {
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      return cloneData.filter((path: AnchorPath) => path.fromId !== shapeId && path.toId !== shapeId);
    });
  };

  return {
    anchorPathData,
    addAnchorPath,
    changeAnchorPaths,
    deleteAnchorPaths,
  };
};

export default createModel(useAnchorPaths);

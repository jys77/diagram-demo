import { useState } from 'react';
import { createModel } from 'hox';
import { AnchorPath } from './interfaces';
import { deepClone } from '../utils';

const useAnchorPaths = () => {
  const [anchorPathData, setAnchorPathData] = useState<AnchorPath[]>([]);

  const addAnchorPath = (anchorPath: AnchorPath) => {
    if (!Object.values(anchorPath).includes(null) && anchorPath.fromId !== anchorPath.toId) {
      setAnchorPathData((prevState) => {
        const anchorPaths = [...deepClone(prevState), anchorPath];
        return anchorPaths;
      });
    }
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
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      const filteredData = cloneData.map((path: AnchorPath) => {
        if (path.fromId === shapeId) {
          const { fromEdge } = path;
          let x1: number;
          let y1: number;
          switch (fromEdge) {
            case 't':
              x1 = left + width / 2;
              y1 = top;
              break;
            case 'b':
              x1 = left + width / 2;
              y1 = top + height;
              break;
            case 'l':
              x1 = left;
              y1 = top + height / 2;
              break;
            case 'r':
              x1 = left + width;
              y1 = top + height / 2;
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
              x2 = left + width / 2;
              y2 = top;
              break;
            case 'b':
              x2 = left + width / 2;
              y2 = top + height;
              break;
            case 'l':
              x2 = left;
              y2 = top + height / 2;
              break;
            case 'r':
              x2 = left + width;
              y2 = top + height / 2;
              break;
            default:
              x2 = path.x2 as number;
              y2 = path.y2 as number;
          }
          return { ...path, x2, y2 };
        }
        return path;
      });
      return filteredData;
    });
  };

  // delete anchor paths by related shape id
  const deleteAnchorPaths = (shapeId: number) => {
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      const filteredData = cloneData.filter((path: AnchorPath) => path.fromId !== shapeId && path.toId !== shapeId);
      return filteredData;
    });
  };

  // delete anchor path by its id
  const removeAnchorPath = (pathId: number) => {
    setAnchorPathData((prevState) => {
      const cloneData = deepClone(prevState);
      const filteredData = cloneData.filter((path: AnchorPath) => path.pathId !== pathId);
      return filteredData;
    });
  };

  return {
    anchorPathData,
    setAnchorPathData,
    addAnchorPath,
    changeAnchorPaths,
    deleteAnchorPaths,
    removeAnchorPath,
  };
};

export default createModel(useAnchorPaths);

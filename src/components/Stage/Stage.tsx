import React from 'react';
import componentList from '../../customComponents/componentList';
import { deepClone, generateId } from '../../utils';
import { useCompDataModel, useCurrentCompModel } from '../../store';
import { Editor } from './Editor';
import styles from './index.module.less';

const Stage: React.FC = () => {
  const { setCurrentComp } = useCurrentCompModel();
  const { addComponent } = useCompDataModel();
  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const component = deepClone(componentList[e.dataTransfer.getData('index')]);
    component.style.top = e.clientY;
    component.style.left = e.clientX;
    component.style.position = 'absolute';
    component.id = generateId();
    addComponent(component);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const deselectCurrentComp = () => {
    setCurrentComp(null);
  };

  return (
    <div className={styles.StageContainer}>
      <div className={styles.StageContent} onDrop={onDrop} onDragOver={onDragOver} onMouseUp={deselectCurrentComp}>
        <Editor />
      </div>
    </div>
  );
};

export default Stage;

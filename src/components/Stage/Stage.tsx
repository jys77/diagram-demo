import React from 'react';
import componentList from '../../customComponents/componentList';
import { deepClone, generateId } from '../../utils';
import { useCompDataModel, useCurrentCompModel, useSnapshotModel } from '../../store';
import { Editor } from './Editor';
import styles from './index.module.less';

const Stage: React.FC = () => {
  const { currentComp, setCurrentComp } = useCurrentCompModel();
  const { addComponent, changeComponent } = useCompDataModel();
  const { recordSnapshot } = useSnapshotModel();

  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const component = deepClone(componentList[e.dataTransfer.getData('index')]);
    component.style.top = e.clientY;
    component.style.left = e.clientX;
    component.style.position = 'absolute';
    component.id = generateId();
    const compData = addComponent(component);
    recordSnapshot(compData);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const deselectCurrentComp = () => {
    setCurrentComp(null);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === 'Delete' && currentComp !== null) {
      changeComponent(currentComp.id);
      setCurrentComp(null);
    }
  };

  return (
    <div className={styles.StageContainer}>
      <div
        id="stageContent"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={-1}
        className={styles.StageContent}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onMouseUp={deselectCurrentComp}
        onKeyDown={onKeydown}
      >
        <Editor />
      </div>
    </div>
  );
};

export default Stage;

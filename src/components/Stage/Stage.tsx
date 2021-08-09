import React from 'react';
import componentList from '../../customComponents/componentList';
import { deepClone, generateId } from '../../utils';
import { useCompDataModel, useCurrentCompModel, useSnapshotModel } from '../../store';
import { Editor } from './Editor';
import Grid from './Grid';
import styles from './index.module.less';

const Stage: React.FC = () => {
  const { currentComp, setCurrentComp } = useCurrentCompModel();
  const { addComponent, deleteComponent } = useCompDataModel();
  const { setRecordCount } = useSnapshotModel();
  const stageContent = document.querySelector('#stageContent')?.getBoundingClientRect() || {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const component = deepClone(componentList[e.dataTransfer.getData('index')]);
    component.style.top = e.clientY - stageContent.top;
    component.style.left = e.clientX - stageContent.left;
    component.style.position = 'absolute';
    component.id = generateId();
    addComponent(component);
    setRecordCount((prevState) => prevState + 1);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const deselectCurrentComp = () => {
    setCurrentComp(null);
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Delete' && currentComp !== null) {
      deleteComponent(currentComp.id);
      setRecordCount((prevState) => prevState + 1);
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
        <Grid />
        <Editor />
      </div>
    </div>
  );
};

export default Stage;

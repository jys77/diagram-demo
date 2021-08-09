import React from 'react';
import { Button, Card, message } from 'antd';
import { useSnapshotModel } from '../../store';

const ToolBar: React.FC = () => {
  const {
    canUndo,
    canRedo,
    undo,
    redo,
    snapshotData,
    snapshotIndex,
  } = useSnapshotModel();

  const save = () => {
    window.localStorage.setItem('data', JSON.stringify(snapshotData[snapshotIndex]));
    message.success('Saved!');
  };
  return (
    <Card style={{ height: '5rem' }}>
      <Button disabled={!canUndo} onClick={undo}>undo</Button>
      <Button disabled={!canRedo} onClick={redo}>redo</Button>
      <Button onClick={save}>save</Button>
    </Card>
  );
};

export default ToolBar;

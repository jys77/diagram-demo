import React from 'react';
import { Button, Card } from 'antd';
import { useSnapshotModel } from '../../store';

const ToolBar: React.FC = () => {
  const {
    canUndo, canRedo, undo, redo,
  } = useSnapshotModel();
  return (
    <Card style={{ height: '5rem' }}>
      <Button disabled={!canUndo} onClick={undo}>undo</Button>
      <Button disabled={!canRedo} onClick={redo}>redo</Button>
      <Button>insert picture</Button>
      <Button>save</Button>
    </Card>
  );
};

export default ToolBar;

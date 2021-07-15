import React from 'react';
import { Button, Card } from 'antd';

const ToolBar: React.FC = () => (
  <Card style={{ height: '5rem' }}>
    <Button>undo</Button>
    <Button>redo</Button>
    <Button>insert picture</Button>
    <Button>save</Button>
  </Card>
);

export default ToolBar;

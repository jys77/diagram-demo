import React from 'react';
import { Button, Card, message } from 'antd';
import {
  useSnapshotModel, useCompDataModel, useCurrentCompModel,
} from '../../store';

const ToolBar: React.FC = () => {
  const {
    canUndo,
    canRedo,
    undo,
    redo,
    snapshotData,
    snapshotIndex,
    setRecordCount,
  } = useSnapshotModel();
  const { clearAll } = useCompDataModel();
  const { setCurrentComp } = useCurrentCompModel();

  const save = () => {
    window.localStorage.setItem('data', JSON.stringify(snapshotData[snapshotIndex]));
    message.success('Saved!');
  };

  const clear = () => {
    clearAll();
    setCurrentComp(null);
    if (snapshotData.length > 0) {
      setRecordCount((prevState) => prevState + 1);
    }
  };

  const exportToPDF = () => {
    const content = document.querySelector('#stageContent');
    const height = content?.clientHeight;
    const width = content?.clientWidth;
    const contentString = content?.outerHTML;
    const printWindow = window.open('', '', `height=${height},width=${width}`);
    printWindow?.document.write('<html><head><title>diagram</title>');
    printWindow?.document.write('</head><body>');
    printWindow?.document.write(contentString || '');
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  };
  return (
    <Card style={{ height: '5rem' }}>
      <Button disabled={!canUndo} onClick={undo}>undo</Button>
      <Button disabled={!canRedo} onClick={redo}>redo</Button>
      <Button onClick={save}>save</Button>
      <Button onClick={clear}>clear</Button>
      <Button onClick={exportToPDF}>export to PDF</Button>
    </Card>
  );
};

export default ToolBar;

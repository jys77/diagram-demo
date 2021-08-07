import React from 'react';
import { InputNumber } from 'antd';
import { useCurrentCompModel, useCompDataModel, useSnapshotModel } from '../../../store';
import styles from './index.module.less';

const CompStyleSettings: React.FC = () => {
  const { currentComp } = useCurrentCompModel();
  const { changeComponent } = useCompDataModel();
  const { setRecordCount } = useSnapshotModel();

  const onWidthChange = (value: number) => {
    if (currentComp) {
      changeComponent(currentComp.id, { ...currentComp, style: { ...currentComp.style, width: value || 1 } });
      setRecordCount((prevState) => prevState + 1);
    }
  };

  const onHeightChange = (value: number) => {
    if (currentComp) {
      changeComponent(currentComp.id, { ...currentComp, style: { ...currentComp.style, height: value || 1 } });
      setRecordCount((prevState) => prevState + 1);
    }
  };

  return (
    currentComp && (
    <div className={styles.CompStyleSettings}>
      <p>Width</p>
      <InputNumber onChange={onWidthChange} defaultValue={currentComp.style?.width as number} min={1} />
      <p>Height</p>
      <InputNumber onChange={onHeightChange} defaultValue={currentComp.style?.height as number} min={1} />
    </div>
    )
  );
};

export default CompStyleSettings;

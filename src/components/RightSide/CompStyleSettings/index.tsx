import React, { useEffect } from 'react';
import { InputNumber } from 'antd';
import { useCurrentCompModel, useCompDataModel } from '../../../store';
import styles from './index.module.less';

const CompStyleSettings = () => {
  const { currentComp } = useCurrentCompModel();
  const { compData, changeComponent } = useCompDataModel();

  useEffect(() => {
    console.log(compData);
  }, [compData]);

  const onWidthChange = (value: number) => {
    if (currentComp) {
      changeComponent(currentComp.id, { ...currentComp, style: { ...currentComp.style, width: value || 1 } });
    }
  };

  const onHeightChange = (value: number) => {
    if (currentComp) {
      changeComponent(currentComp.id, { ...currentComp, style: { ...currentComp.style, height: value || 1 } });
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

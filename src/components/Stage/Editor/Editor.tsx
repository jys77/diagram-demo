import React, { useEffect } from 'react';
import { CompDataItem } from '../../../store/interfaces';
import { useCompDataModel } from '../../../store';
import { Shape, Text, Rect } from '../../../customComponents';
import styles from './index.module.less';

const customComponentsMap: { [k in string]: React.FC<any> } = {
  Text,
  Rect,
};

const Editor: React.FC = () => {
  const { compData } = useCompDataModel();
  useEffect(() => {
    // console.log(compData);
  }, [compData]);
  return (
    <div className={styles.EditorContainer}>
      {compData && compData.map((comp: CompDataItem, key) => {
        const Comp: React.FC<CompDataItem> = customComponentsMap[comp.name];
        return (
          <Shape key={`${comp.name}${key}`} {...comp}>
            <Comp {...comp} />
          </Shape>
        );
        // return <Comp key={`${comp.name}${key}`} {...comp} />;
      })}
    </div>
  );
};

export default Editor;

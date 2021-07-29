import React, { useState, useRef } from 'react';
import { CompDataItem } from '../store/interfaces';
import { useCompDataModel, useSnapshotModel } from '../store';
import styles from './index.module.less';

const Text: React.FC<CompDataItem> = (compDataItem) => {
  const ref = useRef(null);
  const { changeComponent } = useCompDataModel();
  const { recordSnapshot } = useSnapshotModel();
  const { id, props } = compDataItem;
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const selectText = (elem: Node) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elem);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const onDoubleClick = () => {
    setCanEdit(true);
    selectText(ref.current as unknown as Node);
  };
  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const textValue = e.target.innerHTML || '&nbsp;';
    const snapshot = changeComponent(compDataItem.id, { ...compDataItem, props: { value: textValue } });
    recordSnapshot(snapshot);
    setCanEdit(false);
  };

  return (
    <div
      className={styles.Text}
      contentEditable={canEdit}
      onDoubleClick={onDoubleClick}
      onBlur={onBlur}
      tabIndex={id}
        // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.value }}
      ref={ref}
    />
  );
};

export default Text;

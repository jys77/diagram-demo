import React, { useState, useRef } from 'react';
import { CompDataItem } from '../store/interfaces';
import { useCompDataModel } from '../store';

const Text: React.FC<CompDataItem> = (compDataItem) => {
  const ref = useRef(null);
  const { changeComponent } = useCompDataModel();
  const { id, props, style } = compDataItem;
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
  const onBlur = (e: any) => {
    const textValue = e.target.innerHTML || '&nbsp;';
    changeComponent(compDataItem.id, { ...compDataItem, props: { value: textValue } });
  };

  return (
    <div>
      <div
        contentEditable={canEdit}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
        tabIndex={id}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: props.value }}
        ref={ref}
        style={style}
      />
    </div>
  );
};

export default Text;

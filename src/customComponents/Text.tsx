import React, { useState } from 'react';
import { CompDataItem } from '../store/interfaces';

const Text: React.FC<CompDataItem> = (compDataItem) => {
  const { id, props, style } = compDataItem;
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const changeCanEdit = () => {
    setCanEdit((prevState) => !prevState);
  };
  return (
    <div
      contentEditable={canEdit}
      onDoubleClick={changeCanEdit}
      tabIndex={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.value }}
      style={style}
    />
  );
};

export default Text;

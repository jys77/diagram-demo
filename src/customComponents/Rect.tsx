import React from 'react';
import { CompDataItem } from '../store/interfaces';
import Text from './Text';

const Rect: React.FC<CompDataItem> = (compDataItem) => (
  <div>
    <Text {...compDataItem} />
  </div>
);

export default Rect;

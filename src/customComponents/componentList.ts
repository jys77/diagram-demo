import { Component } from './interfaces';

const componentList: Component[] = [
  {
    name: 'Text',
    label: 'text',
    props: {
      value: 'double-click to edit',
    },
    icon: 'text',
    style: {
      // width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
    },
  },
  {
    name: 'Text',
    label: 'text2',
    props: {
      value: 'double-click to edit',
    },
    icon: 'text',
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
    },
  },
];

export default componentList;

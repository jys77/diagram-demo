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
    name: 'Rect',
    label: 'rectangle',
    props: {
      value: '&nbsp;',
    },
    icon: 'rect',
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      verticalAlign: 'middle',
    },
  },
];

export default componentList;

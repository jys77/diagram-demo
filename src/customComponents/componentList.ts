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
      width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '#ACB1B5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    name: 'Rect',
    label: 'rectangle',
    props: {
      value: 'Rect',
    },
    icon: 'rect',
    style: {
      width: 150,
      height: 50,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '#ACB1B5',
      borderColor: '#ACB1B5',
      borderWidth: 2,
      backgroundColor: '',
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    name: 'Rect',
    label: 'circle',
    props: {
      value: 'Circle',
    },
    icon: 'circle',
    style: {
      width: 150,
      height: 50,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '#ACB1B5',
      borderColor: '#ACB1B5',
      borderWidth: 2,
      backgroundColor: '',
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
    },
  },
];

export default componentList;

import image from './image';
import text from './text';

export const componentList = [image.component, text.component];

export const infoList = [

  {
    name: 'Div',
    config: {
      componentName: 'Div',
      props: {
        style: {
        },
      },
      children: [],
    },
  },
  image.info, text.info,
  {
    name: 'ElInput',
    config: {
      componentName: 'ElInput',
      props: {
        style: {
        },
      },
    },
  },
  {
    name: 'ElButton',
    config: {
      componentName: 'ElButton',
      props: {
        type: 'success',
        style: {
        },
      },
      slots: [{
        componentName: 'Div',
        slotName: 'default',
        children: [],
      }],
    },
  },
  {
    name: 'ElCard',
    config: {
      componentName: 'ElCard',
      props: {
      },
      slots: [{
        componentName: 'Div',
        slotName: 'header',
        children: [],
      }, {
        componentName: 'Div',
        slotName: 'default',
        children: [],
      }],
    },
  },
];

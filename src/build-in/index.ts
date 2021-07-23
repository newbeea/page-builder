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
        size: 'mini',
        style: {
        },
      },
      slots: [{
        componentName: 'Div',
        slotName: 'default',
        props: {
        },
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
        props: {
        },
        children: [],
      }, {
        componentName: 'Div',
        slotName: 'default',
        props: {
        },
        children: [],
      }],
    },
  },
];

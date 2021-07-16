import image from './image';

export const componentList = [image.component];

export const infoList = [image.info,
  {
    name: 'ElInput',
    config: {
      componentName: 'ElInput',
      props: {
        style: {
          width: '100%',
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
          width: '100%',
        },
      },
      slots: [{
        componentName: 'Div',
        children: [],
      }],
    },
  },
];

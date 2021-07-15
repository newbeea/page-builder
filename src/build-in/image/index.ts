import Image from './Image.vue';

const props = {
  src: {
    label: 'Image url',
    input: 'InputExpression',
  },
  title: {
    label: 'Title',
    input: 'InputExpression',
  },
};
const config = {
  componentName: 'Image',
  props: {
    style: {
      width: '100%',
    },
    src: 'https://media.fameandpartners.com/product/strappy-draped-gown/preview/main/1000xAUTO/matte-satin~champagne~0.jpg',
  },
};
const thumb = '';
const preview = '';
const info = {
  name: 'Image',
  props,
  config,
  thumb,
  preview,
};
// export default info;

export default {
  info,
  component: Image,
};

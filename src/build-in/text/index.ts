import Text from './text';

const props = [
  {
    prop: 'text',
    label: 'Text',
    input: 'InputExpression',
  },
];
const config = {
  componentName: Text.name,
  props: {
    style: {
    },
    text: 'text',
  },
};
const thumb = '';
const preview = '';
const info = {
  name: Text.name,
  props,
  config,
  thumb,
  preview,
};
// export default info;

export default {
  info,
  component: Text,
};

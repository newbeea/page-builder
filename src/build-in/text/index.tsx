import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Text',
  props: {
    text: String,
  },
  setup(props) {
    return () => (<span>{props.text}</span>);
  },
});

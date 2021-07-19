import { defineComponent, PropType } from 'vue';
import style from './text.module.scss';

export default defineComponent({
  name: 'Text',
  props: {
    text: String,
  },
  setup(props) {
    return () => (<span>{props.text}</span>);
  },
});

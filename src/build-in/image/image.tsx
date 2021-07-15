import { defineComponent, PropType } from 'vue';
import { ComponentConfig } from '@/store/modules/page';
import style from './image.module.scss';

export default defineComponent({
  name: 'Image',
  props: {
    config: {
      type: Object as PropType<ComponentConfig>,
      default: () => ({}),
    },
  },
  setup(props) {
    console.log(style.pbImg);
    const img = () => (
      <img
        class={style.pbImg}
        src={props.config.props.src}
        title={props.config.props.title}
        alt={props.config.props.alt}
        style={props.config.props.style}
      />
    );
    return () => {
      if (props.config.props.href) {
        return (
          <a href={props.config.props.href}>
            {img()}
          </a>

        );
      }
      return img();
    };
  },
});

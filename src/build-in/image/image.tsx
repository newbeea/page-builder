import { defineComponent, PropType } from 'vue';
import style from './image.module.scss';

export default defineComponent({
  name: 'Image',
  props: {
    src: String,
    title: String,
    alt: String,
    href: String,
  },
  setup(props) {
    return () => {
      const img = (
        <img
          class={style.pbImg}
          src={props.src}
          title={props.title}
          alt={props.alt}
        />
      );
      if (props.href) {
        return (
          <a href={props.href}>
            {img}
          </a>

        );
      }
      return img;
    };
  },
});

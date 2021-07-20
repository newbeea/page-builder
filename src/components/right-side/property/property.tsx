import {
  defineComponent, PropType, ref, toRef,
} from 'vue';
import BuilderModule from '@/store/modules/builder';
import { ComponentConfig } from '@/store/modules/types';
import style from './property.module.scss';

export default defineComponent({
  name: 'PbProperty',
  props: {
    config: {
      type: Object as PropType<ComponentConfig>,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => {
      const properties = BuilderModule.propConfig[BuilderModule.activeConfig.componentName];
      const render = () => {
        const list: any = [];
        properties.forEach((p) => {
          if (p.input === 'InputExpression') {
            list.push(
            <div class={style.pbProperty}>
              <span>{p.label}</span><el-input v-model={BuilderModule.activeConfig.props[p.prop]}></el-input>
            </div>,
            );
          }
        });
        return list;
      };
      return render();
    };
  },
});

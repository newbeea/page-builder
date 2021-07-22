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
      const properties = BuilderModule.builderState.activeProps;
      const render = () => {
        const list: any = [];

        properties?.forEach((p) => {
          if (BuilderModule.builderState.activeConfig) {
            if (p.input.component === 'InputExpression') {
              list.push(
              <div class={style.pbProperty}>
                <span class={style.pbTitle}>{p.label}</span>
                <el-input v-model={BuilderModule.builderState.activeConfig.props[p.prop]}></el-input>
              </div>,
              );
            }
            if (p.input.component === 'Select') {
              list.push(
                <div class={style.pbProperty}>
                  <span class={style.pbTitle}>{p.label}</span>
                  <el-select v-model={BuilderModule.builderState.activeConfig.props[p.prop]}>
                    {
                      p.input.config.options.map((item: any) => (<el-option
                          key={item.value}
                          label={item.label}
                          value={item.value}>
                        </el-option>))
                    }
                  </el-select>
                </div>,
              );
            }
            if (p.input.component === 'Switch') {
              list.push(
                <div class={style.pbProperty}>
                  <span class={style.pbTitle}>{p.label}</span>
                  <el-switch v-model={BuilderModule.builderState.activeConfig.props[p.prop]}>
                  </el-switch>
                </div>,
              );
            }
          }
        });

        return list;
      };
      return render();
    };
  },
});

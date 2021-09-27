import {
  defineComponent, PropType, reactive, ref, toRef, watch,
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
    let exportProp: any = {};
    watch(
      () => BuilderModule.builderState.activeProps,
      (config, prevConfig) => {
        exportProp = {};
        BuilderModule.builderState.activeProps?.forEach((p) => {
          exportProp[p.prop] = exportProp[p.prop] || ref(false);
        });
      },
      {
        deep: true,
      },
    );

    const onSwitch = (prop: any) => () => {
      const action = !BuilderModule.builderState.activeConfig!._props[prop.prop] ? 'add' : 'remove';
      console.log({
        key: prop.prop,
        prop,
        action,
      });
      BuilderModule.MARK_PROPS({
        key: prop.prop,
        prop,
        action,
      });
    };

    const exportProperty = (p: any) => (
        <div class={style.pbPropertyHeader}>
          <span class={style.pbTitle}>{p.label}</span>
          <input type="checkbox" checked={BuilderModule.builderState.activeConfig!._props[p.prop]} onClick={onSwitch(p)}/>
          <span class={style.pbExportTitle}>export</span>
          {
            BuilderModule.builderState.activeConfig!._props[p.prop]
              ? <el-input size="mini"
                  v-model={BuilderModule.builderState.activeConfig!._props[p.prop].input.config.prop}
                  placeholder="property name"
                ></el-input>
              : null
          }
        </div>
    );
    return () => {
      const render = () => {
        const properties = BuilderModule.builderState.activeProps;
        const list: any = [];
        if (BuilderModule.builderState.activeConfig) {
          // common properties
          list.push(
            <div class={style.pbProperty}>
              <div class={style.pbPropertyHeader}>
                <span class={style.pbTitle}>Name</span>
              </div>
              <el-input size="mini" v-model={BuilderModule.builderState.activeConfig.name}></el-input>
            </div>,
          );
          list.push(
            <div class={style.pbProperty}>
              <div class={style.pbPropertyHeader}>
                <span class={style.pbTitle}>Class</span>
              </div>
              <el-input size="mini" v-model={BuilderModule.builderState.activeConfig.props.classes}></el-input>
            </div>,
          );
          // own properties
          properties?.forEach((p) => {
            const attribute = p.input.config?.attribute || {};

            if (p.input.component === 'InputExpression') {
              list.push(
                <div class={style.pbProperty}>
                  {exportProperty(p)}
                  <el-input { ...attribute } size="mini" v-model={BuilderModule.builderState.activeConfig!.props[p.prop]}></el-input>
                </div>,
              );
            }
            if (p.input.component === 'InputImage') {
              const uploading = ref(false);
              const onSuccess = (response: any, file: any, fileList: any[]) => {
                BuilderModule.UPDATE_PROPS({
                  [p.prop]: eval(`file.response.${p.input.config.imageUrlExpression}`),
                });
                uploading.value = false;
              };

              const beforeUpload = () => {
                uploading.value = true;
              };

              list.push(
                <div class={style.pbProperty}>
                  {exportProperty(p)}
                  <el-input size="mini" v-model={BuilderModule.builderState.activeConfig!.props[p.prop]}></el-input>
                  <el-upload size="mini"
                    on-success={onSuccess}
                    before-upload={beforeUpload}
                    { ...attribute }
                    show-file-list={false}
                  >
                    <el-button loading={uploading.value} size="mini" style="margin-top: 5px;">upload</el-button>
                  </el-upload>
                </div>,
              );
            }
            if (p.input.component === 'Select') {
              list.push(
                  <div class={style.pbProperty}>
                    <span class={style.pbTitle}>{p.label}</span>
                    <el-select { ...attribute } size="mini" v-model={BuilderModule.builderState.activeConfig!.props[p.prop]}>
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
                    {exportProperty(p)}
                    <el-switch { ...attribute } size="mini" v-model={BuilderModule.builderState.activeConfig!.props[p.prop]}>
                    </el-switch>
                  </div>,
              );
            }
          });
        }
        return list;
      };
      return render();
    };
  },
});

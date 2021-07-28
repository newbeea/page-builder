import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import * as jsonuri from 'jsonuri';
import store from '..';
import { ComponentConfig } from './types';

const img = {
  componentName: 'Image',
  props: {
    style: {
      // width: '100%',
    },
    className: 'a b',
    // href: 'https://a.com',
    src: 'https://media.fameandpartners.com/product/strappy-draped-gown/preview/main/1000xAUTO/matte-satin~champagne~0.jpg',
  },
};
const config: ComponentConfig = {
  componentName: 'Page',
  props: {
    style: {
    },
  },
  children: [{
    componentName: 'Div',
    props: {
      style: {
        display: 'flex',
      },
    },
    children: [{
      componentName: 'Div',
      // mode: 'alignable',
      props: {
        style: {
          width: '40%',
          backgroundColor: '#df9999',
        },
      },
      children: [img],
    }, {
      componentName: 'Div',
      props: {
        style: {
          display: 'flex',
          width: '60%',
          backgroundColor: '#c4ffc3',
        },
      },
      children: [{
        componentName: 'Div',
        props: {
        },
        children: [],
      }],
    }],
  }],
};

@Module({
  name: 'builder',
  store,
  dynamic: true,
})
class Builder extends VuexModule {
  // public config: ComponentConfig = {
  //   componentName: 'Page',
  //   props: {},
  // };

  public id = 0;

  public builderState: {
    config: ComponentConfig | undefined,
    activeConfig: ComponentConfig | null,
    activeProps: Array<{
      prop: string,
      label: string,
      input: any,
    }>,
    activePath: string,
    activeId: number | null,
  } = {
    activeConfig: null,
    activeProps: [],
    config: undefined,
    activePath: '',
    activeId: null,
  }
  // public idConfigMap: {
  //   [key: string]: ComponentConfig
  // } = {}

  // public activeConfig: ComponentConfig = img;

  public propConfig: {
    [key: string]: Array<{
      prop: string,
      label: string,
      input: any,
    }>
  } = {
    Image: [
      {
        prop: 'src',
        label: 'Url',
        input: {
          component: 'InputExpression',
        },
      },
      {
        prop: 'title',
        label: 'Title',
        input: {
          component: 'InputExpression',
        },
      },
      {
        prop: 'href',
        label: 'Link',
        input: {
          component: 'InputExpression',
        },
      },
    ],
    Text: [
      {
        prop: 'text',
        label: 'Text',
        input: {
          component: 'InputExpression',
        },
      },
    ],
    ElButton: [
      {
        prop: 'size',
        label: 'Size',
        input: {
          component: 'Select',
          config: {
            options: [{
              value: 'medium',
            }, {
              value: 'small',
            }, {
              value: 'mini',
            }],
          },
        },
      },
      {
        prop: 'type',
        label: 'Type',
        input: {
          component: 'Select',
          config: {
            options: [{
              value: 'primary',
            }, {
              value: 'success',
            }, {
              value: 'warning',
            }, {
              value: 'danger',
            }, {
              value: 'info',
            }, {
              value: 'text',
            }],
          },
        },
      },
      {
        prop: 'round',
        label: 'Round',
        input: {
          component: 'Switch',
        },
      },
    ],
  }

  @Action
  listenPage() {
    window.addEventListener('message', (event) => {
      if (typeof event.data === 'string') {
        try {
          console.log(event);
          const data = JSON.parse(event.data);
          if (data.cmd === 'update-builder-config-by-page') {
            this.UPDATE_CONFIG(data.data);
          }
          if (data.cmd === 'selected-by-page') {
            this.SET_ACTIVE_BY_PATH(data.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  @Mutation
  GEN_ID() {
    this.id += 1;
    if (this.builderState.config) { this.builderState.config._currentId = this.id; }
  }

  @Mutation
  UPDATE_STYLE({ value, key }: {
    value: string,
    key: string,
  }) {
    if (this.builderState.activeConfig?.props.style) {
      this.builderState.activeConfig.props.style[key] = value;
    }
  }

  @Action
  updateStyle({ value, key }: {
    value: string,
    key: string,
  }) {
    this.UPDATE_STYLE({
      value,
      key,
    });
  }

  @Mutation
  UPDATE_STYLES(style: any) {
    if (this.builderState.activeConfig?.props) {
      this.builderState.activeConfig.props.style = style;
    }
  }

  @Action
  updateStyles(style: any) {
    this.UPDATE_STYLES(style);
  }

  // @Mutation
  // addToMap(c: ComponentConfig) {
  //   if (c._id) { this.idConfigMap[c._id] = c; }
  // }
  @Mutation
  SET_ACTIVE_PATH(path: string) {
    this.builderState.activePath = path;
  }

  @Mutation
  SET_ACTIVE_ID(id: number) {
    this.builderState.activeId = id;
  }

  // @Action
  // setActiveConfigById(id: number) {
  //   this.SET_ACTIVE_BY_ID(id);
  // }

  // @Mutation
  // SET_ACTIVE_BY_ID(path: string) {
  //   const activeConfig = jsonuri.get(this.builderState.config, this.builderState.activePath);
  //   if (activeConfig) activeConfig._active = false;
  //   this.builderState.activePath = path;
  //   const newActiveConfig = jsonuri.get(this.builderState.config, path);
  //   this.builderState.activeConfig = newActiveConfig;
  //   if (this.builderState.activeConfig?.componentName) {
  //     newActiveConfig._active = true;
  //     this.builderState.activeProps = this.propConfig[this.builderState.activeConfig?.componentName];
  //   }
  // }

  @Mutation
  UPDATE_CONFIG(componentConfig: ComponentConfig) {
    console.log(123123);
    this.builderState.config = componentConfig;
  }

  @Action
  setActiveConfigByPath(path: string) {
    this.SET_ACTIVE_BY_PATH(path);
  }

  @Mutation
  SET_ACTIVE_BY_PATH(path: string) {
    const activeConfig = jsonuri.get(this.builderState.config, this.builderState.activePath);
    if (activeConfig) activeConfig._active = false;
    this.builderState.activePath = path;
    const newActiveConfig = jsonuri.get(this.builderState.config, path);
    this.builderState.activeConfig = newActiveConfig;
    if (this.builderState.activeConfig?.componentName) {
      newActiveConfig._active = true;
      this.builderState.activeProps = this.propConfig[this.builderState.activeConfig?.componentName];
    }
  }

  @Action
  setActive(componentConfig: ComponentConfig) {
    if (componentConfig._id === 0) {
      this.SET_ACTIVE_BY_PATH('');
    } else {
      jsonuri.walk(this.builderState.config, (value, key, parent, { path }) => {
        console.log(value, path);

        if (value._id && value._id === componentConfig._id) {
          this.SET_ACTIVE_BY_PATH(path);
        }
      });
    }
  }

  @Action({ rawError: true })
  public fetchConfig() {
    const travers = (c: ComponentConfig) => {
      c._id = this.id;
      // this.addToMap(c);
      this.GEN_ID();
      config._currentId = c._id;
      if (!c.props.style) {
        c.props.style = {};
      }
      if (c.props.className) {
        c.props.classes = c.props.className;
        delete c.props.className;
      }
      c.children?.forEach((child: ComponentConfig) => travers(child));
      c.slots?.forEach((child: ComponentConfig) => travers(child));
    };
    travers(config);

    // console.log(config);
    this.UPDATE_CONFIG(config);
  }
}

export default getModule(Builder);

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
    // href: 'https://a.com',
    src: 'https://media.fameandpartners.com/product/strappy-draped-gown/preview/main/1000xAUTO/matte-satin~champagne~0.jpg',
  },
};
const config: ComponentConfig = {
  componentName: 'Page',
  props: {
    style: {
      textAlign: 'center',
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
          width: '60%',
          backgroundColor: '#c4ffc3',
        },
      },
      children: [{
        componentName: 'Div',
        props: {
          style: {
            width: '60%',
            backgroundColor: 'black',
          },
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
    config: ComponentConfig,
    activeConfig: ComponentConfig | null,
    activeProps: Array<{
      prop: string,
      label: string,
      input: string,
    }>,
    activePath: string,
    activeId: number | null,
  } = {
    activeConfig: null,
    activeProps: [],
    config: {
      componentName: 'Page',
      props: {},
    },
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
      input: string,
    }>
  } = {
    Image: [
      {
        prop: 'src',
        label: 'Url',
        input: 'InputExpression',
      },
      {
        prop: 'title',
        label: 'Title',
        input: 'InputExpression',
      },
      {
        prop: 'href',
        label: 'Link',
        input: 'InputExpression',
      },
    ],
    Text: [
      {
        prop: 'text',
        label: 'Text',
        input: 'InputExpression',
      },
    ],
    ElButton: [
      {
        prop: 'size',
        label: 'Size',
        input: 'InputExpression',
      },
      {
        prop: 'type',
        label: 'Type',
        input: 'InputExpression',
      },
      {
        prop: 'round',
        label: 'Round',
        input: 'InputExpression',
      },
    ],
  }

  @Mutation
  genId() {
    this.id += 1;
    this.builderState.config._currentId = this.id;
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

  @Action
  setActiveConfigById(id: number) {
    this.SET_ACTIVE_BY_ID(id);
  }

  @Mutation
  SET_ACTIVE_BY_ID(path: string) {
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

  @Mutation
  setConfig(componentConfig: ComponentConfig) {
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
    jsonuri.walk(this.builderState.config, (value, key, parent, { path }) => {
      if (value._id && value._id === componentConfig._id) {
        this.SET_ACTIVE_BY_PATH(path);
      }
    });
  }

  @Mutation
  SET_ACTIVE(newActiveConfig: ComponentConfig) {
    if (this.builderState.activeConfig !== newActiveConfig) {
      if (this.builderState.activeConfig) {
        this.builderState.activeConfig._active = false;
      }

      this.builderState.activeConfig = newActiveConfig;
      if (this.builderState.activeConfig?.componentName) {
        newActiveConfig._active = true;
        this.builderState.activeProps = this.propConfig[this.builderState.activeConfig?.componentName];
      }

      jsonuri.walk(this.builderState.config, (value, key, parent, { path }) => {
        // console.log(value);
        if (value._id && value._id === newActiveConfig._id) {
          this.builderState.activePath = path;
        }
      });
    }
  }

  @Action({ rawError: true })
  public fetchConfig() {
    const travers = (c: ComponentConfig) => {
      c._id = this.id;
      // this.addToMap(c);
      this.genId();
      config._currentId = c._id;
      c.children?.forEach((child: ComponentConfig) => travers(child));
      c.slots?.forEach((child: ComponentConfig) => travers(child));
    };
    travers(config);

    // console.log(config);
    this.setConfig(config);
  }
}

export default getModule(Builder);

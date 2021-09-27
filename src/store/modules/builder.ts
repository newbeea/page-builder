import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import * as jsonuri from 'jsonuri';
import axios from 'axios';
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
    css: `
  
    @media only screen and (max-width: 540px) {
      body {
        color: red;
      }
    }
        
      `,
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

  public fonts: Set<string> = new Set();

  public builderState: {
    dirty: boolean,
    pageId: string,
    page: any,
    pageReady: boolean,
    panels: any[],
    componentList: any[],
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
    dirty: false,
    pageId: '',
    page: undefined,
    pageReady: false,
    panels: [],
    componentList: [],
    activeConfig: null,
    activeProps: [],
    config: {
      componentName: '',
      props: {
      },
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
      input: any,
    }>
  } = {
  }

  @Mutation
  MARK_PROPS({
    key, prop, action,
  }: {
    key: string,
    prop: any,
    action: string,
  }) {
    if (this.builderState.activeConfig) {
      this.builderState.activeConfig._props = this.builderState.activeConfig._props || {};
      if (action === 'add') {
        const _prop = {
          input: {
            config: {
              prop: prop.prop,
              type: prop.input.config?.type ? prop.input.config.type : 'String',
              default: this.builderState.activeConfig.props[prop.prop],
            },
          },
        };
        console.log(_prop);
        this.builderState.activeConfig._props[prop.prop] = _prop;
      } else {
        delete this.builderState.activeConfig._props[prop.prop];
      }
    }
  }

  @Mutation
  SET_PAGE_ID(page: string) {
    this.builderState.pageId = page;
  }

  @Mutation
  SET_PAGE(page: any) {
    this.builderState.page = page;
  }

  @Mutation
  SET_CUSTOM_CSS(css: string) {
    if (this.builderState.activeConfig) {
      this.builderState.activeConfig.css = css;
    }
  }

  @Action
  setFonts(font: string) {
    if (!this.builderState.activeConfig?.css?.includes(font)) {
      if (this.builderState.activeConfig) {
        this.builderState.activeConfig.css = this.builderState.activeConfig.css ? this.builderState.activeConfig.css + font : font;
      }
    }
  }

  @Action
  postMessageToPageWindow({ cmd, data }: {
    cmd: string,
    data: any,
  }) {
    // console.log(this.builderState.page);
    const iframe: any = this.builderState.page;
    iframe.contentWindow.postMessage(JSON.stringify({
      cmd,
      data,
    }));
    console.log(222);
    this.SET_DIRTY(true);
  }

  @Mutation
  SET_DIRTY(dirty: boolean) {
    this.builderState.dirty = dirty;
  }

  @Mutation
  SET_PANELS(panels: any[]) {
    this.builderState.panels = panels;
  }

  @Mutation
  SET_COMPONENTS(componentList: any[]) {
    console.log(componentList);
    this.builderState.componentList = componentList;
    componentList.forEach((c) => {
      this.propConfig[c.componentName] = c.props;
    });
  }

  @Mutation
  ADD_TEMPLATE(template: any) {
    this.builderState.componentList.push(template);
  }

  @Action
  deleteComponent(component: any) {
    jsonuri.walk(this.builderState.config, (value, key, parent, { path }) => {
      console.log(value._id, path);

      if (value._id && value._id === component._id) {
        if (this.builderState.activePath === path) {
          this.SET_ACTIVE_BY_PATH('');
        } else {
          this.SET_ACTIVE_BY_PATH(this.builderState.activePath);
        }
        console.log(path);
        jsonuri.rm(this.builderState.config, path);
      }
    });
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
          if (data.cmd === 'page-ready') {
            this.postMessageToPageWindow({
              cmd: 'init-page-config',
              data: {
                lastId: this.builderState.config?._currentId,
                config: this.builderState.config,
              },
            });
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
      Object.assign(this.builderState.activeConfig.props.style, style);
    }
  }

  @Action
  updateStyles(style: any) {
    this.UPDATE_STYLES(style);
  }

  @Mutation
  UPDATE_PROPS(props: any) {
    if (this.builderState.activeConfig?.props) {
      Object.assign(this.builderState.activeConfig.props, props);
    }
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

  @Mutation
  UPDATE_CONFIG(componentConfig: ComponentConfig) {
    console.log(123123);
    this.builderState.config = componentConfig;
  }

  @Action
  formatConfig(json: ComponentConfig) {
    const travers = (c: any) => {
      c._id = this.id;
      // this.addToMap(c);
      this.GEN_ID();
      json._currentId = c._id;
      if (!c.props.style) {
        c.props.style = {};
      }
      if (!c._props) {
        c._props = {};
      }
      // if (c.type && !c.componentName) {
      //   let { type } = c;
      //   if (c.type === 'Block'
      //   || c.type === 'Shape') {
      //     type = 'Div';
      //   }
      //   c.componentName = type;
      // }
      if (c.props.className) {
        c.props.classes = c.props.className;
        delete c.props.className;
      }
      c.children?.forEach((child: ComponentConfig) => travers(child));
      c.slots?.forEach((child: ComponentConfig) => travers(child));
    };

    travers(json);
  }

  @Action({ rawError: true })
  public async fetchConfig(pageId: string) {
    const res = await axios.get(`/api/pages/${pageId}`);
    const { json } = res.data.data;
    this.formatConfig(json);
    this.UPDATE_CONFIG(json);
  }
}

export default getModule(Builder);

import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import * as jsonuri from 'jsonuri';
import store from '..';
import { ComponentConfig } from './types';

const updateConfig = (newConfig: ComponentConfig) => {
  const { top }: any = window;
  console.log(111);
  top.postMessage(JSON.stringify({
    cmd: 'setConfig',
    data: newConfig,
  }));
};

const notifyBuilder = (notify: string, data: any) => {
  const { top }: any = window;
  top.postMessage(JSON.stringify({
    cmd: notify,
    data,
  }));
};

const mvBug = (from: string, to: string, direction: string) => {
  const pathTo = to.split('/');
  const pathFrom = from.split('/');
  const parentPathTo = pathTo.slice(0, pathTo.length - 1);
  const parentPathFrom = pathFrom.slice(0, pathTo.length - 1);
  const toIndex = +(to.split('/').pop() || '');
  const fromIndex = +(from.split('/').slice(0, to.split('/').length).pop() || '');
  const indexChanged = direction === 'after' ? fromIndex > toIndex : fromIndex > toIndex - 1;
  return pathTo.length <= pathFrom.length && parentPathTo.join('/') === parentPathFrom.join('/') && indexChanged;
};

@Module({
  name: 'page',
  store,
  dynamic: true,
})
class Page extends VuexModule {
  public pageState: {
    dragging: ComponentConfig | null,
    config: ComponentConfig | null,
    activeConfig: ComponentConfig | null,
  } = {
    dragging: null,
    config: null,
    activeConfig: null,
  }

  public config: ComponentConfig = {
    componentName: 'Page',
    props: {},
  };

  public id = 0;

  public activeConfig!: ComponentConfig;

  public dragging : ComponentConfig | null = {
    componentName: 'Page',
    props: {},
  };

  @Action
  listenBuilder() {
    window.addEventListener('message', (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.cmd === 'update-page-config-by-builder') {
        this.UPDATE_CONFIG(data.data);
      } else if (data.cmd === 'init-page-config') {
        this.UPDATE_CONFIG(data.data.config);
        this.SET_ID(data.data.lastId);
      }
    });
  }

  @Action
  postMessageToBuilderWindow({ cmd, data }: {cmd: string, data: any}) {
    const { top }: any = window;
    console.log(cmd, data);
    top.postMessage(JSON.stringify({
      cmd,
      data,
    }));
  }

  @Mutation
  UPDATE_CONFIG(config: ComponentConfig) {
    this.pageState.config = config;
  }

  @Mutation
  SET_ID(id: number) {
    this.id = id;
  }

  @Action
  setDraggingConfig(config: ComponentConfig) {
    console.log('setDraggingConfig', config);
    // this.context.commit('setActiveConfig', draggingConfig);
    this.SET_DRAGGING(config);
    if (config._id) {
      this.setActiveConfig(config);
    }
  }

  @Mutation
  SET_DRAGGING(config: ComponentConfig | null) {
    this.pageState.dragging = config;
  }

  @Action
  setActiveConfig(activeConfig: ComponentConfig) {
    console.log(activeConfig);
    if (activeConfig._id === 0) {
      this.postMessageToBuilderWindow({
        cmd: 'selected-by-page',
        data: '',
      });
    } else {
      jsonuri.walk(this.pageState.config, (value, key, parent, { path }) => {
        if (value && value._id && value._id === activeConfig._id) {
          // notifyBuilder('onSelected', path);
          this.postMessageToBuilderWindow({
            cmd: 'selected-by-page',
            data: path,
          });
        }
      });
    }
  }

  @Action
  dragEnd() {
    this.SET_DRAGGING(null);
  }

  @Mutation
  INSERT_COMPONENT({ targetPath, config, direction }: {
    targetPath: string, config: ComponentConfig, direction: 'before' | 'after' | 'append'
  }) {
    this.pageState.dragging = null;
    // console.log(targetPath, config, direction);
    const genId = (c: ComponentConfig) => {
      this.id += 1;
      c._id = this.id;
      if (!c.props.style) {
        c.props.style = {};
      }
      c.children?.forEach((child: ComponentConfig) => genId(child));
      c.slots?.forEach((child: ComponentConfig) => genId(child));
    };
    genId(config);

    jsonuri.insert(this.pageState.config, targetPath, config, direction);
  }

  @Action
  move(movement: {
    draggingConfig: ComponentConfig,
    config: ComponentConfig,
    direction: 'before' | 'after' | 'append'
  }) {
    console.log(this.pageState.config, this.pageState.dragging);
    let currentPath = '';
    let targetPath = '';
    jsonuri.walk(this.pageState.config, (value, key, parent, { path }) => {
      console.log(value, this.pageState.dragging);
      if (value._id && value._id === this.pageState.dragging?._id) {
        currentPath = path;
      }
      if (value === movement.config) {
        targetPath = path;
      }
    });
    console.log(currentPath, targetPath);
    if (this.pageState.dragging) {
      console.log(JSON.stringify(this.pageState.config));
      if (!targetPath.startsWith(currentPath)) {
        if (!mvBug(currentPath, targetPath, movement.direction)) {
          console.log(currentPath, targetPath, movement.direction);
          jsonuri.mv(this.pageState.config, currentPath, targetPath, movement.direction);
        } else {
          console.log(11, currentPath, targetPath, movement.direction);
          const data = jsonuri.get(this.pageState.config, currentPath);
          jsonuri.rm(this.pageState.config, currentPath);
          jsonuri.insert(this.pageState.config, targetPath, data, movement.direction);
        }
      }

      // jsonuri.rm(this.pageState.config, currentPath);
      console.log(JSON.stringify(this.pageState.config));
    } else {
      // this.genId();
      // movement.draggingConfig._id = this.id;
      // jsonuri.insert(this.pageState.config, targetPath, movement.draggingConfig, movement.direction);
      this.INSERT_COMPONENT({
        targetPath,
        config: movement.draggingConfig,
        direction: movement.direction,
      });
      // this.setActiveConfig(movement.draggingConfig);
    }
    this.postMessageToBuilderWindow({
      cmd: 'update-builder-config-by-page',
      data: this.pageState.config,
    });
    // notifyBuilder('onSelected', targetPath);
    this.setActiveConfig(this.pageState.dragging || movement.draggingConfig);
  }

  @Action
  moveIn(movement: {
    draggingConfig: ComponentConfig,
    config: ComponentConfig
  }) {
    let currentPath = '';
    let targetPath = '';
    console.log(this.pageState.dragging, movement.config);
    jsonuri.walk(this.pageState.config, (value, key, parent, { path }) => {
      // console.log(value);
      if (value._id && value._id === this.pageState.dragging?._id) {
        currentPath = path;
      }
      if (value === movement.config) {
        targetPath = path;
      }
    });

    console.log(currentPath, targetPath);

    const childrenLength = jsonuri.get(this.pageState.config, `${targetPath}/children`)?.length;
    console.log(childrenLength, targetPath.startsWith(currentPath));
    if (childrenLength !== undefined) {
      if (this.pageState.dragging) {
        if (!targetPath.startsWith(currentPath)) { // has children and can not mv parent to children
          jsonuri.mv(this.pageState.config, currentPath, `${targetPath}/children/${childrenLength - 1}`, 'after');
        }
      } else {
        console.log(`${targetPath}/children/${childrenLength - 1}`);
        // this.genId();
        // movement.draggingConfig._id = this.id;
        // jsonuri.insert(this.pageState.config, `${targetPath}/children/${childrenLength - 1}`, movement.draggingConfig, 'after');
        // this.INSERT_COMPONENT(`${targetPath}/children/${childrenLength - 1}`, movement.draggingConfig, 'after');
        this.INSERT_COMPONENT({
          targetPath: `${targetPath}/children/${childrenLength - 1}`,
          config: movement.draggingConfig,
          direction: 'after',
        });
      }
    }
    this.postMessageToBuilderWindow({
      cmd: 'update-builder-config-by-page',
      data: this.pageState.config,
    });
    this.setActiveConfig(this.pageState.dragging || movement.draggingConfig);
  }
}

export default getModule(Page);

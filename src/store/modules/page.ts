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
  public config: ComponentConfig = {
    componentName: 'Page',
    props: {},
  };

  public id = 0;

  public activeConfig!: ComponentConfig;

  public dragging!: ComponentConfig | null;

  @Mutation
  genId(id?: number | undefined) {
    this.id = id || this.id + 1;
    this.config._currentId = this.id;
  }

  @Mutation
  setDraggingConfig(draggingConfig: ComponentConfig) {
    this.dragging = draggingConfig;
  }

  @Mutation
  setConfig(componentConfig: ComponentConfig) {
    this.config = componentConfig;
    // this.genId(this.config._currentId);
  }

  @Action({ rawError: true })
  initConfig(componentConfig: ComponentConfig) {
    this.setConfig(componentConfig);
    this.genId(this.config._currentId);
  }

  @Mutation
  setActiveConfig(activeConfig: ComponentConfig) {
    // Object.assign(this.activeConfig, activeConfig);
    // this.config.children?[0].children?[0].children?[0]
    this.activeConfig = activeConfig;
    console.log(111111);
    notifyBuilder('onSelected', activeConfig);
  }

  @Mutation
  dragEnd() {
    this.dragging = null;
  }

  @Action
  move(movement: {
    draggingConfig: ComponentConfig,
    config: ComponentConfig,
    direction: 'before' | 'after' | 'append'
  }) {
    let currentPath = '';
    let targetPath = '';
    jsonuri.walk(this.config, (value, key, parent, { path }) => {
      if (value === this.dragging) {
        currentPath = path;
      }
      if (value === movement.config) {
        targetPath = path;
      }
    });
    console.log(currentPath, targetPath);
    if (this.dragging) {
      console.log(JSON.stringify(this.config));
      if (!targetPath.startsWith(currentPath)) {
        if (!mvBug(currentPath, targetPath, movement.direction)) {
          console.log(currentPath, targetPath, movement.direction);
          jsonuri.mv(this.config, currentPath, targetPath, movement.direction);
        } else {
          console.log(11, currentPath, targetPath, movement.direction);
          const data = jsonuri.get(this.config, currentPath);
          jsonuri.rm(this.config, currentPath);
          jsonuri.insert(this.config, targetPath, data, movement.direction);
        }
      }

      // jsonuri.rm(this.config, currentPath);
      console.log(JSON.stringify(this.config));
    } else {
      this.genId();
      movement.draggingConfig._id = this.id;
      jsonuri.insert(this.config, targetPath, movement.draggingConfig, movement.direction);
    }
    updateConfig(this.config);
  }

  @Action
  moveIn(movement: {
    draggingConfig: ComponentConfig,
    config: ComponentConfig
  }) {
    let currentPath = '';
    let targetPath = '';
    console.log(movement.config);
    jsonuri.walk(this.config, (value, key, parent, { path }) => {
      if (value === this.dragging) {
        currentPath = path;
      }
      if (value === movement.config) {
        targetPath = path;
      }
    });

    console.log(currentPath, targetPath);

    const childrenLength = jsonuri.get(this.config, `${targetPath}/children`)?.length;
    console.log(childrenLength, targetPath.startsWith(currentPath));
    if (childrenLength !== undefined) {
      if (this.dragging) {
        if (!targetPath.startsWith(currentPath)) { // has children and can not mv parent to children
          jsonuri.mv(this.config, currentPath, `${targetPath}/children/${childrenLength - 1}`, 'after');
        }
      } else {
        console.log(`${targetPath}/children/${childrenLength - 1}`);
        this.genId();
        movement.draggingConfig._id = this.id;
        jsonuri.insert(this.config, `${targetPath}/children/${childrenLength - 1}`, movement.draggingConfig, 'after');
      }
    }
    updateConfig(this.config);
  }
}

export default getModule(Page);

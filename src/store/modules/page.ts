import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import * as jsonuri from 'jsonuri';
import store from '..';

const mvBug = (from: string, to: string, direction: string) => {
  const pathTo = to.split('/');
  const pathFrom = from.split('/');
  const parentPathTo = pathTo.slice(0, pathTo.length - 1);
  const parentPathFrom = pathFrom.slice(0, pathTo.length - 1);
  const toIndex = +(to.split('/').pop() || '');
  const fromIndex = +(from.split('/').slice(0, to.split('/').length).pop() || '');
  const indexChanged = direction === 'after' ? fromIndex > toIndex : fromIndex <= toIndex;
  return pathTo.length <= pathFrom.length && parentPathTo.join('/') === parentPathFrom.join('/') && indexChanged;
};
type ComponentConfig = {
  componentName: string,
  props: {
    [key: string]: {
      [key: string]: string,
    }
  },
  mode?: string,
  children: ComponentConfig[]
}
@Module({
  name: 'page',
  store,
  dynamic: true,
})
class Page extends VuexModule {
  public config: ComponentConfig = {
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
        // mode: 'default',
        props: {
          style: {
            width: '40%',
            backgroundColor: '#df9999',
          },
        },
        children: [],
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
  }

  public dragging!: ComponentConfig | null;

  @Mutation
  setDraggingConfig(draggingConfig: ComponentConfig) {
    this.dragging = draggingConfig;
  }

  @Mutation
  dragEnd() {
    this.dragging = null;
  }

  @Mutation
  move(movement: {
    config: ComponentConfig,
    direction: 'before' | 'after' | 'append'
  }) {
    if (this.dragging) {
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
    }
  }

  @Mutation
  moveIn(dropConfig: ComponentConfig) {
    if (this.dragging) {
      let currentPath = '';
      let targetPath = '';
      console.log(dropConfig);
      jsonuri.walk(this.config, (value, key, parent, { path }) => {
        if (value === this.dragging) {
          currentPath = path;
        }
        if (value === dropConfig) {
          targetPath = path;
        }
      });

      console.log(currentPath, targetPath);
      const childrenLength = jsonuri.get(this.config, `${targetPath}/children`)?.length;
      if (childrenLength !== undefined && !targetPath.startsWith(currentPath)) { // has children and can not mv parent to children
        jsonuri.mv(this.config, currentPath, `${targetPath}/children/${childrenLength - 1}`, 'after');
      }
    }
  }
}

export default getModule(Page);

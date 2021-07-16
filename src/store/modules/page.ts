import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import * as jsonuri from 'jsonuri';
import store from '..';

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
export type ComponentConfig = {
  componentName: string,
  props: {
    [key: string]: any,
  },
  mode?: string,
  children?: ComponentConfig[]
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
  }

  public activeConfig: ComponentConfig = img;

  public dragging!: ComponentConfig | null;

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
  }

  @Mutation
  setDraggingConfig(draggingConfig: ComponentConfig) {
    this.dragging = draggingConfig;
  }

  @Mutation
  setActiveConfig(activeConfig: ComponentConfig) {
    // Object.assign(this.activeConfig, activeConfig);
    // this.config.children?[0].children?[0].children?[0]
    this.activeConfig = activeConfig;
  }

  @Mutation
  dragEnd() {
    this.dragging = null;
  }

  @Mutation
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
      jsonuri.insert(this.config, targetPath, movement.draggingConfig, movement.direction);
    }
  }

  @Mutation
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
        jsonuri.insert(this.config, `${targetPath}/children/${childrenLength - 1}`, movement.draggingConfig, 'after');
      }
    }
  }
}

export default getModule(Page);

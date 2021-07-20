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
  public config: ComponentConfig = {
    componentName: 'Page',
    props: {},
  };

  public id = 0;

  public activeConfig: ComponentConfig = img;

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
    Div: [
      {
        prop: 'href',
        label: 'Link',
        input: 'InputExpression',
      },
    ],
  }

  @Mutation
  genId() {
    this.id += 1;
    config._currentId = this.id;
  }

  @Mutation
  setConfig(componentConfig: ComponentConfig) {
    console.log(123123);
    this.config = componentConfig;
  }

  @Mutation
  setBuilderActiveConfig(activeConfig: ComponentConfig) {
    // Object.assign(this.activeConfig, activeConfig);
    // this.config.children?[0].children?[0].children?[0]
    this.activeConfig = activeConfig;
    console.log(111111111111);
  }

  @Action({ rawError: true })
  public fetchConfig() {
    const travers = (c: ComponentConfig) => {
      c._id = this.id;
      this.genId();
      c.children?.forEach((child: ComponentConfig) => travers(child));
    };
    travers(config);

    console.log(config);
    this.setConfig(config);
  }
}

export default getModule(Builder);

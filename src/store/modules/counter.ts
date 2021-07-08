import {
  Module, VuexModule, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import store from '..';

@Module({
  name: 'counter',
  store,
  dynamic: true,
})
class Counter extends VuexModule {
  public count = 5

  @Mutation
  add(delta: number) {
    this.count += delta;
  }
}

export default getModule(Counter);

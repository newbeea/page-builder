<template>
  <el-tabs tab-position="left">
    <el-tab-pane v-for="(components, key) in category" :key="key" :label="key"
      ><div class="panel-container">
        <div
          v-for="c in components"
          :key="c.id"
          class="component-card"
          v-draggable:draggable="c.config"
        >
          <div class="card-container" :style="{
            backgroundImage: c.thumb ? `url(${c.thumb})` : ''
          }">
            <span v-if="!c.thumb">{{c.label}}</span>
          </div>

        </div>
        <!-- <el-input v-model="a.src"></el-input> -->
        <!-- <Image v-bind="a.props" :children="[]"></Image> -->

      </div></el-tab-pane
    >
  </el-tabs>
</template>

<script lang="ts">
import {
  computed, defineComponent, getCurrentInstance, reactive, ref, toRef, toRefs,
} from 'vue';

import BuilderModule from '@/store/modules/builder';

export default defineComponent({
  name: 'PbComponentList',
  components: {
    // Image,

  },
  methods: {
  },
  setup(props, context) {
    // const a = toRef(PageModule.activeConfig, 'props');
    // a.value = 'sdf';
    // componentList.forEach((component) => {
    //   getCurrentInstance()?.appContext.app.component(component.name, component);
    // });

    const category = computed(() => {
      const categories: any = {
        Layout: [],
        Basic: [],
      };
      BuilderModule.builderState.componentList.forEach((c: any) => {
        categories[c.category] = categories[c.category] || [];
        categories[c.category].push(c);
      });
      return categories;
    });

    return {
      category,
    };
  },
});
</script>
<style lang="scss" scoped>
.component-card {

  padding: 10px;
  .card-container {
    background: #fff;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background-position: center;
    background-size: cover;
  }
}
</style>

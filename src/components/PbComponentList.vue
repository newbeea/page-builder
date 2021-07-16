<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="轮播"
      ><div class="panel-container">
        <div
          v-for="c in components"
          :key="c.name"
          class="component-card"
          v-draggable:draggable="c.config"
        >
          <el-card shadow="hover">
            {{ c.name }}
          </el-card>
        </div>
        <!-- <el-input v-model="a.src"></el-input> -->
        <!-- <Image v-bind="a.props" :children="[]"></Image> -->

      </div></el-tab-pane
    >
    <el-tab-pane label="布局">布局</el-tab-pane>
    <el-tab-pane label="产品">产品</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {
  computed, defineComponent, getCurrentInstance, reactive, ref, toRef, toRefs,
} from 'vue';
import { infoList, componentList } from '@/build-in';
import PageModule from '@/store/modules/page';
import Image from '@/build-in/image/image';

// componentList.forEach((component) => {
//   app.component(component.name, component);
// });
export default defineComponent({
  name: 'PbComponentList',
  components: {
    Image,

  },
  methods: {
  },
  setup(props, context) {
    // const a = toRef(PageModule.activeConfig, 'props');
    // a.value = 'sdf';
    componentList.forEach((component) => {
      getCurrentInstance()?.appContext.app.component(component.name, component);
    });
    console.log(getCurrentInstance()?.appContext.app);
    const components = Object.values(infoList);
    return {
      // t: ImageInfo,
      a: computed(() => PageModule.activeConfig),
      components,
    };
  },
});
</script>

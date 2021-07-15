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
      </div></el-tab-pane
    >
    <el-tab-pane label="布局">布局</el-tab-pane>
    <el-tab-pane label="产品">产品</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { infoList, componentList } from '@/build-in';

// componentList.forEach((component) => {
//   app.component(component.name, component);
// });
export default defineComponent({
  name: 'PbComponentList',
  components: {
  },
  methods: {
  },
  setup(props, context) {
    componentList.forEach((component) => {
      getCurrentInstance()?.appContext.app.component(component.name, component);
    });
    console.log(getCurrentInstance()?.appContext.app);
    const components = Object.values(infoList);
    return {
      // t: ImageInfo,
      components,
    };
  },
});
</script>

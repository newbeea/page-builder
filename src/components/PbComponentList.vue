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
import {
  computed, defineComponent, getCurrentInstance, reactive, ref, toRef, toRefs,
} from 'vue';
import { infoList, componentList } from '@/build-in';

export default defineComponent({
  name: 'PbComponentList',
  components: {
  },
  methods: {
  },
  setup(props, context) {
    const components = Object.values(infoList);
    return {
      // t: ImageInfo,
      components,
    };
  },
});
</script>

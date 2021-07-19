<template>
  <el-tabs :stretch="true">
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-menu"></i>Components</span>
      </template>
      <pb-component-list></pb-component-list>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-notebook-2"></i>Layout</span>
      </template>
      <pb-component-tree></pb-component-tree>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PbComponentList from '@/components/PbComponentList.vue'; // @ is an alias to /src
import PbComponentTree from '@/components/PbComponentTree.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    PbComponentList,
    PbComponentTree,
  },
});
</script>

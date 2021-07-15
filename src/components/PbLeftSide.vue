<template>
  <el-tabs :stretch="true">
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-menu"></i>组件库</span>
      </template>
      <pb-component-list></pb-component-list>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-notebook-2"></i>组件树</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PbComponentList from '@/components/PbComponentList.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    PbComponentList,
  },
});
</script>

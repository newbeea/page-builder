<template>
  <el-tabs :stretch="true">
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-menu"></i>Property</span>
      </template>
      <pb-property></pb-property>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-notebook-2"></i>Style</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PbProperty from '@/components/right-side/property/property'; // @ is an alias to /src

export default defineComponent({
  name: 'PbRightSide',
  components: {
    PbProperty,
  },
});
</script>

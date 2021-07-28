<template>
  <el-tabs :stretch="true">
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-edit"></i>Style</span>
      </template>
      <pb-style></pb-style>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-setting"></i>Property</span>
      </template>
      <pb-property></pb-property>
    </el-tab-pane>

  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PbProperty from '@/components/right-side/property/property'; // @ is an alias to /src
import PbStyle from '@/components/right-side/style/PbStyle.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'PbRightSide',
  components: {
    PbProperty,
    PbStyle,
  },
});
</script>
<style lang="scss">
.el-tabs__content {
  height: calc(100% - 60px);
  overflow: auto  !important;
}
</style>

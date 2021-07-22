<template>
  <el-collapse v-if="active" v-model="activeNames">
    <el-collapse-item class="pb-style-panel" title="Layout" name="layout" >
      <pb-layout></pb-layout>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BuilderModule from '@/store/modules/builder';
import PbLayout from './PbLayout.vue';

export default defineComponent({
  name: 'PbStyle',
  components: {
    PbLayout,
  },
  setup() {
    return {
      active: computed(() => BuilderModule.builderState.activeConfig),
      activeNames: ['layout'],
    };
  },
});
</script>
<style lang="scss">
.el-collapse-item__header {
  padding: 0 10px !important;
  background: rgb(230, 230, 230) !important;
}
</style>

<template>
  <div class="pb-tree">
    <el-tree
      :data="config"
      :expand-on-click-node="false"
      :props="defaultProps"
      default-expand-all
      draggable>
    </el-tree>
  </div>

</template>

<script lang="ts">
import {
  computed, defineComponent, getCurrentInstance, reactive, ref, toRef, toRefs,
} from 'vue';
import { infoList, componentList } from '@/build-in';
import PageModule from '@/store/modules/page';

export default defineComponent({
  name: 'PbComponentTree',
  components: {
  },
  methods: {
  },
  setup(props, context) {
    return {
      defaultProps: {
        children: 'children',
        label: 'componentName',
      },
      config: [PageModule.config],
    };
  },
});
</script>
<style lang="scss">
.pb-tree {
  padding: 0 10px;
  .el-tree{
    background-color: transparent;
  }
  .el-tree-node__content{
    &:hover{
      background-color: #40a0ff86;
    }
  }
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #409eff !important;
    color: #fff;
  }
}

</style>

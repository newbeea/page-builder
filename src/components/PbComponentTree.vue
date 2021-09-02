<template>
  <div class="pb-tree">
    <el-tree
      ref="tree"
      node-key="_id"
      :data="config"
      :expand-on-click-node="false"
      :props="defaultProps"
      @current-change="onCurrentChange"
      default-expand-all
      highlight-current
      draggable>
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <!-- <a
              @click="append(data)">
              Append
            </a> -->
            <i class="el-icon-delete" @click.stop="deleteComponent(data)"></i>
          </span>
        </span>
      </template>
    </el-tree>
  </div>

</template>

<script lang="ts">
import {
  computed, defineComponent, getCurrentInstance, nextTick, reactive, ref, toRef, toRefs, watch,
} from 'vue';
import BuilderModule from '@/store/modules/builder';

export default defineComponent({
  name: 'PbComponentTree',
  components: {
  },
  methods: {
  },
  setup(props, context) {
    const tree = ref(null);
    watch(
      () => BuilderModule.builderState.activeConfig,
      (config, prevConfig) => {
        if (BuilderModule.builderState.activeConfig) {
          const treeRef: any = tree.value;
          console.log(config, prevConfig, BuilderModule.builderState.activeConfig, treeRef);
          console.log(treeRef);
          nextTick(() => {
            treeRef?.setCurrentNode(BuilderModule.builderState.activeConfig);
          });
        }
      },
      {
        deep: true,
      },
    );
    const onCurrentChange = (node: any) => {
      console.log(node);
      const treeRef: any = tree.value;
      console.log('getCurrentNode', treeRef?.getCurrentNode());
      BuilderModule.setActive(node);
    };

    const deleteComponent = (data: any) => {
      console.log('node', data);
      BuilderModule.deleteComponent(data);
    };
    return {
      tree,
      deleteComponent,
      onCurrentChange,
      defaultProps: {
        children: 'children',
        label: 'componentName',
      },
      config: computed(() => [BuilderModule.builderState.config]),
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}

</style>

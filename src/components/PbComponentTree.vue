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
      <template #default="{ data }">
        <span class="custom-tree-node">
          <span class="name" v-if="data.name">{{data.name}}</span>
          <span class="name" v-else>{{ data.componentName }}</span>
          <span v-if="data._id">
            <!-- <a
              @click="append(data)">
              Append
            </a> -->
            <i class="el-icon-view " :class="{
              active: !data._hide
            }" @click.stop="hideComponent(data)"></i>
            <i class="el-icon-delete active" @click.stop="deleteComponent(data)"></i>
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
    const hideComponent = (data: any) => {
      console.log('node', data);
      data._hide = !data._hide;
      // BuilderModule.deleteComponent(data);
    };
    return {
      tree,
      deleteComponent,
      hideComponent,
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
    // display: block!important;
    &:hover{
      background-color: #bcdcfc86;
    }
  }
  .el-tree-node__children {
    overflow: visible!important;
  }
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #bcdcfc !important;
    // color: #fff;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    .name {
      margin-right: 8px;
    }
    .active {
      color: #409eff;
    }
  }
}

</style>

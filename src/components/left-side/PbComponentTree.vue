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
        <el-popover
          :show-after="500"
          placement="bottom" :width="200" trigger="hover">
          <template #reference>
            <span class="custom-tree-node">
              <span class="name" v-if="data.name">{{data.name}}</span>
              <span class="name" v-else>{{ data.componentName }}</span>
               <span v-if="data._id">

                <i class="el-icon-view " :class="{
                  active: !data._hide
                }" @click.stop="hideComponent(data)"></i>
               </span>
            </span>
          </template>
          <div class="pb-context-menu">
            <!-- <div
              class="pb-context-menu-item"
              @click.stop="hideComponent(data)"
            >
              <i class="el-icon-view " :class="{
                active: !data._hide
              }" ></i>
              <span v-show="data._hide">Hide</span>
              <span v-show="!data._hide">Show</span>
            </div> -->
            <div
              class="pb-context-menu-item"
              @click.stop="deleteComponent(data)">
              <i class="el-icon-delete active" ></i>
              <span>Delete</span>
            </div>
            <div
              class="pb-context-menu-item"
              @click.stop="createTemplateDialog(data)">
              <i class="el-icon-plus active" ></i>
              <span>Create Template</span>
            </div>
            <div
              class="pb-context-menu-item"
              @click.stop="showCode(data, 'vue@2')">
              <i class="el-icon-suitcase active" ></i>
              <span>Get Vue2 Code</span>
            </div>
          </div>

        <!-- <span class="custom-tree-node"> -->
          <!-- <span class="name" v-if="data.name">{{data.name}}</span>
          <span class="name" v-else>{{ data.componentName }}</span> -->
          <!-- <span v-if="data._id"> -->

            <!-- <a
              @click="append(data)">
              Append
            </a> -->
            <!-- <i class="el-icon-view " :class="{
              active: !data._hide
            }" @click.stop="hideComponent(data)"></i>
            <i class="el-icon-delete active" @click.stop="deleteComponent(data)"></i> -->
          <!-- </span> -->
        <!-- </span> -->
        </el-popover>
      </template>
    </el-tree>
    <el-dialog
      title="Template"
      v-model="showDialog"
      width="90%"
    >

      <el-form label-position="top" label-width="80px">
        <el-form-item label="Label">
          <el-input v-model="template.label"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-input v-model="template.category"></el-input>
        </el-form-item>
        <el-form-item label="Thumbnail">
          <el-input v-model="template.thumb"></el-input>
        </el-form-item>
        <el-form-item label="Preview">
          <el-input v-model="template.preview"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">Cancel</el-button>
          <el-button type="primary" @click="onCreateTemplate" :loading="loading">Create Template</el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer
      custom-class="pb-code-editor"
      title="Code"
      v-model="codeEditor"
      direction="ltr"
      :modal="true"
      destroy-on-close>
      <pb-code-editor
        :panels="panels"
      ></pb-code-editor>
    </el-drawer>
  </div>

</template>

<script lang="ts">
import {
  computed, defineComponent, getCurrentInstance, nextTick, reactive, ref, toRef, toRefs, watch,
} from 'vue';
import BuilderModule from '@/store/modules/builder';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import PbCodeEditor from '@/components/PbCodeEditor.vue';
import { createTemplate, getCode } from '@/api';
import { Template } from '@/types';

export default defineComponent({
  name: 'PbComponentTree',
  components: {
    PbCodeEditor,
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
    const loading = ref(false);
    const current = ref(null);
    const showDialog = ref(false);
    const template = reactive<Template>({
      thumb: '',
      preview: '',
      config: {
        componentName: '',
        props: {},
      },
      category: '',
      componentName: 'PbContainer',
      label: '',
      buildIn: true,
    });
    const createTemplateDialog = (data: any) => {
      current.value = data;
      template.config = JSON.parse(JSON.stringify(data, (key, value) => {
        if (key.startsWith('_')) {
          return undefined;
        }
        return value;
      }));
      showDialog.value = true;
      // BuilderModule.deleteComponent(data);
    };
    const onCreateTemplate = async () => {
      try {
        await createTemplate(template);
        showDialog.value = false;
        BuilderModule.ADD_TEMPLATE(JSON.parse(JSON.stringify(template)));
        Object.assign(template, {
          thumb: '',
          preview: '',
          config: {
            componentName: '',
            props: {},
          },
          category: '',
          componentName: 'PbContainer',
          label: '',
          buildIn: true,
        });
      } catch (e) {
        ElMessage(e.message);
      }

      loading.value = false;
    };

    const panels = ref<any[]>([]);
    const codeEditor = ref(false);
    const showCode = async (config: any, dslType: string) => {
      try {
        const { data } = await getCode({
          json: config,
          dslType,
        });
        panels.value = data.panelDisplay;
        codeEditor.value = true;
      } catch (e) {
        ElMessage(e.message);
      }
    };
    return {
      panels,
      codeEditor,
      showCode,
      loading,
      showDialog,
      tree,
      template,
      onCreateTemplate,
      createTemplateDialog,
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
  .pb-code-editor {
    width: 90% !important;
  }
}
.pb-context-menu {
  .pb-context-menu-item {
    padding: 4px;
    &:hover {
      background: #40a0ff4b;
    }
    i {
      margin-right: 10px;
    }
    cursor: pointer;
  }

}

</style>

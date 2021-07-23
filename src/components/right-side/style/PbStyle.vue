<template>
  <div class="pb-style-panel" v-if="active">

    <el-collapse  v-model="activeNames">
      <el-collapse-item class="pb-style-panel" title="Layout" name="layout" >
        <pb-layout></pb-layout>
      </el-collapse-item>
    </el-collapse>
    <div class="pb-css-btn-wrapper">
      <el-button class="pb-css-btn" @click="codeEditor = true" type="primary">Edit css</el-button>
    </div>
    <el-drawer
      title="Css"
      v-model="codeEditor"
      direction="ltr"
      :modal="false"
      destroy-on-close>
      <pb-code-editor
        :code="css"
        :onChange="onCodeChange"></pb-code-editor>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BuilderModule from '@/store/modules/builder';
import PbCodeEditor from '@/components/PbCodeEditor.vue';
import PbLayout from './PbLayout.vue';

export default defineComponent({
  name: 'PbStyle',
  components: {
    PbLayout,
    PbCodeEditor,
  },
  setup() {
    const codeEditor = ref(false);

    const onCodeChange = (code: string) => {
      const style = JSON.parse(code);
      console.log(style);
      BuilderModule.updateStyles(style);
    };
    return {
      active: computed(() => BuilderModule.builderState.activeConfig),
      activeNames: ['layout'],
      css: computed(() => JSON.stringify(BuilderModule.builderState.activeConfig?.props.style)),
      codeEditor,
      onCodeChange,
    };
  },
});
</script>
<style lang="scss">
.el-collapse-item__header {
  padding: 0 10px !important;
  background: rgb(230, 230, 230) !important;
}
.pb-style-panel {
  .pb-css-btn-wrapper {
    width: 100%;
    padding: 10px;
    .pb-css-btn {
      width: 100%;
    }
  }
}
</style>

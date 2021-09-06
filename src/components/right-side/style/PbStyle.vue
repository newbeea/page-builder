<template>
  <div class="pb-style-panel" v-if="active">

    <el-collapse v-model="activeNames">
      <el-collapse-item class="pb-style-panel" title="Layout" name="layout" >
        <pb-layout v-model="style" @updateByKeys="updateByKeys"></pb-layout>
      </el-collapse-item>
      <el-collapse-item class="pb-style-panel" v-for="p in thirdPartyComponents" :key="p.name" :title="p.title" :name="p.name" >
        <component :is="p.name" v-model="style"></component>
      </el-collapse-item>
    </el-collapse>
    <div class="pb-css-btn-wrapper">
      <el-button class="pb-css-btn" @click="styleJsonEditor = true" type="primary">Edit style</el-button>
    </div>
    <el-drawer
      title="Style"
      v-model="styleJsonEditor"
      direction="ltr"
      :modal="true"
      destroy-on-close>
      <pb-code-editor
        :code="styleJson"
        :onChange="onStyleJsonChange"></pb-code-editor>
    </el-drawer>

    <div class="pb-css-btn-wrapper">
      <el-button class="pb-css-btn" @click="cssStringEditor = true" type="primary">Custom css</el-button>
    </div>
    <el-drawer
      title="Css"
      v-model="cssStringEditor"
      direction="ltr"
      :modal="true"
      destroy-on-close>
      <pb-code-editor
        lang="css"
        :code="cssString"
        :onChange="onCssStringChange"></pb-code-editor>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, getCurrentInstance,
} from 'vue';
import BuilderModule from '@/store/modules/builder';
import PbCodeEditor from '@/components/PbCodeEditor.vue';
import axios from 'axios';
import * as Vue from 'vue';
import PbLayout from './PbLayout.vue';

console.log(Vue, getCurrentInstance);
export default defineComponent({
  name: 'PbStyle',
  components: {
    PbLayout,
    PbCodeEditor,
    // PbBackground,
  },
  setup() {
    const styleJsonEditor = ref(false);
    const onStyleJsonChange = (code: string) => {
      const style = JSON.parse(code);
      console.log(style);
      BuilderModule.updateStyles(style);
    };
    const updateStyles = (styles: any) => {
      BuilderModule.updateStyles(styles);
      console.log(styles);
    };
    const updateByKeys = (keys: any[], value: string) => {
      keys?.forEach((key: string) => {
        BuilderModule.updateStyle({
          value,
          key,
        });
      });
    };
    const cssStringEditor = ref(false);
    const onCssStringChange = (code: string) => {
      BuilderModule.SET_CUSTOM_CSS(code);
    };

    const active = computed(() => BuilderModule.builderState.activeConfig);

    const thirdPartyPanelsReady = ref(false);
    const thirdPartyComponents = computed(() => BuilderModule.builderState.panels);

    return {
      active,
      activeNames: ['layout'],
      styleJson: computed(() => JSON.stringify(active.value?.props.style)),
      style: computed(() => active.value?.props.style),
      styleJsonEditor,
      cssString: computed(() => BuilderModule.builderState.config?.customCss),
      cssStringEditor,
      onCssStringChange,
      onStyleJsonChange,
      updateByKeys,
      updateStyles,
      thirdPartyComponents,
      thirdPartyPanelsReady,
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

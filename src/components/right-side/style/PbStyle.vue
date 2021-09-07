<template>
  <div class="pb-style-panel" v-if="active">

    <el-collapse v-model="activeNames">
      <el-collapse-item title="Layout" name="Layout" >
        <pb-layout v-model="style" @updateByKeys="updateByKeys"></pb-layout>
      </el-collapse-item>
      <el-collapse-item title="Typography" name="Typography" >
        <pb-font v-model="style" @updateStyles="updateStyles"></pb-font>
      </el-collapse-item>
      <el-collapse-item v-for="p in thirdPartyComponents" :key="p.name" :title="p.title" :name="p.name" >
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
import PbFont from './PbFont.vue';

console.log(Vue, getCurrentInstance);
export default defineComponent({
  name: 'PbStyle',
  components: {
    PbLayout,
    PbCodeEditor,
    PbFont,
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
      activeNames: ['Layout', 'Typography'],
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
@font-face {
  font-family: "iconfont"; /* Project id 2692908 */
  src: url('//at.alicdn.com/t/font_2692908_gaawqqe29wc.woff2?t=1630986774520') format('woff2'),
       url('//at.alicdn.com/t/font_2692908_gaawqqe29wc.woff?t=1630986774520') format('woff'),
       url('//at.alicdn.com/t/font_2692908_gaawqqe29wc.ttf?t=1630986774520') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-wrap:before {
  content: "\ea04";
}

.icon-wrap1:before {
  content: "\e71c";
}

.icon-alignItems_flex-start:before {
  content: "\e60a";
}

.icon-alignItems_flex-end:before {
  content: "\e600";
}

.icon-alignItems_center:before {
  content: "\e601";
}

.icon-alignItems_baseline:before {
  content: "\e602";
}

.icon-alignItems_stretch:before {
  content: "\e603";
}

.icon-justifyContent_flex-end:before {
  content: "\e604";
}

.icon-justifyContent_space-between:before {
  content: "\e605";
}

.icon-justifyContent_center:before {
  content: "\e606";
}

.icon-justifyContent_space-around:before {
  content: "\e607";
}

.icon-justifyCotent_flex-start:before {
  content: "\e608";
}

.icon-nowrap:before {
  content: "\e609";
}

.icon-operate-wrap-reverse:before {
  content: "\e6f0";
}

.icon-flex-direction-row-reverse:before {
  content: "\e618";
}

.icon-flex-direction-column:before {
  content: "\e641";
}

.icon-flex-direction-column-reverse:before {
  content: "\e642";
}

.icon-flex-direction-row:before {
  content: "\e643";
}

.icon-yincang1:before {
  content: "\e762";
}

.icon-buju_inline:before {
  content: "\e745";
}

.icon-a-buju_inlineblock:before {
  content: "\e746";
}

.icon-buju_block:before {
  content: "\e747";
}

.icon-buju_flex:before {
  content: "\e748";
}

.icon-text-align-right:before {
  content: "\e736";
}

.icon-text-align-left:before {
  content: "\e62a";
}

.icon-text-align-center:before {
  content: "\e6d1";
}

.icon-italic:before {
  content: "\e7fb";
}

.icon-bold:before {
  content: "\e6db";
}

.icon-icon_line-through:before {
  content: "\e772";
}

.icon-underline:before {
  content: "\e73c";
}

</style>

<template>
  <div class="pb">
    <pb-left-side class="pb-left-panel"> </pb-left-side>
    <div class="pb-center-area">
      <div class="pb-canvas-toolbar">
        <div class="group save">
          <i
            class="el-icon-circle-check toolbar-icon"
            :class="{
              active: dirty,
            }"
            @click="onSavePage"
          ></i>
          <i
            class="el-icon-document toolbar-icon active"
            @click="configEditor = true"
          ></i>
        </div>
        <div class="group device">
          <i
            class="el-icon-s-platform toolbar-icon"
            :class="{
              active: pbDevice != 'mobile',
            }"
            @click="pbDevice = 'pc'"
          ></i>
          <i
            class="el-icon-mobile-phone toolbar-icon"
            :class="{
              active: pbDevice == 'mobile',
            }"
            @click="pbDevice = 'mobile'"
          ></i>
        </div>
        <div class="group mode">
          <i
            class="el-icon-edit toolbar-icon"
            :class="{
              active: pbMode == 'edit',
            }"
            @click="setMode('edit')"
          ></i>
          <i
            class="el-icon-view toolbar-icon"
            :class="{
              active: pbMode == 'view',
            }"
            @click="setMode('view')"
          ></i>
        </div>
        <div class="group operation">
          <i v-show="pbMode == 'view'"
            class="el-icon-document-copy toolbar-icon copy-html"
          ></i>
        </div>
      </div>
      <div class="pb-canvas">
        <div class="pb-device" :class="pbDeviceClass"
          :style="{
            transform: `scale(${pbDevice == 'mobile' ? scale/100 : 1})`
          }"
        >
          <pb-device></pb-device>
          <img v-if="pbDevice == 'mobile'" src="../assets/phone.png" alt="">
        </div>
        <div class="pb-footer-toolbar">
          <div class="pb-scale">
            <el-slider v-if="pbDevice == 'mobile'" v-model="scale" show-input></el-slider>
          </div>

        </div>

      </div>
    </div>
    <pb-right-side class="pb-right-panel">
    </pb-right-side>

    <el-drawer
      custom-class="pb-config-editor"
      title="Config Json"
      v-model="configEditor"
      direction="ltr"
      :modal="true"
      destroy-on-close>
      <pb-code-editor
        :panels="panels"
        :onChange="onConfigChange"></pb-code-editor>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs,
} from 'vue';
import { useRoute } from 'vue-router';
import Clipboard from 'clipboard';
import PbDevice from '@/components/PbDevice.vue';
import PbLeftSide from '@/components/left-side/PbLeftSide.vue';
import PbRightSide from '@/components/right-side/PbRightSide.vue';
// import ImageInfo from '@/build-in/image';
import BuilderModule from '@/store/modules/builder';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import PbCodeEditor from '@/components/PbCodeEditor.vue';
import { savePage } from '@/api';

export default defineComponent({
  name: 'Builder',
  components: {
    PbDevice,
    PbLeftSide,
    PbRightSide,
    PbCodeEditor,
  },
  methods: {
  },
  setup() {
    const route = useRoute();
    const id = route.params.id as string;
    BuilderModule.fetchConfig(id);
    const state = reactive({
      pbDevice: 'pc',
      pbMode: 'edit',
    });

    const setMode = (mode: string) => {
      BuilderModule.postMessageToPageWindow({
        cmd: 'set-page-mode',
        data: mode,
      });
      state.pbMode = mode;
    };

    const clipboard = new Clipboard('.copy-html', {
      text(trigger) {
        const iframe = document.getElementById('iframe') as HTMLIFrameElement;
        const html = iframe.contentWindow?.document.getElementsByTagName('html')[0].outerHTML.replace(/\\n/g, '') || '';
        return html;
      },
    });

    clipboard.on('success', (e) => {
      ElMessage('Html copied!');
    });

    const onSavePage = async () => {
      await savePage(id, {
        json: BuilderModule.builderState.config!,
      });
      BuilderModule.SET_DIRTY(false);
      ElMessage('Saved!');
    };

    const onConfigChange = (code: string) => {
      BuilderModule.UPDATE_CONFIG(JSON.parse(code));
      BuilderModule.SET_ACTIVE_BY_PATH(BuilderModule.builderState.activePath);
    };

    const scale = ref(70);

    return {
      scale,
      onConfigChange,
      configEditor: ref(false),
      onSavePage,
      ...toRefs(state),
      setMode,
      dirty: computed(() => BuilderModule.builderState.dirty),
      pbDeviceClass: computed(() => (state.pbDevice === 'mobile' ? 'pb-device-mobile' : 'pb-device-pc')),
      panels: computed(() => ([{
        panelType: 'json',
        panelName: 'Config',
        panelValue: JSON.stringify(BuilderModule.builderState.config),
      }])),
    };
  },
});
</script>
<style lang="scss">
.pb {
  display: flex;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  .pb-left-panel {
    width: 240px;
    background: rgb(247, 247, 247);
    height: 100%;
  }
  .pb-center-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    .pb-canvas-toolbar {
      background: rgb(247, 247, 247);
      height: 40px;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-shrink: 0;
      .group {
        margin: 0 10px;
      }
      .toolbar-icon {
        font-size: 24px;
        color: rgb(84, 92, 100);
        &.active {
          color: #409eff;
        }
      }
    }
    .pb-canvas {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 0;

      justify-content: center;
      align-items: center;
      display: flex;
      // position: relative;
      flex-grow: 1;
      .pb-device-mobile {
        width: 431px;
        height: 864px;
        padding: 27px 29px 25px 27px;
        // background: url('../assets/phone.png');
        // background-size: 100%;
        transform: scale(0.6);
        position: relative;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          pointer-events:none;
        }
      }
      .pb-device-pc {
        display: block;
        width: 100%;
        height: 100%;
      }
      .pb-footer-toolbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .pb-scale {
          width: 300px;
          padding: 5px;
        }
      }
    }
  }
  .pb-right-panel {
    width: 400px;
    background: rgb(247, 247, 247);
  }
  .pb-config-editor {
    width: 90% !important;
  }
}
</style>

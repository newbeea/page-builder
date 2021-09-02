<template>
  <div class="pb">
    <pb-left-side class="pb-left-panel"> </pb-left-side>
    <div class="pb-center-area">
      <div class="pb-canvas-toolbar">
        <div class="device">
          <i
            class="el-icon-s-platform device-icon"
            :class="{
              active: pbDevice != 'mobile',
            }"
            @click="pbDevice = 'pc'"
          ></i>
          <i
            class="el-icon-mobile-phone device-icon"
            :class="{
              active: pbDevice == 'mobile',
            }"
            @click="pbDevice = 'mobile'"
          ></i>
        </div>
        <div class="mode">
          <i
            class="el-icon-edit device-icon"
            :class="{
              active: pbMode == 'edit',
            }"
            @click="setMode('edit')"
          ></i>
          <i
            class="el-icon-view device-icon"
            :class="{
              active: pbMode == 'view',
            }"
            @click="setMode('view')"
          ></i>
        </div>

      </div>
      <div class="pb-canvas">
        <div class="pb-device" :class="pbDeviceClass">
          <pb-device></pb-device>
        </div>
      </div>
    </div>
    <pb-right-side class="pb-right-panel">

    </pb-right-side>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, toRefs,
} from 'vue';
import PbDevice from '@/components/PbDevice.vue';
import PbLeftSide from '@/components/PbLeftSide.vue';
import PbRightSide from '@/components/right-side/PbRightSide.vue';
// import ImageInfo from '@/build-in/image';
import BuilderModule from '@/store/modules/builder';

export default defineComponent({
  name: 'Builder',
  components: {
    PbDevice,
    PbLeftSide,
    PbRightSide,
  },
  methods: {
  },
  setup() {
    BuilderModule.fetchConfig();
    const state = reactive({
      pbDevice: 'mobile',
      pbMode: 'edit',
      myArray: [
        { name: '轮播1', id: 0 },
        { name: '轮播2', id: 1 },
        { name: '轮播3', id: 2 },
      ],
    });

    const setMode = (mode: string) => {
      BuilderModule.postMessageToPageWindow({
        cmd: 'set-page-mode',
        data: mode,
      });
      state.pbMode = mode;
    };
    return {
      ...toRefs(state),
      setMode,
      pbDeviceClass: computed(() => (state.pbDevice === 'mobile' ? 'pb-device-mobile' : 'pb-device-pc')),
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
      justify-content: center;
      align-items: center;
      .device-icon {
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
        width: 375px;
        height: 574px;
        background: coral;
      }
      .pb-device-pc {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .pb-right-panel {
    width: 400px;
    background: rgb(247, 247, 247);
  }
}
</style>

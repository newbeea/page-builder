<template>
  <div class="pb">
    <div class="pb-left-panel">
      <el-tabs :stretch="true">
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-menu"></i>组件库</span>
          </template>
          <el-tabs tab-position="left">
            <el-tab-pane label="轮播"
              ><div class="panel-container">
                <div class="component-card">
                  <!-- <el-card shadow="hover"> 轮播图 </el-card> -->
                  <draggable
                    v-model="myArray"
                    group="people"
                    @start="drag = true"
                    @end="drag = false"
                    item-key="id"
                  >
                    <template #item="{ element }">
                      <div>{{ element.name }}</div>
                    </template>
                  </draggable>
                </div>
              </div></el-tab-pane
            >
            <el-tab-pane label="布局">布局</el-tab-pane>
            <el-tab-pane label="产品">产品</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-notebook-2"></i>组件树</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pb-center-area">
      <div class="pb-canvas-toolbar">
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
      <div class="pb-canvas">
        <div class="pb-device" :class="pbDeviceClass">
          <pb-device></pb-device>
        </div>
      </div>
    </div>
    <div class="pb-right-panel"></div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, toRefs,
} from 'vue';
import PbDevice from '@/components/PbDevice.vue';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'Builder',
  components: {
    PbDevice,
    draggable,
  },
  setup() {
    const pbDevice = ref('mobile');
    const state = reactive({
      drag: false,
      myArray: [
        { name: '轮播1', id: 0 },
        { name: '轮播2', id: 1 },
        { name: '轮播3', id: 2 },
      ],
    });
    return {
      ...toRefs(state),
      pbDevice,
      pbDeviceClass: computed(() => (pbDevice.value === 'mobile' ? 'pb-device-mobile' : 'pb-device-pc')),
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
        font-size: 30px;
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
    width: 300px;
    background: rgb(247, 247, 247);
  }
  .panel-container {
    .component-card {
      padding: 10px;
    }
  }
}
</style>

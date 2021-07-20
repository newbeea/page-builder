<template>
  <!-- <div draggable="true" @dragstart="onDrag($event)">1</div>
  <div style="width: 100px; height: 100px; background: #333;" id="div1" @drop="drop($event)" @dragover="dragover($event)"  @dragend="dragend($event)" @dragenter="dragenter">
  <div style="width: 50px; height: 50px; background: #fff;" id="div12" @drop="drop($event)" @dragover="dragover($event)"  @dragend="dragend($event)" @dragenter="dragenter"> </div> -->
  <div class="pb-page">
    <pb-container
      :children="config.children"
      v-bind="config.props"></pb-container>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs, toRef, watch,
} from 'vue';
import PageModule from '@/store/modules/page';
import { config } from 'process';
import PbContainer from './PbContainer.vue';

export default defineComponent({
  name: 'PbPage',
  components: {
    PbContainer,
  },
  props: {
  },
  methods: {
  },
  setup: () => {
    window.addEventListener('message', (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.cmd === 'setConfig') {
        PageModule.setConfig(data.data);
      }
    });
    return {
      config: computed(() => PageModule.config),
    };
  },
});
</script>

<style scoped>
</style>

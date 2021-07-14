<template>
  <!-- <div draggable="true" @dragstart="onDrag($event)">1</div>
  <div style="width: 100px; height: 100px; background: #333;" id="div1" @drop="drop($event)" @dragover="dragover($event)"  @dragend="dragend($event)" @dragenter="dragenter">
  <div style="width: 50px; height: 50px; background: #fff;" id="div12" @drop="drop($event)" @dragover="dragover($event)"  @dragend="dragend($event)" @dragenter="dragenter"> </div> -->
  <div class="pb-page">
    <pb-container :config="config"></pb-container>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs, toRef,
} from 'vue';
import PageModule from '@/store/modules/page';
import PbContainer from './PbContainer.vue';

export default defineComponent({
  name: 'PbPage',
  components: {
    PbContainer,
  },
  props: {
  },
  methods: {
    onDrag(ev: any) {
      ev.dataTransfer.setData('Text', {
        a: 1,
      });
    },

    drop(ev: any) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData('Text');
      console.log(data.a);
    },
    dragover(ev: any) {
      ev.preventDefault();
      console.log(ev);
      if (ev.offsetY > ev.target.offsetHeight / 2) {
        ev.target.style['border-bottom'] = '22px solid red';
        ev.target.style['border-top'] = 'none';
      } else {
        ev.target.style['border-top'] = '2px solid red';
        ev.target.style['border-bottom'] = 'none';
      }
      // ev.target.style.background = '#fff';
    },
    dragenter(ev: any) {
      console.log(ev);
      ev.target.style.background = '#fff';
      return true;
    },
  },
  setup: () => ({
    config: computed(() => PageModule.config),
  }),
});
</script>

<style scoped>
</style>

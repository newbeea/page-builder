<template>
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
  <div draggable="true" @dragstart="onDrag($event)">1</div>
  <div style="width: 100px; height: 100px; background: #333;" id="div1" @drop="drop($event)" @dragover="dragover($event)"  @dragend="dragend($event)" @dragenter="dragenter">
  <div style="width: 50px; height: 50px; background: #fff;" id="div12" @drop="drop($event)" @dragover="dragover($event)"  @dragend="dragend($event)" @dragenter="dragenter"> </div>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs,
} from 'vue';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'PbPage',
  components: {
    draggable,
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
  setup: () => {
    const state = reactive({
      drag: false,
      myArray: [
        { name: 'Johnaa', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
</style>

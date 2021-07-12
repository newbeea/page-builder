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
  <div class="pb-page">
    <pb-container :config="config"></pb-container>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs, toRef,
} from 'vue';
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
  setup: () => {
<<<<<<< HEAD
    const state = reactive({
      drag: false,
      myArray: [
        { name: 'Johnaa', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 },
      ],
=======
    const config = ref({
      componentName: 'Page',
      props: {
        style: {
          textAlign: 'center',
        },
      },
      children: [{
        componentName: 'Div',
        props: {
          style: {
            display: 'flex',
          },
        },
        children: [{
          componentName: 'Div',
          props: {
            style: {
              width: '40%',
              height: '100px',
              backgroundColor: '#df9999',
            },
          },
          children: [],
        }, {
          componentName: 'Div',
          props: {
            style: {
              width: '60%',
              height: '100px',
              backgroundColor: '#c4ffc3',
            },
          },
          children: [],
        }],
      }],
>>>>>>> 86adc048d3a4a4a67823b62b8812805e7b6c7128
    });
    return {
      config,
    };
  },
});
</script>

<style scoped>
</style>

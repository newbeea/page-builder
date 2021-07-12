<template>
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
  },
  setup: () => {
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
    });
    return {
      config,
    };
  },
});
</script>

<style scoped>
</style>

<template>
  <div class="pb-container" :style="style">
    <component
      v-draggable:[getDragMode(child)]="child"
      v-for="child in config.children"
      :key="child"
      :is="getComonentName(child)"
      :config="child"
    ></component>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs,
} from 'vue';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'PbContainer',
  components: {
    draggable,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getComonentName(child: any) {
      if (child.componentName === 'Div') {
        return 'PbContainer';
      }
      return 'PbContainer';
    },
    getDragMode(child: any) {
      if (child.mode) {
        return child.mode;
      }
      if (child.componentName === 'Div') {
        return 'draggable | droppable';
      }
      return '';
    },
  },
  setup: (props) => {
    const state = reactive({
      drag: false,
      myArray: [
        { name: '轮播1', id: 0 },
      ],
    });

    return {
      style: props.config.props?.style,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.pb-container {
  min-height: 20px;
}
</style>

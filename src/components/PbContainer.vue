<template>
  <div class="pb-container">
    <div class="pb-placeholder" v-if="!children?.length">+</div>
    <component
      v-draggable:[getDragMode(child)]="child"
      v-for="child in children"
      :key="child"
      :is="getComonentName(child)"
      :children="child.children"
      v-bind="child.props"
    ></component>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs,
} from 'vue';
import draggable from 'vuedraggable';
import { ComponentConfig } from '@/store/modules/page';

export default defineComponent({
  name: 'PbContainer',
  components: {
    draggable,
  },
  props: {
    children: Array,
  },
  methods: {
    getComonentName(child: ComponentConfig) {
      if (child.componentName === 'Div') {
        return 'PbContainer';
      }
      return child.componentName;
    },
    getDragMode(child: ComponentConfig) {
      if (child.mode) {
        return child.mode;
      }
      if (child.componentName === 'Div') {
        return 'draggable | droppable | alignable';
      }
      if (child.componentName === 'Image') {
        return 'draggable | alignable';
      }
      return 'alignable';
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
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.pb-container {
  outline: 1px dotted rgb(255, 208, 75);
  outline-offset: -1px;
  .pb-placeholder {
    color: rgb(255, 208, 75);
    min-height: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

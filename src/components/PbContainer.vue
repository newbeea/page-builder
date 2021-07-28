<template>
  <div class="pb-container">
    <div class="pb-placeholder" v-if="!children?.length">+</div>
    <component
      v-draggable:[getDragMode(child)]="child"
      v-for="child in children"
      :key="child"
      :is="getComonentName(child)"
      :children="child.children"
      v-bind="bindProps(child)"
      v-selectable="child"
    >
      <template  v-for="slot in child.slots" :key="slot" v-slot:[slot.slotName]>
        <component
          v-draggable:droppable="slot"
          :is="getComonentName(slot)"
          :children="slot.children"
          v-bind="bindProps(slot)"
          v-selectable="slot"
        >
        </component>
      </template >

    </component>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs,
} from 'vue';
import draggable from 'vuedraggable';
import { ComponentConfig } from '@/store/modules/types';

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
      if (child.componentName === 'Image' || child.componentName === 'Text') {
        return 'draggable | alignable';
      }
      return 'draggable | alignable';
    },
  },
  setup: (props) => {
    const state = reactive({
      drag: false,
      myArray: [
        { name: '轮播1', id: 0 },
      ],
    });

    const bindProps = (config: any) => {
      if (config.props.className && config._active) {
        config.props.className += ' pb-active';
      }
      return config.props;
    };

    return {
      bindProps,
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
.pb-active {
  outline: 2px solid red;
  outline-offset: -2px;
}
</style>

<template>
  <div class="pb-container">
    <div class="pb-placeholder" v-if="!children?.length && mode === 'edit'">+</div>
    <component
      v-show="!child._hide"
      v-draggable:[getDragMode(child)]="child"
      v-for="child in children"
      :key="child"
      :is="getComonentName(child)"
      :children="child.children"
      v-bind="child.props"
      v-selectable="child"
      :class="[{
        'outline': mode === 'edit',
        'pb-active': child._active && mode === 'edit',

      }, child.props.classes]"
    >
      <template  v-for="slot in child.slots" :key="slot" v-slot:[slot.slotName]>
        <component
          v-draggable:droppable="slot"
          :is="getComonentName(slot)"
          :children="slot.children"
          v-bind="slot.props"
          v-selectable="slot"
          :class="[{
            'pb-active': slot._active && mode === 'edit'
          }, slot.props.classes]"
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
import PageModule from '@/store/modules/page';

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

  },
  setup: (props) => {
    const state = reactive({
      drag: false,
      mode: computed(() => PageModule.pageState.mode),
      myArray: [
        { name: '轮播1', id: 0 },
      ],
    });

    const getDragMode = (child: ComponentConfig) => {
      if (state.mode !== 'edit') {
        return '';
      }
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
    };

    return {
      getDragMode,
      // mode: computed(() => PageModule.pageState.mode),
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.pb-container {

  .pb-placeholder {
    color: rgb(255, 208, 75);
    min-height: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .outline {
    outline: 1px dotted rgb(255, 208, 75);
    outline-offset: -1px;
  }
  .pb-active {
    outline: 2px solid red;
    outline-offset: -2px;
  }
}

</style>

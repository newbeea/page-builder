<template>
  <pb-css v-if="config && config.css">
    {{config.css}}
  </pb-css>
  <div class="pb-page">
    <pb-container
      v-if="config"
      v-draggable:droppable="config"
      v-selectable="config"
      :class="{
        'pb-active': config._active
      }"
      :children="config.children"
      v-bind="config.props"></pb-container>
  </div>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, reactive, toRefs, toRef, watch,
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
  },
  setup: () => {
    PageModule.listenBuilder();
    return {
      config: computed(() => PageModule.pageState.config),
    };
  },
});
</script>

<style scoped>
</style>

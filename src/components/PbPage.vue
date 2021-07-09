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
  },
  setup: () => {
    const state = reactive({
      drag: false,
      myArray: [
        { name: 'John', id: 0 },
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

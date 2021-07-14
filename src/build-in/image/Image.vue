<template>
  <img
    :src="config.props.src"
    :title="config.props.title"
    :alt="config.props.alt"
    :style="config.props.style"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Image',
  props: {
    config: Object,
  },

});
</script>

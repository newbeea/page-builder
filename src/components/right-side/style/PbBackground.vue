<template>
  <div class="pb-property">
    <span class="pb-title">Display</span>
    <el-color-picker v-model="style.backgroundColor" show-alpha></el-color-picker>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PbBackground',
  props: {
    modelValue: Object,
  },
  emits: ['updateByKeys', 'updateStyles'],
  components: {
  },
  setup(props, context) {
    return {
      style: computed(() => props.modelValue),
    };
  },
});
</script>
<style lang="scss">
.pb-property {
  padding: 10px;
  display: flex;
  align-items: center;
  .pb-title {
    width: 80px;
    flex-shrink: 0;
  }
}
</style>

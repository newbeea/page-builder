<template>
  <!-- <pb-page></pb-page> -->
  <iframe
    ref="iframeRef"
    sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
    scrolling="yes"
    frameborder="0"
    style="width: 100%; height: 100%; border: none"
  ></iframe>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, onMounted,
} from 'vue';
import PbPage from './PbPage.vue';

export default defineComponent({
  name: 'PbDevice',
  components: {
  },
  props: {
  },
  methods: {
  },
  setup: () => {
    const iframeRef = ref(null);
    onMounted(() => {
      const iframe: any = iframeRef.value;
      const iframeDocument = iframe.contentWindow.document;
      const html = `
<!DOCTYPE html>
  <html>
    <head>
<script type="module" crossorigin src="/dist/assets/nested.2e6fae60.js"><\/script>
  <link rel="modulepreload" href="/dist/assets/vendor.77f98efa.js">
  <link rel="modulepreload" href="/dist/assets/common.baa26408.js">
  <link rel="stylesheet" href="/dist/assets/common.f6ff86f2.css">
  <link rel="stylesheet" href="/dist/assets/nested.f0c7e5b4.css">
    </head>
    <body>
      <div><pre id="error" style="color: red"></pre></div>
      <div id="app"></div>
    </body>
</html>`;
      iframeDocument.open();
      iframeDocument.write(html);
      iframeDocument.close();
    });

    return {
      iframeRef,
    };
  },
});
</script>

<style scoped>
</style>

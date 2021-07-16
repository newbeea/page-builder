<template>
  <pb-page></pb-page>
  <!-- <iframe
    src="http://localhost:3000/iframe.html"
    ref="iframeRef"
    sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
    scrolling="yes"
    frameborder="0"
    style="width: 100%; height: 100%; border: none"
  ></iframe> -->
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, onMounted,
} from 'vue';
import PbPage from './PbPage.vue';

export default defineComponent({
  name: 'PbDevice',
  components: {
    PbPage,
  },
  props: {
  },
  methods: {
  },
  setup: () => {
    const iframeRef = ref(null);
    onMounted(() => {
      // const iframe: any = iframeRef.value;
      // const iframeDocument = iframe.contentWindow.document;
      // iframeDocument.src = 'http://localhost:3000/iframe.html';
      //       const iframeDocument = iframe.contentWindow.document;
      // const html = `
      // <!DOCTYPE html>
      //   <html>
      //     <head>
      // <script type="module" crossorigin src="/assets/main.2d6b129f.js"><\/script>
      //   <link rel="modulepreload" href="/assets/vendor.b593fb47.js">
      //   <link rel="stylesheet" href="/assets/main.9cd118ca.css">
      //     </head>
      //     <body>
      //       <div><pre id="error" style="color: red"></pre></div>
      //       <div id="app"></div>
      //     </body>
      // </html>`;
      // iframeDocument.open();
      // iframeDocument.write(html);
      // iframeDocument.close();
    });

    return {
      iframeRef,
    };
  },
});
</script>

<style scoped>
</style>

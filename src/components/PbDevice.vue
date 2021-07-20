<template>
  <pb-page v-if="!iframeMode"></pb-page>
  <iframe
    @load="onLoad"
    id="iframe"
    v-else
    src="http://localhost:3000/iframe.html"
    ref="iframeRef"
    sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
    scrolling="yes"
    frameborder="0"
    style="width: 100%; height: 100%; border: none"
  ></iframe>
</template>

<script lang="ts">
import {
  ref, defineComponent, computed, onMounted, nextTick, watch,
} from 'vue';
import BuilderModule from '@/store/modules/builder';
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

    const updateConfig = () => {
      const iframe: any = iframeRef.value;
      iframe.contentWindow.postMessage(JSON.stringify({
        cmd: 'setConfig',
        data: BuilderModule.config,
      }));
      console.log(222);
    };
    watch(
      () => BuilderModule.config,
      (config, prevConfig) => {
        updateConfig();
      },
      {
        deep: true,
      },
    );

    const onLoad = () => {
      updateConfig();
    };

    window.addEventListener('message', (event) => {
      if (typeof event.data === 'string') {
        try {
          console.log(event);
          const data = JSON.parse(event.data);
          if (data.cmd === 'setConfig') {
            BuilderModule.setConfig(data.data);
          }
          if (data.cmd === 'onSelected') {
            BuilderModule.setBuilderActiveConfig(data.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
    onMounted(() => {
      // const iframe: any = iframeRef.value;
      // setTimeout(() => {
      //   iframe.contentWindow.postMessage(JSON.stringify(PageModule.config));
      // }, 0);
      // nextTick(() => {
      //   iframe.contentWindow.postMessage('主页面消息');
      // });
      // console.log('aa');
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
    // BuilderModule.setActiveConfig({ props: {}, componentName: 'Image' });
    return {
      onLoad,
      iframeMode: true,
      iframeRef,
    };
  },
});
</script>

<style scoped>
</style>

<template>
  <div class="pb-tabs" v-if="panels.length > 1">
    <el-radio-group size="mini" v-model="tab" >
      <el-radio-button v-for="(panel, index) in panels" :key="index" :label="panel.panelName" @click="setModel(index)"></el-radio-button>
    </el-radio-group>
  </div>

  <div class="pb-code-editor" ref="root"></div>
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
import {
  defineComponent, ref, onMounted, onUnmounted, nextTick, PropType, shallowRef,
} from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';

// eslint-disable-next-line no-undef
const global: any = globalThis || window;

global.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') return new JsonWorker();
    if (label === 'css' || label === 'scss' || label === 'less') return new CssWorker();
    return new EditorWorker();
  },
};

export default defineComponent({
  props: {
    modelValue: String,

    // code: {
    //   type: String as PropType<string>,
    //   required: true,
    // },
    panels: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    lang: {
      type: String,
      default: () => ('json'),
    },
    options: {
      type: Object as PropType<monaco.editor.IStandaloneEditorConstructionOptions>,
      default: () => ({}),
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: monaco.editor.IModelContentChangedEvent) => void
      >,
    },
  },
  setup(props, context) {
    const root = ref<HTMLElement>();
    const editorRef = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    let onChangeListener: monaco.IDisposable | undefined;
    const formatCode = () => {
      window.requestIdleCallback(
        () => {
          editorRef.value?.getAction('editor.action.formatDocument').run();
        },
        { timeout: 800 },
      );
    };

    const models = props.panels?.map((p: any) => monaco.editor.createModel(p.panelValue, p.panelType));
    onMounted(() => {
      nextTick(() => {
        editorRef.value = monaco.editor.create(root.value as HTMLElement, {
          language: props.lang,
          model: models![0],
          tabSize: 2,
        });

        onChangeListener = editorRef.value?.onDidChangeModelContent((event) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          props.onChange?.(editorRef.value!.getValue(), event);
          context.emit('update:modelValue', editorRef.value!.getValue());
        });
        formatCode();
      });
    });
    onUnmounted(() => {
      onChangeListener?.dispose();
      editorRef.value?.dispose();
    });

    const setModel = (index: number) => {
      // models[index].setValue(props.panels[index].panelValue);
      editorRef.value!.setModel(models[index]);
      formatCode();
    };

    const tab = ref(props.panels[0].panelName);
    return {
      setModel,
      tab,
      root,
      editorRef,
    };
  },
});
</script>

<style scoped>
.pb-tabs {
  padding: 0 20px 20px;
}
.pb-code-editor {
  width: 100%;
  height: 100%;
}
</style>

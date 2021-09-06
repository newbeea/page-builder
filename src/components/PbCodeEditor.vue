<template>
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

    code: {
      // 代码
      type: String as PropType<string>,
      required: true,
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

    onMounted(() => {
      nextTick(() => {
        console.log(1111111);
        editorRef.value = monaco.editor.create(root.value as HTMLElement, {
          language: props.lang,
          value: props.code,
        });

        onChangeListener = editorRef.value?.onDidChangeModelContent((event) => {
          console.log(editorRef.value!.getValue());
          // if (!0) {
          // getValue: 获取编辑器中的所有文本
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          props.onChange?.(editorRef.value!.getValue(), event);
          context.emit('update:modelValue', editorRef.value!.getValue());
          // }
        });
        editorRef.value!.getAction('editor.action.formatDocument').run();
        // const editor = editorRef.value;
        // // 获取编辑器的textModel文本
        // const model = editor.getModel();
        // model?.setValue('{}');
        // formatCode();
      });
    });
    onUnmounted(() => {
      onChangeListener?.dispose();
      editorRef.value?.dispose();
    });
    return {
      root,
      editorRef,
    };
  },
});
</script>

<style scoped>
.pb-code-editor {
  width: 100%;
  height: 100%;
}
</style>

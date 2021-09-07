<template>
  <div class="pb-font">
    <div class="font-family">
      <span>Font Family</span>
      <el-select class="font-select" @change="onFontSelected" v-model="style.fontFamily" filterable placeholder="请选择">
        <el-option
          v-for="item in fonts"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button @click="openDialog">+</el-button>
    </div>
    <div class="inputs">
      <div class="">
        <div>Color</div>
        <el-color-picker v-model="style.color" show-alpha></el-color-picker>
      </div>
      <div class="item">
        <div>Size</div>
        <el-input v-model="style.fontSize" show-alpha size="mini"></el-input>
      </div>
      <div class="item">
        <div>Space</div>
        <el-input v-model="style.letterSpacing" show-alpha size="mini"></el-input>
      </div>
      <div class="item">
        <div>Line Height</div>
        <el-input v-model="style.lineHeight" show-alpha size="mini"></el-input>
      </div>
      <div class="item">
        <div>Weight</div>
        <el-autocomplete
          class="inline-input"
          v-model="style.fontWeight"
          :fetch-suggestions="querySearch"
          size="mini"
        ></el-autocomplete>

      </div>
    </div>
    <div class="icons">
      <span class="pb-icon iconfont icon-bold" :class="{
        active: style.fontWeight === 'bold'
      }" @click="onBoldClick()"></span>
      <span class="pb-icon iconfont icon-italic" :class="{
        active: style.fontStyle === 'italic'
      }" @click="onItalicClick()"></span>
      <span class="pb-icon iconfont icon-underline" :class="{
        active: style.textDecoration === 'underline'
      }" @click="onUnderlineClick()"></span>
      <span class="pb-icon iconfont icon-icon_line-through" :class="{
        active: style.textDecoration === 'line-through'
      }" @click="onLineThroughClick()"></span>

      <span class="pb-icon iconfont icon-text-align-left" :class="{
        active: style.textAlign === 'left'
      }" @click="onTextAlignClick('left')"></span>
      <span class="pb-icon iconfont icon-text-align-center" :class="{
        active: style.textAlign === 'center'
      }" @click="onTextAlignClick('center')"></span>
      <span class="pb-icon iconfont icon-text-align-right" :class="{
        active: style.textAlign === 'right'
      }" @click="onTextAlignClick('right')"></span>
    </div>

    <el-dialog
      title="Font"
      v-model="dialogVisible"
      width="90%"
    >

      <el-form label-position="top" label-width="80px">
        <el-form-item label="Font Family">
          <el-input v-model="font.fontFamily"></el-input>
        </el-form-item>
        <el-form-item label="Font Url">
          <el-input v-model="font.url"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addFont" :loading="adding">Add Font</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, PropType, ref,
} from 'vue';
import BuilderModule from '@/store/modules/builder';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { buildInFonts } from './style-utils';

export default defineComponent({
  name: 'PbFont',
  props: {
    modelValue: Object as PropType<{
      fontWeight: string,
      fontStyle: string,
      textDecoration: string,
      textAlign: string,
      fontFamily: string,
    }>,
  },
  emits: ['updateFonts', 'updateStyles'],
  components: {
  },
  setup(props, context) {
    const querySearch = (queryString: string, cb: Function) => {
      const suggestions: any[] = [];
      for (let i = 100; i < 1000; i += 100) {
        suggestions.push({
          value: i,
        });
      }
      cb(suggestions);
    };
    const style = computed(() => props.modelValue);

    const onBoldClick = () => {
      const fontWeight = style.value?.fontWeight === 'bold' ? '' : 'bold';
      context.emit('updateStyles', {
        fontWeight,
      });
    };

    const onItalicClick = () => {
      const fontStyle = style.value?.fontStyle === 'italic' ? '' : 'italic';
      context.emit('updateStyles', {
        fontStyle,
      });
    };

    const onUnderlineClick = () => {
      const textDecoration = style.value?.textDecoration === 'underline' ? '' : 'underline';
      context.emit('updateStyles', {
        textDecoration,
      });
    };

    const onLineThroughClick = () => {
      const textDecoration = style.value?.textDecoration === 'line-through' ? '' : 'line-through';
      context.emit('updateStyles', {
        textDecoration,
      });
    };

    const onTextAlignClick = (textAlign: string) => {
      context.emit('updateStyles', {
        textAlign,
      });
    };

    const fonts = ref<any[]>(buildInFonts);

    const fontMap: any = {};

    const onFontSelected = (fontFamily: string) => {
      const f = fontMap[fontFamily];
      if (f) {
        BuilderModule.setFonts(`
          @font-face {
            font-family: "${f.fontFamily}";
            src: local("${f.fontFamily}"), url("${f.url}");
            font-display: fallback;
          }
        `);
      }
    };

    const font = ref({
      fontFamily: '',
      url: '',
    });
    const adding = ref(false);
    const dialogVisible = ref(false);
    const addFont = async () => {
      if (!font.value.fontFamily || !font.value.url) {
        ElMessage('Empty');
        return;
      }
      adding.value = true;
      await axios.post('/api/fonts', font.value);
      fontMap[font.value.fontFamily] = font.value;
      fonts.value.push(font.value.fontFamily);
      adding.value = false;
      dialogVisible.value = false;
    };
    const openDialog = () => {
      font.value.fontFamily = '';
      font.value.url = '';
      dialogVisible.value = true;
    };
    onMounted(async () => {
      const res = await axios.get('/api/fonts');
      res.data.data.forEach((f: any) => {
        fontMap[f.fontFamily] = f;
        fonts.value.push(f.fontFamily);
      });
    });
    return {
      font,
      dialogVisible,
      addFont,
      openDialog,
      adding,
      fonts,
      onFontSelected,
      onBoldClick,
      onItalicClick,
      onUnderlineClick,
      onLineThroughClick,
      onTextAlignClick,
      querySearch,
      style,
    };
  },
});
</script>
<style lang="scss" scoped>
.pb-font {
  padding: 10px;
  .font-family {
    // .font-select {
    //   margin: 0 10px;
    // }
    align-items: center;
    justify-content: space-between;
    display: flex;
  }
  .inputs {
    width: 100%;
    display: flex;
    justify-content: space-between;

    text-align: center;
    .item {
      padding: 0 2px;
      width: 20%;
      text-align: center;
    }
  }
  .icons {
    .active {
      color: #409EFF;
    }
    .pb-icon {
      padding: 4px;
      font-size: 28px !important;
    }

  }
}
</style>

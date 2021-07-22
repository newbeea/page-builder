<template>
  <div class="pb-property">
    <span class="pb-title">display</span>
    <el-radio-group v-model="style.display" size="mini">

      <el-radio-button v-for="o in displayOptions" :key="o.value" :label="o.value">
        <el-tooltip effect="light" :content="o.value" placement="top">
          <span class="pb-icon iconfont" :class="o.icon"></span>
        </el-tooltip>
      </el-radio-button>

    </el-radio-group>
  </div>
  <div class="pb-size">
    <div class="pb-size-item">
      <span>width</span>
      <el-autocomplete
        class="inline-input"
        v-model="style.width"
        :fetch-suggestions="querySearch"
        size="mini"
      ></el-autocomplete>
    </div>
    <div class="pb-size-item">
      <span>height</span>
      <el-autocomplete
        class="inline-input"
        v-model="style.height"
        :fetch-suggestions="querySearch"
        size="mini"
      ></el-autocomplete>
    </div>
    <div class="pb-size-item">
      <span>min width</span>
      <el-autocomplete
        class="inline-input"
        v-model="style.minWidth"
        :fetch-suggestions="querySearch"
        size="mini"
      ></el-autocomplete>
    </div>
    <div class="pb-size-item">
      <span>min height</span>
      <el-autocomplete
        class="inline-input"
        v-model="style.minHeight"
        :fetch-suggestions="querySearch"
        size="mini"
      ></el-autocomplete>
    </div>

  </div>
  <div class="pb-margin-padding">
    <div class="pb-margin pb-margin-bg">
      <span>margin</span>
      <el-autocomplete
        class="inline-input"
        v-model="style.marginTop"
        value-key="label"
        :fetch-suggestions="queryMarginPadding('margin', 'top-bottom')"
        @select="handleSelect"
        size="mini"
      ></el-autocomplete>
      <span></span>
    </div>
    <div class="pb-middle">
      <div class="pb-margin-left pb-margin-bg">
        <el-autocomplete
            class="inline-input"
            v-model="style.marginLeft"
            value-key="label"
            :fetch-suggestions="queryMarginPadding('margin', 'left-right')"
            @select="handleSelect"
            size="mini"
          ></el-autocomplete>
      </div>
      <div class="pb-padding">
        <div class="pb-padding-top">
          <span>padding</span>
          <el-autocomplete
            class="inline-input"
            v-model="style.paddingTop"
            value-key="label"
            :fetch-suggestions="queryMarginPadding('padding', 'top-bottom')"
            @select="handleSelect"
            size="mini"
          ></el-autocomplete>
          <span></span>
        </div>
        <div class="pb-padding-middle">
          <el-autocomplete
            class="inline-input"
            v-model="style.paddingLeft"
            value-key="label"
            :fetch-suggestions="queryMarginPadding('padding', 'left-right')"
            @select="handleSelect"
            size="mini"
          ></el-autocomplete>
          <el-autocomplete
            class="inline-input"
            v-model="style.paddingRight"
            value-key="label"
            :fetch-suggestions="queryMarginPadding('padding', 'left-right')"
            @select="handleSelect"
            size="mini"
          ></el-autocomplete>
        </div>
        <div class="pb-padding-top">

          <el-autocomplete
            class="inline-input"
            v-model="style.paddingBottom"
            value-key="label"
            :fetch-suggestions="queryMarginPadding('padding', 'top-bottom')"
            @select="handleSelect"
            size="mini"
          ></el-autocomplete>
        </div>
      </div>
      <div class="pb-margin-right pb-margin-bg">
        <el-autocomplete
            class="inline-input"
            v-model="style.marginRight"
            value-key="label"
            :fetch-suggestions="queryMarginPadding('margin', 'left-right')"
            @select="handleSelect"
            size="mini"
          ></el-autocomplete>
      </div>
    </div>
    <div class="pb-margin pb-margin-bg">
      <el-autocomplete
        class="inline-input"
        v-model="style.marginBottom"
        value-key="label"
        :fetch-suggestions="queryMarginPadding('margin', 'top-bottom')"
        @select="handleSelect"
        size="mini"
      ></el-autocomplete>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BuilderModule from '@/store/modules/builder';
import { querySearch, queryMarginPadding } from './style-utils';

export default defineComponent({
  name: 'PbLayout',
  components: {
  },
  setup() {
    const displayOptions = [
      {
        value: 'block',
        icon: 'icon-buju_block',
      },
      {
        value: 'inline',
        icon: 'icon-buju_inline',
      },
      {
        value: 'inline-block',
        icon: 'icon-a-buju_inlineblock',
      },
      {
        value: 'flex',
        icon: 'icon-buju_flex',
      },

      {
        value: 'none',
        icon: 'icon-yincang1',
      },
    ];

    const cssValueSuggestions = [
      {
        value: '5px',
        label: '5px',
      },
      {
        value: '10px',
        label: '10px',
      },
      {
        value: '50%',
        label: '50%',
      },
      {
        value: '100%',
        label: '100%',
      },
    ];
    // const style = computed(() => BuilderModule.builderState.activeConfig?.props?.style || {});
    const handleSelect = (item: any) => {
      console.log('key', item);
      if (item.label.startsWith('set')) {
        item.keys.forEach((key: string) => {
          BuilderModule.updateStyle({
            value: item.value,
            key,
          });
        });
      }
      // style[key] = item.label;
    };
    return {
      style: computed(() => BuilderModule.builderState.activeConfig?.props?.style || {}),
      displayOptions,
      querySearch,
      queryMarginPadding,
      handleSelect,
    };
  },
});
</script>
<style lang="scss">
.el-autocomplete__popper {
  width: 300px !important;
  .el-autocomplete-suggestion {
    width: auto !important;
  }
}
@font-face {
  font-family: 'iconfont';  /* Project id 2692908 */
  src: url('//at.alicdn.com/t/font_2692908_mmgi3ldxhop.woff2?t=1626935314738') format('woff2'),
       url('//at.alicdn.com/t/font_2692908_mmgi3ldxhop.woff?t=1626935314738') format('woff'),
       url('//at.alicdn.com/t/font_2692908_mmgi3ldxhop.ttf?t=1626935314738') format('truetype');
}
.el-collapse-item__header {
  padding: 0 10px;
}
.pb-property {
  padding: 10px;
  display: flex;
  align-items: center;
  .pb-title {
    width: 80px;
    flex-shrink: 0;
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-yincang1:before {
    content: "\e762";
  }

  .icon-buju_inline:before {
    content: "\e745";
  }

  .icon-a-buju_inlineblock:before {
    content: "\e746";
  }

  .icon-buju_block:before {
    content: "\e747";
  }

  .icon-buju_flex:before {
    content: "\e748";
  }
}
.pb-size {
  display: flex;
  padding: 10px;
  .pb-size-item {
    padding: 2px;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.pb-margin-padding {
  padding: 10px;
  .inline-input {
    width: 60px;
  }
  .pb-margin {
    span {
      width: 80px;
      text-align: center;

    }
    display: flex;
    justify-content: space-around;
    padding: 5px;
  }
  .pb-margin-bg {
    background: rgb(248, 236, 202);
  }
  .pb-middle {
    display: flex;
    justify-content: space-between;
    background: rgb(229, 253, 204);
    .pb-margin-left,
    .pb-margin-right {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .pb-padding {
      width: 100%;
      .pb-padding-top {
        display: flex;
        padding: 5px 0;
        span {
          width: 50px;
        }
        justify-content: space-around;
      }
      .pb-padding-middle {
        display: flex;
        margin: 1px auto;
        justify-content: space-around;
      }
    }

  }
}
</style>

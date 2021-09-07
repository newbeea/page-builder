<template>
  <div class="pb-property">
    <span class="pb-title">Display</span>
    <el-radio-group v-model="style.display" size="mini">

      <el-radio-button v-for="o in displayOptions" :key="o.value" :label="o.value">
        <el-tooltip effect="light" :content="o.value" placement="top">
          <span class="pb-icon iconfont" :class="o.icon"></span>
        </el-tooltip>
      </el-radio-button>

    </el-radio-group>
  </div>
  <div v-if="style.display == 'flex'">
    <div class="pb-property">
      <span class="pb-title">Direction</span>
      <el-radio-group v-model="style.flexDirection" size="mini">

        <el-radio-button v-for="o in directionOptions" :key="o.value" :label="o.value">
          <el-tooltip effect="light" :content="o.value" placement="top">
            <span class="pb-icon iconfont" :class="o.icon"></span>
          </el-tooltip>
        </el-radio-button>

      </el-radio-group>
    </div>
    <div class="pb-property">
      <span class="pb-title">Main axis</span>
      <el-radio-group v-model="style.justifyContent" size="mini">

        <el-radio-button v-for="o in justifyContentOptions" :key="o.value" :label="o.value">
          <el-tooltip effect="light" :content="o.value" placement="top">
            <span class="pb-icon iconfont" :class="o.icon"></span>
          </el-tooltip>
        </el-radio-button>

      </el-radio-group>
    </div>
    <div class="pb-property">
      <span class="pb-title">Cross axis</span>
      <el-radio-group v-model="style.alignItems" size="mini">

        <el-radio-button v-for="o in alignItemsOptions" :key="o.value" :label="o.value">
          <el-tooltip effect="light" :content="o.value" placement="top">
            <span class="pb-icon iconfont" :class="o.icon"></span>
          </el-tooltip>
        </el-radio-button>

      </el-radio-group>
    </div>
    <div class="pb-property">
      <span class="pb-title">Wrap</span>
      <el-radio-group v-model="style.flexWrap" size="mini">

        <el-radio-button v-for="o in flexWrapOptions" :key="o.value" :label="o.value">
          <el-tooltip effect="light" :content="o.value" placement="top">
            <span class="pb-icon iconfont" :class="o.icon"></span>
          </el-tooltip>
        </el-radio-button>

      </el-radio-group>
    </div>
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
import { querySearch, queryMarginPadding } from './style-utils';

export default defineComponent({
  name: 'PbLayout',
  props: {
    modelValue: Object,
  },
  emits: ['updateByKeys', 'updateStyles'],
  components: {
  },
  setup(props, context) {
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

    const directionOptions = [
      {
        value: 'row',
        icon: 'icon-flex-direction-row',
      },
      {
        value: 'row-reverse',
        icon: 'icon-flex-direction-row-reverse',
      },
      {
        value: 'column',
        icon: 'icon-flex-direction-column',
      },
      {
        value: 'column-reverse',
        icon: 'icon-flex-direction-column-reverse',
      },
    ];

    const justifyContentOptions = [
      {
        value: 'flex-start',
        icon: 'icon-justifyCotent_flex-start',
      },
      {
        value: 'flex-end',
        icon: 'icon-justifyContent_flex-end',
      },
      {
        value: 'center',
        icon: 'icon-justifyContent_center',
      },
      {
        value: 'space-around',
        icon: 'icon-justifyContent_space-around',
      },
      {
        value: 'space-between',
        icon: 'icon-justifyContent_space-between',
      },
    ];

    const alignItemsOptions = [
      {
        value: 'flex-start',
        icon: 'icon-alignItems_flex-start',
      },
      {
        value: 'flex-end',
        icon: 'icon-alignItems_flex-end',
      },
      {
        value: 'center',
        icon: 'icon-alignItems_center',
      },
      {
        value: 'baseline',
        icon: 'icon-alignItems_baseline',
      },
      {
        value: 'stretch',
        icon: 'icon-alignItems_stretch',
      },
    ];

    const flexWrapOptions = [
      {
        value: 'wrap',
        icon: 'icon-wrap',
      },
      {
        value: 'wrap-reverse',
        icon: 'icon-wrap1',
      },
      {
        value: 'nowrap',
        icon: 'icon-nowrap',
      },
    ];

    const handleSelect = (item: any) => {
      context.emit('updateByKeys', item.keys, item.value);
      // const style = { ...props.modelValue };
      // item.keys?.forEach((key: string) => {
      //   style[key] = item.value;
      // });
      // context.emit('updateStyles', style);
    };
    return {
      style: computed(() => props.modelValue),
      displayOptions,
      querySearch,
      queryMarginPadding,
      handleSelect,
      directionOptions,
      justifyContentOptions,
      alignItemsOptions,
      flexWrapOptions,
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
    width: 57px;
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

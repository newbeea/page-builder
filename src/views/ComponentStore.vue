<template>
  <div class="pb-component-store">
    <div class="publish">
      <el-button type="primary" @click="dialogVisible = true">
        Publish Component
      </el-button>
    </div>
    <div class="pb-lib-list">

      <div class="pb-lib" v-for="lib in libs" :key="lib.id">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>{{lib.name}}</span>
              <el-button class="button" type="text">install</el-button>
            </div>

          </template>
          <el-popover
            placement="bottom-start"
            title=""
            :width="200"
            trigger="hover"
            :content="lib.desc || 'Try yourself'"
          >
            <template #reference>
              <div class="body">
                <div class="preview"  :style="{
                  backgroundImage: lib.thumb ? `url(${lib.thumb})` : ''
                }"></div>

              </div>
            </template>
          </el-popover>

        </el-card>
      </div>
    </div>

    <el-dialog
      title="Publish"
      v-model="dialogVisible"
      width="960px"
    >

      <el-form v-show="step == 'first'" label-position="top" label-width="80px">
        <el-form-item label="Umd url">
          <el-input v-model="lib.umdUrl" @input="onUmdChanged"></el-input>
        </el-form-item>
      </el-form>

      <el-form v-show="step == 'second'" label-position="top" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="lib.name" ></el-input>
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="lib.desc" ></el-input>
        </el-form-item>

        <el-form-item label="Css url">
          <el-input v-model="lib.cssUrl" ></el-input>
        </el-form-item>

        <el-form-item label="Thumb url">
          <el-input v-model="lib.thumb" ></el-input>
        </el-form-item>
        <img class="img-preview" :src="lib.thumb" alt="">

        <el-form-item label="Preview url">
          <el-input v-model="lib.preview" ></el-input>
        </el-form-item>
        <img class="img-preview" :src="lib.thumb" alt="">
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button v-show="step == 'first'" type="primary" @click="analyse">Analyse</el-button>
          <el-button v-show="step == 'second'" type="primary" @click="submit">Submit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'ComponentStore',
  components: {
  },
  setup() {
    const libs = ref([]);

    const load = async () => {
      const res = await axios.get('/api/libs');
      libs.value = res.data.data;
      console.log(res);
    };

    onBeforeMount(load);

    const lib = ref({
      name: '',
      umdUrl: '',
      cssUrl: '',
      thumb: '',
      preview: '',
      desc: '',
    });
    const components = ref<any[]>([]);
    const dialogVisible = ref(false);

    const step = ref('first');

    const analyse = async () => {
      // const res = await axios.get(lib.value.umdUrl);
      // eval(`window.Vue = Vue; ${res.data};`);
      const filename = lib.value.umdUrl.split('/').pop()!;
      console.log(filename);
      const name = filename.split('.').shift()!;
      lib.value.name = name;
      // https://cdn.jsdelivr.net/npm/@page-builder/pb-component-hero@0.0.1/dist/pb-component-hero.umd.js
      try {
        const cssUrl = lib.value.umdUrl.replace(filename, 'style.css');
        await axios.head(cssUrl);
        lib.value.cssUrl = cssUrl;
      } catch (e) {
        console.log(e);
      }

      try {
        const thumb = lib.value.umdUrl.replace(`dist/${filename}`, 'assets/thumb.jpg');
        await axios.head(thumb);
        lib.value.thumb = thumb;
      } catch (e) {
        console.log(e);
      }

      try {
        const preview = lib.value.umdUrl.replace(`dist/${filename}`, 'assets/preview.jpg');
        await axios.head(preview);
        lib.value.preview = preview;
      } catch (e) {
        console.log(e);
      }

      try {
        const configUrl = lib.value.umdUrl.replace(`dist/${filename}`, 'assets/config.json');
        const { data } = await axios.get(configUrl);
        console.log(data);
        data.forEach((c: any) => {
          const component = {
            componentName: c.config.componentName,
            label: c.config.componentName,
            props: c.props,
            config: c.config,
            thumb: c.thumb || lib.value.thumb, // TODO
            preview: c.preview || lib.value.preview, // TODO
            category: c.category,
            buildIn: false,
          };
          components.value.push(component);
        });
        // const component = {
        //   componentName: data.config.componentName,
        //   label: data.config.componentName,
        //   props: data.props,
        //   config: data.config,
        //   thumb: data.thumb || lib.value.thumb, // TODO
        //   preview: data.preview || lib.value.preview, // TODO
        //   category: data.category,
        //   buildIn: false,
        // };
        // components.value.push(component);
      } catch (e) {
        console.log(e);
      }
      step.value = 'second';
    };

    const submit = async () => {
      await axios.post('/api/components', {
        lib: lib.value,
        components: components.value,
      });
      window.location.reload();
    };
    const onUmdChanged = () => {
      const filename = lib.value.umdUrl.split('/').pop()!;
      console.log(filename);
    };

    return {
      step,
      lib,
      libs,
      dialogVisible,
      analyse,
      onUmdChanged,
      submit,
    };
  },
});
</script>
<style lang="scss" scoped>
.pb-component-store {
  padding: 20px 20px;
  .publish {
    position: sticky;
    top: 80px;
  }
  .pb-lib-list {
    margin: auto;
    display: flex;
    width: 1200px;
    padding-top: 100px;
    // justify-content: space-between;
    flex-wrap: wrap;
    .pb-lib {
      width: 300px;
      padding: 10px;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .body {
        .preview {
          height: 160px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          margin-bottom: 10px;
        }
      }
    }
  }
  .img-preview {
      height: 80px;
    }
}
</style>

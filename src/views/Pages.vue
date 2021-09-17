<template>
  <div class="pb-pages">
    <div class="publish">
      <el-button type="primary" @click="dialogVisible = true">
        New page
      </el-button>
    </div>
    <div class="pb-page-list">
      <div class="pb-page" v-for="page in pages" :key="page.id">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>{{page.name}}</span>
              <router-link :to="{ name: 'Builder', params: { id: page.id }}"><el-button class="button" type="text">Edit</el-button></router-link>
              <!-- <el-button @click="edit(page.id)" class="button" type="text">Edit</el-button> -->

            </div>

          </template>
          <div class="body">
            {{page.description}}
          </div>

        </el-card>
      </div>
    </div>
    <el-dialog
      title="New"
      v-model="dialogVisible"
      width="960px"
    >

      <el-form label-position="top" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="description"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" :loading="loading" @click="newPage()">New</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BuilderModule from '@/store/modules/builder';

const pageIndex = ref(1);
const pages = ref([]);
onMounted(async () => {
  const res = await axios.get('/api/pages', {
    params: {
      pageIndex: pageIndex.value,
    },
  });
  console.log(res);
  pages.value = res.data.data.pages;
});

const dialogVisible = ref(false);
const loading = ref(false);
const name = ref('');
const description = ref('');

const newPage = async () => {
  loading.value = true;
  const res = await axios.post('/api/pages', {
    json: {
      name: 'Div', props: { style: {} }, children: [], componentName: 'Div',
    },
    name: name.value,
    description: description.value,
  });
  pages.value.push(res.data.data);
  loading.value = false;
  dialogVisible.value = false;
};
const router = useRouter();

// const edit = (pageId) => {
//   router.push({
//     name: 'Builder',
//     params: { id: pageId },
//   });
//   BuilderModule.SET_PAGE_ID(pageId);
// };
</script>

<style lang="scss">
.pb-pages {
  padding: 20px 20px;
  .publish {
    position: sticky;
    top: 80px;
  }
  .pb-page-list {
    margin: auto;
    display: flex;
    width: 1200px;
    padding-top: 100px;
    // justify-content: space-between;
    flex-wrap: wrap;
    .pb-page {
      width: 300px;
      padding: 10px;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .body {
        height: 100px;
      }
    }
  }
}
</style>

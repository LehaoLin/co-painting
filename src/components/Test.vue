<template>
  <div class="test">
    <el-row justify="center">
      <!-- <p>Col:{{ col_clicked }}, Row:{{ row_clicked }} clicked, {{ status }}</p> -->
    </el-row>
    <el-row justify="center">
      <el-switch
        v-model="liandian"
        size="large"
        active-text="开启连点"
        inactive-text="非连点"
        @change="lian"
      />
    </el-row>
    <el-row justify="center">
      <center v-if="liandian">
        选择的颜色：
        <el-button :style="{ 'background-color': liandian_color }"></el-button>
      </center>
    </el-row>
    <el-row justify="center">
      <ColorCanvas
        :colors="colors"
        :paint="paint"
        :clear="clear"
        @select="select"
      />
    </el-row>

    <el-row justify="center" class="color-rect">
      <!-- <div v-if="row_clicked != 0 && col_clicked != 0"> -->
      <!-- <span v-for="(color, index) in prepared_colors"> -->
      <el-col
        :span="1"
        justify="space-between"
        v-for="(color, index) in prepared_colors"
      >
        <center>
          <el-button
            :style="{ 'background-color': color }"
            @click="set_color(color, row_clicked, col_clicked, status)"
          ></el-button>
        </center>
      </el-col>
      <!-- </span> -->
    </el-row>
    <br />
    <el-row justify="center">
      <el-button @click="clear_colors"> Clear </el-button>
    </el-row>
    <br />
  </div>
  <Footer style="position: fixed" />
</template>

<script setup>
import ColorCanvas from "./ColorCanvas_new.vue";
import { ref, onMounted } from "vue";
import { useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";
import Footer from "@/components/Footer.vue";

import { useStore } from "@/store";

const store = useStore();

const colors = useStorage("colors", {});
const clear_colors = () => {
  colors.value = {};
  clear.value++;
};

const index_to_row_col = (index) => {
  // let col_index = (index + 1) % 60;
  // let row_index = (index + 1 - col_index) / 60 + 1;
  let col_index = (index + 1) % 30;
  let row_index = (index + 1 - col_index) / 30 + 1;
  return { col_index, row_index };
};

onMounted(() => {
  store.router = "test";
  for (let [key, cell] of Object.entries(colors.value)) {
    if (cell == "#808080") {
      paint.value = {
        color: "#ffffff",
        row_index: index_to_row_col(parseInt(key)).row_index,
        col_index: index_to_row_col(parseInt(key)).col_index,
      };
    }
  }
});

const clear = ref(0);
const row_clicked = ref(0);
const col_clicked = ref(0);
// available or unavailable
const status = ref("");
// from left to right, colors from smart contract, if no color please fill #ffffff(white)
// const colors = ref({});
const prepared_colors = [
  "#d24430",
  "#da6959",
  "#e58c84",
  "#ebb4ad",
  "#f5d9d6",
  "#4574e6",
  "#688fea",
  "#8da9f2",
  "#b3c3f4",
  "#d4ddfa",
];
// if you want to paint one cell, please change the paint value
const paint = ref({});
const select = (payload) => {
  if (liandian.value) {
    if (liandian_color.value) {
      set_color(
        liandian_color.value,
        payload.row_index,
        payload.col_index,
        "available"
      );
    } else {
      ElMessage({
        message: "Please select a color first",
        type: "warning",
      });
    }
  } else {
    console.log(payload);
    col_clicked.value = payload.col_index;
    row_clicked.value = payload.row_index;
    status.value = payload.status;
  }
};

const liandian_color = ref();

const set_color = (color, row_index, col_index, status) => {
  if (row_index == -1 && col_index == -1) {
    liandian_color.value = color;
    return;
  }
  if (row_index < 1 || col_index < 1) {
    ElMessage({
      message: "Please select a cell first",
      type: "warning",
    });
    return;
  }
  paint.value = { color, row_index, col_index };
};

const liandian = ref(false);
const lian = () => {
  if (liandian.value) {
    // start liandian
    row_clicked.value = -1;
    col_clicked.value = -1;
    ElMessage({
      message: "Please select a color first",
      type: "warning",
    });
  } else {
    // stop liandian
    liandian_color.value = "";
  }
};
</script>

<style scoped>
/* .test {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
/* .test {
  background-image: url("@/assets/test_bg.png");
  background-size: cover;
  top: 0;
  background-position: center top;
} */
/* .test {
  opacity: 50;
} */
.test {
  height: 100vh;
}
.color-rect {
  margin-top: -5vh;
}
</style>

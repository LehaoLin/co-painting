<template>
  <!-- <div class="test"> -->
  <el-row justify="center" style="margin-top: 7vh">
    <!-- <div v-if="row_clicked != 0 && col_clicked != 0"> -->
    <div>
      <span v-for="(color, index) in prepared_colors">
        <el-button
          :style="{ 'background-color': color }"
          @click="set_color(color, row_clicked, col_clicked, status)"
        ></el-button>
      </span>
    </div>
  </el-row>
  <br />
  <el-row justify="center">
    <el-button @click="clear_colors"> Clear </el-button>
  </el-row>
  <br />
  <el-row justify="center">
    <!-- <p>Col:{{ col_clicked }}, Row:{{ row_clicked }} clicked, {{ status }}</p> -->
  </el-row>
  <el-row justify="center">
    <ColorCanvas
      :colors="colors"
      :paint="paint"
      :clear="clear"
      @select="select"
    />
  </el-row>
  <!-- </div> -->
</template>

<script setup>
import ColorCanvas from "./ColorCanvas_new.vue";
import { ref, onMounted } from "vue";
import { useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";

const colors = useStorage("colors", {});
const clear_colors = () => {
  colors.value = {};
  clear.value++;
};

const index_to_row_col = (index) => {
  let col_index = (index + 1) % 60;
  let row_index = (index + 1 - col_index) / 60 + 1;
  return { col_index, row_index };
};

onMounted(() => {
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
  console.log(payload);
  col_clicked.value = payload.col_index;
  row_clicked.value = payload.row_index;
  status.value = payload.status;
};
const set_color = (color, row_index, col_index, status) => {
  if (row_index < 1 || col_index < 1) {
    ElMessage({
      message: "Please select a cell first",
      type: "warning",
    });
    return;
  }
  paint.value = { color, row_index, col_index };
  // }
};
</script>

<style scoped>
.test {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* display: block;
  margin-left: auto;
  margin-right: auto; */
}
</style>

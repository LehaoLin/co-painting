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
    <!-- <p>Col:{{ col_clicked }}, Row:{{ row_clicked }} clicked, {{ status }}</p> -->
  </el-row>
  <el-row justify="center">
    <ColorCanvas :colors="colors" :paint="paint" @select="select" />
  </el-row>
  <!-- </div> -->
</template>

<script setup>
import ColorCanvas from "./ColorCanvas.vue";
import { ref } from "vue";
const row_clicked = ref(0);
const col_clicked = ref(0);
// available or unavailable
const status = ref("");
// from left to right, colors from smart contract, if no color please fill #ffffff(white)
const colors = ref([]);
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
  if (status == "available") {
    paint.value = { color, row_index, col_index };
  }
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

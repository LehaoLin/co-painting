<template>
  <!-- <el-row justify="center" class="piantnew"> -->
  <div class="paint-container">
    <center>
      <ColorCanvas
        :colors="store.colors"
        :paint="store.paint"
        :clear="store.clear"
        @select="select"
        class="paintnew"
      />
      <ColorOp />
    </center>
  </div>
  <!-- </el-row> -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "@/store";
import ColorCanvas from "./ColorCanvas_new.vue";
import ColorOp from "./ColorOp.vue";

const store = useStore();
const select = (payload) => {
  console.log("payload", payload);
  store.have_click_canvas = true;
  store.col_clicked = payload.col_index;
  store.row_clicked = payload.row_index;
  store.status = payload.status;

  if (
    store.colors[
      // (store.row_clicked - 1) * 60 + store.col_clicked - 1
      (store.row_clicked - 1) * 30 + store.col_clicked - 1
    ].localeCompare("#ffffff") == 0
  ) {
    if (store.clicked != 1900) {
      store.colors[store.clicked] = "#ffffff";
      // this.paint = {color: "#ffffff", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
    }
    // store.clicked = (store.row_clicked - 1) * 60 + store.col_clicked - 1;
    store.clicked = (store.row_clicked - 1) * 30 + store.col_clicked - 1;
    store.colors[store.clicked] = "#9E9E9E";
    // this.paint = {color: "#9E9E9E", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
  }
};
</script>

<style scoped>
.paint-container {
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paintnew {
  left: 50%;
}
</style>

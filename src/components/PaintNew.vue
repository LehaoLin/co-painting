<template>
  <div class="paint-container">
    <center class="center-paint">
      <ColorCanvas
        :colors="store.colors"
        :paint="store.paint"
        :clear="store.clear"
        @select="select"
        class="paintnew"
      />
      <ColorOp class="shit" v-if="own_colors.length != 0" />
    </center>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "@/store";
import ColorCanvas from "./ColorCanvas_new.vue";
import ColorOp from "./ColorOp.vue";

const store = useStore();

onMounted(() => {
  check_own();
});

const own_colors = ref([]);

const check_own = async () => {
  let length = await store.check_length();
  for (let tokenid = 2; tokenid <= length; tokenid++) {
    let owner = await store.check_owner(tokenid);
    let temp = {};
    if (owner == store.player_addr) {
      temp.color = await store.get_color(tokenid);
      temp.tokenid = tokenid;
      temp.coordinate = await store.get_coordinate(tokenid);
      own_colors.value.push(temp);
    }
  }
};

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
  margin-top: 4.5vh;
}
.center-paint {
  width: 100vw;
}
</style>

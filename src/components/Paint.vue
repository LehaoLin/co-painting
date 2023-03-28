<template>
  <div
    class="lock"
    v-if="!store.connected || store.paint_right == 0"
    style="background-color: #757575; overflow: hidden"
  >
    <div
      class="fake_canvas mask"
      v-if="!store.connected || store.paint_right == 0"
    >
      <ColorCanvas
        :colors="[]"
        style="
          opacity: 0.2;
          transform: scale(1.8);
          position: relative;
          /* z-index: -3; */
        "
      />
    </div>
  </div>

  <el-row>
    <el-col :span="16">
      <div class="canvas" v-if="store.connected && store.paint_right != 0">
        <ColorCanvas
          :colors="store.colors"
          :paint="store.paint"
          @select="select"
        />
        <div id="app">
          <div class="axis x-axis">
            <span
              v-for="n in 60"
              :style="{ color: n === store.col_clicked ? 'black' : 'white' }"
              >{{ n }}
            </span>
          </div>
          <div class="axis y-axis">
            <span
              v-for="n in 30"
              :style="{
                color: n === 31 - store.row_clicked ? 'black' : 'white',
              }"
              >{{ n }}
            </span>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :span="8">
      <div class="pixelOption" v-if="store.connected && store.paint_right != 0">
        <div class="exchange">
          <el-row
            ><button
              class="color1"
              :style="{
                width: '100px',
                height: '41px',
                'background-color': '#E3E3E3',
                'border-color': '#9D9D9D',
                'border-width': '3px',
                'border-style': 'solid',
                'text-align': 'center',
                display: 'flex',
                'align-items': 'center',
                'font-size': '16px',
              }"
              @click="store.throwAwayColor1"
            >
              {{ store.first_exchange_color }}
            </button>
            <img
              class="exchange_sign"
              style="min-width: 20px"
              src="../assets/exchange.png"
              alt=""
            />
            <button
              class="color2"
              :style="{
                width: '100px',
                height: '41px',
                'background-color': '#E3E3E3',
                'border-color': '#9D9D9D',
                'border-width': '3px',
                'border-style': 'solid',
                'text-align': 'center',
                display: 'flex',
                'align-items': 'center',
                'font-size': '16px',
              }"
              @click="store.throwAwayColor2"
            >
              {{ store.second_exchange_color }}
            </button></el-row
          >
          <el-row>
            <el-button type="info" round v-if="store.first_exchange != 2"
              >Swap Color</el-button
            >
            <el-button
              type="success"
              round
              v-if="store.first_exchange == 2"
              @click="store.exchangeColor"
              >Swap Color</el-button
            >
          </el-row>

          <div>
            <input
              class="address"
              id="addr"
              type="text"
              name="fname"
              placeholder="    Address name"
              style="width: 305px; height: 41px"
            />
          </div>

          <el-button
            type="success"
            round
            v-if="store.paint_right == 3"
            @click="store.transferColor"
            >Transfer Color</el-button
          >
          <el-button type="info" round v-if="store.paint_right != 3"
            >Transfer Color</el-button
          >

          <el-row>
            <h7 class="color3" v-if="store.have_click_canvas"
              >({{ store.col_clicked }}.{{ 31 - store.row_clicked }})</h7
            >
            <h7 class="color3" v-if="!store.have_click_canvas"></h7>
            <el-button
              type="success"
              round
              v-if="store.paint_right == 2"
              @click="store.PaintColor"
              >Paint</el-button
            >
            <el-button type="info" round v-if="store.paint_right != 2"
              >Paint</el-button
            >
          </el-row>

          <h6 class="min_final" style="border-radius: 10px">mint final</h6>

          <el-button
            type="success"
            round
            v-if="store.can_vote"
            @click="store.VoteForFinal"
            >Vote</el-button
          >
          <el-button type="info" round v-if="!store.can_vote">Vote</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ColorCanvas from "./ColorCanvas.vue";
import Web3 from "web3";
import { useStore } from "@/store";
const store = useStore();

const select = (payload) => {
  store.have_click_canvas = true;
  store.col_clicked = payload.col_index;
  store.row_clicked = payload.row_index;
  store.status = payload.status;

  if (
    store.colors[
      (store.row_clicked - 1) * 60 + store.col_clicked - 1
    ].localeCompare("#ffffff") == 0
  ) {
    if (store.clicked != 1900) {
      store.colors[store.clicked] = "#ffffff";
      // this.paint = {color: "#ffffff", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
    }
    store.clicked = (store.row_clicked - 1) * 60 + store.col_clicked - 1;
    store.colors[store.clicked] = "#9E9E9E";
    // this.paint = {color: "#9E9E9E", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
  }
};
</script>

<style scoped>
.lock {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  /* margin-right: auto;
  margin-left: auto; */
  text-align: center;
  align-items: center;
  margin-top: 18vh;
  justify-content: center;
  /* background-color: rgb(255, 255, 255); */
}

.mask {
  background: url("../assets/lock.png") no-repeat center center;
  background-size: 30%;
  mask: url("../assets/lock.png") no-repeat center center;
  mask-size: contain;
}
</style>

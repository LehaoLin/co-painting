<template>
  <div
    class="lock"
    v-if="
      !store.connected ||
      (store.paint_right == 0 && store.own_coordinates.length == 0)
    "
    style="
      background-color: #757575;
      overflow: hidden;
      box-shadow: inset 0px 25px 15px black;
    "
  >
    <div
      class="fake_canvas mask"
      v-if="
        !store.connected ||
        (store.paint_right == 0 && store.own_coordinates.length == 0)
      "
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

  <el-row
    justify="center"
    class="paint-real"
    v-if="
      store.connected &&
      (store.paint_right != 0 || store.own_coordinates.length > 0)
    "
  >
    <el-col :span="15">
      <div
        class="canvas"
        v-if="
          store.connected &&
          (store.paint_right != 0 || store.own_coordinates.length > 0)
        "
      >
        <ColorCanvas
          :colors="store.colors"
          :paint="store.paint"
          :clear="store.clear"
          @select="select"
        />
      </div>
    </el-col>

    <el-col
      :span="5"
      style="
        background-color: black;
        padding: 50px;
        border-radius: 20px;
        height: 100%;
      "
    >
      <div
        class="pixelOption"
        v-if="
          store.connected &&
          (store.paint_right != 0 || store.own_coordinates.length > 0)
        "
      >
        <div class="exchange">
          <el-row
            ><button
              class="color1"
              :style="{
                width: '100px',
                height: '32px',
                'background-color': '#E3E3E3',
                'border-color': '#9D9D9D',
                'border-width': '3px',
                'border-style': 'solid',
                'border-radius': '12px',
                'text-align': 'center',
                display: 'flex',
                'align-items': 'center',
                'font-size': '16px',
                color: 'black',
                'justify-content': 'center',
                width: '40%',
              }"
              @click="store.throwAwayColor1"
            >
              {{ store.first_exchange_color }}
            </button>
            &nbsp;&nbsp;
            <img
              class="exchange_sign"
              style="max-width: 50px; max-height: 32px"
              src="../assets/exchange.png"
              alt=""
            />
            &nbsp;&nbsp;
            <button
              class="color2"
              :style="{
                width: '100px',
                height: '32px',
                'background-color': '#E3E3E3',
                'border-color': '#9D9D9D',
                'border-width': '3px',
                'border-style': 'solid',
                'text-align': 'center',
                display: 'flex',
                'border-radius': '12px',
                'align-items': 'center',
                'font-size': '16px',
                color: 'black',
                'justify-content': 'center',
                width: '40%',
              }"
              @click="store.throwAwayColor2"
            >
              {{ store.second_exchange_color }}
            </button></el-row
          >
          <br />
          <el-row>
            <el-button type="info" round v-if="store.first_exchange != 2"
              >Swap Color</el-button
            >

            <!-- <el-text class="mx-1" type="danger" v-if="store.first_exchange != 2"
              >Warning: you don't have the ownership</el-text
            > -->

            <el-button
              type="success"
              round
              v-if="store.first_exchange == 2"
              @click="store.exchangeColor"
              >Swap Color</el-button
            >
          </el-row>

          <br />
          <br />
          <br />

          <el-row>
            <!-- <input
              class="address"
              id="addr"
              type="text"
              name="fname"
              placeholder="    Address name"
              style="width: 305px; height: 41px"
            /> -->
            <el-input
              v-model="store.friend_addr"
              placeholder="Address Name"
              style="width: 305px"
              textareaStyle="color: black"
              input-style=""
            />
          </el-row>

          <br />

          <el-row>
            <el-button
              type="success"
              round
              v-if="store.paint_right == 3"
              @click="transferColor"
              >Transfer Color</el-button
            >
            <el-button type="info" round v-if="store.paint_right != 3"
              >Transfer Color</el-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <el-text class="mx-1" type="danger" v-if="store.paint_right != 3"
              >Warning: you should <br />
              paint a pixel firstly
            </el-text>
          </el-row>
          <br />
          <br />
          <br />

          <el-row>
            <!-- <h7
              class="color3"
              v-if="store.have_click_canvas"
              style="font-size: 14px"
              >({{ store.col_clicked }}.{{ 31 - store.row_clicked }})</h7
            > -->
            <button
              class="color1"
              v-if="store.have_click_canvas"
              style="
                height: 32px;
                background-color: #e3e3e3;
                border-color: #9d9d9d;
                border-width: 3px;
                border-radius: 12px;
                border-style: solid;
                text-align: center;
                display: flex;
                align-items: center;
                align-self: center;
                justify-content: center;
                font-size: 14px;
                color: black;
                width: 40%;
              "
            >
              ({{ store.col_clicked }}.{{ 31 - store.row_clicked }})
            </button>
            <button
              class="color1"
              v-else
              style="
                height: 32px;
                background-color: #e3e3e3;
                border-color: #9d9d9d;
                border-width: 3px;
                border-radius: 12px;
                border-style: solid;
                text-align: center;
                display: flex;
                align-items: center;
                align-self: center;
                justify-content: center;
                font-size: 14px;
                color: black;
                width: 40%;
              "
            ></button>
          </el-row>
          <br />
          <el-row>
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-text class="mx-1" type="danger" v-if="store.paint_right != 2"
              >Warning: you don't have an <br />undefined pixel to paint
            </el-text>
          </el-row>

          <br />
          <br />
          <br />

          <el-row>
            <button
              class="color1"
              style="
                height: 32px;
                background-color: #e3e3e3;
                border-color: #9d9d9d;
                border-width: 3px;
                border-radius: 12px;
                border-style: solid;
                text-align: center;
                display: flex;
                align-items: center;
                align-self: center;
                justify-content: center;
                font-size: 14px;
                color: black;
                width: 40%;
              "
            >
              Mint Final
            </button>
            <!-- <p type="info" style="background-color: gray">Mint Final</p> -->
          </el-row>

          <br />

          <el-row>
            <el-button
              type="success"
              round
              v-if="store.can_vote"
              @click="store.VoteForFinal"
              >Vote</el-button
            >
            <el-button type="info" round v-if="!store.can_vote">Vote</el-button>

            <!-- <el-text class="mx-1" type="danger" v-if="!store.can_vote"
              >Warning: you still need 10 pixels owner to vote
            </el-text> -->
          </el-row>

          <!-- <el-row>
            <el-button type="success" round @click="store.test_vote1"
              >test1</el-button
            >
          </el-row>
          <el-row>
            <el-button type="success" round @click="store.test_vote2"
              >test2</el-button
            >
          </el-row> -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ColorCanvas from "./ColorCanvas_new.vue";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";

const store = useStore();

const transferColor = () => {
  if (!store.friend_addr) {
    ElMessage({
      message: "You should input the address name.",
      type: "warning",
    });
  } else {
    store.transferColor();
  }
};

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
  height: 90vh;
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
  background-size: 27%;
  mask: url("../assets/lock.png") no-repeat center center;
  mask-size: contain;
}

.paint-real {
  padding-top: 10vh;
  padding-bottom: 10vh;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 0;
  box-shadow: inset 0px 25px 15px #545353;
}
.el-button {
  width: 40%;
}
</style>

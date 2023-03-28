<template>
  <div class="page-one">
    <el-button
      class="bigRedButton"
      type="danger"
      round
      @click="store.connectWallet()"
      v-if="!store.connected"
      disabled
      >Connect Wallet</el-button
    >
    <div class="slogan" v-if="!store.connected">
      <h5>
        <p>
          Slogan: The first web 3.0 co-painting project which you can compete
          with others.
        </p>
        However, a great artwork is the basis of everything!
      </h5>
    </div>
  </div>

  <div class="pixelPick" v-if="store.connected">
    <h7 class="account_title">Your Account</h7>
    <hr
      style="
        width: 855px;
        border-color: #3f3e3e;
        position: absolute;
        left: 39.75px;
        top: 60px;
      "
    />
    <div class="container2">
      <p
        class="color_cube"
        :style="{
          width: '600px',
          height: '100px',
          'overflow-x': 'auto',
          display: 'flex',
          'justify-content': 'center',
        }"
      >
        <span
          v-for="n in store.own_coordinates.length"
          :key="n"
          style="margin-right: 23px"
        >
          <button
            :style="{
              width: '86px',
              height: '80px',
              'background-color': own_colors[n - 1],
            }"
            @click="store.chooseExchangeColor"
          >
            {{ store.own_coordinates[n - 1] }}
          </button>
        </span>
      </p>
    </div>

    <el-row> </el-row>

    <el-row class="wallet-operation">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <p
          class="msg-info"
          v-if="store.paint_right == 2"
          :style="{
            width: '300px',
            height: '30px',
            'background-color': store.paint_color,
          }"
        >
          you have a pixel to paint
        </p>
        <p v-if="store.paint_right == 0 && store.own_colors.length == 0">
          You haven't enter our project!
        </p>
        <p
          v-if="store.paint_right == 3"
          style="
            color: #ff0000;
            font-size: 18px;
            font-family: Arial;
            line-height: 1.2;
            width: 337px;
            height: 56px;
          "
        >
          Please transfer color to others, in order to gain a new undefined
          pixel!
        </p>
      </el-col>
      <el-col :span="8">
        <el-button
          class="divide-button"
          :disabled="!can_divide"
          type="success"
          size="large"
          round
          @click="store.divideForFinal"
          >Divide</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Web3 from "web3";

import { useStore } from "@/store";
const store = useStore();
</script>

<style scoped>
.page-one {
  width: 100%;
  padding-top: 3vh;
}
.bigRedButton {
  border-radius: 50px !important;
  font-size: 34px;
  width: 370px;
  height: 92px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 52vh;
}

.slogan {
  margin-left: auto;
  margin-right: auto;
  padding-top: 2vh;
  text-align: center;
  font-size: 25px;
}

.pixelPick {
  background-color: #ffffff;
  border-color: #71ffa0;
  border-width: 10px;
  border-style: solid;
  border-radius: 50px;
  height: 280px;
  width: 940px;
  position: relative;
  margin-top: 30vh;
  left: 50%;
  transform: translate(-50%, -50%);
}

.account_title {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 22px;
  color: black;
  text-align: center;
  font-size: 25px;
}

.container2 {
  position: relative;
}

.color_cube {
  position: absolute;
  top: 0px;
  transform: translateX(-50%);
}

.wallet-operation {
  text-align: center;
  position: relative;
}
.divide-button {
  /* display: inline-block; */
  position: relative;
  vertical-align: middle;
}

.msg-info {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
</style>

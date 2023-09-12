<template>
  <div class="page-one" v-if="!store.connected">
    <el-button
      class="bigRedButton"
      type="danger"
      round
      @click="connect"
      v-if="!store.connected"
      >连接钱包</el-button
    >
    <div class="slogan" v-if="!store.connected">
      <div>
        <p>请切换网络至Polygon</p>
      </div>
    </div>
    <center class="all-text" v-if="!store.connected">
      <p class="gradient-text">
        共画与非是一个研究向、纯链上、红蓝双色共绘项目
        <br />
        该项目由SeeDao与香港中文大学（深圳）加密社群实验室组织
        <br />
        本项目不会以任何方式向参与者收费，相关参与费用仅有Polygon运行成本gas fee
      </p>
      <!-- <p class="gradient-text">
        该项目由SeeDao与香港中文大学（深圳）加密社群实验室组织
      </p>
      <p class="gradient-text">
        本项目不会以任何方式向参与者收费，相关参与费用仅有Polygon运行成本gas fee
      </p> -->
    </center>
  </div>

  <div class="pixelPick" v-if="store.connected">
    <div class="account_title">
      账户详情<span class="buy_nft">购买像素NFT</span>
    </div>

    <hr
      style="width: 855px; border-color: rgb(219 219 219); position: relative"
    />
    <br />
    <div class="container2">
      <div
        class="color_cube"
        ref="cube"
        :style="{
          width: '100%',
          height: '86px',
          display: 'inline-flex',
          overflow: 'auto',
          position: 'relative',
          'align-items': 'center',
          'justify-content': overflow,
        }"
      >
        <button
          v-for="n in store.own_colors.length"
          :key="n"
          :style="{
            width: '86px',
            height: '86px',
            flex: '0 0 auto',
            'background-color': store.own_colors[n - 1].color,
            'flex-direction': 'row',
            'align-items': 'center',
            'overflow-x': 'auto',
            display: 'flex',
            'justify-content': 'center',
            // margin: 'auto',
            'margin-right': '10px',
            border: `5px solid${
              store.own_colors[n - 1].tokenid in selected
                ? 'black'
                : store.own_colors[n - 1].color
            }`,
          }"
          @click="store.chooseExchangeColor"
        >
          {{
            `(${store.own_colors[n - 1].coordinate.x},${
              store.own_colors[n - 1].coordinate.y
            })`
          }}
          <br />
          <br />
          id: {{ store.own_colors[n - 1].tokenid }}
        </button>
      </div>
    </div>

    <el-row class="wallet-operation">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <p
          class="msg-info"
          v-if="right == '2'"
          :style="{
            width: '300px',
            height: '30px',
            color: 'black',
            'text-align': 'center',
            'line-height': '30px',
            'font-size': '15px',
          }"
        >
          当前账户 拥有绘画权限<br />
          可绘画颜色：<span
            :style="{
              'background-color': wallet_color,
              display: 'inline-block',
              width: '20px',
              height: '20px',
              'border-radius': '50%',
            }"
          ></span>
        </p>
        <p
          v-else-if="right == '3'"
          style="
            color: black;
            font-size: 15px;
            font-family: Arial;
            line-height: 1.2;
            height: 56px;
          "
        >
          当前账户 未拥有绘画权限<br />
          向未参与地址传递颜色<span
            :style="{
              'background-color': wallet_color,
              display: 'inline-block',
              width: '20px',
              height: '20px',
              'border-radius': '50%',
            }"
          ></span
          >重新获得绘画权限
        </p>
        <p v-else style="color: black; font-size: 15px">
          此账户没有绘画权限或分享颜色权限<br />
          加入<a href="https://discord.gg/seedao" target="_blank">Discord</a
          >获得权限
        </p>
      </el-col>
      <!-- <el-col
        :span="8"
        style="
          position: relative;
          vertical-align: middle;
          align-items: center;
          align-self: center;
          justify-content: center;
        "
      >
        <el-button
          class="divide-button"
          :disabled="!store.can_divide"
          type="success"
          size="large"
          round
          @click="store.divideForFinal"
          >Dividen</el-button
        >
      </el-col> -->
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { computedAsync } from "@vueuse/core";

import { useStore } from "@/store";

const store = useStore();

const cube = ref(null);

const coordinate = computed(() => {
  return store.own_coordinates.length;
});

watch(coordinate, (newVal) => {
  rule();
});

const trigger = computed(() => {
  return store.trigger_buffer;
});

watch(trigger, (newVal) => {
  if (newVal == "") {
    check_own();
    rule();
  }
});

onMounted(() => {
  rule();
  check_own();
  rule();
});

const connect = async () => {
  await store.connect_wallet();
  console.log(store.player_addr);
  store.update();
  await check_own();
  rule();
};

const check_own = async () => {
  store.own_colors = [];
  let length = await store.check_length();
  console.log("length", length);
  for (let tokenid = 2; tokenid <= length + 1; tokenid++) {
    let owner = await store.check_owner(tokenid);
    console.log("owner", owner);
    let temp = {};
    if (owner.toLowerCase() == store.player_addr.toLowerCase()) {
      temp.color = await store.get_color(tokenid);
      temp.tokenid = tokenid;
      temp.coordinate = await store.get_coordinate(tokenid);
      console.log("temp", temp);
      store.own_colors.push(temp);
    }
  }
  console.log(store.own_colors);
};

const right = computedAsync(async () => {
  let right = await store.check_right();
  console.log("right", right, typeof right);
  return right;
});

const wallet_color = computedAsync(async () => {
  let color = await store.check_painter();
  console.log("color", color);
  return color;
});

const selected = computed(() => {
  try {
    let temp = [];
    if (store.first_exchange_color != " ") {
      let first_x = parseInt(
        store.first_exchange_color.split(",")[0].split("(")[1]
      );
      let first_y = parseInt(
        store.first_exchange_color.split(",")[1].split(")")[0]
      );
      let token1 = store.own_colors.filter((i) => {
        // console.log(i.coordinate.x);
        if (i.coordinate.x == first_x && i.coordinate.y == first_y) {
          return i;
        }
      })[0].tokenid;
      temp.push(token1);
    }
    if (store.second_exchange_color != " ") {
      let second_x = parseInt(
        store.second_exchange_color.split(",")[0].split("(")[1]
      );
      let second_y = parseInt(
        store.second_exchange_color.split(",")[1].split(")")[0]
      );
      let token2 = store.own_colors.filter((i) => {
        if (i.coordinate.x == second_x && i.coordinate.y == second_y) {
          return i;
        }
      })[0].tokenid;
      temp.push(token2);
    }
    console.log(temp);
    return temp;
  } catch (e) {
    console.log(e);
    return [];
  }
});

const overflow = ref("");
const rule = () => {
  try {
    // get scrollWidth of the cube
    let scrollWidth = cube.value.scrollWidth;
    // get the clientWidth of the cube
    let clientWidth = cube.value.clientWidth;
    if (scrollWidth > clientWidth) {
      overflow.value = "none";
    } else {
      overflow.value = "center";
    }
  } catch {
    console.log("error");
  }
};
</script>

<style scoped>
.page-one {
  width: 100%;
  height: 80vh;
  padding-top: 4vh;
}
.bigRedButton {
  border-radius: 50px !important;
  font-size: 24px;
  width: 220px;
  height: 62px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45vh;
}

.slogan {
  margin-left: auto;
  margin-right: auto;
  padding-top: 0.7vh;
  text-align: center;
  font-size: 14px;
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
  margin-top: 68vh;
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
  width: 50%;
}

.buy_nft {
  margin-left: auto;
  margin-right: auto;
  margin-top: 22px;
  color: #0047ff;
  border-style: solid;
  border-color: #0047ff;
  border-width: 1px;
  text-align: center;
  font-size: 1px;
  position: absolute;
  margin-left: 1vw;
}

.container2 {
  position: relative;
  width: 100%;
  height: 86px;
}

/* .color_cube {
  position: relative;
  top: 0px;
  transform: translateX(-50%);
} */

.wallet-operation {
  margin-top: 10px;
  text-align: center;
  position: relative;
}
.divide-button {
  /* display: inline-block; */
  position: relative;
  width: 150px;
  /* vertical-align: middle;
  align-items: center;
  align-self: center;
  justify-content: center; */
}

.msg-info {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

.gradient-text {
  background: linear-gradient(to right, #ff8181, #aaceff);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 14px;
  line-height: 170%;
}
</style>

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
        <!-- <p>尚未到达开放时间</p> -->
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

    <div style="display: flex; justify-content: center">
      <!-- <el-slider
        v-model="value"
        :max="max"
        @input="inputSlider"
        v-if="overflow == 'none'"
      /> -->
      <hr
        style="width: 855px; border-color: rgb(219 219 219); position: relative"
      />
    </div>

    <br />

    <div class="container2">
      <div
        class="color_cube"
        ref="cube"
        :style="{
          width: '80%',
          height: '86px',
          'padding-left': '10px',
          display: 'inline-flex',
          overflow: 'auto',
          position: 'relative',
          'align-items': 'center',
          'justify-content': overflow,
        }"
      >
        <el-scrollbar ref="scrollbarRef" always="false" @scroll="scroll">
          <div class="scrollbar-flex-content" ref="innerRef" :key="rerenderKey">
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
                'scrollbar-width': 'none',
                '-ms-overflow-style': 'none',
                display: 'flex',
                'justify-content': 'center',
                // margin: 'auto',
                // overflow: 'hidden',
                'margin-right': '10px',
                border: `5px solid ${check_selected(n - 1)}`,
                // border: `5px solid ${
                //   store.own_colors[n - 1].tokenid in selected
                //     ? 'black'
                //     : store.own_colors[n - 1].color
                // }`,
              }"
              @click="chooseExchangeColor($event, n - 1)"
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
        </el-scrollbar>
      </div>
    </div>

    <el-row class="wallet-operation">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <p
          class="msg-info"
          v-if="store.right == '2'"
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
              'background-color': store.wallet_color,
              display: 'inline-block',
              width: '20px',
              height: '20px',
              'border-radius': '50%',
              'line-height': 'inherit',
              'vertical-align': 'middle',
            }"
          ></span>
        </p>
        <p
          v-else-if="store.right == '3'"
          style="
            color: black;
            font-size: 15px;
            font-family: Arial;
            line-height: 1.2;
            height: 56px;
          "
        >
          当前账户 未拥有绘画权限<br />
          向未参与地址传递颜色&nbsp;<span
            :style="{
              'background-color': store.wallet_color,
              display: 'inline-block',
              width: '20px',
              height: '20px',
              'border-radius': '50%',
              'line-height': 'inherit',
              'vertical-align': 'middle',
            }"
          ></span
          >&nbsp;重新获得绘画权限
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
import { ElScrollbar } from "element-plus";

import { useStore } from "@/store";

const store = useStore();

const cube = ref(null);

const owns = computed(() => {
  return store.own_colors.length;
});

watch(owns, (newVal) => {
  rule();
});

const trigger = computed(() => {
  return store.trigger_type;
});

watch(trigger, async (newVal) => {
  if (newVal == "") {
    // await store.check_painter();
    // await store.check_right();
    // await store.check_own();
    await rule();
  }
});

onMounted(() => {
  max.value = innerRef.value?.clientWidth;
  // await store.check_own();
  // await store.check_right();
  // await rule();
});

const connect = async () => {
  await store.connect_wallet();
  console.log(store.player_addr);

  await store.fresh();

  await rule();
};

const rerenderKey = ref(0);

const chooseExchangeColor = (event, index) => {
  rerenderKey.value += 1;
  let cor = `(${store.own_colors[index].coordinate.x},${store.own_colors[index].coordinate.y})`;
  if (cor == store.first_exchange_color) {
    store.first_exchange_color = " ";
    store.first_exchange = 0;
  } else if (cor == store.second_exchange_color) {
    store.second_exchange_color = " ";
    if (store.first_exchange_color.localeCompare(" ") == 0) {
      store.first_exchange = 0;
    } else {
      store.first_exchange = 1;
    }
  } else {
    store.chooseExchangeColor(event);
  }
};

const check_selected = (index) => {
  if (
    store.own_colors[index].tokenid == selected.value[0] ||
    store.own_colors[index].tokenid == selected.value[1]
  ) {
    return "black";
  } else {
    return store.own_colors[index].color;
  }
};

const selected = computed(() => {
  console.log("colors", store.own_colors);
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
    console.log("selected", temp);
    // selected.value = temp;
    return temp;
  } catch (e) {
    console.log(e);
    return [];
  }
});

const overflow = ref("");
const rule = async () => {
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

const max = ref(0);
const value = ref(0);
const innerRef = ref();
const scrollbarRef = ref();

const inputSlider = (value) => {
  scrollbarRef.value.setScrollLeft(value);
};
const scroll = ({ scrollLeft }) => {
  value.value = scrollLeft;
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
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
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  line-height: inherit;
  vertical-align: middle;
  color: #0047ff;
  border-style: solid;
  border-color: #0047ff;
  border-width: 1px;
  text-align: center;
  font-size: 13px;
  position: absolute;
  margin-left: 1vw;
  padding: 3px;
}

.container2 {
  position: relative;
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: center !important;
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

.el-slider {
  width: 80%;
  height: 20px;
}

.scrollbar-flex-content {
  display: flex;
}
</style>

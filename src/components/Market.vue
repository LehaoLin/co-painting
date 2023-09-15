<template>
  <el-row class="back">
    <div>
      <div>
        <el-row justify="center">
          <el-col :span="8">
            <!-- <div v-html="svg"></div> -->
            <ColorCanvas :colors="store.colors" :disabled="true" />
          </el-col>

          <el-col
            :span="8"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
            v-if="owner_is_you && approve == false"
          >
            <el-row>
              <el-button
                type="success"
                @click="approve_market()"
                style="align-self: center; background-color: #58e27f"
                >授权</el-button
              >
              <p
                class="font"
                style="margin-left: 10px; text-align: left; font-size: 10px"
              >
                将画布NFT <br />
                授权给拍卖行
              </p>
            </el-row>
          </el-col>

          <el-col
            :span="8"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
            v-if="owner_is_you && approve == true && state == false"
          >
            <el-row>
              <el-input v-model="input_price" placeholder="Please input" />
              <el-button
                type="success"
                @click="upload_price()"
                style="align-self: center; background-color: #58e27f"
                >上架</el-button
              >
            </el-row>
          </el-col>

          <el-col
            :span="8"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
            v-if="owner_is_you && approve == true && state == true"
          >
            <el-row>
              <el-button
                type="success"
                @click="cancel_listing()"
                style="align-self: center; background-color: #fc5e5e"
                >下架</el-button
              >
              <p
                class="font"
                style="margin-left: 10px; text-align: left; font-size: 10px"
              >
                当前售价: <br />
                {{ price }} MATIC
              </p>
            </el-row>
          </el-col>

          <el-col
            :span="8"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
            v-if="preseller > 0 && owner_is_you == false"
          >
            <el-row>
              <el-button
                type="success"
                @click="benefit()"
                style="
                  align-self: center;
                  background-color: #58e27f;
                  margin-left: 10px;
                "
                >收款</el-button
              >
              <p
                class="font"
                style="margin-left: 10px; text-align: left; font-size: 10px"
              >
                可提取: <br />
                {{ price }} MATIC
              </p>
            </el-row>
          </el-col>

          <el-col
            :span="8"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
            v-if="preseller == 0 && owner_is_you == false"
          >
            <el-row v-if="state">
              <p class="font" style="padding: 10px; padding-left: 0">
                售价：<span style="color: #58e27f; font-size: 30px"
                  >{{ price }} MATIC</span
                >
              </p>
              <!-- <el-button type="success" @click="buy" style="align-self: center"
                >Buy</el-button
              > -->
            </el-row>
            <el-row v-if="!state">
              <p class="font">未上架</p>
            </el-row>
            <el-row>
              <p class="font">拥有者：{{ owner }}</p>
            </el-row>
            <el-row>
              <el-button
                type="success"
                @click="buy_item()"
                style="align-self: center; background-color: #58e27f"
                v-if="state"
                >购买</el-button
              >
              <el-button
                type="success"
                @click="divide_final_art()"
                style="
                  align-self: center;
                  background-color: #58e27f;
                  margin-left: 10px;
                "
                :disabled="!(divide && store.own_colors.length > 0)"
                >分红</el-button
              >

              <p
                class="font"
                style="margin-left: 10px; text-align: left; font-size: 10px"
              >
                合约总余额：{{ balance }} MATIC <br />
                每个像素NFT 每个月只能分红一次
              </p>
            </el-row>
            <!-- <el-row>
              <div class="font">{{ recent_seller }}</div>
            </el-row> -->
          </el-col>
        </el-row>
      </div>
    </div>
  </el-row>

  <el-row class="list" justify="center" style="background-color: white">
    <el-table
      :data="tableData"
      style="width: 80%; background-color: white; margin-top: 3vh"
      class="font"
      table-layout="fixed"
      :header-cell-style="{ background: 'white', color: '#7b7b7b' }"
    >
      <el-table-column prop="price" label="价格" align="center" />
      <el-table-column prop="from" label="卖家" align="center" />
      <el-table-column prop="to" label="买家" align="center" />
      <el-table-column prop="time" label="时间" align="center" />
    </el-table>
  </el-row>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useStore } from "@/store";
import Web3 from "web3";

import ColorCanvas from "./ColorCanvas_new.vue";

import { computedAsync } from "@vueuse/core";

import { ElLoading } from "element-plus";

const store = useStore();

// const identity = ref();
// const shangjia = ref();
// const price = ref();
// const auth = ref();

// const recent_seller = ref();

// const svg = ref();

// const balance = computedAsync(async () => {
//   let output = await store.check_contract_balance();
//   return output;
// });

const balance = ref(0);

const tableData = ref([]);

const check_nft = async () => {
  let output_addr = await store.check_owner(1);
  owner.value = output_addr;
  return output_addr;
};

const approve = ref(false);
const state = ref(false);
const preseller = ref(0);

onMounted(async () => {
  //   await fresh_data();
  store.router = "market";
  console.log(store.player_addr);
  await run();
  await check_sell_list();
  await store.check_own();
});

const owner_is_you = ref(false);

const run = async () => {
  await check_divide();
  let output_addr = await check_nft();
  console.log("output_addr", output_addr.toLowerCase());
  console.log("player_addr", store.player_addr.toLowerCase());
  price.value = await store.check_price();

  if (output_addr.toLowerCase() == store.player_addr.toLowerCase()) {
    approve.value = await store.check_approve_market();
    owner_is_you.value = true;
    console.log("owner_is_you", owner_is_you.value);
    console.log("approve", approve.value);
    if (approve.value) {
      state.value = await store.check_state();
      if (state.value) {
        // 展示下架界面 cancelListing
        price.value = await store.check_price();
      } else {
        // 展示上架界面 upload_price
      }
    } else {
      // 该钱包需要先授权
    }
  } else {
    // 不是拥有者
    preseller.value = await store.check_preseller();
    console.log("preseller", preseller.value);

    if (preseller.value > 0) {
      // 提钱界面
      // benefit
    } else if (preseller.value == 0) {
      // 路人
      state.value = await store.check_state();
      if (state.value) {
        // nft已经上架，则展示购买界面
      } else {
        // 说明nft还没上架，则展示未上架界面
      }
    }
  }
};

const divide = ref(false);
const check_divide = async () => {
  let out = await store.check_dividen();
  let balance_ = await store.check_contract_balance();
  balance.value = balance_ / 10 ** 18;
  if (out) {
    divide.value = true;
  }
};

const approve_market = async () => {
  await store.approve_market();
  await run();
};

const buy_item = async () => {
  await store.buy_item(price.value);
  await run();
};

const divide_final_art = async () => {
  await store.divide_final_art();
  await run();
  let balance_ = await store.check_contract_balance();
  balance.value = balance_ / 10 ** 18;
};

const cancel_listing = async () => {
  await store.cancel_listing();
  await run();
};

const benefit = async () => {
  await store.benefit();
  await run();
};

const input_price = ref("");

const upload_price = async () => {
  await store.upload_price(parseFloat(input_price.value));
  await run();
};

const price = ref(0);
const owner = ref("");

const check_sell_list = async () => {
  let history = await store.check_sell_list();
  tableData.value = [];
  for (let item of history) {
    let date = new Date(parseInt(item.time) * 1000);
    let date_str = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    tableData.value.push({
      from: item.from,
      to: item.to,
      price: `${store.web3.utils.fromWei(item.price, "ether")} MATIC`,
      time: date_str,
    });
  }
  tableData.value.reverse();
};
</script>

<style scoped>
.back {
  background-color: #e9e9e9;

  /* margin-top: 50vh; */
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  align-items: center;
  align-self: center;
  justify-content: center;
  /* border-bottom: 0.1rem solid black; */
  padding-top: 75px;
  padding-bottom: 75px;
  box-shadow: inset 0px 25px 15px #545353;
}
.operation {
  display: block;
  margin-left: auto;
  margin-right: auto;

  text-align: center;
  align-items: center;
  align-self: center;
  justify-content: center;
}

svg {
  background-color: white;
}

.list {
  background-color: #e9e9e9;
  height: 40vh;
}

.font {
  color: #7b7b7b;
}
.el-button {
  box-shadow: 2px 2px 5px gray;
}
</style>

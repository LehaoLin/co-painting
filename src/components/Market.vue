<template>
  <el-row class="back">
    <div v-if="identity == 'buyer'">
      <div v-if="shangjia">
        <el-row justify="center">
          <el-col :span="8">
            <div v-html="svg"></div>
          </el-col>
          <el-col
            :span="4"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
          >
            <el-row>
              <div
                class="font"
                style="padding: 10px; padding-left: 0; font-size: 30px"
              >
                {{ price }} ETH
              </div>
              <el-button type="success" @click="buy" style="align-self: center"
                >Buy</el-button
              >
            </el-row>
            <el-row>
              <div class="font">{{ recent_seller }}</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="8">
            <div v-html="svg"></div>
          </el-col>
          <el-col
            :span="3"
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
          >
            <el-button type="info" disabled style="align-self: center"
              >Buy</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else-if="identity == 'holder'">
      <div v-if="auth">
        <div v-if="shangjia">
          <el-row justify="center">
            <el-col
              style="
                vertical-align: middle;
                justify-content: center;
                align-items: center;
                align-self: center;
              "
            >
              <el-button
                type="success"
                @click="cancel"
                style="align-self: center"
                >Cancel List</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row>
            <el-col
              style="
                vertical-align: middle;
                justify-content: center;
                align-items: center;
                align-self: center;
              "
            >
              <el-input
                v-model="store.uploadPrice"
                placeholder="Price ETH"
                style="width: 305px"
              />
              <el-button type="success" @click="upload_price"
                >Upload Price</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <el-row justify="center">
          <el-col
            style="
              vertical-align: middle;
              justify-content: center;
              align-items: center;
              align-self: center;
            "
          >
            <el-button type="success" @click="approve">Approve</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else-if="identity == 'preseller'" class="operation">
      <el-col
        style="
          vertical-align: middle;
          justify-content: center;
          align-items: center;
          align-self: center;
        "
      >
        <el-button type="success" @click="benefit" style="align-self: center"
          >Benefit</el-button
        >
      </el-col>
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
      <el-table-column prop="from" label="From" align="center" />
      <el-table-column prop="to" label="To" align="center" />
      <el-table-column prop="price" label="Price" align="center" />
      <el-table-column prop="time" label="Time" align="center" />
    </el-table>
  </el-row>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useStore } from "@/store";
import Web3 from "web3";

import { ElLoading } from "element-plus";

const store = useStore();

const identity = ref();
const shangjia = ref();
const price = ref();
const auth = ref();

const recent_seller = ref();

const svg = ref();

const tableData = ref([]);

onMounted(async () => {
  await fresh_data();
});

const fresh_data = async () => {
  store.loadingInstance = ElLoading.service({ fullscreen: true });

  identity.value = await store.identity();
  shangjia.value = await store.shangjia();
  price.value = await store.nft_price();
  auth.value = await store.nft_auth();
  recent_seller.value = await store.check_recent_seller();
  svg.value = await store.check_svg();
  console.log(identity.value, shangjia.value, price.value, auth.value);

  console.log(svg.value);

  let history = await store.get_sell_history();
  tableData.value = [];
  let web3 = new Web3(window.ethereum);
  for (let item of history) {
    let date = new Date(parseInt(item.time) * 1000);
    let date_str = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    tableData.value.push({
      from: item.from,
      to: item.to,
      price: `${web3.utils.fromWei(item.price, "ether")} ETH`,
      time: date_str,
    });
    tableData.value.reverse();
    nextTick(() => {
      // Loading should be closed asynchronously
      store.loadingInstance.close();
    });
  }

  console.log("history", history);
};

const cancel = async () => {
  await store.cancelList();
  await fresh_data();
};

const upload_price = async () => {
  await store.upload_price();
  await fresh_data();
};

const approve = async () => {
  await store.approve_market();
  await fresh_data();
};

const benefit = async () => {
  await store.benefit();
  await fresh_data();
};

const buy = async () => {
  await store.buy(price.value);
  await fresh_data();
};
</script>

<style scoped>
.back {
  background-color: #e9e9e9;

  margin-top: 50vh;
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

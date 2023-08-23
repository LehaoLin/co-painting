<template>
  <div class="container">
    <el-row justify="center">
      <el-col :span="6">
        <el-row justify="center">
          <button
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
              width: '5vw',
            }"
            @click="store.throwAwayColor1"
          >
            {{ store.first_exchange_color }}
          </button>

          <img
            class="exchange_sign"
            style="max-width: 50px; max-height: 32px"
            src="@/assets/exchange.png"
            alt=""
          />

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
              width: '5vw',
            }"
            @click="store.throwAwayColor2"
          >
            {{ store.second_exchange_color }}
          </button></el-row
        >
        <br />
        <el-row justify="center">
          <el-button type="success">互换颜色</el-button>
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger">选择钱包中的两个NFT</el-text>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row justify="center">
          <el-input
            v-model="store.friend_addr"
            placeholder="被传递地址"
            style="width: 100%"
            textareaStyle="color: black"
            input-style=""
          />
        </el-row>
        <br />
        <el-row justify="center">
          <el-button
            type="success"
            v-if="store.paint_right == 3"
            @click="transferColor"
            >传递颜色</el-button
          >
          <el-button type="info" v-if="store.paint_right != 3" disabled
            >传递颜色</el-button
          >
          <br />
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger" v-if="store.paint_right != 3"
            >绘画两次后开启传递功能
          </el-text>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row justify="center">
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
              width: 10vw;
            "
          >
            ({{ store.col_clicked }},{{ 17 - store.row_clicked }})
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
              width: 10vw;
            "
          >
            坐标
          </button>
        </el-row>
        <br />
        <el-row justify="center">
          <el-button
            type="success"
            v-if="store.paint_right == 2 && paint_able == true"
            @click="store.PaintColor"
            >绘画</el-button
          >
          <el-button type="info" v-else disabled>绘画</el-button>
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger" v-if="store.paint_right != 2"
            >选择画布中的空白像素
          </el-text>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row justify="center">
          <el-text class="mx-1" style="font-size: 27px">100/480</el-text>
        </el-row>
        <br />
        <el-row justify="center">
          <el-button type="success" disabled>投票铸造画布NFT</el-button>
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger">超过2/3像素被画后开启</el-text>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

const paint_able = computed(() => {
  if (store.status == "available") {
    return true;
  } else {
    return false;
  }
});

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
.container {
  /* width: 80vw; */
  /* width: 1200px; */
  width: 90%;
  background-image: url("@/assets/op.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 30vh;
  /* width: 70vw; */
  /* width: 80%; */
  display: flex;
  margin-top: 5vh;
}
.el-row {
  margin: auto; /* 自动分配垂直外边距来实现垂直居中 */
  width: 100%;
}
</style>

<template>
  <el-row justify="space-evenly" class="stages">
    <el-col :span="3"></el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-now">
        <!-- <div class="stage-title" style="color: #ff736b">Now</div> -->
        <!-- <el-divider class="divider" style="border-color: #ff736b"></el-divider> -->
        <div class="stage-text" style="color: black">
          <!-- Beta version: <br />Co-painting <br />
          on Sepolia testnet. -->
          在Discord中<br />讨论共绘目标<br />并提交预创作或地址<br />成为两名初始绘画者之一
        </div>
      </div>
    </el-col>
    <el-col
      :span="1"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        justify-content: center;
      "
    >
      <!-- <el-divider
        style="border-width: 15px; border-color: #c8c8c8"
      ></el-divider> -->
    </el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-2">
        <!-- <div class="stage-title" style="color: black">Stage 2</div> -->
        <!-- <el-divider class="divider"></el-divider> -->
        <div style="color: #e9e9e9" class="stage-text">
          以初始绘画者为起点<br />正式开始共绘<br />当320个像素被画(2/3)<br />开启投票铸造画布整体NFT
          <!-- Offical version: <br />Painting and gaming <br />
          on Etherscan. -->
        </div>
      </div>
    </el-col>
    <el-col
      :span="1"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        justify-content: center;
      "
    >
      <!-- <el-divider
        style="border-width: 15px; border-color: #c8c8c8"
      ></el-divider> -->
    </el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-3">
        <!-- <div class="stage-title" style="color: black">Stage 3</div> -->
        <!-- <el-divider class="divider"></el-divider> -->
        <div style="color: #e9e9e9" class="stage-text">
          画布NFT上架拍卖行<br />像素NFT持有者享受分红<br />共绘并不会停止<br />画布的实时变化能够被<br />更新在画布NFT的URI上
          <!-- Please waiting <br />for the dividends. -->
        </div>
      </div>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useElementSize } from "@vueuse/core";

// const dynamicStyle = ref({
//   width: "250px !important",
//   height: "250px !important",
//   "border-radius": "50%",
//   border: "1px solid #ffffff",
//   display: "flex",
//   "flex-direction": "column",
//   "justify-content": "center",
//   "align-items": "center",
//   "text-align": "center",
//   "background-color": "rgba(0, 0, 0, 0.5)",
// });
onMounted(() => {
  // this.dynamicStyle.height = width.value;
});
</script>

<style scoped>
.stage {
  width: 250px !important;
  height: 250px !important;
  /* width: 100%;
  height: 100%; */
  /* max-height: 100%;
  max-width: 100%; */
  border-radius: 50%;
  border: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.stage-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stage-title {
  font-size: 35px;
  font-weight: bold;
}

.divider {
  width: 200px;
  border-width: 3px;
  top: -10px;
}

.stage-now {
  background-color: #ffffff;
  border-color: #ff6a59;
  border-width: 20px;
  box-shadow: 10px 10px 10px #505050;
}

.stage-2 {
  border-color: #2f2f2f;
  border-width: 20px;
  /* background-color: white; */
  box-shadow: 10px 10px 10px #505050;
}

.stage-3 {
  border-color: #2f2f2f;
  border-width: 20px;
  /* background-color: white; */
  box-shadow: 10px 10px 10px #505050;
}
.stages {
  /* margin-top: 5vh; */
  /* background-color: rgb(0, 0, 0, 0.5); */
  /* background-color: #e0e0e0; */
  padding: 30px;
  padding-top: 12vh;
  /* width: 80vw; */
}

.stage-text {
  margin-top: -20px;
  font-size: 14px;
}
</style>

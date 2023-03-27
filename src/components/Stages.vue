<template>
  <!-- <div class="">
    <img src="../assets/stage.jpg" alt="" />
  </div> -->

  <el-row justify="space-evenly" class="stages">
    <el-col :span="2"></el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-now">
        <div class="stage-title" style="color: #ff736b">Now</div>
        <el-divider class="divider" style="border-color: #ff736b"></el-divider>
        <div>
          Test version: <br />Collaborative painting <br />
          on Sepolia testnet.
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
      <el-divider
        style="border-width: 15px; border-color: #c8c8c8"
      ></el-divider>
    </el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-2">
        <div class="stage-title" style="color: black">Stage 2</div>
        <el-divider class="divider"></el-divider>
        <div style="color: black">
          Offical version: <br />Painting and gaming <br />
          on Etherscan.
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
      <el-divider
        style="border-width: 15px; border-color: #c8c8c8"
      ></el-divider>
    </el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-3">
        <div class="stage-title" style="color: black">Stage 3</div>
        <el-divider class="divider"></el-divider>
        <div style="color: black">Please waiting <br />for the dividends.</div>
      </div>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<script setup></script>

<style scoped>
/* .stage {
  width: 100%;
  position: relative;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
} */

.stage {
  width: 280px !important;
  height: 280px !important;
  border-radius: 50%;
  border: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  width: 260px;
  border-width: 3px;
  top: -10px;
}

.stage-now {
  background-color: #434343;
  border-color: #434343;
  border-width: 20px;
}

.stage-2 {
  border-color: #c8c8c8;
  border-width: 20px;
  background-color: white;
}

.stage-3 {
  border-color: #c8c8c8;
  border-width: 20px;
  background-color: white;
}
.stages {
  /* margin-top: 5vh; */
  background-color: rgb(0, 0, 0, 0.5);
  padding: 30px;
}
</style>

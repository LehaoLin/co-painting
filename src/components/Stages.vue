<template>
  <el-row justify="space-evenly" class="stages">
    <el-col :span="2"></el-col>
    <el-col :span="5" class="stage-col">
      <div class="stage stage-now">
        <div class="stage-title" style="color: #ff736b">Now</div>
        <el-divider class="divider" style="border-color: #ff736b"></el-divider>
        <div class="stage-text">
          Test version: <br />Collaborative painting <br />
          on Sepolia testnet.
        </div>
      </div>
    </el-col>
    <el-col
      :span="2"
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
        <div style="color: black" class="stage-text">
          Offical version: <br />Painting and gaming <br />
          on Etherscan.
        </div>
      </div>
    </el-col>
    <el-col
      :span="2"
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
        <div style="color: black" class="stage-text">
          Please waiting <br />for the dividends.
        </div>
      </div>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<script setup></script>

<style scoped>
.stage {
  width: 250px !important;
  height: 250px !important;
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
  width: 200px;
  border-width: 3px;
  top: -10px;
}

.stage-now {
  background-color: #434343;
  border-color: #434343;
  border-width: 20px;
  box-shadow: 10px 5px 10px grey;
}

.stage-2 {
  border-color: #c8c8c8;
  border-width: 20px;
  background-color: white;
  box-shadow: 10px 5px 10px grey;
}

.stage-3 {
  border-color: #c8c8c8;
  border-width: 20px;
  background-color: white;
  box-shadow: 10px 5px 10px grey;
}
.stages {
  /* margin-top: 5vh; */
  /* background-color: rgb(0, 0, 0, 0.5); */
  background-color: #e0e0e0;
  padding: 30px;
  padding-top: 60px;
}

.stage-text {
  margin-top: -20px;
}
</style>

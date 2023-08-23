<template>
  <div class="questions">
    <div style="padding: 20px; border-radius: 40px">
      <el-row justify="center">
        <el-col :span="18" class="text-div">
          <div class="whatText">
            <!-- <h2>What is the "painting together or not" ?</h2> -->
            <center>
              <div style="margin-top: -5px; font-size: 12px">
                <h3>共画与非 概述</h3>
                共画与非是一个研究向、纯链上 (polygon) 的红蓝双色共绘项目。<br />
                该项目将作为SeeDao常驻公共设施存在，期望为大家提供新的社群团建渠道，同时拉入新的小伙伴们。<br />
                <br />
                共绘由两个初始绘画者为起点，不断拉入新的绘画者，共同进行绘画。<br />
                参与者们需要共同合作，在一块30*16的画布上完成像素画。<br />
                每块像素都是一个ERC721的NFT。整体画布是一个动态NFT，每名像素NFT持有者都可以按比例获得画布NFT的售卖分红。<br />
                在这个过程中，大家既可以齐心协力，一心创作来获得整体画布的分红，也可以在二级市场单独售卖像素获取短期利益。<br />
                <br />
                <span style="color: #ff6151">颜色：</span>
                <span style="color: #789dff"
                  >同一参与者在同一时间下只能拥有一种颜色</span
                >。<br />
                颜色共有十种：100%纯度红/蓝，80%纯度红/蓝，60%纯度红/蓝，40%纯度红/蓝，20%纯度红/蓝。<br />
                <br />
                <span style="color: #ff6151">绘画权限：</span
                >参与者可以选择画布上的任意一个<span style="color: #789dff"
                  >空白像素</span
                >用其所<span style="color: #789dff"
                  >拥有的颜色填充（铸造像素NFT）</span
                >。<br />
                <br />
                <span style="color: #ff6151">失去与获得绘画权限：</span
                >每当一名参与者绘画两次像素后，其将<span style="color: #789dff"
                  >失去绘画权限</span
                >，并开放将手中的颜色转移给其他人的功能，<br />
                <span style="color: #ff6151">被转移者</span>将<span
                  style="color: #789dff"
                  >获得绘画权限</span
                >以及<span style="color: #789dff">分享者手中的颜色</span
                >。<br />
                <span style="color: #ff6151">转移者</span>将<span
                  style="color: #789dff"
                  >失去手中的颜色</span
                >，<span style="color: #789dff"
                  >获得新的颜色(原颜色-20%纯度)</span
                >以及<span style="color: #789dff">新的绘画权限</span>。<br />
              </div>
            </center>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store";
import { ref } from "vue";

const version = ref("beta"); // offical beta

const store = useStore();

const readmore = () => {
  window.open(
    "https://admitted-fibre-3dc.notion.site/Painting-Together-or-not-rules-e1c7fdd4b7804784874c7505099fa07f",
    "_blank"
  );
};
</script>

<style scoped>
.questions {
  width: 100%;
  height: 100%;
  position: relative;
  /* background-color: #e0e0e0; */

  padding-top: 23vh;

  /* margin-top: 5vh; */

  /* text-align: center;
  align-items: center;
  justify-content: center; */
  /* padding: 20px */
}

.qa-div {
  /* background-color: #3a3a3a; */
  background-color: #3a3a3a;
  /* opacity: 0.9; */
  display: inline-block;
  vertical-align: middle;
}

.text-container {
  border-radius: 10%;
  background: linear-gradient(
    to right,
    #ff6a59,
    #3e73ff
  ); /* Gradient background */
}

.whatText {
  padding: 20px;
  border-radius: 30px;
  /* background-color: #575958; */
  background-color: #212121;
  opacity: 0.95;
  /* background-color: blue; */
}
.text-div {
  background: linear-gradient(to right, #ff6a59, #3e73ff);
  opacity: 0.95;
  display: inline-block;
  vertical-align: middle;
  /* color: #dddddd; */
  /* padding: 10px; */
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 70px;
  padding-right: 70px;
  line-height: 120%;
  padding: 10px;
  border-radius: 30px;
  /* border-width: 10px; */
  /* border-style: solid; */
}

.qa-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

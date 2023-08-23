<template>
  <!-- <el-row class="footer" ref="el" :style="style_obj"> -->
  <div class="footer">
    <div class="footer-inside">
      <center>
        SeeDao x 香港中文大学，深圳（加密社群实验室）<br />
        联系方式：haowu3@link.cuhk.edu.cn
        <!-- <a
        href="https://hcslab.cuhk.edu.cn/"
        target="_blank"
        style="color: white; text-decoration: none"
        >Human-Crypto Society Laboratory</a
      >
      , The Chinese University of Hong Kong, Shenzhen &nbsp;
      haowu3@link.cuhk.edu.cn -->
      </center>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.footer {
  height: 70px;
  vertical-align: center;
  padding: 0px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  bottom: 0px;
  width: 100%;
  padding-bottom: 0px;
  /* position: fixed; */
  /* background: linear-gradient(to right, #fc5e5e, #4f75d8); */
  background-image: url("@/assets/footer.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
}
.footer-inside {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.55);
}
</style>

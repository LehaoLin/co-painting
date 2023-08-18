<template>
  <Wallet />

  <Paint />
  <div class="big">
    <PageThree style="box-shadow: 0 -20px 15px #545353; z-index: 97" />
    <Stages />
    <Members />
  </div>
</template>

<script setup>
import Wallet from "./Wallet.vue";
import Paint from "./Paint.vue";
import PageThree from "./PageThree.vue";
import Stages from "./Stages.vue";
import Members from "./Members.vue";
</script>

<style scoped>
.big {
  background-image: url("@/assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  /* background: linear-gradient(to right, #df2f23, #4b74e2) !important; */

  /* background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    conic-gradient(from 180deg at 50% 50%, #ec6b6b 0deg, #5f72e4 360deg);
  box-shadow: 6px 10px 6px rgba(0, 0, 0, 0.35); */
  /* opacity: 0.55; Adjust the opacity */
}
</style>

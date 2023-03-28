<template>
  <Wallet />

  <Paint />
  <PageThree
    style="
      box-shadow: 0 -20px 15px #545353;
      z-index: 97;
      background-color: #e0e0e0;
    "
  />
  <Stages style="background-color: #e0e0e0" />
  <Members style="background-color: #e0e0e0" />
</template>

<script setup>
import Wallet from "./Wallet.vue";
import Paint from "./Paint.vue";
import PageThree from "./PageThree.vue";
import Stages from "./Stages.vue";
import Members from "./Members.vue";
</script>

<style scoped></style>

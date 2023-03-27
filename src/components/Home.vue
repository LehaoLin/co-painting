<template>
  <Wallet />
  <Paint style="box-shadow: 0 15px 5px grey; z-index: 100" />
  <PageThree style="box-shadow: 0 15px 5px grey; z-index: 99" />
  <Stages
    style="background-color: #e0e0e0; box-shadow: 0 15px 5px grey; z-index: 98"
  />
  <Members
    style="background-color: #e0e0e0; box-shadow: 0 15px 5px grey; z-index: 97"
  />
</template>

<script setup>
import Wallet from "./Wallet.vue";
import Paint from "./Paint.vue";
import PageThree from "./PageThree.vue";
import Stages from "./Stages.vue";
import Members from "./Members.vue";
</script>

<style scoped></style>

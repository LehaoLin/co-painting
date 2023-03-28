<template>
  <!-- <el-row class="footer" ref="el" :style="style_obj"> -->
  <el-row class="footer" ref="el">
    <div>
      <a
        href="https://hcslab.cuhk.edu.cn/"
        target="_blank"
        style="color: white; text-decoration: none"
        >Human-Crypto Society Laboratory</a
      >
      , The Chinese University of Hong Kong, Shenzhen &nbsp;
      haowu3@link.cuhk.edu.cn
    </div>
  </el-row>
</template>

<script setup>
// import { ref, onMounted, watch, computed } from "vue";
// import { useWindowSize, useElementBounding } from "@vueuse/core";
// import { useStore } from "@/store";
// const store = useStore();

// const el = ref(null);
// const { width, height } = useWindowSize();
// const { top } = useElementBounding(el);

// const style_obj = ref({});
// style_obj.value = {
//   "background-color": "black",
//   height: "5vh",
//   "vertical-align": "center",
//   padding: "auto",
//   display: "flex",
//   "justify-content": "center",
//   "align-items": "center",
// };

// const change = () => {
//   if (top.value + 50 < height.value) {
//     style_obj.value = {
//       "background-color": "black",
//       height: "5vh",
//       "vertical-align": "center",
//       padding: "auto",
//       display: "flex",
//       "justify-content": "center",
//       "align-items": "center",
//       bottom: "0px",
//       width: "100%",
//       position: "fixed",
//     };
//   } else {
//     style_obj.value = {
//       "background-color": "black",
//       height: "5vh",
//       "vertical-align": "center",
//       padding: "auto",
//       display: "flex",
//       "justify-content": "center",
//       "align-items": "center",
//     };
//   }
// };
// const current = computed(() => {
//   return store.router;
// });
// watch(current, (newV, oldV) => {
//   change();
// });
</script>

<style scoped>
.footer {
  background-color: black;
  height: 5vh;
  vertical-align: center;
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  width: 100%;
  position: fixed;
}
</style>

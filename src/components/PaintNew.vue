<template>
  <div class="paint-container">
    <center class="center-paint">
      <ColorCanvas
        :colors="store.colors"
        :paint="store.paint"
        :clear="store.clear"
        @select="select"
        class="paintnew"
      />
      <ColorOp class="shit" v-if="store.connected" />
    </center>
  </div>

  <div class="overlay" id="overlay">
    <div class="message-box" id="message-box">
      <div class="left-section">
        <h2>非经济动机</h2>
        <div>
          <el-button
            :type="store.non_eco == 1 ? 'success' : 'info'"
            class="mech"
            @click="select_non_eco(1)"
            >提升社区内个人声誉</el-button
          >
        </div>
        <div>
          <el-button
            :type="store.non_eco == 2 ? 'success' : 'info'"
            class="mech"
            @click="select_non_eco(2)"
            >促进社区发展</el-button
          >
        </div>
        <div>
          <el-button
            :type="store.non_eco == 3 ? 'success' : 'info'"
            class="mech"
            @click="select_non_eco(3)"
            >享受一起协作</el-button
          >
        </div>
        <div>
          <el-button
            :type="store.non_eco == 4 ? 'success' : 'info'"
            type="info"
            class="mech"
            @click="select_non_eco(4)"
            >享受绘画乐趣</el-button
          >
        </div>
        <div>
          <el-button
            :type="store.non_eco == 5 ? 'success' : 'info'"
            type="info"
            class="mech"
            @click="select_non_eco(5)"
            >享受与其他人博弈</el-button
          >
        </div>
      </div>
      <div class="right-section">
        <h2>经济动机</h2>
        <div>
          <el-button
            :type="store.eco == 1 ? 'success' : 'info'"
            class="mech"
            @click="select_eco(1)"
            >长期收益-分红画布NFT</el-button
          >
        </div>
        <div>
          <el-button
            :type="store.eco == 2 ? 'success' : 'info'"
            class="mech"
            @click="select_eco(2)"
            >短期收益-售卖像素NFT</el-button
          >
        </div>
        <div>
          <el-button
            :type="store.eco == 3 ? 'success' : 'info'"
            class="mech"
            @click="select_eco(3)"
            >收藏-不卖NFT只是收藏</el-button
          >
        </div>
      </div>
      <div class="merge">
        <p style="color: #ff6058">
          请依照您当前的真实想法 从两种动机中各选一样
        </p>
        <el-button type="success" @click="submit()" style="width: 10vw"
          >确认</el-button
        >
        <p style="color: #ffffff">
          该动机数据将完全用于研究 <br />
          请放心 所有的数据都是匿名的 请真实选择
        </p>
      </div>
    </div>
  </div>
  <!-- <button type="success" @click="showMessageBox()">
    Show Custom Message Box
  </button> -->
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "@/store";
import ColorCanvas from "./ColorCanvas_new.vue";
import ColorOp from "./ColorOp.vue";
import { ElMessage } from "element-plus";

const store = useStore();

// const non_eco = ref(0);
// const eco = ref(0);

const select_non_eco = (choice) => {
  // non_eco.value = choice;
  store.non_eco = choice;
};

const select_eco = (choice) => {
  // eco.value = choice;
  store.eco = choice;
};

const motivation = computed(() => {
  return store.motivation;
});

watch(motivation, (newVal, oldVal) => {
  if (motivation) {
    showMessageBox();
  }
});

onMounted(() => {
  store.check_own();
});

const select = (payload) => {
  console.log("payload", payload);
  store.have_click_canvas = true;
  store.col_clicked = payload.col_index;
  store.row_clicked = payload.row_index;
  store.status = payload.status;

  if (
    store.colors[
      // (store.row_clicked - 1) * 60 + store.col_clicked - 1
      (store.row_clicked - 1) * 30 + store.col_clicked - 1
    ].localeCompare("#ffffff") == 0
  ) {
    if (store.clicked != 1900) {
      store.colors[store.clicked] = "#ffffff";
      // this.paint = {color: "#ffffff", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
    }
    // store.clicked = (store.row_clicked - 1) * 60 + store.col_clicked - 1;
    store.clicked = (store.row_clicked - 1) * 30 + store.col_clicked - 1;
    store.colors[store.clicked] = "#9E9E9E";
    // this.paint = {color: "#9E9E9E", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
  }
};

const showMessageBox = () => {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const submit = async () => {
  if (store.non_eco == 0 || store.eco == 0) {
    ElMessage({
      showClose: true,
      message: "请选择动机后点击确认按钮",
      type: "error",
    });
  } else {
    eval(store.trigger_buffer);
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
    store.motivation = false;
    store.trigger_buffer = ``;
    store.non_eco = 0;
    store.eco = 0;
  }
};
</script>

<style scoped>
.paint-container {
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paintnew {
  left: 50%;
  margin-top: 4.5vh;
}
.center-paint {
  width: 100vw;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  justify-content: center;
  align-items: center;
}

/* Styles for the message box content */
.message-box {
  background-color: white;
  /* padding: 20px; */
  border-radius: 30px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */
  /* max-width: 100%; */
  width: 60vw;
  height: 60vh;
  text-align: center;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
}
.left-section {
  /* background-color: #62120a; */
  background-color: rgba(98, 18, 10, 0.8); /* Transparent 50% */
  width: 50%;
  padding: 10px;
  /* border-radius: 30px; */
}

.right-section {
  background-color: rgba(19, 45, 115, 0.8); /* Transparent 50% */
  width: 50%;
  padding: 10px;
  /* border-radius: 30px; */

  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
}

.mech {
  margin-top: 20px;
  width: 15vw;
}

.merge {
  position: fixed;
  padding-top: 100vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

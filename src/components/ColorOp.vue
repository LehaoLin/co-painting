<template>
  <div class="container" v-if="store.right != 0">
    <el-row justify="center">
      <el-col :span="6">
        <el-row justify="center">
          <button
            class="color1"
            :style="{
              width: '100px',
              height: '32px',
              'background-color': '#E3E3E3',
              'border-color': '#9D9D9D',
              'border-width': '3px',
              'border-style': 'solid',
              'border-radius': '12px',
              'text-align': 'center',
              display: 'flex',
              'align-items': 'center',
              'font-size': '16px',
              color: 'black',
              'justify-content': 'center',
              width: '5vw',
            }"
            @click="store.throwAwayColor1"
          >
            {{ store.first_exchange_color }}
          </button>

          <img
            class="exchange_sign"
            style="max-width: 50px; max-height: 32px"
            src="@/assets/exchange.png"
            alt=""
          />

          <button
            class="color2"
            :style="{
              width: '100px',
              height: '32px',
              'background-color': '#E3E3E3',
              'border-color': '#9D9D9D',
              'border-width': '3px',
              'border-style': 'solid',
              'text-align': 'center',
              display: 'flex',
              'border-radius': '12px',
              'align-items': 'center',
              'font-size': '16px',
              color: 'black',
              'justify-content': 'center',
              width: '5vw',
            }"
            @click="store.throwAwayColor2"
          >
            {{ store.second_exchange_color }}
          </button></el-row
        >
        <br />
        <el-row justify="center">
          <el-button
            type="success"
            :disabled="
              store.first_exchange_color == ' ' ||
              store.second_exchange_color == ' '
            "
            @click="swap_color()"
            >互换颜色</el-button
          >
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger">选择钱包中的两个NFT</el-text>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row justify="center">
          <el-input
            v-model="store.friend_addr"
            placeholder="被传递地址"
            style="width: 100%"
            textareaStyle="color: black"
            input-style=""
            :disabled="store.right == 2"
          />
        </el-row>
        <br />
        <el-row justify="center">
          <el-button
            type="success"
            v-if="store.right == 3"
            @click="transferColor"
            >传递颜色</el-button
          >
          <el-button type="info" v-else disabled>传递颜色</el-button>
          <br />
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger" v-if="store.right == 2"
            >绘画两次后开启传递功能
          </el-text>
          <el-text class="mx-1" type="danger" v-else-if="store.right == 3"
            >输入一个未参与地址
          </el-text>
          <el-text class="mx-1" type="danger" v-else>无权限 </el-text>
          <!-- <el-text class="mx-1" type="danger" v-if="other_right == 'already'"
            >该地址已参与
          </el-text>
          <el-text class="mx-1" type="danger" v-else
            >绘画两次后开启传递功能
          </el-text> -->
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row justify="center">
          <!-- <h7
              class="color3"
              v-if="store.have_click_canvas"
              style="font-size: 14px"
              >({{ store.col_clicked }}.{{ 31 - store.row_clicked }})</h7
            > -->
          <button
            class="color1"
            v-if="store.have_click_canvas"
            style="
              height: 32px;
              background-color: #e3e3e3;
              border-color: #9d9d9d;
              border-width: 3px;
              border-radius: 12px;
              border-style: solid;
              text-align: center;
              display: flex;
              align-items: center;
              align-self: center;
              justify-content: center;
              font-size: 14px;
              color: black;
              width: 10vw;
            "
          >
            ({{ store.col_clicked }},{{ 17 - store.row_clicked }})
          </button>
          <button
            class="color1"
            v-else
            style="
              height: 32px;
              background-color: #e3e3e3;
              border-color: #9d9d9d;
              border-width: 3px;
              border-radius: 12px;
              border-style: solid;
              text-align: center;
              display: flex;
              align-items: center;
              align-self: center;
              justify-content: center;
              font-size: 14px;
              color: black;
              width: 10vw;
            "
          >
            坐标
          </button>
        </el-row>
        <br />
        <el-row justify="center">
          <el-button type="success" v-if="store.right == 2" @click="paint()"
            >绘画</el-button
          >
          <el-button type="info" v-else disabled>绘画</el-button>
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger" v-if="store.right == 2"
            >选择画布中的空白像素
          </el-text>
          <el-text class="mx-1" type="danger" v-if="store.right == 3"
            >传递 重新获得绘画权限
          </el-text>
          <el-text
            class="mx-1"
            type="danger"
            v-if="store.right != 2 && store.right != 3"
            >无权限
          </el-text>
          <!-- <el-text class="mx-1" type="danger" v-if="prior == 'already'"
            >该像素刚被抢先了
          </el-text>
          <el-text class="mx-1" type="danger" v-else
            >选择画布中的空白像素
          </el-text> -->
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row justify="center">
          <el-text
            class="mx-1"
            style="font-size: 27px"
            v-if="store.length <= 320"
            >{{ store.length }}/320</el-text
          >
          <el-text
            class="mx-1"
            style="font-size: 27px"
            v-if="store.length > 320 && vote_result == false"
            >{{ vote_num }}/{{ store.length }}</el-text
          >
          <el-text
            class="mx-1"
            style="font-size: 27px"
            v-if="store.length > 320 && vote_result == true"
            >0/0</el-text
          >
        </el-row>
        <br />
        <el-row justify="center">
          <el-button
            type="success"
            :disabled="!(store.own_colors.length > 0 && vote_result == false)"
            @click="vote"
            >投票铸造画布NFT</el-button
          >
        </el-row>
        <br />
        <el-row justify="center">
          <el-text class="mx-1" type="danger" v-if="store.length <= bar"
            >超过2/3像素被画后开启</el-text
          >
          <el-text
            class="mx-1"
            type="danger"
            v-if="store.own_colors.length == 0 && vote_result == false"
            >没有权限</el-text
          >
          <el-text
            class="mx-1"
            type="danger"
            v-if="store.own_colors.length > 0 && vote_result == false"
            >一个像素NFT只能投一次</el-text
          >
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";
import { computedAsync } from "@vueuse/core";

const store = useStore();

// const friend_addr = ref("");

const prior = ref("");

const paint = async () => {
  let color = await store.check_painter();
  store.colors[(store.row_clicked - 1) * 30 + store.col_clicked - 1] = color;

  let x = parseInt(store.col_clicked);
  let y = 17 - parseInt(store.row_clicked);
  let output = store.check_coordinatexy(x, y);
  if (output == 2) {
    await store.update();
    prior.value = "already";
  } else {
    store.motivation = true;
    // store.trigger_buffer = `store.paint(parseInt(store.col_clicked),17 - parseInt(store.row_clicked));`;
    store.trigger_type = "paint";
  }
};

// const right = computedAsync(async () => {
//   let right = await store.check_right();
//   console.log("right", right, typeof right);
//   return right;
// });

const other_right = ref("");

const bar = ref(2);

const check_other_right = async () => {
  let right = await store.contract.methods.right(store.friend_addr).call();
  if (right != 0) {
    other_right.value = "already";
  } else {
    other_right.value = "";
  }
};

const swap_color = async () => {
  let first_x = parseInt(
    store.first_exchange_color.split(",")[0].split("(")[1]
  );
  let second_x = parseInt(
    store.second_exchange_color.split(",")[0].split("(")[1]
  );
  let first_y = parseInt(
    store.first_exchange_color.split(",")[1].split(")")[0]
  );
  let second_y = parseInt(
    store.second_exchange_color.split(",")[1].split(")")[0]
  );
  console.log(first_x, first_x);
  console.log(second_x, second_y);
  let token1 = store.own_colors.filter((i) => {
    // console.log(i.coordinate.x);
    if (i.coordinate.x == first_x && i.coordinate.y == first_y) {
      return i;
    }
  })[0].tokenid;
  let token2 = store.own_colors.filter((i) => {
    if (i.coordinate.x == second_x && i.coordinate.y == second_y) {
      return i;
    }
  })[0].tokenid;
  store.swap_token1id = token1;
  store.swap_token2id = token2;
  //   console.log(token1, token2);
  store.motivation = true;
  // store.trigger_buffer = `store.swap_color(store.swap_token1id, store.swap_token2id);`;
  store.trigger_type = "swap";
};

const transferColor = async () => {
  console.log(store.friend_addr);
  if (!store.friend_addr) {
    ElMessage({
      message: "You should input the address name.",
      type: "warning",
    });
  } else {
    await check_other_right();
    if (other_right.value == "") {
      store.motivation = true;
      // store.trigger_buffer = `store.transfer_color(store.friend_addr);`;
      store.trigger_type = "transfer";
    }
  }
};

// const right = ref();

onMounted(async () => {
  await check_vote();
  // right.value = await store.check_right();
  await store.check_right();
});

const trigger = computed(() => {
  return store.trigger_buffer;
});

watch(trigger, async (newVal, oldVal) => {
  if (newVal == "") {
    // right.value = await store.check_right();
    await store.check_right();
  }
});

// const length = ref(0);
const vote_num = ref(0);
const vote_result = ref(false);

const check_vote = async () => {
  await store.check_length();
  if (store.length > bar.value) {
    vote_result.value = await store.check_vote_result();
    if (vote_result.value == false) {
      // 阶段二
      vote_num.value = await store.check_vote();
    } else {
      // 阶段三
      // 分子分母都改成0
    }
  }
};

const vote = async () => {
  store.motivation = true;
  // store.trigger_buffer = `store.swap_color(store.swap_token1id, store.swap_token2id);`;
  store.trigger_type = "vote";
};

// watch(length, async (newVal, oldVal) => {
//   if (newVal > 320) {
//     let output = await store.check_vote_result();
//   }
// });

const paint_able = computed(() => {
  if (store.status == "available") {
    return true;
  } else {
    return false;
  }
});

const select = (payload) => {
  store.have_click_canvas = true;
  store.col_clicked = payload.col_index;
  store.row_clicked = payload.row_index;
  store.status = payload.status;

  if (
    store.colors[
      (store.row_clicked - 1) * 60 + store.col_clicked - 1
    ].localeCompare("#ffffff") == 0
  ) {
    if (store.clicked != 1900) {
      store.colors[store.clicked] = "#ffffff";
      // this.paint = {color: "#ffffff", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
    }
    store.clicked = (store.row_clicked - 1) * 60 + store.col_clicked - 1;
    store.colors[store.clicked] = "#9E9E9E";
    // this.paint = {color: "#9E9E9E", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
  }
};
</script>

<style scoped>
.container {
  /* width: 80vw; */
  /* width: 1200px; */
  width: 90%;
  background-image: url("@/assets/op.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 30vh;
  /* width: 70vw; */
  /* width: 80%; */
  display: flex;
  margin-top: 5vh;
}
.el-row {
  margin: auto; /* 自动分配垂直外边距来实现垂直居中 */
  width: 100%;
}
</style>

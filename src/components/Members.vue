<template>
  <el-row
    justify="space-around"
    style="padding: 20px; padding-top: 1vh; padding-bottom: 10vh"
  >
    <el-col :span="2"></el-col>
    <el-col :span="3" v-for="member in members" class="member-row">
      <el-card shadow="always" class="member">
        <img :src="member.avatar" alt="Avatar" />
        <h2>{{ member.name }}</h2>
        <h4 class="member-title">{{ member.title }}</h4>

        <span v-if="member.github" style="margin: 10px">
          <a :href="member.github" target="_blank">
            <Github class="icon" />
          </a>
        </span>

        <span v-if="member.twitter" style="margin: 10px">
          <a :href="member.twitter" target="_blank">
            <Twitter class="icon" />
          </a>
        </span>

        <span v-if="member.link" style="margin: 10px">
          <a :href="member.link" target="_blank">
            <Link class="icon" />
          </a>
        </span>
      </el-card>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
import { Github, Twitter, Link } from "@vicons/fa";

import weicai from "@/assets/nft-cw1.jpeg";
import wuhao from "@/assets/nft-wuhao.jpeg";
import zhouzhou from "@/assets/nft-zhouzhou.jpeg";
import xiangyu from "@/assets/xiangyu.jpeg";

const members = ref([]);
members.value = [
  {
    name: "0xWeiCai",
    avatar: weicai,
    title: "Director",
    link: "https://mypage.cuhk.edu.cn/academics/caiwei/",
    twitter: "https://twitter.com/0xWeiCai",
  },
  {
    name: "0xMetahao",
    avatar: wuhao,
    title: "Artist",
    twitter: "https://twitter.com/0xmetahao",
  },
  {
    name: "Lehao Lin",
    avatar: "https://avatars.githubusercontent.com/u/35103106?v=4",
    title: "Developer",
    github: "https://github.com/LehaoLin",
    link: "http://lehao.xyz",
  },
  {
    name: "Xiangyu Xu",
    avatar: xiangyu,
    title: "Developer",
    github: "https://github.com/AlannnXu/Collective-NFT-website",
  },
  {
    name: "0xtovarishch",
    avatar: zhouzhou,
    title: "Artist",
    twitter: "https://twitter.com/c_hongzhou",
  },

  // {
  //   name: "Feng Bro",
  //   avatar:
  //     "https://img0.baidu.com/it/u=1512173499,2368773931&fm=253&fmt=auto&app=138&f=JPEG?w=616&h=500",
  //   title: "This is a short bio for member 3.",
  // },
];
</script>

<style scoped>
.member {
  border-radius: 25px;
  position: relative;
  height: 40vh;
  width: 18vw;
  text-align: center;
  /* background-color: #252528; */
  background-color: #434343;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 9vh;
}
.member-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  max-width: 20px;
}

.member-title {
  color: #ebebf599;
}

.member img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

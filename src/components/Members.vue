<template>
  <el-row justify="space-evenly" style="padding: 20px; padding-top: 40px">
    <el-col :span="6" v-for="member in members" class="member-row">
      <el-card shadow="always" class="member">
        <img :src="member.avatar" alt="Avatar" />
        <h2>{{ member.name }}</h2>
        <h4 class="member-title">{{ member.title }}</h4>

        <span v-if="member.github">
          <a :href="member.github" target="_blank">
            <Github class="icon" />
          </a>
        </span>
        &nbsp;&nbsp;
        <span v-if="member.twitter">
          <a :href="member.twitter" target="_blank">
            <Twitter class="icon" />
          </a>
        </span>
        &nbsp;&nbsp;
        <span v-if="member.link">
          <a :href="member.link" target="_blank">
            <Link class="icon" />
          </a>
        </span>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
import { Github, Twitter, Link } from "@vicons/fa";

const members = ref([]);
members.value = [
  {
    name: "member 1",
    avatar: "https://www.github.com/yyx990803.png",
    title: "Artist",
  },
  {
    name: "member 2",
    avatar: "https://avatars.githubusercontent.com/u/35103106?v=4",
    title: "Developer",
    github: "https://github.com/LehaoLin",
    twitter: "baidu.com",
    link: "lehao.xyz",
  },
  {
    name: "Feng Bro",
    avatar:
      "https://img0.baidu.com/it/u=1512173499,2368773931&fm=253&fmt=auto&app=138&f=JPEG?w=616&h=500",
    title: "This is a short bio for member 3.",
  },
  {
    name: "Yao Bro",
    avatar:
      "https://img2.baidu.com/it/u=2269309494,1842580863&fm=253&fmt=auto&app=138&f=JPG?w=500&h=409",
    title: "This is a short bio for member 4.",
  },
];
</script>

<style scoped>
.member {
  border-radius: 25px;
  position: relative;
  height: 30vh;
  width: 20vw;
  text-align: center;
  background-color: #252528;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
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

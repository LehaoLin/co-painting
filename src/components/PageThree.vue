<template>
  <div class="questions">
    <div style="padding: 20px; border-radius: 40px">
      <el-row justify="center" style="height: 245px">
        <el-col
          :span="6"
          class="qa-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div
            style="
              font-size: 120px;
              font-weight: bold;
              text-shadow: 10px 2px 10px black;
              font-stretch: 30%;
            "
          >
            <span style="color: #ed7170">W</span
            ><span style="color: #262727">HAT</span>
          </div>
          <!-- <img
            style="max-width: 100%"
            width="350"
            src="../assets/what.png"
            alt=""
          /> -->
        </el-col>
        <el-col
          :span="12"
          class="text-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div class="whatText">
            <h2>What is the "painting together or not" ?</h2>
            <div style="margin-top: -5px; font-size: 15px">
              "Painting Together or Not" is a Web3 co-painting project on a
              60x30 canvas. Our goal is to fully decentralize the creation
              process and empower all participants to paint freely. All creative
              activities are executed on the smart contract, ensuring complete
              transparency and immutability. <br /><br />Additionally,
              cooperation is not mandatory - participants are free to pursue
              their own goals and interests. However, we believe that a great
              artwork is the foundation of both individual and collective
              success.
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row justify="center" style="height: 245px">
        <el-col
          :span="6"
          class="qa-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div
            class="And"
            style="
              font-size: 120px;
              font-weight: bold;
              text-shadow: 10px 2px 10px black;
            "
          >
            <span style="color: #262727">AND</span>
          </div>
          <!-- <img
              style="max-width: 100%"
              width="350"
              src="../assets/And.png"
              alt=""
            /> -->
        </el-col>
        <el-col
          :span="12"
          class="text-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div class="andText">
            <h2>
              How to paint ?
              <el-link
                href="#"
                :underline="false"
                style="text-decoration: underline"
                @click="readmore"
                >Read More</el-link
              >
            </h2>
            <div style="margin-top: -5px; font-size: 15px">
              When you are transferred a color by someone (each person can only
              be transferred to once), it means that you have joined this
              project. You will receive a color from another participant and the
              painting permission from the smart contract, allowing you to
              choose any blank pixel to start painting. Once you have completed
              your painting, you will lose the painting permission and receive a
              pixel NFT. To gain a new painting permission, you need to transfer
              your current color to someone else; otherwise, you will not be
              able to continue painting. Additionally, when you transfer your
              current color, the smart contract will airdrop you a new color
              (current color saturation - 20%). If you have more than two pixel
              NFTs, you can exchange their colors.
            </div>
          </div></el-col
        >
      </el-row>

      <el-row justify="center" style="height: 245px">
        <el-col :span="6" class="qa-div">
          <div
            class="how"
            style="
              font-size: 120px;
              font-weight: bold;

              text-shadow: 10px 2px 10px black;
            "
          >
            <span style="color: #ed7170">H</span
            ><span style="color: #262727">OW</span>
          </div>
        </el-col>
        <el-col :span="12" class="text-div">
          <div class="howText">
            <h2>
              How to gain benefits?
              <el-link
                href="###"
                :underline="false"
                style="text-decoration: underline"
                @click="version = 'official'"
                v-if="version === 'beta'"
                >Switch to: Offical Version</el-link
              >
              <el-link
                href="###"
                :underline="false"
                style="text-decoration: underline"
                @click="version = 'beta'"
                v-if="version === 'official'"
                >Switch to: Beta Version</el-link
              >
            </h2>
            <div
              style="margin-top: -5px; font-size: 15px"
              v-if="version == 'beta'"
            >
              Please note: This version is a beta version, and the currency
              involved should be Sepolia currency. The economic game will be
              reflected in the official version. Beta version benefits: 1.
              Before the official version begins, the address with the most
              pixel NFTs in the beta version and the pre-creation author with
              the most votes in the Discord will be selected as the two initial
              addresses of the official project, and they will receive 100% pure
              color. 2.The participants in the beta version will receive a
              Discord title, which represents their reputation in the project.
              Having this title also increases their trustworthiness and makes
              them more likely to be transferred colors.
            </div>
            <div
              style="margin-top: -5px; font-size: 15px"
              v-if="version == 'official'"
            >
              When you paint a pixel, you will gain a fixed pixel NFT (including
              color and coordinates) which you can sell on Opensea, and no one
              can paint the same position again. It means that each coordinate
              is unique, and their value has a strong relationship with their
              position and color. When you transfer the color, the rarity of the
              color will decrease, and the pixel that you paint with this color
              is likely to decrease in value. You can sell your own fixed pixel
              NFT (not color) on the secondary market whenever you want. The
              final artwork will be sold on the auction house, and the number of
              pixel NFTs you own will determine your dividend.
            </div>
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
  background-color: #e0e0e0;

  padding-top: 50px;

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

.text-div {
  background-color: #575958;
  /* opacity: 0.95; */
  display: inline-block;
  vertical-align: middle;
  color: #dddddd;
  /* padding: 10px; */
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 70px;
  padding-right: 70px;
  line-height: 120%;
}

.qa-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

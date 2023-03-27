<template>
  <div class="questions">
    <div style="padding: 20px">
      <el-row justify="center">
        <el-col
          :span="6"
          class="qa-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <img
            style="max-width: 100%"
            width="350"
            src="../assets/what.png"
            alt=""
          />
        </el-col>
        <el-col
          :span="12"
          class="text-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div class="whatText">
            <h3>What is the "painting together or not" ?</h3>
            <h6>
              "Painting Together or Not" is a Web3 co-painting project on a
              60x30 canvas. Our goal is to fully decentralize the creation
              process and empower all participants to paint freely. All creative
              activities are executed on the smart contract, ensuring complete
              transparency and immutability. Additionally, cooperation is not
              mandatory - participants are free to pursue their own goals and
              interests. However, we believe that a great artwork is the
              foundation of both individual and collective success.
            </h6>
          </div>
        </el-col>
      </el-row>

      <el-row justify="center">
        <el-col
          :span="6"
          class="qa-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div class="And">
            <img
              style="max-width: 100%"
              width="350"
              src="../assets/And.png"
              alt=""
            />
          </div>
        </el-col>
        <el-col
          :span="12"
          class="text-div"
          style="border-bottom: 0.1rem solid grey"
        >
          <div class="andText">
            <h3>
              How to paint ?
              <el-link
                href="#"
                :underline="false"
                style="text-decoration: underline"
                @click="store.router = 'about'"
                >Read More</el-link
              >
            </h3>
            <h6>
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
            </h6>
          </div></el-col
        >
      </el-row>

      <el-row justify="center">
        <el-col :span="6" class="qa-div">
          <div class="how">
            <img
              style="max-width: 100%"
              width="350"
              src="../assets/how.png"
              alt=""
            />
          </div>
        </el-col>
        <el-col :span="12" class="text-div">
          <div class="howText">
            <h3>How to gain benefits</h3>
            <h6>
              Please note: This version is a test version, and the currency
              involved should be Sepolia currency. The economic game will be
              reflected in the official version. Test version benefits: 1.
              Before the official version begins, the address with the most
              pixel NFTs in the test version and the pre-creation author with
              the most votes in the Discord will be selected as the two initial
              addresses of the official project, and they will receive 100% pure
              color. 2.The participants in the beta version will receive a
              Discord title, which represents their reputation in the project.
              Having this title also increases their trustworthiness and makes
              them more likely to be transferred colors.
            </h6>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store";
const store = useStore();
</script>

<style scoped>
.questions {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #e0e0e0;
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
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
}

.qa-div {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .what {
  background-color: #3a3a3a;
}

.And {
  background-color: #3a3a3a;
}

.how {
  background-color: #3a3a3a;
}

.whatText {
  background-color: #575958;
}

.andText {
  background-color: #575958;
}

.howText {
  background-color: #575958;
} */

/* .howText {
  position: absolute;
  left: 34.7%;
  top: 280.2%;
  text-align: center;
  width: 1000px;
  height: 275px;
  background-color: #575958;
}
.andText {
  position: absolute;
  left: 34.7%;
  top: 250.1%;
  text-align: center;
  width: 1000px;
  height: 275px;
  background-color: #575958;
}

.whatText {
  position: absolute;
  left: 34.7%;
  top: 220%;
  text-align: center;
  width: 1000px;
  height: 275px;
  background-color: #575958;
}
.what {
  position: absolute;
  left: 5%;
  top: 220%;
  text-align: center;
  width: 501px;
  height: 275px;
  background-color: #3a3a3a;
}

.And {
  position: absolute;
  left: 5%;
  top: 250.1%;
  text-align: center;
  width: 501px;
  height: 275px;
  background-color: #3a3a3a;
}

.how {
  position: absolute;
  left: 5%;
  top: 280.2%;
  text-align: center;
  width: 501px;
  height: 275px;
  background-color: #3a3a3a;
} */
</style>

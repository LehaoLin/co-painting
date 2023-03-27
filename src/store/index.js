import { defineStore } from "pinia";
import { abi as abi_painting } from "../abi/0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A.js";
// import { abi as abi_market } from "../abi/0x0B4a0ce14E4efe231d4CbC61c3c7f1adcC4a29c0.js";
import { abi as abi_market } from "../abi/0xff454A4eD8AC80F97F044422D8E1606d6Bb3441C.js";
import Web3 from "web3";

const contractAddress_painting = "0xcC1f506eF82BeF6B6A75422b5614dfE5EA205709";
const contractAddress_market = "0xa27215a1e367484ABC5Ab6A216C9e016A9524Fed";

export const useStore = defineStore("store", {
  state: () => ({
    first_exchange: 0,
    first_exchange_color: " ",
    second_exchange_color: " ",
    connected: false,
    paint_right: 0,
    contractResult: "0",
    tokenid: "0",
    exchange_color_1: 0,
    exchange_color_2: 0,
    row_clicked: 0,
    col_clicked: 0,
    clicked: 1900,
    status: "",
    colors: [],
    prepared_colors: [
      "#d24430",
      "#da6959",
      "#e58c84",
      "#ebb4ad",
      "#f5d9d6",
      "#4574e6",
      "#688fea",
      "#8da9f2",
      "#b3c3f4",
      "#d4ddfa",
    ],
    paint: {},
    own_colors: [],
    own_coordinates: [],
    paint_color: "0",
    can_vote: false,
    can_divide: false,
    friend_addr: " ",
    have_click_canvas: false,

    router: "home", // home, about, game
  }),
  getters: {},
  actions: {
    async connectWallet() {
      this.own_colors = [];
      this.own_coordinates = [];
      let ethereum = window.ethereum;
      if (ethereum) {
        ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
          this.connected = true;
          console.log("当前钱包地址:" + res[0]);
        });
      }
      let web3 = new Web3(window.ethereum);
      // let contractAddress_painting =
      //   "0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A";

      // let contractAddress_market = "0xff454A4eD8AC80F97F044422D8E1606d6Bb3441C";

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );

      let contract_market = new web3.eth.Contract(
        abi_market,
        contractAddress_market
      );

      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string

      //   contract.methods.register().send({from: player_addr});
      const color_convert = new Map();
      color_convert.set("R100", "#d24430");
      color_convert.set("R80", "#da6959");
      color_convert.set("R60", "#e58c84");
      color_convert.set("R40", "#ebb4ad");
      color_convert.set("R20", "#f5d9d6");
      color_convert.set("B100", "#4574e6");
      color_convert.set("B80", "#688fea");
      color_convert.set("B60", "#8da9f2");
      color_convert.set("B40", "#b3c3f4");
      color_convert.set("B20", "#d4ddfa");
      for (var i = 0; i < 60; i++) {
        for (var j = 0; j < 30; j++) {
          this.colors.push("#ffffff");
        }
      }
      let result = await contract.methods.right(player_addr).call();
      this.paint_right = result;
      console.log("paint_right: ", this.paint_right);
      if (this.paint_right == 2) {
        result = await contract.methods.redcolor(player_addr).call();
        if (result != 0) {
          this.paint_color = color_convert.get("R" + result.toString());
        } else {
          result = await contract.methods.bluecolor(player_addr).call();
          this.paint_color = color_convert.get("B" + result.toString());
        }
        console.log("paint_color: ", this.paint_color);
      }
      result = await contract_market.methods.checkdividen().call();
      this.can_divide = result;
      console.log("can_divide: ", this.can_divide);
      result = await contract.methods.checkownerfirst().call();
      this.tokenid = result;
      console.log("tokenid: ", this.tokenid);
      result = await contract.methods.checkdividen().call();
      if (result >= 2) {
        //1279
        this.can_vote = true;
        console.log("can_vote: ", this.can_vote);
      }
      for (var i = 2; i <= this.tokenid; i++) {
        console.log("tokenid in the loop: ", this.tokenid);
        result = await contract.methods.checkowner(i).call();
        console.log("owner: ", result);
        console.log("player_address: ", player_addr);
        let result_color = await contract.methods.getcolor(i).call();
        let result_coor = await contract.methods.getcoordinate(i).call();
        let mes = result_coor.split("_");
        if (result_color.substr(2, 1).localeCompare("1") == 0) {
          this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] =
            color_convert.get(result_color.substr(1, 4)); // R100 B100
        } else {
          this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] =
            color_convert.get(result_color.substr(1, 3));
        }
        console.log("colors: ", this.colors);

        if (result.toLowerCase().localeCompare(player_addr) == 0) {
          console.log("sds:", result);
          console.log("sse:", player_addr);
          if (result_color.substr(2, 1).localeCompare("1") == 0) {
            this.own_colors.push(color_convert.get(result_color.substr(1, 4))); // R100 B100
          } else {
            this.own_colors.push(color_convert.get(result_color.substr(1, 3)));
          }
          console.log("own_colors: ", this.own_colors);
          result = "(" + mes[0] + "." + mes[1] + ")";
          this.own_coordinates.push(result);
          console.log("own_coordinates: ", this.own_coordinates);
        }
      }
    },
    async exchangeColor() {
      const color_convert = new Map();
      color_convert.set("R100", "#d24430");
      color_convert.set("R80", "#da6959");
      color_convert.set("R60", "#e58c84");
      color_convert.set("R40", "#ebb4ad");
      color_convert.set("R20", "#f5d9d6");
      color_convert.set("B100", "#4574e6");
      color_convert.set("B80", "#688fea");
      color_convert.set("B60", "#8da9f2");
      color_convert.set("B40", "#b3c3f4");
      color_convert.set("B20", "#d4ddfa");
      let web3 = new Web3(window.ethereum);
      // let contractAddress_painting =
      //   "0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A";
      // const chainId = await ethereum.request({ method: 'eth_chainId' });
      // console.log(chainId);

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );

      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      if (
        this.first_exchange_color.localeCompare(" ") != 0 &&
        this.second_exchange_color.localeCompare(" ") != 0
      ) {
        let result = await contract.methods
          .checktokenId(this.first_exchange_color)
          .call();
        this.exchange_color_1 = result;
        result = await contract.methods
          .checktokenId(this.second_exchange_color)
          .call();
        this.exchange_color_2 = result;

        await contract.methods
          .exchange_color(this.exchange_color_1, this.exchange_color_2)
          .send({ from: player_addr });

        this.own_colors = [];
        this.own_coordinates = [];
        for (var i = 2; i <= this.tokenid; i++) {
          result = await contract.methods.checkowner(i).call();
          let result_color = await contract.methods.getcolor(i).call();
          let result_coor = await contract.methods.getcoordinate(i).call();
          let mes = result_coor.split("_");
          if (result_color.substr(2, 1).localeCompare("1") == 0) {
            this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] =
              color_convert.get(result_color.substr(1, 4)); // R100 B100
          } else {
            this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] =
              color_convert.get(result_color.substr(1, 3));
          }
          console.log("colors: ", this.colors);

          if (result.toLowerCase().localeCompare(player_addr) == 0) {
            if (result_color.substr(2, 1).localeCompare("1") == 0) {
              this.own_colors.push(
                color_convert.get(result_color.substr(1, 4))
              ); // R100 B100
            } else {
              this.own_colors.push(
                color_convert.get(result_color.substr(1, 3))
              );
            }
            console.log("own_colors: ", this.own_colors);
            result = "(" + mes[0] + "." + mes[1] + ")";
            this.own_coordinates.push(result);
            console.log("own_coordinates: ", this.own_coordinates);
          }
        }
      }
    },

    async transferColor() {
      let web3 = new Web3(window.ethereum);
      // let contractAddress_painting =
      //   "0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A";

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      this.friend_addr = document.getElementById("addr").value;
      console.log("addr: ", this.friend_addr);
      var player_addr = await web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      console.log(player_addr);
      await contract.methods
        .transfer_painter(this.friend_addr)
        .send({ from: player_addr });
      this.connectWallet();
    },

    divideForFinal() {
      let web3 = new Web3(window.ethereum);
      // let contractAddress_painting =
      //   "0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A";

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      contract.methods.dividefinalart().send({ from: player_addr });
    },

    async PaintColor() {
      let web3 = new Web3(window.ethereum);
      // let contractAddress_painting =
      //   "0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A";

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      await contract.methods
        .paint(this.col_clicked, 31 - this.row_clicked)
        .send({ from: player_addr });
      this.connectWallet();
    },

    async VoteForFinal() {
      let web3 = new Web3(window.ethereum);
      // let contractAddress_painting =
      //   "0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A";

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );

      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      // await contract.methods.votetomintfinal().send({from: player_addr});
      // await contract.methods.finalSVG().send({from: player_addr});
      // await contract.methods.mint_uri_final().send({from: player_addr});
      await contract.methods.approve_market().send({ from: player_addr });
      let result = await contract.methods.checkowner(1).call();
      console.log("111:", result);
    },

    chooseExchangeColor(event) {
      let buttonText = event.target.innerText;
      console.log("buttonText: ", buttonText);
      if (
        this.first_exchange == 0 &&
        this.second_exchange_color != buttonText
      ) {
        this.first_exchange_color = buttonText;
        if (this.second_exchange_color.localeCompare(" ") == 0) {
          this.first_exchange = 1;
        } else {
          this.first_exchange = 2;
        }
      } else if (
        this.first_exchange == 1 &&
        this.first_exchange_color != buttonText
      ) {
        this.second_exchange_color = buttonText;
        this.first_exchange = 2;
      }
    },

    throwAwayColor1() {
      this.first_exchange_color = " ";
      this.first_exchange = 0;
    },

    throwAwayColor2() {
      this.second_exchange_color = " ";
      if (this.first_exchange_color.localeCompare(" ") == 0) {
        this.first_exchange = 0;
      } else {
        this.first_exchange = 1;
      }
    },
  },
});

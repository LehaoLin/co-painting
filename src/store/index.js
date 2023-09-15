import { defineStore } from "pinia";
import { abi as abi_painting } from "@/abi/paint.js";
import { abi as abi_market } from "@/abi/market.js";
import Web3 from "web3";

import { ElLoading } from "element-plus";

import axios from "axios";

// import WalletConnectProvider from "@maticnetwork/walletconnect-provider";

//real
// const contractAddress_painting = "0x3cf00e16DC4039D2c1Daa295E326524fe9D8650C";
// const contractAddress_market = "0x409E500D725601Ff5402317443C66343F3E6Bf6B";

const contractAddress_painting = "0xE1648546cCD211CFEb3700B18139c5795e6f9D55";
const contractAddress_market = "0x6723E18Ec014A45Ed346c22b05D9acB3cC538bC5";

// const url = "http://localhost:3000"; // test
// const url = "http://8.222.146.181"; // test
const url = "https://api.copainting.art"; // test

const color_mapping = {
  R1: "#d24430",
  R2: "#da6959",
  R3: "#e58c84",
  R4: "#ebb4ad",
  R5: "#f5d9d6",
  B1: "#4574e6",
  B2: "#688fea",
  B3: "#8da9f2",
  B4: "#b3c3f4",
  B5: "#d4ddfa",
};

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const useStore = defineStore("store", {
  state: () => ({
    first_exchange: 0,
    first_exchange_color: " ",
    second_exchange_color: " ",
    connected: false,
    paint_right: 0, // 2: paint, not transfer; 3: transfer, not paint
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
    // own_colors: [],
    own_coordinates: [],
    paint_color: "0",
    can_vote: false,
    can_divide: false,
    friend_addr: "",
    have_click_canvas: false,

    transfer_address_name: "",
    clear: 0,

    router: "home", // home, about, game, market

    uploadPrice: 0,
    loadingInstance: null,

    web3: null,
    contract: null,
    contract_market: null,
    player_addr: "",
    own_colors: [], // [{color, coordinate, tokenid}]
    selected_color: [],

    non_eco: 0,
    eco: 0,
    motivation: false,

    swap_token1id: null,
    swap_token2id: null,

    trigger_buffer: "",
    trigger_type: "",

    right: null,

    wallet_color: null,
    length: null,
  }),
  getters: {},
  actions: {
    // contract
    async fresh() {
      this.check_right();
      this.check_painter();
      this.check_own();
      this.update();
    },

    async init() {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      this.contract_market = new this.web3.eth.Contract(
        abi_market,
        contractAddress_market
      );
      console.log("connected");
    },
    async check_own() {
      this.own_colors = [];
      let length = await this.check_length();
      for (let tokenid = 2; tokenid <= length + 1; tokenid++) {
        let owner = await this.check_owner(tokenid);
        // console.log(owner, this.player_addr, "test");
        let temp = {};
        if (owner.toLowerCase() == this.player_addr.toLowerCase()) {
          temp.color = await this.get_color(tokenid);
          temp.tokenid = tokenid;
          temp.coordinate = await this.get_coordinate(tokenid);
          this.own_colors.push(temp);
        }
      }
    },
    async connect_wallet() {
      let ethereum = window.ethereum;
      if (ethereum) {
        let res = await ethereum.request({ method: "eth_requestAccounts" });
        this.connected = true;
        console.log("当前钱包地址:" + res[0]);
        this.player_addr = res[0].toLowerCase();
      }
    },
    async check_length() {
      let length = await this.contract.methods.checklength().call();
      this.length = length;
      return length;
    },
    async check_owner(tokenid) {
      let owner = await this.contract.methods.checkowner(tokenid).call();
      return owner;
    },
    async get_color(tokenid) {
      let color = await this.contract.methods.getcolor(tokenid).call();
      let color_str = color[1] + color[2];
      return color_mapping[color_str];
    },
    async get_coordinate(tokenid) {
      let coordinate = await this.contract.methods
        .getcoordinate(tokenid)
        .call();
      console.log("coordinate", coordinate);
      let x = parseInt(coordinate.split("-")[0]);
      let y = parseInt(coordinate.split("_")[1]);
      return { x, y };
    },
    async check_right() {
      this.right = await this.contract.methods.right(this.player_addr).call();
    },
    async check_painter() {
      let red = await this.contract.methods.redcolor(this.player_addr).call();
      let blue = await this.contract.methods.bluecolor(this.player_addr).call();
      if (red) {
        if (red == 1) {
          this.wallet_color = "#d24430";
          return "#d24430";
        } else if (red == 2) {
          this.wallet_color = "#da6959";
          return "#da6959";
        } else if (red == 3) {
          this.wallet_color = "#e58c84";
          return "#e58c84";
        } else if (red == 4) {
          this.wallet_color = "#ebb4ad";
          return "#ebb4ad";
        } else if (red == 5) {
          this.wallet_color = "#f5d9d6";
          return "#f5d9d6";
        }
      }
      if (blue) {
        if (blue == 1) {
          this.wallet_color = "#4574e6";
          return "#4574e6";
        } else if (blue == 2) {
          this.wallet_color = "#688fea";
          return "#688fea";
        } else if (blue == 3) {
          this.wallet_color = "#8da9f2";
          return "#8da9f2";
        } else if (blue == 4) {
          this.wallet_color = "#b3c3f4";
          return "#b3c3f4";
        } else if (blue == 5) {
          this.wallet_color = "#d4ddfa";
          return "#d4ddfa";
        }
      }
    },
    async swap_color(token1, token2) {
      let receipt = await this.contract.methods
        .swap_color(token1, token2)
        .send({ from: this.player_addr });
      return receipt;
      if (receipt.status == 1) {
        this.record_motivation("swap");
        this.update();
      }
    },
    async transfer_color(addr) {
      let receipt = await this.contract.methods
        .transfer_painter(addr)
        .send({ from: this.player_addr });
      return receipt;

      // if (receipt.status == 1) {
      //   this.record_motivation("transfer");
      //   this.update();
      // }
    },
    async check_coordinatexy(x, y) {
      let output = await this.contract.methods.checkCoordinatexy(x, y).call();
      return output;
    },
    async paint(x, y) {
      let receipt = await this.contract.methods
        .paint(x, y)
        .send({ from: this.player_addr });
      return receipt;

      // if (receipt.status == 1) {
      //   this.record_motivation("paint");
      //   // await delay(5000);
      //   this.update();
      // }
    },
    async check_vote_result() {
      let result = await this.contract.methods.checkvoteresult().call();
      return result;
    },
    async check_vote() {
      let result = await this.contract.methods
        .checkvote(this.player_addr)
        .call();
      return result;
    },
    async vote_to_mint_final() {
      let receipt = await this.contract.methods
        .votetomintfinal()
        .send({ from: this.player_addr });
      // if (receipt.status == 1) {
      //   this.record_motivation("vote");
      //   this.update();
      // }
    },
    async serve_compare() {
      let output = await this.contract.methods.serve_compare().call();
      return output;
    },

    async check_approve_market() {
      let output = await this.contract_market.methods
        .check_approve_market()
        .call();
      return output;
    },
    async approve_market() {
      let output = await this.contract.methods
        .approve_market()
        .send({ from: this.player_addr });
    },

    async cancel_listing() {
      let output = await this.contract_market.methods
        .cancelListing()
        .send({ from: this.player_addr });
    },
    async upload_price(price) {
      let price_new = price * 10 ** 18;
      let output = await this.contract_market.methods
        .upload_price(BigInt(price_new))
        .send({ from: this.player_addr });
    },
    async check_preseller() {
      let output = await this.contract_market.methods
        .checkpreseller(this.player_addr)
        .call();
      return output;
    },
    async benefit() {
      let output = await this.contract_market.methods
        .benefit()
        .send({ from: this.player_addr });
    },
    async check_state() {
      let output = await this.contract_market.methods.checkstate().call();
      return output;
    },
    async buy_item(price) {
      let new_price = price * 10 ** 18;
      let output = await this.contract_market.methods
        .buyItem()
        .send({ from: this.player_addr, value: new_price });
    },
    async check_dividen() {
      let output = await this.contract_market.methods.checkdividen().call();
      return output;
    },
    async divide_final_art() {
      let output = await this.contract.methods
        .dividefinalart()
        .send({ from: this.player_addr });
    },
    async check_contract_balance() {
      let output = await this.contract.methods.checkcontractbalance().call();
      return output;
    },
    async check_price() {
      let output = await this.contract_market.methods.checkprice().call();
      return output / 10 ** 18;
    },
    async checknum_sell() {
      let output = await this.contract_market.methods.checknum_sell().call();
      return output;
    },
    async check_sell_list() {
      let num = await this.checknum_sell();
      let list = [];
      for (let i = 1; i <= num; i++) {
        let output = await this.contract_market.methods
          .check_selllist(i)
          .call();
        list.push(output);
      }
      return list;
    },
    // server
    async get_canvas() {
      console.log("backend get canvas");
      let res = await axios({
        method: "post",
        url: url + "/canvas",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers required by the API
        },
        responseType: "json",
      });

      console.log("res", res.data, typeof res.data);
      if (res.data) {
        for (let i of res.data) {
          // i[output.tokenid]
          console.log(i);
          this.colors[(16 - i.coordinate.y) * 30 + i.coordinate.x - 1] =
            i.color;
        }
      }
    },
    async update() {
      console.log("backend update");
      let res = await axios({
        method: "post",
        url: url + "/update",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers required by the API
        },
        responseType: "json",
      });
      this.get_canvas();
    },
    async record_motivation(method) {
      let data = {
        adress: this.player_addr,
        eco: store.eco,
        non_eco: store.non_eco,
        method: method,
      };
      let res = axios({
        method: "post",
        url: url + "/motivation",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers required by the API
        },
        responseType: "json",
        data: data,
      });
    },

    async connectWallet() {
      this.loadingInstance = ElLoading.service({ fullscreen: true });
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

      this.contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );

      this.contract_market = new web3.eth.Contract(
        abi_market,
        contractAddress_market
      );

      this.player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string

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
      // for (var i = 0; i < 60; i++) {
      //   for (var j = 0; j < 30; j++) {
      for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 16; j++) {
          this.colors.push("#ffffff");
        }
      }
      let result = await this.contract.methods.right(player_addr).call();
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
      // if (result >= 2) {
      if (result > 1199) {
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
        console.log("mes", mes);
        console.log("result_color", result_color);
        console.log("result_coor", result_coor);
        console.log("result_color.substr(1, 4)", result_color.substr(1, 4));
        if (result_color.substr(2, 1) == "1") {
          this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] =
            color_convert.get(result_color.substr(1, 4)); // R100 B100
        } else {
          this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] =
            color_convert.get(result_color.substr(1, 3));
        }
        console.log("colors: ", this.colors);

        if (result.toLowerCase() == player_addr.toLowerCase()) {
          // if (result.toLowerCase().localeCompare(player_addr) == 0) {
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
      this.clear++;

      await this.loadingInstance.close();
    },
    async exchangeColor() {
      this.loadingInstance = ElLoading.service({ fullscreen: true });

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
          .swap_color(this.exchange_color_1, this.exchange_color_2)
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
        this.clear++;
        this.throwAwayColor1();
        this.throwAwayColor2();
      }
      await this.loadingInstance.close();
    },

    async transferColor() {
      let web3 = new Web3(window.ethereum);

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );

      // this.friend_addr = document.getElementById("addr").value;

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

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      contract.methods.dividefinalart().send({ from: player_addr });
    },

    async PaintColor() {
      let web3 = new Web3(window.ethereum);

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

      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );

      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      // await contract.methods.approve_market().send({ from: player_addr });
      // let result = await contract.methods.checkowner(1).call();

      let result = await contract.methods
        .votetomintfinal()
        .send({ from: player_addr });
      console.log("111:", result);
    },

    async test_vote1() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      let result1 = await contract.methods
        .mint_uri_final()
        .send({ from: player_addr });
      console.log(result1);
    },
    async test_vote2() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string

      let result2 = await contract.methods
        .approve_market()
        .send({ from: player_addr });
      console.log(result2);
    },

    chooseExchangeColor(event) {
      console.log(event.target.innerText.split("id:"));
      let buttonText = event.target.innerText.split("id:")[0].split("\n")[0];
      console.log("buttonText: ", buttonText);
      if (
        this.first_exchange == 0 &&
        this.second_exchange_color != buttonText
      ) {
        this.first_exchange_color = buttonText;
        if (this.second_exchange_color == " ") {
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

    // game auction
    // async identity() {
    //   let web3 = new Web3(window.ethereum);
    //   let contract_paint = new web3.eth.Contract(
    //     abi_painting,
    //     contractAddress_painting
    //   );
    //   let player_addr = await web3.currentProvider.selectedAddress;
    //   let ntf_holder = await contract_paint.methods.checkowner(1).call();

    //   let contract_market = new web3.eth.Contract(
    //     abi_market,
    //     contractAddress_market
    //   );
    //   let ex_holder = await contract_market.methods
    //     .checkpreseller()
    //     .call({ from: player_addr });

    //   if (
    //     player_addr.toLowerCase() != ntf_holder.toLowerCase() &&
    //     ex_holder == 0
    //   ) {
    //     return "buyer";
    //   }
    //   if (player_addr.toLowerCase() == ntf_holder.toLowerCase()) {
    //     return "holder";
    //   }
    //   if (ex_holder > 0) {
    //     return "preseller";
    //   }
    // },
    // async shangjia() {
    //   let web3 = new Web3(window.ethereum);
    //   let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //   // let player_addr = await web3.currentProvider.selectedAddress;
    //   let nft_state = await contract.methods.checkstate().call();
    //   if (nft_state) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // async nft_price() {
    //   let web3 = new Web3(window.ethereum);
    //   let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //   let price = await contract.methods.checkprice().call();
    //   price = web3.utils.fromWei(price, "ether");
    //   return price;
    // },
    // async nft_auth() {
    //   let web3 = new Web3(window.ethereum);
    //   let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //   let auth = await contract.methods.check_approve_market().call();
    //   return auth;
    // },
    // async benefit() {
    //   let web3 = new Web3(window.ethereum);
    //   var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
    //   let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //   await contract.methods.benefit().send({ from: player_addr });
    // },
    // async cancelList() {
    //   let web3 = new Web3(window.ethereum);
    //   var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
    //   let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //   await contract.methods.cancelListing().send({ from: player_addr });
    // },
    // async upload_price() {
    //   let web3 = new Web3(window.ethereum);
    //   var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
    //   let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //   await contract.methods
    //     .upload_price(parseFloat(this.uploadPrice) * 10 ** 18)
    //     .send({ from: player_addr });
    // },
    //   async check_svg() {
    //     let web3 = new Web3(window.ethereum);
    //     // let player_addr = web3.currentProvider.selectedAddress;
    //     let contract = new web3.eth.Contract(
    //       abi_painting,
    //       contractAddress_painting
    //     );
    //     let svg = await contract.methods.checksvg().call();
    //     return svg;
    //   },
    //   async buy(price) {
    //     let web3 = new Web3(window.ethereum);
    //     var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
    //     let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //     await contract.methods.buyItem().send({
    //       from: player_addr,
    //       value: web3.utils.toWei(price, "ether"),
    //     });
    //   },
    //   async check_recent_seller() {
    //     let web3 = new Web3(window.ethereum);
    //     var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
    //     let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //     let address = await contract.methods.checkrecentseller().call();
    //     return address;
    //   },

    //   async auction_open() {
    //     let web3 = new Web3(window.ethereum);
    //     let contract = new web3.eth.Contract(
    //       abi_painting,
    //       contractAddress_painting
    //     );
    //     let result = await contract.methods.checkmarketopen().call();
    //     return result;
    //   },

    //   async get_sell_history() {
    //     let web3 = new Web3(window.ethereum);
    //     let contract = new web3.eth.Contract(abi_market, contractAddress_market);
    //     let num = await contract.methods.checknum_sell().call();
    //     let all_history = [];
    //     for (let i = 1; i <= num; i++) {
    //       let history = await contract.methods.check_selllist(num).call();
    //       all_history.push(history);
    //     }
    //     return all_history;
    //   },
    //   async approve_market() {
    //     let web3 = new Web3(window.ethereum);
    //     let contract = new web3.eth.Contract(
    //       abi_painting,
    //       contractAddress_painting
    //     );
    //     let player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
    //     await contract.methods.approve_market().send({ from: player_addr });
    //   },
  },
});

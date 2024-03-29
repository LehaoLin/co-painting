import { defineStore } from "pinia";
import { abi as abi_painting } from "@/abi/paint.js";
import { abi as abi_market } from "@/abi/market.js";
import Web3 from "web3";

import { ElLoading } from "element-plus";

// import WalletConnectProvider from "@maticnetwork/walletconnect-provider";

//real
// const contractAddress_painting = "0x3cf00e16DC4039D2c1Daa295E326524fe9D8650C";
// const contractAddress_market = "0x409E500D725601Ff5402317443C66343F3E6Bf6B";

const contractAddress_painting = "0xa7036F79d259ea1d17dcc4F720315406c2Ca0b06";
const contractAddress_market = "0xa27215a1e367484ABC5Ab6A216C9e016A9524Fed";

const url = "";

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
    own_colors: [],
    own_coordinates: [],
    paint_color: "0",
    can_vote: false,
    can_divide: false,
    friend_addr: "",
    have_click_canvas: false,

    transfer_address_name: "",
    clear: 0,

    router: "home", // home, about, game

    uploadPrice: 0,
    loadingInstance: null,

    web3: null,
    contract: null,
    contract_market: null,
    player_addr: "",
  }),
  getters: {},
  actions: {
    // contract
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
      // let canvas = await this.get_canvas();
      // if (canvas) {
      //   return canvas;
      // } else {
      //   return;
      // }
    },
    async connect_wallet() {
      if (ethereum) {
        ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
          this.connected = true;
          console.log("当前钱包地址:" + res[0]);
          this.player_addr = res[0];
          this.connected = true;
        });
      }
    },
    async check_length() {
      let length = await this.contract.methods.checklength().call();
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
      let x = parseInt(coordinate.split("-")[0]);
      let y = parseInt(coordinate.split("-")[1]);
      return { x, y };
    },
    async check_right() {
      let right = await this.contract.methods.right(this.player_addr).call();
      return right;
    },
    async check_painter() {
      let red = await this.contract.methods.redcolor(this.player_addr).call();
      let blue = await this.contract.methods.bluecolor(this.player_addr).call();
      if (red) {
        if (red == 1) {
          return "#d24430";
        } else if (red == 2) {
          return "#da6959";
        } else if (red == 3) {
          return "#e58c84";
        } else if (red == 4) {
          return "#ebb4ad";
        } else if (red == 5) {
          return "#f5d9d6";
        }
      }
      if (blue) {
        if (blue == 1) {
          return "#4574e6";
        } else if (blue == 2) {
          return "#688fea";
        } else if (blue == 3) {
          return "#8da9f2";
        } else if (blue == 4) {
          return "#b3c3f4";
        } else if (blue == 5) {
          return "#d4ddfa";
        }
      }
    },
    async swap_color(token1, token2) {
      await this.contract.methods
        .swap_color(token1, token2)
        .send({ from: this.player_addr });
    },
    async transfer_color(addr) {
      await this.contract.methods
        .transfer_painter(addr)
        .send({ from: this.player_addr });
    },
    async check_coordinatexy(x, y) {
      let output = await this.contract.methods
        .checkCoordinatexy(x, y)
        .send({ from: this.player_addr });
      if (output == 2) {
        return "该像素刚被抢先了";
      } else {
        // 动机选择
      }
    },
    async check_vote_result() {
      let result = await this.contract.methods
        .checkvoteresult(this.player_addr)
        .call();
      return result;
    },
    async check_vote() {
      let result = await this.contract.methods
        .checkvote(this.player_addr)
        .call();
      return result;
    },
    async vote_to_mint_final() {
      let output = await this.contract.methods
        .votetomintfinal()
        .send({ from: this.player_addr });
    },
    async serve_compare() {
      let output = await this.contract.methods.serve_compare().call();
      return output;
    },

    async check_approve_market() {
      let output = await this.contract.methods.check_approve_market().call();
      if (output == false) {
        // 需要授权
        await this.approve_market();
      } else {
        // 已授权
      }
    },
    async approve_market() {
      let output = await this.contract.methods
        .approve_market()
        .send({ from: this.player_addr });
    },
    async check_state() {
      let output = await this.contract.methods.checkstate().call();
      if (output) {
      } else {
      }
    },
    async cancel_listing() {
      let output = await this.contract.methods
        .cancelListing()
        .send({ from: this.player_addr });
    },
    async upload_price() {
      let output = await this.contract.methods
        .upload_price()
        .send({ from: this.player_addr });
    },
    async check_preseller() {
      let output = await this.contract.methods.checkpreseller().call();
      if (output) {
        return output;
      } else {
        // 路人
      }
    },
    async benefit() {
      let output = await this.contract.methods
        .benefit()
        .send({ from: this.player_addr });
    },
    async check_state() {
      let output = await this.contract.methods.checkstate().call();
      return output;
    },
    async buy_item() {
      let output = await this.contract.methods
        .buyItem()
        .send({ from: this.player_addr });
    },
    async check_dividen() {
      let output = await this.contract.methods.checkdividen().call();
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
      let output = await this.contract.methods.checkprice().call();
    },
    async check_owner(tokenid) {
      let output = await this.contract.methods.checkowner(tokenid).call();
      return output;
    },
    async checknum_sell() {
      let output = await this.contract.methods.checknum_sell().call();
      return output;
    },
    async check_sell_list() {
      let num = await this.checknum_sell();
      let list = [];
      for (let i = 1; i <= num; i++) {
        let output = await this.contract.methods.check_selllist().call();
        list.push(output);
      }
      return list;
    },
    // server
    async get_canvas() {
      let res = await fetch(url + "/canvas");
      let output = res.json();
      if (output) {
        return false;
      }
      return output;
    },
    async record_motivation() {
      let data = {};
      let res = await fetch(url + "/motivation", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let output = res.json();
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
      let buttonText = event.target.innerText;
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
    async identity() {
      let web3 = new Web3(window.ethereum);
      let contract_paint = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      let player_addr = await web3.currentProvider.selectedAddress;
      let ntf_holder = await contract_paint.methods.checkowner(1).call();

      let contract_market = new web3.eth.Contract(
        abi_market,
        contractAddress_market
      );
      let ex_holder = await contract_market.methods
        .checkpreseller()
        .call({ from: player_addr });

      if (
        player_addr.toLowerCase() != ntf_holder.toLowerCase() &&
        ex_holder == 0
      ) {
        return "buyer";
      }
      if (player_addr.toLowerCase() == ntf_holder.toLowerCase()) {
        return "holder";
      }
      if (ex_holder > 0) {
        return "preseller";
      }
    },
    async shangjia() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      // let player_addr = await web3.currentProvider.selectedAddress;
      let nft_state = await contract.methods.checkstate().call();
      if (nft_state) {
        return true;
      } else {
        return false;
      }
    },
    async nft_price() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      let price = await contract.methods.checkprice().call();
      price = web3.utils.fromWei(price, "ether");
      return price;
    },
    async nft_auth() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      let auth = await contract.methods.check_approve_market().call();
      return auth;
    },
    async benefit() {
      let web3 = new Web3(window.ethereum);
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      await contract.methods.benefit().send({ from: player_addr });
    },
    async cancelList() {
      let web3 = new Web3(window.ethereum);
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      await contract.methods.cancelListing().send({ from: player_addr });
    },
    async upload_price() {
      let web3 = new Web3(window.ethereum);
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      await contract.methods
        .upload_price(parseFloat(this.uploadPrice) * 10 ** 18)
        .send({ from: player_addr });
    },
    async check_svg() {
      let web3 = new Web3(window.ethereum);
      // let player_addr = web3.currentProvider.selectedAddress;
      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      let svg = await contract.methods.checksvg().call();
      return svg;
    },
    async buy(price) {
      let web3 = new Web3(window.ethereum);
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      await contract.methods.buyItem().send({
        from: player_addr,
        value: web3.utils.toWei(price, "ether"),
      });
    },
    async check_recent_seller() {
      let web3 = new Web3(window.ethereum);
      var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      let address = await contract.methods.checkrecentseller().call();
      return address;
    },

    async auction_open() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      let result = await contract.methods.checkmarketopen().call();
      return result;
    },

    async get_sell_history() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(abi_market, contractAddress_market);
      let num = await contract.methods.checknum_sell().call();
      let all_history = [];
      for (let i = 1; i <= num; i++) {
        let history = await contract.methods.check_selllist(num).call();
        all_history.push(history);
      }
      return all_history;
    },
    async approve_market() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(
        abi_painting,
        contractAddress_painting
      );
      let player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
      await contract.methods.approve_market().send({ from: player_addr });
    },
  },
});

<template>
  <center class="canvas-center">
    <div
      id="container_canvas"
      ref="target"
      :style="{
        width: '100%',
        height: '100%',
        transform: `scale(${scale})`,
        'transform-origin': 'center center',
      }"
    ></div>
  </center>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, toRef } from "vue";
import Konva from "konva";
import { onClickOutside } from "@vueuse/core";

import { useWindowSize, useElementSize } from "@vueuse/core";
const { width, height } = useWindowSize();

import { useRoute } from "vue-router";

const route = useRoute();
// console.log(route.path);

console.log(width.value);

const target = ref(null);
// 1220

const size = ref(40);

const scale = computed(() => {
  // return width.value / 2048;
  if (route.path == "/test") {
    // if (width.value < 1800) {
    //   return 0.6;
    // } else {
    return 0.85;
    // }
  } else if (route.path == "/market") {
    size.value = 12;
    return 1;
  } else {
    return 1;
  }
});

watch(width, () => {
  draw();
});

// const scale = () => {
//   console.log(width.value / 2048);
//   // stage.value.scale({
//   //   x: width.value / 2048,
//   //   y: width.value / 2048,
//   // });
//   draw(width.value / 2048);
//   // width_.value /
// };

onClickOutside(target, (event) => {
  if (colors.value[selected_cell.value] == "#808080") {
    colors.value[selected_cell.value] = "#ffffff";
    paint_cell("#ffffff", selected_cell.value);
    selected_cell.value = null;
  }
  try {
    layer_axis.value.destroy();
  } catch {
    console.log("no axis");
  }
});

const props = defineProps({
  colors: Object,
  paint: Object,
  clear: Number,
  disabled: Boolean,
  // fresh: Number,
});

// colors {0-480: color}

const colors = toRef(props, "colors");
const paint = toRef(props, "paint");
const clear = toRef(props, "clear");
const disabled = toRef(props, "disabled");
const emit = defineEmits(["select"]);
const stage = ref();
const layer = ref();
const selected_cell = ref(null);
const selected_cell_color = ref(null);

// const to_index = (row_index, col_index) => {
//   return (row_index - 1) * 60 + col_index - 1;
// };
const to_index = (row_index, col_index) => {
  return (row_index - 1) * 30 + col_index - 1;
};

const draw = () => {
  // create a stage with the specified width and height
  Konva.autoDrawEnabled = false;
  stage.value = new Konva.Stage({
    container: "container_canvas",
    // width: 1220,
    // height: 620,
    width: 30 * size.value + size.value,
    height: 16 * size.value + size.value,
  });
  var uu = 0;
  //   while (uu < 1800) {
  //     if (!colors.value[uu]) {
  //       colors.value.push("#ffffff");
  //     }
  //     uu += 1;
  //   }
  // create a layer to hold the grid
  layer.value = new Konva.Layer();
  // calculate the size of each cell
  // var cellWidth = stage.value.width() / 60;
  // var cellHeight = stage.value.height() / 30;
  var cellWidth = size.value;
  var cellHeight = size.value;

  // loop through each row and column to create the cells
  // for (var row = 0; row < 30; row++) {
  //   for (var col = 0; col < 60; col++) {
  for (var row = 0; row < 16; row++) {
    for (var col = 0; col < 30; col++) {
      // calculate the color index based on the row and column
      var colorIndex = row * 30 + col;
      colors.value[colorIndex] ??= "#ffffff";
      var color = "";
      var color = colors.value[colorIndex];
      //   try {
      //     color = colors.value[colorIndex];
      //   } catch {
      //     color = "#ffffff";
      //   }
      // create a rectangle shape for each cell with the specified color
      var rect = new Konva.Rect({
        x: col * cellWidth,
        y: row * cellHeight,
        width: cellWidth,
        height: cellHeight,
        fill: color,
        stroke: "#838181",
        strokeWidth: 1,
      });

      if (!disabled.value) {
        rect.on("click", async function (evt) {
          let col_index = (this.attrs.x + 40) / 40;
          let row_index = (this.attrs.y + 40) / 40;
          console.log("Cell clicked:", col_index, row_index);
          let temp_color = colors.value[to_index(row_index, col_index)];

          // to recover the color
          if (
            selected_cell_color.value ||
            selected_cell_color.value == "#ffffff"
          ) {
            if (selected_cell.value || selected_cell.value == 0) {
              colors.value[selected_cell.value] = selected_cell_color.value;
              paint_cell(selected_cell_color.value, selected_cell.value);
            }
          }
          var box = evt.target;
          box.fill("gray");
          box.draw();

          if (selected_cell.value || selected_cell.value == 0) {
            console.log(selected_cell.value);
            if (colors.value[selected_cell.value] == "#808080") {
              colors.value[selected_cell.value] = "#ffffff";
              paint_cell("#ffffff", selected_cell.value);
              paint_cell("#808080", to_index(row_index, col_index));
            }
          }
          selected_cell.value = to_index(row_index, col_index);
          colors.value[to_index(row_index, col_index)] = "#808080";

          // console.log("temp_color", temp_color);
          if (temp_color == "#ffffff") {
            // if the color is white
            emit("select", { col_index, row_index, status: "available" });
            selected_cell_color.value = "#ffffff";
          } else {
            // not white
            console.log("-----------------------------");
            console.log(temp_color);
            selected_cell_color.value = temp_color;
            emit("select", { col_index, row_index, status: "unavailable" });
          }
          add_axis(row_index, col_index);
        });

        rect.on("mouseover", function (evt) {
          var box = evt.target;
          box.fill("gray");
          document.body.style.cursor = "pointer";
          box.draw();
        });

        rect.on("mouseout", function (evt) {
          var box = evt.target;
          let col_index = (this.attrs.x + 40) / 40;
          let row_index = (this.attrs.y + 40) / 40;
          let temp_color = colors.value[to_index(row_index, col_index)];
          box.fill(temp_color);
          document.body.style.cursor = "default";
          box.draw();
        });
      }
      // add the rectangle to the layer
      layer.value.add(rect);
    }
  }
  // add the layer to the stage
  stage.value.add(layer.value);
};

const layer_axis = ref(null);

const add_axis = (row_index, col_index) => {
  console.log("!!!<", row_index, col_index);
  // let fake_row_index = 30 - row_index + 1;
  let fake_row_index = 16 - row_index + 1;
  let fake_col_index = col_index;
  // console.log("sdfsd", fake_row_index, fake_col_index);
  // index all from 1
  // add row axis
  // var cellWidth = stage.value.width() / 60;
  // var cellHeight = stage.value.height() / 30;
  // var cellWidth = 20;
  // var cellHeight = 20;
  var cellWidth = 40;
  var cellHeight = 40;

  var colText;
  var rowText;
  if (route.path == "/test") {
    colText = new Konva.Text({
      x: (fake_col_index - 1) * cellWidth + 10,
      y: 16 * cellHeight + 10,
      text: fake_col_index.toString(),
      fontSize: 14,
      fill: "#ffffff",
    });
    rowText = new Konva.Text({
      // x: 60 * cellWidth + 5,
      x: 30 * cellWidth + 10,
      y: (row_index - 1) * cellHeight + 10,
      text: fake_row_index.toString(),
      fontSize: 14,
      fill: "#ffffff",
    });
  } else {
    colText = new Konva.Text({
      x: (fake_col_index - 1) * cellWidth + 10,
      y: 16 * cellHeight + 10,
      text: fake_col_index.toString(),
      fontSize: 14,
      fill: "#000000",
    });
    rowText = new Konva.Text({
      // x: 60 * cellWidth + 5,
      x: 30 * cellWidth + 10,
      y: (row_index - 1) * cellHeight + 10,
      text: fake_row_index.toString(),
      fontSize: 14,
      fill: "#000000",
    });
  }

  try {
    layer_axis.value.destroy();
  } catch {
    console.log("no axis");
  }
  layer_axis.value = new Konva.Layer();
  layer_axis.value.add(rowText);
  layer_axis.value.add(colText);

  stage.value.add(layer_axis.value);
};

// const paint_cell = (color, row_index, col_index) => {
const paint_cell = (color, index) => {
  //   let color = paint.value.color;
  //   let row_index = paint.value.row_index;
  //   let col_index = paint.value.col_index;
  console.log("paint cell", index);
  let cell = layer.value.children[index];
  cell.fill(color);
  cell.draw();
  colors.value[index] = color;
  console.log(colors.value[index]);

  selected_cell_color.value = color;
  selected_cell.value = index;
};

onMounted(() => {
  draw();
});

watch(
  paint,
  (newVal, oldVal) => {
    console.log(newVal);
    if (newVal) {
      paint_cell(newVal.color, to_index(newVal.row_index, newVal.col_index));
    }
  },
  { deep: true }
);

watch(clear, (newVal, oldVal) => {
  console.log("clear", newVal, oldVal);
  if (newVal > 0) {
    draw();
  }
});

// watch(fresh, (newVal, oldVal) => {
//   if (newVal > 0) {
//     draw();
//   }
// });

// watch(
//   colors,
//   (newVal, oldVal) => {
//     if (newVal) {
//       draw();
//     }
//   },
//   { deep: true }
// );
</script>

<style scoped>
.canvas-center {
  /* height: 70vh; */
}
</style>

<template>
  <div id="container_canvas"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, toRef } from "vue";
import Konva from "konva";
const props = defineProps({
  colors: Object,
  paint: Object,
});

// colors {0-1799: color}

const colors = toRef(props, "colors");
const paint = toRef(props, "paint");
const emit = defineEmits(["select"]);
const stage = ref();
const layer = ref();
const selected_cell = ref(null);

const to_index = (row_index, col_index) => {
  return (row_index - 1) * 60 + col_index - 1;
};

const draw = () => {
  // create a stage with the specified width and height
  Konva.autoDrawEnabled = false;
  stage.value = new Konva.Stage({
    container: "container_canvas",
    width: 1200,
    height: 600,
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
  var cellWidth = stage.value.width() / 60;
  var cellHeight = stage.value.height() / 30;
  // loop through each row and column to create the cells
  for (var row = 0; row < 30; row++) {
    for (var col = 0; col < 60; col++) {
      // calculate the color index based on the row and column
      var colorIndex = row * 60 + col;
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
      rect.on("click", async function (evt) {
        let col_index = (this.attrs.x + 20) / 20;
        let row_index = (this.attrs.y + 20) / 20;
        // console.log("Cell clicked:", col_index, row_index);
        let temp_color = colors.value[to_index(row_index, col_index)];
        // if (temp_color == "#ffffff") {
        //   emit("select", { col_index, row_index, status: "available" });
        var box = evt.target;
        box.fill("gray");
        box.draw();
        if (selected_cell.value) {
          console.log(selected_cell.value);
          if (colors.value[selected_cell.value] == "#808080") {
            colors.value[selected_cell.value] = "#ffffff";
            paint_cell("#ffffff", selected_cell.value);
            paint_cell("#808080", to_index(row_index, col_index));
          }
        }
        selected_cell.value = to_index(row_index, col_index);
        colors.value[to_index(row_index, col_index)] = "#808080";
        if (temp_color == "#ffffff") {
          emit("select", { col_index, row_index, status: "available" });
        } else {
          emit("select", { col_index, row_index, status: "unavailable" });
        }
      });
      rect.on("mouseover", function (evt) {
        var box = evt.target;
        box.fill("gray");
        document.body.style.cursor = "pointer";
        box.draw();
      });
      rect.on("mouseout", function (evt) {
        var box = evt.target;
        let col_index = (this.attrs.x + 20) / 20;
        let row_index = (this.attrs.y + 20) / 20;
        let temp_color = colors.value[to_index(row_index, col_index)];
        box.fill(temp_color);
        document.body.style.cursor = "default";
        box.draw();
      });
      // add the rectangle to the layer
      layer.value.add(rect);
    }
  }
  // add the layer to the stage
  stage.value.add(layer.value);
};

// const paint_cell = (color, row_index, col_index) => {
const paint_cell = (color, index) => {
  //   let color = paint.value.color;
  //   let row_index = paint.value.row_index;
  //   let col_index = paint.value.col_index;
  let cell = layer.value.children[index];
  cell.fill(color);
  cell.draw();
  colors.value[index] = color;
};

onMounted(() => {
  draw();
});

watch(
  paint,
  (newVal, oldVal) => {
    if (newVal) {
      paint_cell(newVal.color, to_index(newVal.row_index, newVal.col_index));
    }
  },
  { deep: true }
);
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

<style scoped></style>

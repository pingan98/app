<script lang="ts" name="HorizontalLine" setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import echarts from "@/utils/echartsLib";
import type { ECOption } from "@/utils/echartsLib";

const chartRef = ref<HTMLDivElement>();
let myChart: echarts.ECharts | null = null;

const color = [];

const arr = reactive([
  { name: "汪汪汪", num: 18 },
  { name: "hh", num: 5 },
  { name: "www", num: 4 },
  { name: "aaa", num: 20 }
]);

const getChart = () => {
  myChart = echarts.init(chartRef.value);
  const salvProName = [
    "安",
    "河南省",
    "浙江浙江浙江省",
    "湖北省",
    "贵州省",
    "江西省"
  ];
  const salvProValue = [239, 181, 154, 144, 135, 117];
  //使用 ECOption 规范数据类型
  const option: ECOption = {
    // backgroundColor: "#fff",
    grid: {
      left: "2%",
      right: "2%",
      bottom: "2%",
      top: "2%",
      containLabel: true
    },
    xAxis: {
      show: false,
      type: "value"
    },
    yAxis: [
      {
        axisTick: "none",
        axisLine: "none",
        axisLabel: {
          color: "#333333", // y轴字体颜色
          fontSize: "12"
        },
        data: ["topic5", "topic4", "topic3", "topic2", "topic1"]
      },
      //      右侧上方名称
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          color: "#999999",
          fontSize: "12"
        },
        data: salvProValue
      }
    ],
    series: [
      {
        name: "值",
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "#F4F5F9"
        },
        barWidth: 6,
        itemStyle: {
          borderRadius: 30,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#FEAD1B"
            },
            {
              offset: 1,
              color: "#FFDD87"
            }
          ])
        },
        data: salvProValue
      }
    ]
  };

  option && myChart.setOption(option);

  window.addEventListener("resize", resizeHandler);
};
const resizeHandler = () => {
  myChart?.resize();
};
onMounted(() => {
  getChart();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  myChart?.dispose();
});
</script>
<template>
  <div class="horizontal-line" ref="chartRef"></div>
</template>

<style scoped lang="less">
.horizontal-line {
  width: 100%;
  height: 100%;
}
</style>

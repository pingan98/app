<script lang="ts" name="HorizontalLine" setup>
import { onBeforeUnmount, watch, ref, nextTick } from "vue";
import echarts from "@/utils/echartsLib";
import type { ECOption } from "@/utils/echartsLib";

const props = defineProps({
  bean: {
    type: Array,
    default: () => []
  }
});

const chartRef = ref<HTMLDivElement>();
let myChart: echarts.ECharts | null = null;

const getChart = (xData: Array<string>, yData: Array<number>) => {
  myChart = echarts.init(chartRef.value);

  // const salvProValue = [239, 181, 154, 144, 135, 117];
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
        axisLabel: {
          color: "#333333", // y轴字体颜色
          fontSize: "12"
        },
        data: yData
      },
      //      右侧上方名称
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        show: true,
        axisLabel: {
          color: "#999999",
          fontSize: "12"
        },
        data: xData
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
        data: yData
      }
    ]
  };

  option && myChart.setOption(option);

  window.addEventListener("resize", resizeHandler);
};
const resizeHandler = () => {
  myChart?.resize();
};

watch(
  () => props.bean as [],
  newValue => {
    if (newValue.length) {
      const xData: Array<string> = [];
      const yData: Array<number> = [];

      nextTick(() => {
        newValue.forEach((v: any) => {
          xData.push(v.name);
          yData.push(Number(v.count));
        });
        getChart(xData, yData);
      });
    }
  },
  { immediate: true, deep: true }
);

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

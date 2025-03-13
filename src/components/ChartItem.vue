<script>
import * as CanvasJS from '@canvasjs/vue-charts';
export default {
  data() {
    return {
      options: {
        theme: "light2",
        exportEnabled: true,
        title: {
          text: ""
        },
        axisY: {
          title: "# of reports"
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function (e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: [{
          type: "line",
          name: "This week",
          showInLegend: false,
          color: "#155cfc",
          toolTipContent: "",
          dataPoints: [
            { label: "13", y: 12 },
            { label: "14", y: 33 },
            { label: "15", y: 26 },
            { label: "16", y: 11 },
            { label: "17", y: 25 },
            { label: "18", y: 13 }
          ]
        }, {
          type: "line",
          name: "Last week",
          showInLegend: false,
          color: "#d0d5dc",
          toolTipContent: "",
          dataPoints: [
            { label: "13", y: 24 },
            { label: "14", y: 15 },
            { label: "15", y: 36 },
            { label: "16", y: 11 },
            { label: "17", y: 10 },
            { label: "18", y: 22 }
          ]
        }]
      },
      styleOptions: {
        width: "100%",
        height: "100%"
      }
    }
  }
}
</script>

<template>
  <CanvasJSChart :options="options" :styles="styleOptions" />
</template>

<style>
.canvasjs-chart-credit {
  display: none !important;
}
</style>

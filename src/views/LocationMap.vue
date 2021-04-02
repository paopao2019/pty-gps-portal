<template>
  <div id="container" class="container">
  </div>
</template>

<script>
  import { getStationList } from "@/api/station";  //  此处请自行替换地址
  export default {
    name: "LocationMap",
    data() {
      return {
        stationList: []
      }
    },
    mounted: function () {
      // this.init();
    },
    created() {
      getStationList({page:1, pageSize:999}).then(res => {
        this.stationList = res.data.list
        this.init()
      })

    },
    methods: {
      init: function () {
        var map = new AMap.Map("container", {
          //地图中心位置
          center: [121.473701,31.230416], // 上海中心经纬度
          resizeEnable: true,
          //地图层级
          zoom: 10,
        });
        AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
          //地图缩放移动工具
          map.addControl(new AMap.ToolBar());
          //地图比例尺
          map.addControl(new AMap.Scale());
        });
        // 添加锚点

        var marker = new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          title: '葡萄园总部'
        });
        marker.setContent(this.setZBMarketContent()); //设置总部标记内容
        marker.setPosition([121.517769,31.074061]);
        map.add(marker);

        // 遍历机构 给机构添加标记
        for (let i=0;i<this.stationList.length;i++) {
          const jigouLocation = this.stationList[i].location
          const jigouCode = this.stationList[i].code
          let jigouMarket = new AMap.Marker({
            offset: new AMap.Pixel(0, 0),
            title: jigouCode
          });
          jigouMarket.setContent(this.setJGMarketContent(jigouCode))
          jigouMarket.setPosition([jigouLocation.split(',')[0],jigouLocation.split(',')[1]])
          map.add(jigouMarket)
        }

      },
      // 设置总部的自定义 标签内容
      setZBMarketContent() {
        // 自定义点标记内容
        var markerContent = document.createElement("div");

        // 点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = require("@/assets/pty_images/putao.png");

        markerContent.appendChild(markerImg);

        // 点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.className = 'zongbu-market';
        markerSpan.innerHTML = "总部";
        markerContent.appendChild(markerSpan);
        return markerContent
      },
      setJGMarketContent(title) {
        // 自定义点标记内容
        var markerContent = document.createElement("div");

        // 点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        // markerImg.src = require("@/assets/pty_images/jigou.png");
        markerImg.src = '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png';
        markerContent.appendChild(markerImg);

        // 点标记中的文本
        var markerSpan = document.createElement("span");
        markerSpan.className = 'jigou-market';
        markerSpan.innerHTML = title;
        markerContent.appendChild(markerSpan);
        return markerContent
      }
    },

  }
</script>



<style scoped>
  #container {
    width:1100px;
    height: 500px;
    margin: -20px  auto 0 auto;
  }



</style>
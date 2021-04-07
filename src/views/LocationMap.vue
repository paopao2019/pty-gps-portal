<template>
  <div class="amap-wrapper">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :content="marker.content" :events="marker.events"  :vid="index"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
  // 要统一使用 CommonJS的导入导出方式
  let { getStationList } = require("@/api/station");  //  此处请自行替换地址
  module.exports  = {
    name: 'LocationMap',
    data() {
      return {
        count: 1,
        slotStyle: {
          padding: '2px 8px',
          background: '#eee',
          color: '#333',
          border: '1px solid #aaa'
        },
        zoom: 10,
        resizeEnable: true,
        center: [121.473701,31.230416],  // 上海中心经纬度
        markers: [
          {
            position: [121.517769,31.074061], //设置总部标记内容
            events: {
              click: () => {
                alert('复地申公馆');
              },
            },
            content: this.setZBMarketContent()
          }
        ],
    };
    },
    created() {
      getStationList({page:1, pageSize:999}).then(res => {
        this.stationList = res.data.list
        // 给机构添加节点
        // 遍历机构 给机构添加标记
        for (let i=0;i<this.stationList.length;i++) {
          const jigouLocation = this.stationList[i].location
          const jigouCode = this.stationList[i].code
          let jigouMarket = {}
          jigouMarket.content = this.setJGMarketContent(jigouCode)
          jigouMarket.position = [jigouLocation.split(',')[0], jigouLocation.split(',')[1]]
          jigouMarket.events = {
            click: () => {
              alert(this.stationList[i].address);
            },
          }
          this.markers.push(jigouMarket);
        }
      })
    },
    methods: {
      onClick() {
        this.count += 1;
      },
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
      },
    }
  };
</script>


<style scoped>
  .amap-wrapper {
    width:1100px;
    height: 500px;
    margin: -20px  auto 0 auto;
  }
</style>
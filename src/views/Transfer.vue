<template>
  <div>
  <div class="container" >
    <el-amap vid="amapDemo1"  :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
    </el-amap>
  </div>
  <div id="panel">
  </div>
  </div>
</template>

<script>
  import { AMapManager } from "vue-amap";window.amapManager = new AMapManager();window.map=null;

  export default  {
    name: 'Transfer',
    data: function() {
      return {
        resizeEnable: true,
        zoom: 13,
        center: [121.473701,31.230416],  // 上海中心经纬度
        amapManager,
        events: {
          init(o) {
            let marker = new AMap.Marker({
              position: [121.59996, 31.197646]  //设置总部标记内容
            });
            marker.setMap(o);
          }
        }
      };
    },
    props: {
      addressOrg: String,
      addressDst: String,
    },
    created() {
      this.add()
      console.log(this.addressOrg, "to ",this.addressDst)
    },

    methods: {
      add() {
        let o = amapManager.getMap();
        var transOptions = {
          map: this.amapManager.getMap(),
          city: '上海市',
          panel: 'panel',
          policy: AMap.TransferPolicy.LEAST_TIME
        };
        // console.log(transOptions)
        var transfer = new AMap.Transfer(transOptions);
        transfer.search([
          {keyword: this.addressOrg,city:'上海市'},
          //第一个元素city缺省时取transOptions的city属性
          {keyword: this.addressDst,city:'上海市'}
          //第二个元素city缺省时取transOptions的cityd属性
        ], function(status, result) {
          // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
          if (status === 'complete') {
            console.log('绘制公交路线完成')
          } else {
            log.error('公交路线数据查询失败' + result)
          }
        });

      }
    }
  };
</script>



<style scoped>

  .amap-demo {
    width: 950px;
    height: 600px;
    float: left;
    margin: 20px;
    margin-top: -20px;
  }

  #panel {
    /*position: fixed;*/
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 20px;
    right: 10px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-transfer {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }


</style>
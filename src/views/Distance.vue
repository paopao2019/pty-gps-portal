<template>
    <div class="about">
      <div class="set">
        <el-form :inline="true" :model="formInline" :rules="rules"  class="demo-form-inline" >
          <el-form-item label="输入起始地址" prop="original">
            <el-input v-model="formInline.original" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onCalc">到教学点目标距离计算</el-button>
          </el-form-item>
      </el-form>
      </div>
      <hr>
      <div class="tableList">
        <el-table
                :data="tableDataList"
                border
                ref="multipleTable"
                row-key="ID"
                stripe
                style="width: 100%"
                tooltip-effect="dark"
                :default-sort = "{prop: 'distance', order: 'ascending'}"
                :header-cell-style="{background:'#FFEFD5',color:'gray'}"
        >
          <el-table-column label="ID" width="50" prop="ID">
            <template slot-scope="scope">{{scope.row.ID}}</template>
          </el-table-column>

          <el-table-column label="教学点编号" prop="code" width="120"></el-table-column>
          <el-table-column label="教学点地址" prop="address" width="450"></el-table-column>
          <el-table-column label="距离(KM)" width="120" prop="distance" sortable :sort-method="changeSort">
            <template slot-scope="scope">{{scope.row.distance |formatDistance }}</template>
          </el-table-column>
          <el-table-column label="驾车时间(分钟)" width="120">
            <template slot-scope="scope">{{scope.row.duration |formatDuration }}</template>
          </el-table-column>
          <el-table-column label="公交时间(分钟)" width="120">
            <template slot-scope="scope">{{scope.row.trantime |formatDuration }}</template>
          </el-table-column>
          <el-table-column label="交通详情">
            <template slot-scope="scope">
              <el-button @click="getTransfer(scope.row)" type="primary" icon="el-icon-info" style="margin-left: 6px;" size="mini" >点击查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
              title="交通信息-地图没有线路 不要看地图"
              :visible.sync="dialogVisible"
              :fullscreen="true"
              :before-close="handleClose"
              :destroy-on-close="true"
              @close="closeDialog"
              v-if="dialogVisible">
        <Transfer :address-org="addressOrg"  :address-dst="addressDst"></Transfer>
      </el-dialog>

    </div>

</template>

<script>
  import { getDistanceList } from "@/api/station";
  import Transfer from "../views/Transfer";
  export default {
    name: "Distance",
    components: {
      Transfer
    },
    data() {
      return {
        formInline: {
          original: "杨浦区江浦路1000号"
        },
        tableDataList: [],
        addressOrg: '',
        addressDst: '',
        dialogVisible: false,
        rules: {
          original: [{required: true, message: '请输入目标地址', trigger: 'blur'}]
        },
      }
    },
    methods: {
      onCalc() {
        console.log('计算距离')
        getDistanceList({"original":this.formInline.original}).then(res => {
          if (res.code == 0) {
            this.tableDataList = res.data.list;
          }
        })
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 1000);


      },
      changeSort(obj1, obj2) {
        return obj1.distance - obj2.distance

      },
      getTransfer(row) {
        // 延迟 为了避免有缓存的bug - 同步
        function sleep(milliSeconds) {
          var startTime = new Date().getTime();
          while (new Date().getTime() < startTime + milliSeconds);
        }
        // sleep(1000);   // 这个解决不了 最后还是通过  v-if去解决 显示和销毁
        // 就是隐藏dialog的时候要销毁这个dialog. 给dialog加v-if，在关闭dialog的时候将 v-if设置为false
        // 这样就会直接将其从dom结构中抹除，到此问题得到解决
        this.addressOrg = this.formInline.original
        this.addressDst = row.address
        this.dialogVisible = true

      },
      handleClose(done) {


        done()
      },
      closeDialog() {

      }
    },
    filters: {
      formatDistance: function(distance) {
        if (distance != null && distance != '') {
          return (distance/1000).toPrecision(2)
        } else {
          return ''
        }
      },
      formatDuration: function(duration) {
        if (duration != null && duration != '') {
          return (duration/60).toPrecision(3)
        } else {
          return ''
        }
      },
    }
  }
</script>

<style scoped>
  /*.set {*/
  /*  width: 60%;*/
  /*  margin: 0 auto;*/
  /*}*/

  .tableList {
    width: 90%;
    margin: 0 auto;
  }

</style>
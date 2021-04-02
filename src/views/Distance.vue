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
          <el-table-column label="教学点地址" prop="address" width="500"></el-table-column>
          <el-table-column label="距离(KM)" width="200" prop="distance" sortable :sort-method="changeSort">
            <template slot-scope="scope">{{scope.row.distance |formatDistance }}</template>
          </el-table-column>
          <el-table-column label="驾车时间(分钟)" width="200">
            <template slot-scope="scope">{{scope.row.duration |formatDuration }}</template>
          </el-table-column>

        </el-table>
      </div>

    </div>


</template>

<script>
  import { getDistanceList } from "@/api/station";
  export default {
    name: "Distance",
    data() {
      return {
        formInline: {
          original: "杨浦区江浦路1000号"
        },
        tableDataList: [],
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
      },
      changeSort(obj1, obj2) {
        return obj1.distance - obj2.distance

      }
    },
    filters: {
      formatDistance: function(distance) {
        if (distance != null && distance != '') {
          return distance/1000
        } else {
          return ''
        }
      },
      formatDuration: function(duration) {
        if (duration != null && duration != '') {
          return duration/60
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
    width: 80%;
    margin: 0 auto;
  }

</style>
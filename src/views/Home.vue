<template>
  <div class="station">
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="教学点编码" prop="code">
          <el-input placeholder="搜索条件" v-model="searchInfo.code" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery" icon="el-icon-search" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item>
          <el-button @click="addStation" type="primary">新增教学点</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
            :data="tableData"
            border
            ref="multipleTable"
            row-key="ID"
            stripe
            style="width: 100%"
            tooltip-effect="dark"
    >
      <el-table-column label="ID" width="50" prop="ID">
        <template slot-scope="scope">{{scope.row.ID}}</template>
      </el-table-column>

      <el-table-column label="教学点编号" prop="code" width="120"></el-table-column>
      <el-table-column label="教学点地址" prop="address" width="400"></el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">{{scope.row.CreatedAt | formatDate}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateStation(scope.row)" icon="el-icon-edit" size="small" type="primary">编辑</el-button>
          <el-button @click="deleteStation(scope.row)" type="danger" icon="el-icon-delete" style="margin-left: 6px;" size="mini" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :style="{float:'right',padding:'20px'}"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog :before-close="handleClose"  :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px" >
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="110px">
        <el-form-item label="编号" prop="company_name">
          <el-input autocomplete="off" v-model="formData.code" placeholder="编号"  :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="company_code">
          <el-input autocomplete="off" v-model="formData.address" placeholder="地址"  :style="{width: '90%'}"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    addStation,
    deleteStation,
    updateStation,
    getStationList
  } from "@/api/station";  //  此处请自行替换地址
  import infoList from "@/mixins/infoList";
  import { formatTimeToStr } from '@/utils/date'
  export default {
    name: "Home",
    mixins: [infoList],
    data() {
      return {
        listApi: getStationList,
        dialogFormVisible: false,
        dialogTitle: "新增教学点",
        dialogType: "add",
        visible: false,
        searchInfo: {
          code: undefined,
        },
        type: "",
        formData: {
          code: "",
          address: "",
        },
        rules: {
          code: [{
            required: true,
            message: '请输入编码',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
        },
      };
    },
    filters: {
      formatDate: function(time) {
        if (time != null && time != '') {
          let date = new Date(time)
          return formatTimeToStr(date, 'yyyy-MM-dd')
        } else {
          return ''
        }
      },
    },
    methods: {
      //条件搜索前端看此方法
      handleQuery() {
        this.getTableData()
      },
      handleClose(done) {
        // this.initForm();
        done();
      },
      async updateStation(row) {
        this.type = "update";
        // 浅拷贝 和 深度拷贝的问题
        this.formData = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑';
      },
      async addStation() {
        this.type = "add";
        this.dialogFormVisible = true;
        this.initForm()
        this.dialogTitle = '新增';
      },
      initForm() {
        this.formData = {
          code: "",
          address: ""
        };
      },
      closeDialog() {
        this.dialogFormVisible = false;
        this.initForm()
      },
      // 删除角色
      deleteStation(row) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            this.visible = false;
            const res = await deleteStation({ ID: row.ID });
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              await  this.getTableData();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      async enterDialog() {
        this.$refs['elForm'].validate(async valid => {
          if (!valid) return
          let res;
          switch (this.type) {
            case "add":
              res = await addStation(this.formData);
              break;
            case "update":
              res = await updateStation(this.formData);
              break;
            default:
              res = await addStation(this.formData);
              break;
          }
          if (res.code == 0) {
            this.closeDialog();
            await this.getTableData();
          }
        })
      },
    },
    async created() {
      await this.getTableData()
    }
  };
</script>


<style>
  .station {
    width: 80%;
    margin: 0 auto;
  }
</style>

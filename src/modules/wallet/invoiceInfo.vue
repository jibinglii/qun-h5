<template>
  <div class>
    <x-header title="完善发票信息"></x-header>
    <van-cell-group title="发票信息">
      <van-field
        label="单位名称："
        v-model="invoice.company"
        placeholder="请输入单位名称"
      />
      <van-field
        label="税号："
        v-model="invoice.no"
        placeholder="请输入税号"
      />
      <van-field
        label="单位地址："
        v-model="invoice.address"
        placeholder="请输入单位地址"
      />
      <van-field
        label="单位电话："
        v-model="invoice.telephone"
        placeholder="请输入电话"
      />
      <van-field
        label="开户行："
        v-model="invoice.bank"
        placeholder="请输入开户行"
      />
      <van-field
        label="开户账号"
        v-model="invoice.bank_account"
        placeholder="请输入开户银行账号"
      />
    </van-cell-group>
    <van-cell-group title="收票人信息">
      <van-field
        label="姓名："
        v-model="invoice.name"
        placeholder="请输入收件人姓名"
      />
      <van-field
        label="联系电话："
        v-model="invoice.mobile"
        placeholder="请输入收件人手机号"
      />
      <van-field
        label="地址："
        v-model="invoice.postal_address"
        placeholder="请输入详细地址"
      />
    </van-cell-group>
    <div class="btn">
      <van-button
        type="primary"
        hairline
        size="large"
        @click="next()"
      >保存</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import Cell from "vant/lib/cell";
import "vant/lib/cell/style";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import Button from "vant/lib/button";
import DropdownMenu from "vant/lib/dropdown-menu";
import "vant/lib/dropdown-menu/style";
import DropdownItem from "vant/lib/dropdown-item";
import "vant/lib/dropdown-item/style";
import Field from "vant/lib/field";
import "vant/lib/field/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    "van-field": Field
  },
  data() {
    //这里存放数据
    return {
      invoice: {
        company: "",
        no: "",
        address: "",
        telephone: "",
        bank: "",
        bank_account: "",
        name: '',
        mobile: '',
        postal_address: '',
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    getBillInfo(){
      this.$http.get('api/v2/alliance/bill/apply').then(data =>{
        if(data.data.bill.id!=undefined){
          this.invoice = data.data.bill
        }
      })
    },
    next() {//保存发票信息
      this.$toast.loading();
      this.$http.post('api/v2/alliance/bill/apply', this.invoice).then(data => {
        if (data.code == 200) {
          this.$alert("保存成功");
          this.$router.push({ name: 'wallet.invoice' })
        }
      }).catch(fail => {
        this.$alert(fail.response.data.message)
      })
    }
  },
  created() { },
  mounted() {
    this.getBillInfo()
   }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.top {
  .weui-cells {
    margin-top: 0;
  }
}
.van-cell-group {
  margin-bottom: 10px;
}
/deep/.vux-label-desc {
  font-size: 12px;
}
/deep/.van-cell__value {
  flex: 2;
  text-align: left;
}
/deep/.van-dropdown-menu {
  height: 24px;

  .van-dropdown-menu__item {
    display: inline-block;
  }

  .van-hairline--top-bottom::after {
    border-width: 0px;
  }
  .van-dropdown-menu__title {
    font-size: 15px;
  }
  .van-dropdown-menu__title::after {
    display: none;
  }

  .van-cell__title {
    text-align: left;
    font-weight: normal;
  }
}
.van-hairline--top-bottom::after {
  border-width: 0px;
}
.btn {
  width: 90%;
  margin: 30px auto;
  .van-button--primary {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
  }
}
</style>

<template>
  <div id="address">

    <nav-bar>
      <template v-slot:left>
        <img class="back" src="~assets/img/common/back.svg" @click="backClick" alt="">
      </template>
      <template v-slot:center>
        <div class="title">我的收货地址</div>
      </template>
    </nav-bar>

    <van-address-edit v-if="toEdit"
      :address-info="editItem"
      :show-delete="showDeleteBtn"
      show-set-default
      :show-area="false"
      @save="onSave"
      @delete="onDelete" />

    <van-address-list v-else
      :switchable="toSwitch"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect" />

  </div>
</template>


<script>
  import { toGetAddressList, toAddAddress, toUpdateAddress, toDeleteAddress } from '../../network/address'

  import NavBar from "components/common/navBar/NavBar";

  import { AddressList, AddressEdit } from 'vant';

  import * as types from '../../store/mutation-types'

  export default {
    name: 'Address',
    components: {
      NavBar,
      [AddressList.name]: AddressList,
      [AddressEdit.name]: AddressEdit,
    },
    data () {
      return {
        toSwitch: false,
        chosenAddressId: '0',
        showDeleteBtn: true,
        list: [],
        toEdit: false,
        editItem: {},
        mode: 'add',
        currentAddressId: '',
      };
    },
    activated () {
      let loginPhone = this.$store.getters.getUserPhone
      if (!loginPhone) {
        this.$router.push('/login')
      }
      this.getAddressList()
    },
    deactivated() {
      this.toEdit = false
      this.showDeleteBtn = false
      this.toSwitch = false
      this.chosenAddressId = '0'
    },
    beforeRouteEnter (to, from, next) {
      if(from.path.slice(1, 7) == 'detail' || from.path.slice(1, 5) == 'cart') {
        next(vm => {
          vm.toSwitch = true
        })
      }
      next()
    },
    methods: {
      getAddressList() {
        toGetAddressList({
          phone: this.$store.getters.getUserPhone
        }).then(res => {
          if(res.data.code == '403') {
            return ;
          }
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              id: i.id,
              name: i.name,
              tel: i.phone,
              address: i.address,
              isDefault: i.status=='1' ? true : false
            }
            tempArr.push(tempObj)
          }
          this.list = tempArr
        })  
      },
      backClick() {
        this.$router.go(-1)
      },
      onAdd() {
        this.toEdit = !this.toEdit
        this.showDeleteBtn = false
        this.editItem = {}
        this.mode = 'add'
      },
      onEdit(item, index) {
        let tempObj = {
          id: item.id,
          name: item.name,
          tel: item.tel,
          addressDetail: item.address,
          isDefault: item.isDefault
        }
        this.editItem = tempObj
        this.showDeleteBtn = true
        this.toEdit = !this.toEdit
        this.mode = 'edit'
        this.currentAddressId = item.id
      },
      onSelect(item, index) {
        this.$store.commit(types.CHOOSE_ADDRESS, item)
        this.$router.go(-1)
      },
      onSave(content) {
        this.toEdit = !this.toEdit
        if(this.mode == 'add') {
          toAddAddress({
            phone: this.$store.getters.getUserPhone,
            name: content.name,
            address: content.addressDetail,
            getPhone: content.tel
          }).then(res => {
            this.getAddressList()
          })
        } else {
          toUpdateAddress({
            id: this.currentAddressId,
            phone: this.$store.getters.getUserPhone,
            name: content.name,
            address: content.addressDetail,
            getPhone: content.tel,
            status: content.isDefault ? '1' : '0'
          }).then(res => {
            this.getAddressList()
          })
        }
      },
      onDelete(content) {
        toDeleteAddress({
          phone: this.$store.getters.getUserPhone,
          id: this.currentAddressId
        }).then(res => {
          if(res.data.code == '200') {
            this.toEdit = !this.toEdit
          }
        })
      }
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
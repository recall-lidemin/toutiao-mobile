<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" @click-right="saveUserInfo"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center @click="photoShow = true">
        <van-image slot="default" width="1.5rem" height="1.5rem" fit="cover" round
          :src="photo ? photo : userInfo.photo" />
      </van-cell>
      <van-cell is-link title="昵称" :value="userInfo.name" @click="nameShow=true" />
      <van-cell is-link title="性别" :value="userInfo.gender === 0 ? '男' : '女'"
        @click="genderShow=true" />
      <van-cell is-link title="出生日期" :value="userInfo.birthday" @click="dateShow=true" />
    </van-cell-group>
    <!-- 头像弹层 -->
    <van-action-sheet v-model="photoShow" cancel-text="取消" :actions="photoActions" @select="photoSelect">
    <!-- 上传框 -->
    <input type="file" style="display:none" ref="fileRef" @change="upload">
    </van-action-sheet>
    <!-- 昵称弹层 -->
    <van-popup v-model="nameShow" :style="{ width:'80%' }">
      <van-panel title="修改用户昵称">
        <van-field v-model.trim="userInfo.name" label="昵称" placeholder="请输入昵称" />
        <template #footer>
          <van-button size="small" type="primary" @click="saveName">保存</van-button>
        </template>
      </van-panel>
    </van-popup>
    <!-- 性别弹层 -->
    <van-action-sheet v-model="genderShow" cancel-text="取消" :actions="actions" @select="onSelect">
    </van-action-sheet>
    <!-- 日期弹出层 -->
    <van-popup v-model="dateShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
        @cancel="dateShow = false" @confirm="dateConfirm" />
    </van-popup>
    <!-- 上传组件 -->

  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserPtofile, updatePhoto, saveUserInfo } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 控制弹层显示与隐藏参数
      dateShow: false,
      genderShow: false,
      nameShow: false,
      photoShow: false,
      // 日期组件参数
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      // 性别参数
      actions: [{ name: '男' }, { name: '女' }],
      // 上传头像
      photoActions: [{ name: '本地上传' }, { name: '拍照' }],
      // 编辑用户资料参数
      userInfo: {
        name: '',
        photo: '',
        gender: 0,
        birthday: ''
      },
      base64: '',
      photo: ''
    }
  },
  methods: {
    ...mapMutations(['updatePhoto']),
    // 获取用户资料
    async getUserPtofile () {
      this.userInfo = await getUserPtofile()
      this.userInfo.birthday.split('-').join(',')
    },
    // 日期弹层确认事件
    dateConfirm (value) {
      this.userInfo.birthday = dayjs(value).format('YYYY-MM-DD')
      this.dateShow = false
    },
    // 监听性别选中事件
    onSelect (action, index) {
      this.userInfo.gender = index
      this.genderShow = false
    },
    // openNameShow () {
    //   this.nameShow = true
    //   this.userInfo.name = this.userProfile.name
    // },
    // 保存昵称
    saveName () {
      this.nameShow = false
      // this.userProfile.name = this.userInfo.name
    },
    // 监听选中了哪个上传事件，然后触发对应上传事件
    photoSelect (action, index) {
      if (index === 0) {
        this.$refs.fileRef.click()
      }
    },
    // 上传头像
    async upload () {
      // 实例一个formdata对象
      const formdata = new FormData()
      formdata.append('photo', this.$refs.fileRef.files[0])
      const res = await updatePhoto(formdata)
      // 更新本地头像
      this.photo = res.photo
      // 更新vuex中得共享数据头像
      this.updatePhoto({ photo: res.photo })
      // 图片转base64
      const fr = new FileReader()
      fr.readAsDataURL(this.$refs.fileRef.files[0])
      fr.onload = (e) => {
        this.userInfo.photo = e.target.result.split(',')[1]
      }
      this.photoShow = false
    },
    // 保存用户信息
    async saveUserInfo () {
      try {
        await saveUserInfo(this.userInfo)
      } catch (error) {

      }
    }
  },
  created () {
    this.getUserPtofile()
  }
}
</script>

<style>
</style>

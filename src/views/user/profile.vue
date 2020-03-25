<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center @click="photoShow = true">
        <van-image slot="default" width="1.5rem" height="1.5rem" fit="cover" round
          :src="userProfile.photo" />
      </van-cell>
      <van-cell is-link title="名称" :value="userProfile.name" @click="nameShow = true" />
      <van-cell is-link title="性别" :value="userProfile.gender === 0 ? '男' : '女'"
        @click="genderShow=true" />
      <van-cell is-link title="生日" :value="userProfile.birthday" @click="dateShow=true" />
    </van-cell-group>
    <!-- 头像弹层 -->
    <van-popup v-model="photoShow" :style="{ width:'80%' }">
      <van-cell is-link title="本地相册选择图片"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 昵称弹层 -->
    <van-popup v-model="nameShow" :style="{ width:'80%' }">
      <van-panel title="修改用户昵称">
        <van-field v-model="userInfo.name" label="文本" placeholder="请输入昵称" />
        <template #footer>
          <van-button size="small" type="primary">保存</van-button>
        </template>
      </van-panel>
    </van-popup>
    <!-- 性别弹层 -->
    <van-popup v-model="genderShow" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar :default-index="userProfile.gender" :columns="columns"
        @cancel="genderShow = false" @confirm="genderConfirm" />
    </van-popup>
    <!-- 日期弹出层 -->
    <van-popup v-model="dateShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
        @cancel="dateShow = false" @confirm="dateConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { getUserPtofile } from '@/api/user.js'
export default {
  data () {
    return {
      // 用户资料
      userProfile: {},
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
      columns: ['男', '女'],
      // 编辑用户资料参数
      userInfo: {
        name: '',
        photo: '',
        gender: '',
        birthday: ''
      }
    }
  },
  methods: {
    // 获取用户资料
    async getUserPtofile () {
      this.userProfile = await getUserPtofile()
      this.userProfile.birthday.split('-').join(',')
    },
    // 日期弹层确认事件
    dateConfirm (value) {
      console.log(value)
      console.log(this.userProfile.birthday.split('-').join(','))

      this.dateShow = false
    },
    // 性别弹层的确认事件
    genderConfirm (value) {
      console.log(value)
      this.genderShow = false
    }
  },
  created () {
    this.getUserPtofile()
  }
}
</script>

<style>
</style>

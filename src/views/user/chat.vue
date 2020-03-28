<template>
 <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list">
      <div class="chat-item" :class="{ left: item.name === 'xz',right: item.name !== 'xz' }"  v-for="(item,index) in msgList" :key="index">
        <van-image fit="cover" round :src="XZImg" v-if="item.name === 'xz'" />
        <div class="chat-pao">{{ item.msg }}</div>
        <van-image  fit="cover" round :src="photo" v-if="item.name !== 'xz'"/>
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round :src="photo" />
      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import XZImg from '@/assets/head.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'
export default {
  data () {
    return {
      // 机器人头像
      XZImg,
      // 输入框
      value: '',
      loading: false,
      // 存放聊天记录
      msgList: [],
      isOpen: false

    }
  },
  methods: {
    // 发送消息
    send () {
      // 判断消息框
      if (!this.value) return
      // 打开加载状态，防止重复提交
      this.loading = true
      // 使用websocket发送消息
      // this.socket.emit(消息类型，消息内容)
      // 聊天内容
      const msgObj = {
        msg: this.value,
        timestamp: Date.now()
      }
      this.socket.emit('message', msgObj)
      this.msgList.push(msgObj)
      this.value = ''
      this.loading = false
    }
  },
  computed: {
    ...mapState(['photo', 'user'])
  },
  created () {
    // 建立WebSocket连接
    // new WebSocket(地址)
    // io(地址,{})
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: { token: this.user.token }
    })
    // 监听连接成功，接收
    this.socket.on('connect', () => {
      this.isOpen = true
    })
    // 监听消息回复
    this.socket.on('message', data => {
      this.msgList.push({ ...data, name: 'xz' })
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>

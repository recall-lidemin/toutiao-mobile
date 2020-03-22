<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <!-- 我的频道 -->
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(item,index) in channels" :key="item.id">
          <span class="f12" :class="{ red: currentActiveIndex === index }" @click="$emit('tochannel',index)">{{ item.name }}</span>
          <!-- 叉号标签，应该在编辑状态显示 -->
          <van-icon class="btn" name="cross" v-if="editing && index!==0"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 可选频道 -->
    <!-- 全部频道 - 我的频道 = 可选频道 -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionChannels" :key="item.id">
          <span class="f12">{{ item.name }}</span>
          <van-icon class="btn" name="plus" v-if="editing"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  // props: ['channels'],
  props: {
    channels: {
      required: true,
      type: Array,
      // 此函数表示默认返回一个空数组
      default: () => []
    },
    // 当前激活频道的索引
    currentActiveIndex: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      editing: false,
      // 全部频道数据
      allChannelList: []
    }
  },
  methods: {
    async getAllChannels () {
      const res = await getAllChannels()
      this.allChannelList = res.channels
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    // 筛选可选频道：可选频道 = 全部频道 - 我的频道
    optionChannels () {
      return this.allChannelList.filter(item => !this.channels.some(o => o.id === item.id))
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>

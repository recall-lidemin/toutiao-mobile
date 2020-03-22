<template>
  <div class="container">
    <van-tabs v-model="activeIndex">
      <!-- v-for循环渲染tab页签 -->
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
       <!-- 文章列表 -->
       <!-- 组件传值props
            $emit()
        -->
        <ArticleList :channelId="item.id" @show = "show"></ArticleList>
      </van-tab>

    </van-tabs>
    <!-- 频道编辑图标 -->
    <span class="bar_btn" @click="showChannelEdit = true">
      <van-icon name="wap-nav" />
    </span>
    <!-- 更多操作弹层组件 -->
    <van-popup v-model="showMoreAction" style="width:80%" >
      <MoreAction @dislike = "dislikeOrReport('dislike')" @report = "dislikeOrReport('report',$event)"></MoreAction>
    </van-popup>
    <!-- 上来菜单组件 -->
    <van-action-sheet v-model="showChannelEdit" title="频道编辑" :round="false">
      <!-- 将父组件的数据传递给子组件 -->
      <ChannelEdit :channels="channelList" />
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import MoreAction from './components/moreAction.vue'
import ChannelEdit from './components/channel.vue'
import { getMyChannel } from '../../api/user.js'
import { dislike, report } from '../../api/article.js'
import EventBus from '../../utils/eventBus.js'
export default {
  components: {
    // 文章列表组件
    ArticleList,
    // 更多操作组件
    MoreAction,
    // 编辑频道组件
    ChannelEdit
  },
  data () {
    return {
      // 频道列表数据
      channelList: [],
      // 控制是否显示弹层
      showMoreAction: false,
      // 接收存储子组件传递的文章id
      artId: null,
      // 当前默认激活的tab页签
      activeIndex: 0,
      // 控制上拉频道编辑弹层显示隐藏
      showChannelEdit: false
    }
  },
  methods: {
    async getChannelList () {
      const res = await getMyChannel()
      this.channelList = res.channels
    },
    show (artId) {
      // 接收存储id
      this.artId = artId
      // 显示更多操作图层
      this.showMoreAction = true
    },
    // 不感兴趣文章和举报文章使用同一个方法
    // 此时需要根据传参判断当前是不喜欢还是举报
    // $event事件参数
    async dislikeOrReport (operateType, type) {
      try {
        operateType === 'dislike'
          ? await dislike(this.artId) : await report({
            target: this.artId,
            type
          })
        this.$notice({
          type: 'success',
          message: '操作成功'
        })
        // 利用事件广播，通知对应tab删除对应文章数据
        // 所以要把哪个频道的哪个文章都传过去
        // res.toString()文章id，this.activeIndex对应频道索引,this.channelList[this.activeIndex].id频道id
        EventBus.$emit('delArticle', this.artId, this.channelList[this.activeIndex].id)
        // 关闭弹层
        this.showMoreAction = false
      } catch (error) {
        this.$notice({
          type: 'danger',
          message: '操作失败'
        })
      }
    }
  },
  created () {
    // 获取我的频道
    this.getChannelList()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
// 处理弹出编辑频道面板样式
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>

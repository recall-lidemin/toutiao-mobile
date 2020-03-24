<template>
  <div class="comment">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="item van-hairline--bottom van-hairline--top" v-for="item in commentList" :key="item.com_id.toString()">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="item.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{ item.aut_name }}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{ item.like_count }}</span>
            </span>
          </p>
          <p>{{ item.content }}</p>
          <p>
            <span class="time">{{ item.pubdate | transTime }}</span>&nbsp;
            <van-tag plain @click="openReply(item.com_id.toString())">{{ item.reply_count }} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
     <!-- 输入框 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button" @click="submit">提交</span>
      </van-field>
    </div>

     <!-- 回复 -->
    <van-action-sheet v-model="showReply" :round="false" class="reply_dialog" title="回复评论"  @closed="closed">
      <van-list :immediate-check="false" v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了" @load="onReplyLoad">
        <div class="item van-hairline--bottom van-hairline--top" v-for="item in reply.replyCommentList" :key="item.com_id.toString()">
          <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
          <div class="info">
            <p><span class="name">{{ item.aut_name }}</span></p>
            <p>{{ item.content }}</p>
            <p><span class="time">{{ item.pubdate | transTime }}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>

</template>

<script>
import { getComments, comments } from '@/api/article.js'
export default {
  data () {
    return {
      // 上拉加载中
      loading: false,
      // 全部加载完毕
      finished: false,
      // 输入的内容
      value: '',
      // 控制提交中状态数据
      submiting: false,
      // 评论数据
      commentList: [],
      // 偏移量
      offset: null,
      // 控制回复弹框的显示隐藏
      showReply: false,
      // 回复的评论
      reply: {
        loading: false,
        finished: false,
        // 回复列表
        replyCommentList: [],
        offset: null,
        // 评论id
        commId: null
      }

    }
  },
  methods: {
    // 加载评论列表
    async onLoad () {
      const { artId } = this.$route.query
      const res = await getComments({
        type: 'a',
        source: artId,
        offset: this.offset
      })
      this.commentList.push(...res.results)
      this.loading = false
      // 分页
      this.finished = res.end_id === res.last_id
      if (!this.finished) {
        this.offset = res.last_id
      }
    },
    // 渲染回复列表
    async openReply (id) {
      this.showReply = true
      this.reply.commId = id

      // 每次打开回复需要重置数据
      this.reply.replyCommentList = []
      this.reply.offset = null
      this.reply.loading = true
      this.reply.finished = false
      this.onReplyLoad()
    },
    async onReplyLoad () {
      const res = await getComments({
        type: 'c',
        source: this.reply.commId,
        offset: this.reply.offset
      })
      this.reply.replyCommentList.push(...res.results)
      this.reply.loading = false
      // 分页
      this.reply.finished = res.end_id === res.last_id
      if (!this.reply.finished) {
        this.reply.offset = res.last_id
      }
    },
    // 对文章发表评论
    async submit () {
      // 对文章发表评论
      const { artId } = this.$route.query
      // 接口更新后台数据
      const res = await comments({
        target: this.reply.commId === null ? artId : this.reply.commId,
        content: this.value,
        art_id: this.reply.commId === null ? null : artId
      })
      console.log(res)
      // 清空输入框
      this.value = ''
      // 根据接口返回数据更新前台数据
      if (!this.reply.commId) {
        this.commentList.unshift(res.new_obj)
      } else {
        this.reply.replyCommentList.unshift(res.new_obj)
        // 更新评论回复数量
        console.log(this.reply.commId)
        const replyCount = this.commentList.find(item => item.com_id.toString() === this.reply.commId)
        replyCount.reply_count++
      }
    },
    // 监听回复框关闭事件
    closed () {
      // 关闭回复框之后重置
      this.reply.commId = null
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
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
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
.reply_dialog {
  height: 90%;
  max-height: 90%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>

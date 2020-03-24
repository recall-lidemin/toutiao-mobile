<template>
  <div class='container'>
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{ articleInfo.title }}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="articleInfo.aut_photo" />
        <div class="text">
          <p class="name">{{ articleInfo.aut_name }}</p>
          <p class="time">{{ articleInfo.pubdate | transTime }}</p>
        </div>
        <van-button round size="small" type="info" @click="follow" :loading="followLoading" > {{ articleInfo.is_followed!==false ? '+ 关注' : '已关注'}}</van-button>
      </div>
      <div class="content" v-html="articleInfo.content"> </div>
      <div class="zan">
        <van-button round size="small" :class="{active:articleInfo.attitude===1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" plain icon="delete" :class="{active:articleInfo.attitude===0}">不喜欢</van-button>
      </div>
      <div class="detail">
        <Comment></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/article.js'
import { followUser, unFollowUser } from '@/api/user.js'
import Comment from './component/comment.vue'
export default {
  components: {
    Comment
  },
  data () {
    return {
      // 文章详情
      articleInfo: {},
      followLoading: false
    }
  },
  methods: {
    async getArticleInfo () {
      const { artId } = this.$route.query
      const res = await getArticleInfo(artId)
      this.articleInfo = res
    },
    // 关注用户
    async follow () {
      this.followLoading = true
      try {
        if (this.articleInfo.is_followed) {
          await unFollowUser(this.articleInfo.aut_id)
        } else {
          await followUser(this.articleInfo.aut_id)
        }
        this.articleInfo.is_followed = !this.articleInfo.is_followed
        this.followLoading = false
        this.$notice({
          type: 'success',
          message: '操作成功'
        })
      } catch (error) {
        this.$notice({
          type: 'danger',
          message: '操作失败'
        })
      }
    }

  },
  created () {
    this.getArticleInfo()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan{
    text-align: center;
    padding: 10px 0;
    .active{
      border-color:red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position:sticky;
    background-color: #fff;
    top:46px;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
    /deep/ code{
      white-space: pre-wrap;
    }
  }
}
</style>

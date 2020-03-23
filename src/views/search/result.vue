 <template>
  <div class='container'>
     <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
        <!-- 文章列表结构 -->
        <van-cell-group>
          <van-cell v-for="item in articleList" :key="item.art_id.toString()">
            <div class="article_item">
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <div class="img_box" v-if="item.cover.images.length === 3">
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="img_box" v-if="item.cover.images.length === 1">
                <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="info_box">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate | transTime }}</span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/search.js'
export default {
  data () {
    return {
      // 搜索结果文章数据
      articleList: [],
      loading: false,
      finished: false,
      finishedText: '',
      // 查询参数
      query: {
        page: 1,
        per_page: 10,
        q: this.$route.query.q
      }
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep()
      const res = await getResults(this.query)
      this.articleList.push(...res.results)
      this.loading = false
      // 判断是否还存在下一页
      if (res.results.length) {
        // 如果还有下一页，则把page++
        this.query.page++
      } else {
        // 没有下一页，把finished置为true
        this.finished = true
        this.finishedText = '没有更多数据了'
      }
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>

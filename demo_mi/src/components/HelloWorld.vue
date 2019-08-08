<template>
  <div>
    <h3>{{title}}</h3>
    <!-- 轮播图 -->
    <div ontouchstart>
      <!-- 引入轮播组件 -->
      <!-- <swiper  :options="swiperOption"> -->
      <swiper>
        <swiper-slide
        v-for="(item, index) in imgList"
        :key="index">
          <!-- 动态绑定图片地址 -->
          <img class="img-item" :src="item"/>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// 局部引入 样式和组件
// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '轮播图演示',
      // swiperOption: {
      //   loop: true,
      //   pagintation: {
      //     el: '.swpwer-pagination'
      //   }
      // },
      // 图片列表，小米官网图片链接地址
      imgList: [
        'https://il.mifile.cn/a4/xmad_15650061412258_gjQPE.jpg',
        'https://il.mifile.cn/a4/xmad_15650807569039_DEB1z.jpg',
        'https://i1.mifile.cn/a4/xmad_15649872937069_sqeMx.jpg'
      ]
    }
  }
  // 注册组件，就是刚刚上面引入的那俩货
  // components: {
  //   swiper,
  //   swiperSlide
  // }
}
</script>
<style scoped>
/* 图片样式,稍微调整了一下，不如图片显示不友好 */
.img-item{
  width: 100%;
  height: 18.75rem;
  object-fit: cover
}
</style>

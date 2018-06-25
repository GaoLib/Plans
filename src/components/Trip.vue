<template>
  <div>
    <div class="galleryBox">
      <img v-bind:src="'../../static/images/trip/'+huangshan+'.png'" class="leftGallery">
      <img src="../../static/images/trip/chongqing.png" class="centerGallery" v-on:touchstart="_touchStart" v-on:touchend="_touchEnd">
      <img src="../../static/images/trip/xiamen.png" class="rightGallery">
    </div>
    <div class="trips">
      <div class="trip" v-for="(item,index) in tripList" v-bind:style="{backgroundImage:'url(\''+item.tripImage+'.jpg\')'}">
        <div class="description" v-bind:class="{'odd':Math.random()> 0.5}">
          <router-link :to="'/tDetail'+item.tripId"><h4 v-text="item.tripDestination"></h4></router-link>
          <p v-text="item.tripPrice"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      tripList:[],
      startX:'',
      rollList:['chongqing','huangshan','xiamen']
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      //setInterval(this.gallery,3000);
      this.getData();
    })
  },
  methods:{
    getData: function(){
      let _this = this;
      this.$http.get('../../static/data/data.json').then((res)=>{
        _this.tripList = res.body.result.list;
      });
    },
    _touchStart:function(ev){
      // console.log(ev);
      ev = ev || event;   //浏览器兼容问题，有的ev，有的用event
      if(ev.touches.length == 1){
        this.startX = ev.touches[0].clientX;
      }
    },
    _touchEnd:function(ev){
      ev = ev || event;
      // console.log(ev);
      if(ev.changedTouches.length == 1){
        if(ev.changedTouches[0].clientX > this.startX){
          console.log('you');
        }else if(ev.changedTouches[0].clientX < this.startX){
          console.log('zuo');
        }else{
          console.log('just click');
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin matrix($value...){
  transform: matrix($value);
  -ms-transform: matrix($value);   /* IE 9 */
  -moz-transform: matrix($value);  /* Firefox */
  -webkit-transform: matrix($value); /* Safari 和 Chrome */
  -o-transform: matrix($value); 
}
@keyframes galleryLeftToCenter{
  from {
      width:60%;
      left:-50%;
      bottom:1.5rem;
      position:absolute;
      @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
  }
  to {
      width:68%;
      top:1rem;
      @include matrix(1, 0, 0, 1, 0, 0);
      left:16%;
  }
}
@keyframes galleryRightToCenter{
  from {
      width:60%;
      right:-50%;
      bottom:1.5rem;
      position:absolute;
      @include matrix(-1, 0.1, 0, 0.9, 0, 0);
  }
  to {
      width:68%;
      right:16%;
      top:1rem;
      @include matrix(1, 0, 0, 1, 0, 0);
      
  }
}
@keyframes galleryCenterToLeft{
  from {
      width:68%;
      margin:1rem auto;
      @include matrix(1, 0, 0, 1, 0, 0);
  }
  to {
      width:60%;
      left:-50%;
      bottom:0.6rem;
      position:absolute;
      @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
  }
}
@keyframes galleryCenterToRight{
  from {
      width:68%;
      margin:1rem auto;
      @include matrix(1, 0, 0, 1, 0, 0);
  }
  to {
      width:60%;
      right:-50%;
      bottom:0.6rem;
      position:absolute;
      @include matrix(-1, 0.1, 0, 0.9, 0, 0);
  }
}
  .galleryBox{
    width:100%;
    height:10rem;
    background-color: #546B48; 
    text-align:center;
    overflow:hidden;
    position:relative;

    .centerGallery{
      height:8rem;
      width:68%;
      margin:1rem auto;
      border-radius:6%;
      // animation: galleryCenterToRight 4s 1;
    }
    .leftGallery{
      height:8rem;
      width:60%;
      border-radius:6%;
      left:-50%;
      bottom:1.5rem;
      position:absolute;
      @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
      // animation: galleryLeftToCenter 4s 1;
    }
    .rightGallery{
      height:8rem;
      width:60%;
      border-radius:6%;
      position:absolute;
      right:-50%;
      bottom:1.5rem;
      @include matrix(-1, 0.1, 0, 0.9, 0, 0);
      // animation: galleryRightToCenter 4s 1;
    }
  }
  .trips{
    width: 96%;
    display:flex;
    margin-top:0.5rem;
    margin-left: 2%;
    flex-wrap: wrap;
  }
  .trip{
    width:8rem;
    height:9rem;
    background-repeat: no-repeat;
    background-size: cover;
    margin:0.2rem 0.6rem;
    display:flex;
  }
  .description{
    align-self: flex-end;
    width:100%;
    height:4rem;
    font-weight: bold;
    display:flex;
    justify-content:center;
    background: linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.8));
    color:lightgoldenrodyellow;
  }
  .description h4{
    color:lightgoldenrodyellow;
  }
  .odd{
    background: white;
    color:black;
  }
  .odd h4{
    color:black;
  }
  .description p{
    font-size: 0.4rem;
    margin-left:1rem;
    align-self: flex-end;
  }


</style>

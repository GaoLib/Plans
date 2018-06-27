<template>
  <div>
    <div class="galleryBox">
      <img v-bind:src="'../../static/images/trip/'+rollList[(rollList.indexOf(curGallery)-1+rollList.length) % rollList.length]+'.png'" class="leftGallery">
      <img v-bind:src="'../../static/images/trip/'+curGallery+'.png'" class="centerGallery" v-on:touchstart="_touchStart" v-on:touchend="_touchEnd">
      <img v-bind:src="'../../static/images/trip/'+rollList[(rollList.indexOf(curGallery)+1+rollList.length) % rollList.length]+'.png'" class="rightGallery">
    </div>
    <div class="trips">
      <div class="trip" v-for="(item,index) in tripList" v-bind:style="{backgroundImage:'url(\''+item.tripImage+'.jpg\')'}">
          <router-link :to="'/Details/tripD/'+item.Id"><h2 v-text="item.tripDestination"></h2>
          <p v-text="item.tripPrice"></p></router-link>
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
      rollList:['chongqing','huangshan','xiamen'],
      curGallery:'huangshan'
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
      this.$http.get('../../static/data/tripD.json').then((res)=>{
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
       let index = this.rollList.indexOf(this.curGallery);
       let length = this.rollList.length;
      if(ev.changedTouches.length == 1){
        if(ev.changedTouches[0].clientX > this.startX){
          this.curGallery = this.rollList[(index - 1 + length) % length]; 
        }else if(ev.changedTouches[0].clientX < this.startX){
          this.curGallery = this.rollList[(index + 1 + length) % length]; 
        }else{
          // console.log('just click');
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
// @keyframes galleryLeftToCenter{
//   from {
//       width:60%;
//       left:-50%;
//       bottom:1.5rem;
//       position:absolute;
//       @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
//   }
//   to {
//       width:68%;
//       top:1rem;
//       @include matrix(1, 0, 0, 1, 0, 0);
//       left:16%;
//   }
// }
// @keyframes galleryRightToCenter{
//   from {
//       width:60%;
//       right:-50%;
//       bottom:1.5rem;
//       position:absolute;
//       @include matrix(-1, 0.1, 0, 0.9, 0, 0);
//   }
//   to {
//       width:68%;
//       right:16%;
//       top:1rem;
//       @include matrix(1, 0, 0, 1, 0, 0);
      
//   }
// }
// @keyframes galleryCenterToLeft{
//   from {
//       width:68%;
//       margin:1rem auto;
//       @include matrix(1, 0, 0, 1, 0, 0);
//   }
//   to {
//       width:60%;
//       left:-50%;
//       bottom:0.6rem;
//       position:absolute;
//       @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
//   }
// }
// @keyframes galleryCenterToRight{
//   from {
//       width:68%;
//       margin:1rem auto;
//       @include matrix(1, 0, 0, 1, 0, 0);
//   }
//   to {
//       width:60%;
//       right:-50%;
//       bottom:0.6rem;
//       position:absolute;
//       @include matrix(-1, 0.1, 0, 0.9, 0, 0);
//   }
// }
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
      // @include matrix(1, 0, 0, 1, 0, 0);
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
    margin-top:0.5rem;
    margin-left: 2%;

    .trip{
      width:94%;
      height:9rem;
      background-repeat: no-repeat;
      background-size: cover;
      margin:1.2rem 0.6rem;
      text-align:center;
      overflow:hidden;
 
      h2{
        margin-top:2.4rem;
        color:white;
      }
      p{
        color:white;
      }
    }
  
  }



</style>

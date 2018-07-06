<template>
  <div>
    <div class="galleryBox">
      <img v-bind:src="'../../static/images/trip/'+rollList[(rollList.indexOf(curGallery)-1+rollList.length) % rollList.length]+'.png'" class="leftGallery">
      <img v-bind:src="'../../static/images/trip/'+curGallery+'.png'" class="centerGallery" v-on:touchstart="_touchStart" v-on:touchend="_touchEnd">
      <img v-bind:src="'../../static/images/trip/'+rollList[(rollList.indexOf(curGallery)+1+rollList.length) % rollList.length]+'.png'" class="rightGallery">
    </div>
    <div class="trips">
      <div v-for="(item,index) in tripList">
        <div :class="['trip',{'tripDisable':curDeleteNum+1 === index}]" v-bind:style="{backgroundImage:'url(\''+item.tripImage+'.jpg\')'}" @touchstart="_deleteStart(index)" @touchend="_deleteEnd">
            <router-link :to="'/Details/tripD/'+item.Id"><h2 v-text="item.tripDestination"></h2>
            <p v-text="item.tripPrice"></p></router-link>
        </div>
        <div class="trip disable" v-if="curDeleteNum === index" @click="cancel">
          <div class="iconContainer"><img src="../../static/images/delete.png" @click="deleted"></div>
        </div>
     </div>
      <div :class="['trip','add',{'addDisable':curDeleteNum === tripList.length - 1}]">
        <router-link to="/add/tripA"><img src="../../static/images/add.png"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tripList:[],
      startX:'',
      rollList:['chongqing','huangshan','xiamen'],
      curGallery:'huangshan',
      timeOutEvent: 0,
      curDeleteNum:''
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
        // console.log(_this.tripList);
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
    },
    _deleteStart: function(index){
      let _this = this;
      this.timeOutEvent = setTimeout(function(){
         _this.curDeleteNum = index;
      },500)
    },
    _deleteEnd: function(){
      clearTimeout(this.timeOutEvent);
    },
    cancel: function(){
      this.curDeleteNum = '';
    },
    deleted: function(ev){
      ev.stopPropagation();
      Vue.delete(this.tripList,this.curDeleteNum);
      this.curDeleteNum = '';
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
    overflow:hidden;

    .trip{
      width:94%;
      height:9rem;
      background-repeat: no-repeat;
      background-size: cover;
      margin:1rem 0.6rem;
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
    .tripDisable{
      margin-top:-10rem;
    }
    .disable{
      background-color: rgba(128,128,128,0.6);
      position:relative;
      top:-10rem;
      left:0;

      .iconContainer{
        background-color: red;
        margin:2.6rem auto;
        width:4rem;
        height:4rem;
        border-radius:50%;

        img{
          margin-top:1rem;
        }
      }
    }
    .add{
      background-color: #546B48; 
      height:6rem;

      img{
        margin-top:2rem;
      }
    }
    .addDisable{
      margin-top:-10rem;
    }
  }

</style>

<template>
  <div>
    <div class="gallery"
         v-bind:style="{backgroundImage:'url(\'../../static/images/trip/'+curgallery+'.png\')'}">
      <div class="prev" v-on:click="changeImg(0)"><</div>
      <div class="next" v-on:click="changeImg(1)">></div>
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
      galleryList:['chongqing','huangshan','xiamen'],
      curgallery:'chongqing',
      tripList:[]
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      //setInterval(this.gallery,3000);
      this.getData();
    })
  },
  methods:{
    gallery: function(){
      let index = this.galleryList.indexOf(this.curgallery);
      if(index > 1){
        this.curgallery = this.galleryList[0];
      }else{
        this.curgallery = this.galleryList[index+1];
      }
    },
    changeImg: function(type){
      let index = this.galleryList.indexOf(this.curgallery);
      const gLength = this.galleryList.length;
      if(type == 0){
        if(index == 0){
          this.curgallery = this.galleryList[index+gLength-1];
        }else{
          this.curgallery = this.galleryList[index-1];
        }
      }else{
        if(index == gLength-1){
          this.curgallery = this.galleryList[index-gLength+1];
        }else{
          this.curgallery = this.galleryList[index+1];
        }
      }
    },
    getData: function(){
      let _this = this;
      this.$http.get('../../static/data/data.json').then((res)=>{
        _this.tripList = res.body.result.list;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gallery{
  width:100%;
  height:10rem;
  display:flex;
  justify-content: space-between;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

  .prev{
    width:1.6rem;
    height:1.6rem;
    border-radius: 50%;
    background: dimgray;
    align-self: center;
    margin-left: 4%;
    opacity:0.6;
    font-weight: bold;
    color:white;
  }
  .next{
    width:1.6rem;
    height:1.6rem;
    border-radius: 50%;
    background: dimgray;
    align-self: center;
    margin-right: 4%;
    opacity:0.6;
    font-weight: bold;
    color:white;
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

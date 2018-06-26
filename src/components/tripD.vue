<template>
  <div class="plan">
    <img v-bind:src="'../../'+planList.tripImage+'.jpg'" />
    <h1 v-html="planList.tripDestination"></h1>
    <textarea placeholder="Description Here" disabled class="description" v-html="planList.tripDescription"></textarea>
    <div class="route">
      <div class="day" v-for="(value , key) in planList.route">
        <div class="key">{{key}}</div>
        <div class="value">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tirpD",
      data(){
          return {
            planList:[]
          }
      },
      mounted: function(){
        this.$nextTick(function(){
          this.getAddressList();
           // console.log(this.$route.params.id);
        })
      },
      methods:{
        getAddressList: function(){
          let _this = this;
          this.$http.get('../../static/data/data.json').then((res)=>{
            let lists = res.body.result.list;
            lists.forEach(function(curlist){
              if(curlist.tripId == _this.$route.params.id){
                _this.planList = curlist;
                // console.log(_this.planList);
              }
            })
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .plan{
    width:100%;
    text-align:center;

    img{
      width:100%;
      height:10rem;
    }
    .description{
      width:80%;
      border:none;
      background-color:white;
      text-align:center;
    }
    .route{
       margin-bottom:2rem;

      .day{
        margin-top:1rem;

        .key{
          border-top:1rem solid #566E4A;
          border-bottom:1rem solid #1A1A1A;
          padding:0.4rem;
          font-weight:bold;
        }
        .value{
          margin:2rem auto;
        }
      }
    }
  }
  

</style>

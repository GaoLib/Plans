<template>
  <div>
    <div class="plans">
      <div class="route">{{planList.route}}</div>
    </div>
    <div class="next-btn-wrap">
      <a href="javascript:;" class="btn">Save</a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ComA",
      data(){
          return {
            planList:[]
          }
      },
      mounted: function(){
        this.$nextTick(function(){
          this.getAddressList();
          //console.log(this.$route.params.id);
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
              }
            })
          })
        }
      }
    }
</script>

<style scoped>
  .plans{
    margin-top: 20px;
  }
    .next-btn-wrap {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 101;
      text-align: center;
      border: none;
      }
    .next-btn-wrap .btn {
      display: block;
      padding:6px 10px;
      background-color: rgb(0,187,211);
      color:white;
    }

</style>

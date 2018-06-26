<template>
  <div>
    <div class="header">
      <router-link to="/trip"><icon class="back" name="back" scale="3"></icon></router-link>
      <img v-bind:src="done ? '../../static/images/trip/doneActive.png' : '../../static/images/trip/done.png'" v-on:click="haveDone">
    </div>
    <div class="details"><router-view/></div>
    <div class="edit"><icon name="edit" scale="3" class="editIcon"></icon></div>
  </div>
</template>

<script>
    export default {
        name: "Details",
      data(){
          return {
            done:''
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
                _this.done = curlist.done;
                // console.log(_this.done);
              }
            })
          })
        },
        haveDone: function(){
          this.done = !this.done;
        }
      }
    }
</script>

<style lang="scss" scoped>
.header{
    width:100%;
    height:3rem;
    background-color: white;

    .back{
      margin-top:0.6rem;
      margin-left:4%;
    }
    img{
      float:right;
      margin-right:4%;
      margin-top:0.5rem;
    }
  }
    .details{
      margin-top:2rem;
      margin-bottom:2rem;
    }
    .edit{
      position:fixed;
      bottom:1.6rem;
      right:2rem;
      width:4rem;
      height:4rem;
      border-radius:50%;
      background-color: rgba(26,26,26,0.8);
      text-align:center;
      z-index:100;

      .editIcon{
        margin-top:1rem;
      }
    }
</style>

<template>
  <div class="plan">
    <img v-bind:src="'../../'+planList.tripImage+'.jpg'" />
    <h1 v-html="planList.tripDestination"></h1>
    <textarea placeholder="Description Here" class="description" v-html="planList.tripDescription" :disabled="editStatus === 'false'"></textarea>
    <div class="route">
      <div class="day" v-for="(value , key,index) in planList.route">
        <div class="key">
          <span>{{key}}</span>
          <span class="delete" v-if="count === index+1 && editStatus === 'true'" @click="del(index)">Delete</span>
        </div>
        <textarea v-model="planList.route[key]" class="value" :disabled="editStatus === 'false'"></textarea>
      </div>
    </div>
    <button class="morebtn" v-if="editStatus === 'true'" @click="more">One More Day</button>
  </div>
</template>

<script>
   import {mapActions,mapGetters} from 'vuex'
   import Vue from 'vue'
    export default {
        name: "tirpD",
      data(){
          return {
            planList:[],
            count:0
          }
      },
      mounted: function(){
        this.$nextTick(function(){
          this.getAddressList();
        })
      },
      computed:{
        ...mapGetters(['editStatus'])
      },
      methods:{
        getAddressList: function(){
          let _this = this;
          this.$http.get('../../static/data/tripD.json').then((res)=>{
            let lists = res.body.result.list;
            lists.forEach(function(curlist){
              if(curlist.Id == _this.$route.params.id){
                _this.planList = curlist;
                for(let key in curlist.route){
                  _this.count ++;
                }
              }
            })
          })
        },
        more: function(){
          let key = 'Day'+(this.count+1);
          Vue.set(this.planList.route,key,'');
          this.count ++;
          // console.log(this.planList.route);
        },
        del: function(index){
          let value = 'Day' + (index + 1);
          Vue.delete(this.planList.route,value);
          this.count --;
        }
      },
      // watch:{
      //   editStatus: function(){
      //     console.log(this.editStatus);
      //   }
      // }
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
       // margin-bottom:2rem;

      .day{
        margin-top:1rem;

        .key{
          border-top:1rem solid #566E4A;
          border-bottom:1rem solid #1A1A1A;
          padding:0.4rem;
          font-weight:bold;

          .delete{
            float:right;
            margin-right:6%;
            color: #91AE81; 
          }
        }
        .value{
          margin:0.5rem auto;
          width:100%;
          border:none;
          height:6rem;
          background-color:white;
        }
      }
    }
    .morebtn{
      margin-top:1rem;
      border:none;
      background-color: #91AE81; 
      width:90%;
      margin:0 auto;
      padding:1rem 0.8rem;
      font-size:1rem;
    }
  }
  

</style>

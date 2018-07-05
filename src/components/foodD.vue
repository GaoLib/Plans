<template>
  <div class="plan">
    <img v-bind:src="'../../'+foodList.foodImage+'.jpg'" />
    <h1 v-html="foodList.foodDestination"></h1>
    <div class="addressContent">
      <icon name="position" class="position" scale="3"></icon>
    <textarea placeholder="Address Here" :disabled="editStatus === 'false'" class="address" v-html="foodList.foodAddress"></textarea>
    </div>
    <div class="route">
      <div class="day" v-for="(value , key,index) in foodList.foods">
        <div class="key">
          <input type="text" v-model="titles[index]" :disabled="editStatus === 'false'" class="text" @change="titleChange(key,index)">
          <span class="delete" v-if="count === index+1 && editStatus === 'true'" @click="del(key)">Delete</span>
        </div>
        <textarea v-model="foodList.foods[key]" class="value" :disabled="editStatus === 'false'"></textarea>
      </div>
    </div>
    <button class="morebtn" v-if="editStatus === 'true'" @click="more">One More Food</button>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import Vue from 'vue'
    export default {
        name: "foodD",
      data(){
          return {
            foodList:[],
            count:0,
            titles:[]
          }
      },
      mounted: function(){
        this.$nextTick(function(){
          this.getAddressList();
           // console.log(this.$route.params.id);
        })
      },
      computed:{
        ...mapGetters(['editStatus'])
      },
      methods:{
        getAddressList: function(){
          let _this = this;
          this.$http.get('../../static/data/foodD.json').then((res)=>{
            let lists = res.body.result.list;
            lists.forEach(function(curlist){
              if(curlist.Id == _this.$route.params.id){
                _this.foodList = curlist;
                for(let key in curlist.foods){
                  _this.count ++;
                  _this.titles.push(key);
                }
              }
            })
            // console.log(_this.titles);
          })
        },
        titleChange: function(key,index){
          let value = this.foodList.foods[key];
          Vue.delete(this.foodList.foods,key);
          Vue.set(this.foodList.foods,this.titles[index],value);
          // console.log(this.foodList.foods);
        },
        more: function(){
          let key = 'Food'+ (this.count+1); 
          Vue.set(this.foodList.foods,key,'');
          this.count++;
        },
        del: function(key){
          Vue.delete(this.foodList.foods,key);
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
    .addressContent{
      width:100%;
      // overflow:hidden;

      .position{
        margin-left:10%;
        vertical-align:middle;
      }
      .address{
        width:80%;
        border:none;
        background-color: white;
        color: #566E4A;
        vertical-align:middle;
        padding-top: 1rem;
      }
    }
    .route{
       margin-top:2rem;

      .day{
        margin-top:1rem;

        .key{
          border-top:1rem solid #566E4A;
          border-bottom:1rem solid #1A1A1A;
          padding:0.4rem;
          font-weight:bold;

          .text{
            border:none;
            background-color: white;
            font-weight:bold;
            font-size:1rem;
            text-align:center;
          }
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

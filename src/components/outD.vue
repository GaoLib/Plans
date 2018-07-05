<template>
  <div class="outD">
    <img :src="'../../'+outList.Image+'.jpg'">
    <div class="name">
      <h2>{{outList.title}}</h2>
      <input type="text" class="address" v-model="outList.Address" :disabled="editStatus === 'false'">
      <textarea class="description" v-model="outList.description" :disabled="editStatus === 'false'"></textarea>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "foodD",
      data(){
          return {
            outList:[]
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
          this.$http.get('../../static/data/outD.json').then((res)=>{
            let lists = res.body.result.list;
            lists.forEach(function(curlist){
              if(curlist.Id == _this.$route.params.id){
                _this.outList = curlist;
                console.log(_this.outList);
              }
            })
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
.outD{
  width:100%;
  background-color: rgba(86,110,74,0.6);
  text-align:center;

  img{
    width:70%;
    height:10rem;
   }
   .name{
     width:90%;
     background-color: white;
     margin:-2rem auto;
     position:relative;
     z-index:2;
     padding-top:0.6rem;
     padding-bottom:1rem;
     border-bottom:1px solid rgba(86,110,74,0.6);

     .address{
      // margin-top:2.4rem;
      padding:0.4rem 0;
      font-size:0.8rem;
      width:90%;
      text-align:center;
      border:none;
      background-color: white;
     }
     .description{
      margin-top:2rem;
      margin-bottom:2rem;
      font-size:1rem;
      padding:0 0.2rem;
      width:90%;
      height:18rem;
      border:none;
      background-color: white;
     }
   }
}
 
</style>

<template>
  <div>
    <div class="titleText">Activities</div>
    <div class="activities">
      <div class="activity" v-for="item in actList"><router-link :to="'/Details/outD/'+item.Id">
        <div class="type">{{item.type}}</div>
        <img :src="'../../'+item.Image+'.jpg'" class="img">
        <h4 class="title">{{item.title}}</h4>
        <p class="end">{{item.endtime}}</p></router-link>
      </div>
      <div class="activity add">
        <router-link to="/add"><img src="../../static/images/add.png"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Out",
      data(){
          return{
            actList:[]
          }
        },
      mounted:function(){
          this.$nextTick(function(){
            this.getData();
            
          })
        },
        // computed:{
        //   endtime: function(){
        //     for(let item in this.actList){
        //        return this.actList[item].endtime;
        //     }
        //   }
        // },
      methods:{
          getData: function(){
            let _this=this;
            this.$http.get('../../static/data/outD.json').then((res)=>{
              _this.actList = res.body.result.list;
              for (let index in _this.actList){
                if(_this.actList[index].endtime){
                  _this.actList[index].endtime += ' 结束'; 
                }else{
                  _this.actList[index].endtime = '----------';
                }
              }
              // console.log(_this.actList);
            })
          }
      }
    }
</script>

<style lang="scss" scoped>
.titleText{
  width:94%;
  background-color: #566E4A;
  text-align:center;
  font-size:1.6rem;
  padding:0.6rem;
  color: white;
}
.activities{
  width:100%;
  text-align:center;
  margin-top:1rem;
  
  .activity{
    display:inline-block;
    width:44%;
    height:12rem;
    margin:0.8rem 0.4rem;
    position:relative;
    vertical-align:middle;

    &:nth-child(odd):last-child{
      float:left;
      margin-left:4%;
    }
    
    .type{
      position:absolute;
      top:0;
      left:0;
      padding:0.4rem;
      background-color: #566E4A;
      color: white;
    }
    .img{
      width:100%;
      height:6rem;
    }
    .end{
      color:gray;
      font-size: 0.8rem;
    }
    .title{
      color: rgb(26,26,26);
    }
  }
  .add{
    background-color: #566E4A;

    img{
      margin-top:4.5rem;
    }
  }
}
</style>

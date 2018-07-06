<template>
  <div>
    <div class="titleText">Activities</div>
    <div class="activities">
      <div v-for="(item,index) in actList">
        <div :class="['activity',{'activityRightDisable': deleteFlag && curDeleteNum % 2 === 1 && curDeleteNum < index},{'activityLeftDisable1':deleteFlag && curDeleteNum % 2 === 0 && index % 2 === 1 && index > curDeleteNum},{'activityLeftDisable2':deleteFlag && curDeleteNum % 2 === 0 && index % 2 === 0 && index > curDeleteNum}]" @touchstart="_deleteStart(index)" @touchend="_deleteEnd"><router-link :to="'/Details/outD/'+item.Id">
          <div class="type">{{item.type}}</div>
          <img :src="'../../'+item.Image+'.jpg'" class="img">
          <h4 class="title">{{item.title}}</h4>
          <p class="end">{{item.endtime}}</p></router-link>
        </div>
        <div :class="['activity', {'leftdisable': curDeleteNum % 2 === 0},{'rightdisable':curDeleteNum % 2 == 1}]" v-if="curDeleteNum === index" @click="cancel">
          <div class="iconContainer"><img src="../../static/images/delete.png" @click="deleted"></div>
        </div>
      </div>
      <div :class="['activity','add',{'addRightDisable':deleteFlag && curDeleteNum % 2 === 1},{'addLeftDisable':deleteFlag && curDeleteNum % 2 === 0}]">
        <router-link to="/add/outA"><img src="../../static/images/add.png"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
      name: "Out",
      data(){
          return{
            actList:[],
            curDeleteNum:'',
            deleteFlag:false
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
          },
          _deleteStart: function(index){
            let _this = this;
            this.timeOutEvent = setTimeout(function(){
               _this.curDeleteNum = index;
               _this.deleteFlag = true;
            },500)
          },
          _deleteEnd: function(){
            clearTimeout(this.timeOutEvent);
          },
          cancel: function(){
            this.curDeleteNum = '';
            this.deleteFlag = false;
          },
          deleted: function(ev){
            ev.stopPropagation();
            Vue.delete(this.actList,this.curDeleteNum);
            this.deleteFlag = false;
            this.curDeleteNum = '';
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
    margin:0.8rem 0.2rem;
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
  .activityRightDisable{
    top: -14rem;
  }
  .activityLeftDisable1{
    top: -13.6rem;
    left: 50%;
  }
  .activityLeftDisable2{
    left: -48%;
  }
 
  .leftdisable{
      background-color: rgba(128,128,128,0.6);
      position:relative;
      top:0;
      left:-47%;

      .iconContainer{
        background-color: red;
        margin:4rem auto;
        width:4rem;
        height:4rem;
        border-radius:50%;

        img{
          margin-top:1rem;
        }
      }
    }
  .rightdisable{
      background-color: rgba(128,128,128,0.6);
      position:relative;
      top:-13.6rem;
      right:-25%;
      height:12.2rem;

      .iconContainer{
        background-color: red;
        margin:4rem auto;
        width:4rem;
        height:4rem;
        border-radius:50%;

        img{
          margin-top:1rem;
        }
      }
  }

  .add{
    background-color: #566E4A;

    img{
      margin-top:4.5rem;
    }
  }
  .addRightDisable{
    margin-top:-12rem;
  }
  .addLeftDisable{
    left:-48%;
  }
}
</style>

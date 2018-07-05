<template>
  <div>
    <div class="header">
      <img class="back" src="../../static/images/back.png" v-on:click="back">
      <img v-bind:src="done === 'true' ? '../../static/images/trip/doneActive.png' : '../../static/images/trip/done.png'" v-on:click="haveDone" class="done">
    </div>
    <div class="details"><router-view/></div>
    <div class="backContainer" v-if="backFlag">
      <div class="backConfirm">
        <h3>Save changes?</h3>
        <button @click="confirmed">Yes</button><button @click="confirmed">No</button>
      </div>
    </div>
    <div class="edit" @click="editDetails('true')" v-if="editStatus === 'false'"><img src="../../static/images/trip/edit.png" class="editIcon"></div>
    <div class="edit" @click="save('false')" v-if="editStatus === 'true'"><img src="../../static/images/trip/save.png" class="editIcon"></div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "Details",
      data(){
          return {
            done:'',
            path:'',
            backFlag:false
          }
      },
      mounted: function(){
        this.$nextTick(function(){
          this.getAddressList();
          // console.log(this.$route);
        })
      },
      computed:{
        ...mapGetters(['editStatus'])
      },
      methods:{
        getAddressList: function(){
          let _this = this;
          this.path = this.$route.fullPath.split('/')[2];
          this.$http.get('../../static/data/'+this.path+'.json').then((res)=>{
            let lists = res.body.result.list;
            lists.forEach(function(curlist){
              if(curlist.Id == _this.$route.params.id){
                _this.done = curlist.done;
                // console.log(_this.done);
              }
            })
          })
        },
        haveDone: function(){
          this.done = !this.done;
        },
        ...mapActions(['editDetails']),
        ...mapActions(['save']),
        back: function(){
          if(this.editStatus === 'true'){
            this.backFlag = true;
          }else{
             this.$router.back(-1);
          }
        },
        confirmed: function(){
          this.save('false');
          this.$router.back(-1);
        }
      }
    }
</script>

<style lang="scss" scoped>
.header{
    width:100%;
    height:3rem;
    background-color: white;
    position:fixed;
    z-index:100;
    top:0;
    left:0;

    .back{
      margin-top:0.6rem;
      margin-left:4%;
    }
    .done{
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
    .backContainer{
      position:fixed;
      width:100%;
      height:100%;
      top:0;
      left:0;
      background-color: rgba(26,26,26,0.6);
      z-index:111;
      .backConfirm{
        position:fixed;
        width:60%;
        height:8rem;
        top:40%;
        left:18%;
        background-color: white;
        text-align:center;

        button{
          border:none;
          margin:1rem;
          background-color: #91AE81; 
        }
      }
    }
</style>

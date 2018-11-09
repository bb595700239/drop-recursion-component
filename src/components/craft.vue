<template>
  <div class="craft-box">
    <!--<div>{{craftLineCopy}}</div>-->
    <div class="flex-box flex-center" v-if="!notEdit">
      <el-button type="warning" class="flex-box" plain @click="adds(items[0])">添加主流程<i class="el-icon--right el-icon-circle-plus-outline"></i></el-button>
      <el-button type="success" class="flex-box" plain @click="adds(items[1])">添加半成品<i class="el-icon--right el-icon-circle-plus-outline"></i></el-button>
      <el-button type="primary" class="flex-box" plain @click="adds(items[2])">添加工序<i class="el-icon--right el-icon-circle-plus-outline"></i></el-button>
    </div>
    <div class="flex-box flex-center">
      <ul class="craft-info flex-box" @dragover.stop="handleDragOver" @drop.stop="handleDrag">
        <items :model='model' :item-height="itemHeight" v-for='(model,index) in craftLineCopy' :key="index"></items>
      </ul>
    </div>
    <!--{{$store.state.selectHash}}
    {{$store.state.startHash}}-->
  </div>
</template>

<script>
  import * as global from "../config/mUtils";
  import items from './flow.vue'
  export default {

    data() {
      return {
        items: [
          {
            procedureType: 'flow',
            procedureName: '主流程',
            children: []
          },
          {
            procedureType: 'semi',
            procedureName: '边方块',
            children: [{
              procedureType: 'process',
              procedureName: '工序',
              children: []
            }]
          },
          {
            procedureType: 'process',
            procedureName: '工序',
            children: [],
            checkState: false
          }
        ],
        itemHeight: 54,
        hasSelect: false,
        craftLineCopy:[]
      }
    },
    props: {
      craftLine: {
        type: Array
      },
      addBefore: {
        type: Function
      },
      notEdit: {
        type: Boolean
      },
    },
    computed: {},
    created(){

    },
    mounted() {
      this.craftLineCopy = this.craftLine
      this.$store.state.selectHash = this.craftLineCopy[0].hash
    },
    components: {
      items
    },
    methods: {
      adds(type){
        this.addBefore(type,this.addresult)
      },
      addresult(type){
        this.recursion(this.craftLineCopy, this.$store.state.selectHash, (arrs, j) => {
          if (arrs[j].procedureType == 'flow') {
            const types = Object.assign({}, {hash: Date.now(), children: []}, type)
            arrs[j].children.push(types)
          }
          this.craftLineCopy = JSON.parse(JSON.stringify(this.craftLineCopy))
        })
      },
      handleDragOver(el){
        el.preventDefault();//重要
        el.dataTransfer.dropEffect = 'move';
        if(el.target.className.indexOf('fixed')>-1){
          return
        }
        const activeHash = el.target.getAttribute('data-hash');
        if (activeHash != null) {
          this.$store.state.activeHash = activeHash
          const center = el.target.getBoundingClientRect().y + (el.target.getBoundingClientRect().height / 2)
          if (el.pageY > center) {
            this.$store.state.activeDirection = 'bottom'
          } else {
            this.$store.state.activeDirection = 'top'
          }
        }
      },
      handleDrag(){
        if (this.$store.state.activeHash == -1 || this.$store.state.startHash == -1 || this.$store.state.startHash == this.$store.state.activeHash) {
          return
        }
        this.remove(this.craftLineCopy, this.$store.state.startHash)
        this.add(this.craftLineCopy, this.$store.state.activeHash)
        this.recursion(this.craftLineCopy,this.$store.state.selectHash,(arrs, j)=>{
          if(arrs[j].procedureType == 'process'){
            this.$emit('get-list',arrs)
          }
        })
      },
      remove(arr, hash){
        this.recursion(arr, hash, (arrs, j) => {
          this.$store.state.moveItem = arrs[j]
          arrs.splice(j, 1);
        })
      },
      add(arr, hash){
        this.recursion(arr, hash, (arrs, j) => {
          if (this.$store.state.activeDirection === 'top') {
            arrs.splice(j, 0, this.$store.state.moveItem);
          } else {
            arrs.splice(j + 1, 0, this.$store.state.moveItem);
          }

        })
      },
      recursion(arrs, h, fn){
        for (let j = 0; j < arrs.length; j++) {
          if (Number(arrs[j].hash) === Number(h)) {
            fn(arrs, j)
            return false
          } else {
            if (arrs[j].children && arrs[j].children.length > 0) {
              this.recursion(arrs[j].children, h, fn)
            }
          }
        }
      },
    },
    watch: {
      '$store.state.deleteHash': {
        handler (val) {
          this.hasSelect = false
          this.recursion(this.craftLineCopy, val, (arrs, j) => {
            arrs.splice(j, 1);
          })
          this.recursion(this.craftLineCopy, this.$store.state.selectHash, (arrs, j) => {
            this.hasSelect = true
          })
          if (!this.hasSelect) {
            this.$store.state.selectHash = this.craftLineCopy[0].hash
          }
        },
      },
      '$store.state.selectHash':function(val){
        this.recursion(this.craftLineCopy,val,(arrs, j)=>{
          if(arrs[j].procedureType == 'process'){
            this.$emit('get-list',arrs)
          }
        })
      },
      'craftLineCopy':function(val){
        this.$emit('line',val)
      },
    }
  };
</script>

<style lang="scss">
  @import '../assets/css/mixin';
  .flex-center{
    justify-content: center;
  }
  .craft-info {
    user-select: none;
    margin-top: 50px;
    .item {
      display: flex;

      .item-info {
        width: 122px;
        margin: 0 7px;
        position: relative;
        border-radius: 4px;
        margin-bottom: 15px;
        cursor: pointer;
        min-height: 54px;
        .j-delete {
          @include ct();
          left: 5px;
          z-index: 20;
        }
        &.process {
          background-color: #FFB84D;
          border: 1px dashed #333;
        }
        &.semi {
          background-color: #41D6FB;
        }
        &.flow {
          background-color: #4584FF;
        }
        &.border {
          border: 1px solid red;
        }
        &.top, &.bottom {
          &:after {
            position: absolute;
            content: '';
            width: 100%;
            box-sizing: border-box;
            border: 1px dashed #999;
            background-color: #ccc;
            height: 10px;
            border-radius: 4px;
          }
        }
        &.top:after {
          top: -12.5px;
        }
        &.bottom:after {
          bottom: -12.5px;
        }
        &.disabled {
          opacity: .3;
          &:after {
            display: none;
          }
        }
        .info {
          color: #333;
          text-align: center;
          font-size: 16px;
          @include center();
          width: 100%;
        }
      }
      .isShow {
        display: none;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <li class="item">

    <div class="item-info"
         :class="[model.procedureType,{border:$store.state.selectHash==model.hash},$store.state.activeHash==model.hash?$store.state.activeDirection:'',{disabled:$store.state.startHash==model.hash},{fixed:model.fixed}]"
         :style="{height: itemHeight+'px'}"
         v-if="model.procedureType === 'process'"
         :draggable="!model.fixed"
         :data-hash="model.hash"
         @dragstart.stop="changeDragStart"
         @dragend.stop="changeDragEnd"
         @click.stop.prevent="select(model)">
      <div class="j-delete" v-if="!model.fixed"><i class="el-icon-remove-outline" @click.stop.prevent="del(model.hash)"></i></div>
      <div class="info">
        {{model.procedureName}}
      </div>
    </div>
    <div class="item-info"
         :class="[model.procedureType,{border:$store.state.selectHash==model.hash},$store.state.activeHash==model.hash?$store.state.activeDirection:'',{disabled:$store.state.startHash==model.hash}]"
         v-else-if="model.procedureType === 'semi'"
         @click.stop.prevent="select(model)"
         draggable="true"
         :data-hash="model.hash"
         @dragstart.stop="changeDragStart"
         @dragend.stop="changeDragEnd">
      <div class="info">
        {{model.procedureName}}<span v-if="model.procedureQuantity&&model.procedureQuantity>1">*{{model.procedureQuantity}}</span>
        <div @click.stop.prevent="isShow = !isShow;" v-if="totalNum>0"><i :class="isShow?'el-icon-caret-bottom':'el-icon-caret-top'"></i>{{totalNum}}道工序
        </div>
        <div class="j-delete"><i class="el-icon-remove-outline" @click.stop.prevent="del(model.hash)"></i></div>
      </div>

    </div>
    <div class="item-info"
         :class="[model.procedureType,{border:$store.state.selectHash==model.hash},$store.state.activeHash==model.hash?$store.state.activeDirection:'',{disabled:$store.state.startHash==model.hash},{fixed:model.fixed}]"
         v-else
         :draggable="!model.fixed"
         :data-hash="model.hash"
         @dragstart.stop="changeDragStart"
         @dragend.stop="changeDragEnd"
         @click.stop.prevent="select(model)">
      <div class="info">
        {{model.procedureName}}
        <div v-if="totalNum>0">{{totalNum}}道工序</div>
        <div class="j-delete" v-if="!model.fixed"><i class="el-icon-remove-outline" @click.stop.prevent="del(model.hash)"></i></div>
      </div>
    </div>
    <ul v-if="model.children&&model.children.length>0" :class="{isShow:!isShow}">
      <items v-for='(cel,index) in model.children' :model='cel' :item-height="itemHeight" :key="index">
      </items>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'items',
    props: ['model', 'itemHeight', 'edit'],
    data () {
      return {
        totalNum: 0,
        isShow: true,
      }
    },
    mounted () {
      this.total(this.model)
    },
    computed: {},
    methods: {
      total(item){
        if (item.children && item.children.length > 0) {
          item.children.forEach((i) => {
            this.total(i)
          })
        } else {
          if (item.procedureType === 'process') {
            this.totalNum++
          }
        }
      },
      changeDragStart(el) {
        this.$store.state.startHash = el.target.getAttribute('data-hash')
      },
      changeDragEnd(el) {
        this.$store.state.startHash = -1
        this.$store.state.activeHash = -1
      },
      select(model){
        this.$store.state.selectHash = model.hash
      },
      del(hash){
        this.$store.state.deleteHash = hash
      }
    },
    components: {},
    filters: {},
    watch: {
      model: {
        handler: function (val, oldval) {
          this.totalNum = 0
          this.total(this.model)
        },
        deep: true//对象内部的属性监听，也叫深度监听
      },
    }
  }
</script>
<style lang="scss">
  @import '../assets/css/mixin';

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
        display: none;
        .el-icon-remove-outline{
          @include sc(20px,$fc);
          margin: 5px 0;
        }
      }
      &:hover{
        .j-delete {
          display: block;
        }
      }
      &.process {
        background-color: #FFB84D;
        border: 1px dashed #333;
      }
      &.semi,&.half {
        background-color: #41D6FB;
      }
      &.flow,&.product {
        background: $blue;
        background: linear-gradient(180deg, rgba(87, 132, 255, 1) 0%, rgba(41, 134, 255, 1) 100%);
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
</style>

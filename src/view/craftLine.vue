<template>
  <div class="warp-box flex-direction-box">
    <div><el-button type="primary" @click="add">外部添加自带工序</el-button></div>
    <craft :craft-line="craftLine" :add-before="addBefore" ref="craft" @get-list="getList"></craft>
  </div>
</template>

<script>
  import craft from '../components/craft.vue'
  export default {

    data() {
      return {
      	craftLine:[
          {
            procedureType: 'flow',
            procedureName: '主流程',
            hash: 1539651058192,
            fixed:true,
            children: [
              {
                procedureType: 'semi',
                procedureName: '半成品',
                hash: 1539651058193,
                fixed:true,
                children: [
                  {
                    procedureType: 'process',
                    procedureName: '自带工序',
                    hash: 1539651058194,
                    fixed:true,
                  },
                  {
                    procedureType: 'process',
                    procedureName: '自带工序2',
                    hash: 1539651058195,
                    fixed:true,
                  }
                ]
              }
            ]
          }
        ],
        halfList:[]
      }
    },
    computed: {},
    mounted() {

    },
    components: {
      craft
    },
    methods: {
      addBefore(item,next){
      	//console.log(item)
        // do something
        //item.dddd=111
        next(item)
      },
      add(){
        this.$refs.craft.addresult({
          procedureType: 'process',
          procedureName: '自带工序',
          hash: 1539651058195
        })
      },
      getList(arr){
        this.halfList = []
        let arrs = JSON.parse(JSON.stringify(arr))
        arrs.reverse()
        let start = null
        let end = arrs.length
        let halfList = []
        for(let i=0; i<arrs.length; i++){
          if(arrs[i].hash == this.$store.state.selectHash){
            start = i
            console.log(start)
          } else if(arrs[i].procedureType == 'process' && start != null){
            end = i
            console.log(end)
            break
          }
        }
        if(end-start>1){
          halfList = arrs.slice(start+1,end)
          halfList.forEach(item => {
            if(item.procedureType == 'semi'){
              this.halfList.push(item)
            } else {
              this.getHalf(item.children)
            }
          })
        }
        console.log(this.halfList)
      },
      getHalf(arr){
        arr.forEach(item => {
          if(item.procedureType == 'semi'){
            this.halfList.push(item)
          } else if(item.children&&item.children.length>0){
            this.getHalf(item.children)
          }
        })
      }
    },
    watch: {
    }
  };
</script>

<style lang="scss">
  @import '../assets/css/mixin';


</style>

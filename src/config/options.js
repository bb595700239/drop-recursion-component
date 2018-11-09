import Vue from 'vue'

Vue.prototype.J_options = {
  //使用状态
  useState:[
    { label: '使用中', value: 1},
    { label: '已冻结', value: 2},
    { label: '已删除', value: 0},
  ],
  //部门
  departments:[
    { label: '研发部', value: 1},
    { label: '生产部', value: 2},
    { label: '质量部', value: 3},
    { label: '仓库部', value: 4},
  ],
  //维修原因
  repairReason:[
    { label: '操作失误', value: 1},
    { label: '例行保养', value: 2},
    { label: '检点不到位', value: 3},
    { label: '正常配件更换', value: 4},
    { label: '其他', value: 4},
  ],
  //设备启用状态
  equipmentState:[
    { label: '已启用', value: 1},
    { label: '委外维修中', value: 2},
    { label: '维修中', value: 3},
  ],
  //模具工装类型
  mouldType:[
    { label: '拉伸-凸模', value: 1},
    { label: '拉伸-凹模', value: 2},
    { label: '拉伸-切边模', value: 3},
    { label: '拉伸-翻边模', value: 4},
    { label: '冲压-落料', value: 5},
    { label: '冲压-冲孔', value: 6},
    { label: '冲压-成型', value: 7},
    { label: '冲压-整形', value: 8},
  ],
  //通知记录类型
  messageType:[
    { label: '质检通知', value: 1},
    { label: '财务通过(仓库)', value: 2},
    { label: '生产延期通知', value: 3},
    { label: '主管审核', value: 4},
    { label: '采购需求', value: 5},
    { label: '财务审核', value: 6},
    { label: '财务到期', value: 7},
    { label: '财务通过', value: 8},
    { label: '产品提交入库', value: 9},
    { label: '产品报修', value: 10},
    { label: '物料预警', value: 11},
  ],
  //产品类型
  productType:[
    { label: '成品', value: 1},
    { label: '半成品', value: 2},
  ],
  //产品状态
  productState:[
    { label: '发布', value: 1},
    { label: '未发布', value: 2},
  ],
  //关注点标准类型
  pointsType:[
    { label: '>', value: 1},
    { label: '<', value: 2},
    { label: '范围', value: 3},
    { label: '+-', value: 4},
    { label: '人工判断', value: 5},
  ],
  //订单类型
  orderType:[
    { label: '国内订单', value: 1},
    { label: '国外订单', value: 2},
    { label: '子订单', value: 3},
  ],
  //结算方式
  payType:[
    { label: '付清发货', value: 1},
    { label: '货到付款', value: 2},
  ],
  //包装方式
  packagingType:[
    { label: '纸箱', value: 1},
    { label: '托盘', value: 2},
  ],
  //事件类型
  planType:[
    { label: '普通', value: 1},
    { label: '指定日期', value: 2},
    { label: '月结', value: 3},
    { label: '到货后', value: 4},
  ],

}

//订单类型
Vue.filter('orderType', (val) => {
  switch (val) {
    case 1:
      return '国内订单';
    case 2:
      return '国外订单';
    case 3:
      return '子订单';
    default:
      return val;
  }
});

//结算方式
Vue.filter('payType', (val) => {
  switch (val) {
    case 1:
      return '付清发货';
    case 2:
      return '货到付款';
    default:
      return val;
  }
});

//包装方式
Vue.filter('packagingType', (val) => {
  switch (val) {
    case 1:
      return '纸箱';
    case 2:
      return '托盘';
    default:
      return val;
  }
});

//质检类别
Vue.filter('qualityTest', (val) => {
  switch (val) {
    case 1:
      return '首检';
    case 2:
      return '巡检';
    case 3:
      return '末检';
    case 4:
      return '中检/成品检验';
    case 5:
      return '采购物料检验';
    case 6:
      return '委外产品检验';
    default:
      return val;
  }
});

//使用状态（1使用中 2已冻结 0删除）
Vue.filter('useState', (val) => {
  switch (val) {
    case 1:
      return '使用中';
    case 2:
      return '已冻结';
    case 0:
      return '已删除';
    default:
      return val;
  }
});

//部门（1研发部 2生产部 3质量部 4 仓库部）
Vue.filter('departments', (val) => {
  switch (val) {
    case 1:
      return '研发部';
    case 2:
      return '生产部';
    case 3:
      return '质量部';
    case 4:
      return '仓库部';
    default:
      return val;
  }
});

//设备启用状态(1/已启用 2/委外维修中 3/维修中)
Vue.filter('equipmentState', (val) => {
  switch (val) {
    case 1:
      return '已启用';
    case 2:
      return '委外维修中';
    case 3:
      return '维修中';
    default:
      return '已报废';
  }
});

//故障原因（1 操作失误 2例行保养 3检点不到位 4正常配件更换 5其他）
Vue.filter('repairReason', (val) => {
  switch (val) {
    case 1:
      return '操作失误';
    case 2:
      return '例行保养';
    case 3:
      return '检点不到位';
    case 4:
      return '正常配件更换';
    case 5:
      return '其他';
    default:
      return val;
  }
});

//维修结果（1/成功 2/报废）
Vue.filter('repairResult', (val) => {
  switch (val) {
    case 1:
      return '成功';
    case 2:
      return '报废';
    default:
      return val;
  }
});

//模具工装类型(1拉伸-凸模，2拉伸-凹模，3拉伸-切边模，4拉伸-翻边模，5冲压-落料，6冲压-冲孔，7冲压-成型，8冲压-整形)
Vue.filter('mouldType', (val) => {
  switch (val) {
    case 1:
      return '拉伸-凸模';
    case 2:
      return '拉伸-凹模';
    case 3:
      return '拉伸-切边模';
    case 4:
      return '拉伸-翻边模';
    case 5:
      return '冲压-落料';
    case 6:
      return '冲压-冲孔';
    case 7:
      return '冲压-成型';
    case 8:
      return '冲压-整形';
    default:
      return val;
  }
});

//通知类型
Vue.filter('messageType', (val) => {
  switch (val) {
    case 1:
      return '质检通知';
    case 2:
      return '财务通过(仓库)';
    case 3:
      return '生产延期通知';
    case 4:
      return '主管审核';
    case 5:
      return '采购需求';
    case 6:
      return '财务审核';
    case 7:
      return '财务到期';
    case 8:
      return '财务通过';
    case 9:
      return '产品提交入库';
    case 10:
      return '产品报修';
    case 11:
      return '物料预警';
    default:
      return val;
  }
});

//产品类型（1/成品 2/半成品）
Vue.filter('productType', (val) => {
  switch (val) {
    case 1:
      return '成品';
    case 2:
      return '半成品';
    default:
      return val;
  }
});

//产品状态（1/发布 2/未发布)
Vue.filter('productState', (val) => {
  switch (val) {
    case 1:
      return '已发布';
    case 2:
      return '未发布';
    default:
      return val;
  }
});

//订单类型1/国内 2/国外 3/子订单)
Vue.filter('ordersType', (val) => {
  switch (val) {
    case 1:
      return '国内订单';
    case 2:
      return '国外订单';
    case 3:
      return '子订单';
    default:
      return val;
  }
});

//状态1/已逾期 2/未逾期)
Vue.filter('outStatus', (val) => {
  switch (val) {
    case 1:
      return '已逾期';
    case 0:
      return '未逾期';
    default:
      return val;
  }
});

//收款类型1预付款 2尾款)
Vue.filter('ordersPaymentPlanType', (val) => {
  switch (val) {
    case 1:
      return '预付款';
    case 2:
      return '尾款';
    default:
      return val;
  }
});


//采购状态(1采购中2已完成3已入库)
Vue.filter('procurementPlanState', (val) => {
  switch (val) {
    case 1:
      return '采购中';
    case 2:
      return '已完成';
    case 3:
      return '已入库';
    default:
      return val;
  }
});

//货架类型(1/大 2/中 3/小)
Vue.filter('storageRackType', (val) => {
  switch (val) {
    case 1:
      return '大';
    case 2:
      return '中';
    case 3:
      return '小';
    default:
      return val;
  }
});

//货架存入类型（1采购入库  2生产入库  3特殊入库）
Vue.filter('storageDepositRecordType', (val) => {
  switch (val) {
    case 1:
      return '采购入库';
    case 2:
      return '生产入库';
    case 3:
      return '特殊入库';
    default:
      return val;
  }
});

//货架取用类型(1/生产领料  2/订单发货  3特殊出库)
Vue.filter('storageTakeRecordType', (val) => {
  switch (val) {
    case 1:
      return '生产领料';
    case 2:
      return '订单发货';
    case 3:
      return '特殊出库';
    default:
      return val;
  }
});

// 1 已审核 0未审核
Vue.filter('stocktakesState', (val) => {
  switch (val) {
    case 0:
      return '未审核';
    case 1:
      return '已审核';
    case 3:
      return '已通过';
    case 4:
      return '已驳回';
    default:
      return val;
  }
});

// 	区域类型（”货架管理”, 0), (“工位管理”, 1）
Vue.filter('areaType', (val) => {
  switch (val) {
    case 0:
      return '货架管理';
    case 1:
      return '工位管理';
    default:
      return val;
  }
});

//任务状态（1盘库中 2审核中 3已完成 4已驳回 0/删除标志）
Vue.filter('stocktakesState', (val) => {
  switch (val) {
    case 1:
      return '盘库中';
    case 2:
      return '审核中';
    case 3:
      return '已完成';
    case 4:
      return '已驳回';
    default:
      return val;
  }
});

//类型 1/成品 2/半成品生产）
Vue.filter('productType', (val) => {
  switch (val) {
    case 1:
      return '成品';
    case 2:
      return '半成品';
    default:
      return val;
  }
});
//类型 1/成品 2/半成品生产）
Vue.filter('productionType', (val) => {
  switch (val) {
    case 1:
      return '成品';
    case 2:
      return '半成品';
    default:
      return val;
  }
});





//生产任务状态(1生产中2已完成3已入库)
Vue.filter('productionPlanState', (val) => {
  switch (val) {
    case 1:
      return '生产中';
    case 2:
      return '已完成';
    case 3:
      return '已入库';
    default:
      return val;
  }
});

////备货状态 (1 待备货 2 备货中 3备货完成)
Vue.filter('productionOutState', (val) => {
  switch (val) {
    case 1:
      return '待备货';
    case 2:
      return '正在备货';
    case 3:
      return '已备货';
    default:
      return val;
  }
});


////// 物料类型1 原料 2半成品
Vue.filter('goodsType', (val) => {
  switch (val) {
    case 1:
      return '原材料';
    case 2:
      return '半成品';
    default:
      return val;
  }
});

//产品:（1/成品  2/半成品
Vue.filter('thingType1', (val) => {
  switch (val) {
    case 1:
      return '成品';
    case 2:
      return '半成品';
    default:
      return val;
  }
});

//是否入库:（1/是  2/否
Vue.filter('yesNo', (val) => {
  switch (val) {
    case 1:
      return '是';
    case 0:
      return '否';
    default:
      return val;
  }
});

//模具工装:(1拉伸-凸模，2拉伸-凹模，3拉伸-切边模，4拉伸-翻边模，5冲压-落料，6冲压-冲孔，7冲压-成型，8冲压-整形)
Vue.filter('thingType2', (val) => {
  switch (val) {
    case 1:
      return '拉伸-凸模';
    case 2:
      return '拉伸-凹模';
    case 3:
      return '拉伸-切边模';
    case 4:
      return '拉伸-翻边模';
    case 5:
      return '冲压-落料';
    case 6:
      return '冲压-冲孔';
    case 7:
      return '冲压-成型';
    case 8:
      return '冲压-整形';
    default:
      return val;
  }
});

//状态(1未开始2等待首检3首检完成,待开始4,进行中5待末检6已完成7暂停)
Vue.filter('productionAdminState', (val) => {
  switch (val) {
    case 1:
      return '未开始';
    case 2:
      return '等待首检';
    case 3:
      return '待开始';
    case 4:
      return '进行中';
    case 5:
      return '待末检';
    case 6:
      return '已完成';
    case 7:
      return '暂停';
    default:
      return val;
  }
});

//订单状态(1未开始2等待首检3首检完成,待开始4,进行中5待末检6已完成7暂停)
Vue.filter('orderState', (val) => {
  switch (val) {
    case '1':
      return '未审核';
    case '2':
      return '审核中';
    case '3':
      return '跟进中';
    case '4':
      return '已完成';
    case '5':
      return '坏账';
    default:
      return val;
  }
});



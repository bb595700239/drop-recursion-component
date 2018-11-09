import axios from 'axios'
import {mainUrl, ssoUrl} from '../config/env'
import * as mobile from './../config/mUtils'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'


axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let channelId = sessionStorage.getItem('channelId');
  let adminAccount = sessionStorage.getItem('adminAccount');
  let allSessionId = sessionStorage.getItem('allSessionId');
  let permissionId = sessionStorage.getItem('permissionId');
  // if (!channelId || !adminAccount || !allSessionId || !permissionId) {
  //   location.href = localStorage.getItem('channelChannelUrl') ? localStorage.getItem('channelChannelUrl') : localStorage.getItem('channelUrl');
  // }
  config.headers['channelId'] = channelId;
  config.headers['adminAccount'] = adminAccount;
  config.headers['allSessionId'] = allSessionId;
  config.headers['permissionId'] = permissionId;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data.code == 2) {
    // alert('登录超时，请重新登录！');
    let channelChannelUrl = localStorage.getItem('channelChannelUrl') ? localStorage.getItem('channelChannelUrl') : localStorage.getItem('channelUrl');
    channelChannelUrl = JSON.parse(JSON.stringify(channelChannelUrl));
    if (channelChannelUrl) {
      sessionStorage.clear();
      location.href = channelChannelUrl;
      localStorage.clear();
    } else {
      let url = mobile.getQueryString('channelChannelUrl');
      let formUrl = mobile.getQueryString('fromUrl');
      if (url) {
        sessionStorage.clear();
        location.href = decodeURIComponent(url);
        localStorage.clear();
      } else if (formUrl) {
        sessionStorage.clear();
        location.href = decodeURIComponent(formUrl);
        localStorage.clear();
      }
    }
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
});

let searchParams = (prop) => {
  let param = new URLSearchParams();
  for (let key in prop) {
    param.append(key, prop[key])
  }
  return param
}
//手机端
let transformRequest = (data) => {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}

//产品及工艺管理

/**
 * 产品列表
 * 参数名	必选	类型	说明
 * pageIndex	是	Integer	页码
 * pageSize	是	Integer	页面大小
 * productState	是	Integer	状态 1/发布 2/未发布
 * productNumber	否	string	编号
 * productName	否	string	名称
 * productArticleNumber	否	string	品号
 * productModel	否	string	型号
 * productType	否	Inteegr	产品类型 1/成品 2/半成品
 * productClientId	否	Long	客户ID
 */

let productList = (data) => axios.get(`/erp_back/product/productList`, {params:data});

/**
 * 删除产品接口
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let deleteProduct = (productId) => axios.post(`/erp_back/product/deleteProduct`, `productId=${productId}`);

/**
 * 取消发布产品
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let cancelProduct = (productId) => axios.post(`/erp_back/product/cancelProduct`, `productId=${productId}`);

/**
 * 发布产品
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let releaseProduct = (productId) => axios.post(`/erp_back/product/releaseProduct`, `productId=${productId}`);

/**
 * 产品详情
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let getProduct = (productId) => axios.get(`/erp_back/product/getProduct`, {params:{productId:productId}});

/**
 * 更新产品
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 * productNumber	是	string	产品编号
 * productClientId	是	Long	客户ID
 * productName	是	string	产品名称
 * productModel	是	string	型号
 * productArticleNumber	是	string	品号
 * productState	是	Integer	产品状态（1/发布 2/未发布)
 * productType	是	Integer	产品类型（1/成品 2/半成品）
 * productVersion	是	string	产品版本
 * productRemark	是	string	备注描述
 */

let updateProduct = (data) => axios.post(`/erp_back/product/updateProduct`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 新增产品
 * 参数名	必选	类型	说明
 * productNumber	是	string	产品编号
 * productClientId	是	Long	客户ID
 * productName	是	string	产品名称
 * productModel	是	string	型号
 * productArticleNumber	是	string	品号
 * productState	是	Integer	产品状态（1/发布 2/未发布)
 * productType	是	Integer	产品类型（1/成品 2/半成品）
 * productVersion	是	string	产品版本
 * productRemark	是	string	备注描述
 */

let addProduct = (data) => axios.post(`/erp_back/product/addProduct`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 产品及工序列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	Integer	页码
 * password	是	Integer	页面
 * routingState	是	Integer	0/未录入 1/已录入(发布） 2/未发布
 * productNumber	否	String	编号
 * productName	否	String	名称
 * productArticleNumber	否	String	品号
 * productModel	否	String	型号
 * productType	否	Integer	产品类型 1/成品 2/半成品
 * productClientId	否	Long	客户ID
 */

let productRoutingList = (data) => axios.get(`/erp_back/product/productRoutingList`, {params:data});

/**
 * 取消发布工艺路线
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let cancelRouting = (productId) => axios.post(`/erp_back/product/cancelRouting`, `productId=${productId}`);

/**
 * 发布工艺路线
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let releaseRouting = (productId) => axios.post(`/erp_back/product/releaseRouting`, `productId=${productId}`);

/**
 * 查看工艺路线
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let getRouting = (productId) => axios.get(`/erp_back/product/getRouting`, {params:{productId:productId}});

/**
 * 半成品列表
 * 参数名	必选	类型	说明
 * pageIndex	是	Integer	页码
 * password	是	Integer	页面
 * productNumber	否	String	编号
 * productName	否	String	名称
 * productModel	否	String	型号
 */

let semiFinishedProductList  = (data) => axios.get(`/erp_back/product/semiFinishedProductList`, {params: data});

/**
 * 获取产品流程
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let getProductProcedure  = (productId) => axios.get(`/erp_back/product/getProductProcedure`, {params: {productId:productId}});

/**
 * 设置工艺路线
 */

let writeRoutings  = (data) => axios.post(`/erp_back/product/writeRoutings`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 工序列表
 * 参数名	必选	类型	说明
 * pageIndex	是	Integer	页码
 * pageSize	是	Integer	页面
 * productId	是	Long	产品ID
 */

let procedureList  = (data) => axios.get(`/erp_back/product/procedureList`, {params: data});

/**
 * 工序附件详情
 * 参数名	必选	类型	说明
 * procedureId	是	Long	工序ID
 */

let getProduceDraw  = (procedureId) => axios.get(`/erp_back/product/getProduceDraw`, {params: {procedureId:procedureId}});

/**
 * 查看产品图纸
 * 参数名	必选	类型	说明
 * productId	是	Long	产品ID
 */

let getProductDraw  = (productId) => axios.get(`/erp_back/product/getProductDraw`, {params: {productId:productId}});

//基础数据管理

/**
 * 查询客户信息列表无分页
 */

let findClientListNoPage = (data) => axios.post(`/erp_back/client/findClientListNoPage`,);

/**
 * 查询客户信息列表
 * 参数名	必选	类型	说明
 * clientState	是	string	客户状态( 1/使用中 2/冻结 0/删除）
 * clientNumber	否	string	客户编号
 * clientName	否	string	客户名称
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findClientList = (data) => axios.post(`/erp_back/client/findClientList`, `clientState=${data.clientState}&clientNumber=${data.clientNumber}&clientName=${data.clientName}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 根据主键id查询客户信息
 * 参数名	必选	类型	说明
 * clientId	是	Long	客户主键id
 */

let clientDetail = (clientId) => axios.post(`/erp_back/client/clientDetail`, `clientId=${clientId}`);

/**
 * 冻结客户
 * 参数名	必选	类型	说明
 * clientId	是	Long	客户主键id
 */

let freezeClient = (clientId) => axios.post(`/erp_back/client/freezeClient`, `clientId=${clientId}`);

/**
 * 解冻客户
 * 参数名	必选	类型	说明
 * clientId	是	Long	客户主键id
 */

let thawClient = (clientId) => axios.post(`/erp_back/client/thawClient`, `clientId=${clientId}`);

/**
 * 客户人员新增
 * 参数名	必选	类型	说明
 * clientName	是	string	客户名称
 * clientExplain	是	string	补充说明
 * clientNumber	是	string	客户编号
 * clientLocation	是	String	客户地址
 * clientPhone	是	String	客户联系方式
 * clientEmail	是	String	客户邮箱
 */

let addClient = (data) => axios.post(`/erp_back/client/addClient`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 客户人员编辑
 * 参数名	必选	类型	说明
 * clientId	是	Long	客户主键id
 * clientNumber	否	string	客户编号
 * clientName	否	string	客户名称
 * clientPhone	否	string	客户联系方式
 * clientEmail	否	string	客户邮箱
 * clientLocation	否	string	客户地址
 * clientExplain	否	string	补充说明
 */

let updateClient = (data) => axios.post(`/erp_back/client/updateClient`, `clientId=${data.clientId}&clientNumber=${data.clientNumber}&clientName=${data.clientName}&clientPhone=${data.clientPhone}&clientEmail=${data.clientEmail}&clientLocation=${data.clientLocation}&clientExplain=${data.clientExplain}`);

/**
 * 班组列表(无分页)
 */

let findTeamsListNoPage = (data) => axios.post(`/erp_back/teams/findTeamsListNoPage`);

/**
 * 班组列表
 * 参数名	必选	类型	说明
 * teamsNumber	是	string	班组编号
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findTeamsList = (data) => axios.post(`/erp_back/teams/findTeamsList`, `teamsNumber=${data.teamsNumber}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 新增班组
 * 参数名	必选	类型	说明
 * teamsNumber	是	string	班组编号
 * teamsName	是	string	班组名称
 */

let addTeams = (data) => axios.post(`/erp_back/teams/addTeams`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 根据班组主键id查找班组信息
 * 参数名	必选	类型	说明
 * teamsId	是	Long	班组id
 */

let teamsDetail = (teamsId) => axios.post(`/erp_back/teams/teamsDetail`, `teamsId=${teamsId}`);

/**
 * 编辑班组信息
 * 参数名	必选	类型	说明
 * teamsId	是	Long	班组id
 * teamsName	否	string	班组名称
 * teamsNumber	否	string	班组编号
 */

let updateTeams = (data) => axios.post(`/erp_back/teams/updateTeams`, `teamsId=${data.teamsId}&teamsName=${data.teamsName}&teamsNumber=${data.teamsNumber}`);

/**
 * 删除班组
 * 参数名	必选	类型	说明
 * teamsId	是	Long	班组id
 */

let deleteTeams = (teamsId) => axios.post(`/erp_back/teams/deleteTeams`, `teamsId=${teamsId}`);

/**
 * 材料列表（无分页）
 */

let materialsAll = (data) => axios.get(`/erp_back/materials/materialsAll`, {params:data});

/**
 * 材料列表
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	页面量
 * suppliersName	否	string	供应商名称
 * materialsName	否	string	材料名称
 * materialsNumber	否	string	材料编号
 */

let materialsList = (data) => axios.get(`/erp_back/materials/materialsList`, {params:data});

/**
 * 材料操作记录
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	页面量
 * operationClass	否	int	操作类型（1/删除 2/修改价格）
 * materialsName	否	string	材料名称
 * materialsNumber	否	string	材料编号
 */

let materialsOperationRecordList = (data) => axios.get(`/erp_back/materials/materialsOperationRecordList`, {params:data});

/**
 * 查看材料质检配置
 * @param materialsId   材料id
 */
let materialsCheckInfo = (materialsId)=>axios.post(`/erp_back/materials/materialsCheckInfo`, `materialsId=${materialsId}`)

/**
 * 材料删除
 * 参数名	必选	类型	说明
 * materialsId	是	long	材料id
 */

let deleteMaterials = (materialsId) => axios.post(`/erp_back/materials/deleteMaterials`, `materialsId=${materialsId}`);

/**
 * 新增材料
 * 参数名	必选	类型	说明
 * materialsNumber	是	string	材料编号
 * materialsName	是	string	材料名称
 * materialsPrice	是	double	材料价格
 * materialsUnit	是	string	材料单位
 * suppliersId	是	long	供应商id
 * materialsQualityPlanInfoWay	是	int	质检方式((1/全检 2/抽检))
 * materialsQualityPlanInfoProportion	是	double	比例
 * checkPlanIds	是	string	质检方案id组
 * checkPointMsg	是	string	关注点详情信息
 * materialsQualityPlanInfoIfchecknum	是	int	是否检查数量(1/是 2/否)materialsId	是	long	材料id
 */

let addMaterials = (data) => axios.post(`/erp_back/materials/addMaterials`, `materialsNumber=${data.materialsNumber}&materialsName=${data.materialsName}&materialsPrice=${data.materialsPrice}&materialsUnit=${data.materialsUnit}&suppliersId=${data.suppliersId}&materialsQualityPlanInfoWay=${data.materialsQualityPlanInfoWay}&materialsQualityPlanInfoProportion=${data.materialsQualityPlanInfoProportion}&checkPlanIds=${data.checkPlanIds}&checkPointMsg=${data.checkPointMsg}&materialsQualityPlanInfoIfchecknum=${data.materialsQualityPlanInfoIfchecknum}`);

/**
 * 材料编辑
 * 参数名	必选	类型	说明
 * materialsId	是	long	材料id
 * materialsNumber	是	string	材料编号
 * materialsName	是	string	材料名称
 * materialsPrice	是	double	材料价格
 * materialsUnit	是	string	材料单位
 * suppliersId	是	long	供应商id
 * materialsQualityPlanInfoId	是	long	质检配置主信息id
 * materialsQualityPlanInfoWay	是	int	质检方式((1/全检 2/抽检))
 * materialsQualityPlanInfoProportion	是	double	比例
 * checkPlanIds	是	string	质检方案id组
 * checkPointMsg	是	string	关注点详情信息
 * materialsQualityPlanInfoIfchecknum	是	int	是否检查数量(1/是 2/否)materialsId	是	long	材料id
 */

let editMaterials = (data) => axios.post(`/erp_back/materials/editMaterials`, `materialsId=${data.materialsId}&materialsNumber=${data.materialsNumber}&materialsName=${data.materialsName}&materialsPrice=${data.materialsPrice}&materialsUnit=${data.materialsUnit}&suppliersId=${data.suppliersId}&materialsQualityPlanInfoId=${data.materialsQualityPlanInfoId != null?data.materialsQualityPlanInfoId:''}&materialsQualityPlanInfoWay=${data.materialsQualityPlanInfoWay != null?data.materialsQualityPlanInfoWay:''}&materialsQualityPlanInfoProportion=${data.materialsQualityPlanInfoProportion}&checkPlanIds=${data.checkPlanIds}&checkPointMsg=${data.checkPointMsg}&materialsQualityPlanInfoIfchecknum=${data.materialsQualityPlanInfoIfchecknum != null?data.materialsQualityPlanInfoIfchecknum:''}`);

/**
 * 质检方案列表
 * 参数名	必选	类型	说明
 */

let allqualityCheckPlanList = (data) => axios.get(`/erp_back/materials/qualityCheckPlanList`);

/**
 * 供应商列表
 * 参数名	必选	类型	说明
 * suppliersName	否	string	供应商名称
 * suppliersNumber	否	string	供应商编号
 * suppliersState	是	int	供应商状态( 1/使用中 2/冻结 0/删除)
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findSuppliersList = (data) => axios.post(`/erp_back/supplier/findSuppliersList`, `suppliersName=${data.suppliersName}&suppliersNumber=${data.suppliersNumber}&suppliersState=${data.suppliersState}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 供应商详情
 * 参数名	必选	类型	说明
 * suppliersId	是	Long	供应商主键id
 */

let suppliersDetail = (suppliersId) => axios.post(`/erp_back/supplier/suppliersDetail`, `suppliersId=${suppliersId}`);

/**
 * 冻结供应商
 * 参数名	必选	类型	说明
 * suppliersId	是	Long	供应商主键id
 */

let freezeSuppliers = (suppliersId) => axios.post(`/erp_back/supplier/freezeSuppliers`, `suppliersId=${suppliersId}`);

/**
 * 解冻供应商
 * 参数名	必选	类型	说明
 * suppliersId	是	Long	供应商主键id
 */

let thawSuppliers = (suppliersId) => axios.post(`/erp_back/supplier/thawSuppliers`, `suppliersId=${suppliersId}`);

/**
 * 新增供应商
 * 参数名	必选	类型	说明
 * suppliersRemark	是	string	备注
 * suppliersNumber	是	string	供应商编号
 * suppliersLocation	是	string	供应商地址
 * suppliersPhone	是	string	供应商联系方式
 * suppliersContactName	是	string	供应商联系人
 * suppliersName	是	string	供应商名称
 */

let addSuppliers = (data) => axios.post(`/erp_back/supplier/addSuppliers`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 编辑供应商
 * 参数名	必选	类型	说明
 * suppliersId	是	Long	供应商主键id
 * suppliersNumber	否	string	供应商编号
 * suppliersName	否	string	供应商名称
 * suppliersPhone	否	string	供应商联系方式
 * suppliersContactName	否	string	供应商联系人
 * suppliersLocation	否	string	供应商地址
 * suppliersRemark	否	string	备注
 */

let updateSuppliers = (data) => axios.post(`/erp_back/supplier/updateSuppliers`, `suppliersId=${data.suppliersId}&suppliersNumber=${data.suppliersNumber}&suppliersName=${data.suppliersName}&suppliersPhone=${data.suppliersPhone}&suppliersContactName=${data.suppliersContactName}&suppliersLocation=${data.suppliersLocation}&suppliersRemark=${data.suppliersRemark}`);

/**
 * 设备列表(无分页)
 */

let findEquipmentListNoPage = (data) => axios.post(`/erp_back/Equipment/findEquipmentListNoPage`);

/**
 * 设备列表
 * 参数名	必选	类型	说明
 * equipmentDepartmentId	否	int	设备使用部门（1研发部 2生产部 3质量部 4 仓库部）
 * equipmentModel	否	string	设备型号
 * equipmentNumber	否	string	设备编号
 * equipmentState	是	int	设备状态(1/启用 2/报废 3/维修中 0/删除标志)
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findEquipmentList = (data) => axios.post(`/erp_back/Equipment/findEquipmentList`, `equipmentDepartmentId=${data.equipmentDepartmentId}&equipmentModel=${data.equipmentModel}&equipmentNumber=${data.equipmentNumber}&equipmentState=${data.equipmentState}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 设备详情
 * 参数名	必选	类型	说明
 * equipmentId	是	Long	设备主键id
 */

let findEquipmentByid = (equipmentId) => axios.post(`/erp_back/Equipment/findEquipmentByid`, `equipmentId=${equipmentId}`);

/**
 * 报修设备
 * 参数名	必选	类型	说明
 * equipmentId	是	Long	设备主键id
 */

let maintenanceEquipment = (equipmentId) => axios.post(`/erp_back/Equipment/maintenanceEquipment`, `equipmentId=${equipmentId}`);

/**
 * 处理报修设备
 * 参数名	必选	类型	说明
 * equipmentId	是	Long	设备主键id
 * equipmentMaintainResult	是	int	维修结果（1/成功 2/报废）
 * equipmentMaintainContent	是	string	维修内容
 * equipmentMaintainReason	是	int	故障原因（1 操作失误 2例行保养 3检点不到位 4正常配件更换 5其他)
 */

let processedEquipment = (data) => axios.post(`/erp_back/Equipment/ProcessedEquipment`, `equipmentId=${data.equipmentId}&equipmentMaintainResult=${data.equipmentMaintainResult}&equipmentMaintainContent=${data.equipmentMaintainContent}&equipmentMaintainReason=${data.equipmentMaintainReason}`);

/**
 * 新增设备
 * 参数名	必选	类型	说明
 * equipmentMaintenanceCycle	是	int	维修周期
 * equipmentDepartmentId	是	int	设备使用部门（1研发部 2生产部 3质量部 4 仓库部）
 * equipmentStationId	是	Long	所在工位id
 * equipmentRemarks	否	string	备注
 * equipmentNumber	是	string	设备编号
 * equipmentManufacturer	是	string	设备制造厂商
 * equipmentFactoryNumber	是	string	出厂编号
 * equipmentInitiateState	是	int	设备启用状态(1/已启用 2/委外维修中 3/维修中)
 * equipmentPurchaseTime	是	Date	设备购置时间
 * equipmentName	是	string	设备名称
 * equipmentModel	是	string	设备型号
 */

let addEquipment = (data) => axios.post(`/erp_back/Equipment/addEquipment`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 编辑设备
 * 参数名	必选	类型	说明
 * equipmentId	是	Long	设备主键id
 * equipmentMaintenanceCycle	是	int	维修周期
 * equipmentDepartmentId	是	int	设备使用部门（1研发部 2生产部 3质量部 4 仓库部）
 * equipmentStationId	是	Long	所在工位id
 * equipmentRemarks	否	string	备注
 * equipmentNumber	是	string	设备编号
 * equipmentManufacturer	是	string	设备制造厂商
 * equipmentFactoryNumber	是	string	出厂编号
 * equipmentInitiateState	是	int	设备启用状态(1/已启用 2/委外维修中 3/维修中)
 * equipmentPurchaseTime	是	Date	设备购置时间
 * equipmentName	是	string	设备名称
 * equipmentModel	是	string	设备型号
 */

let updateEquipment = (data) => axios.post(`/erp_back/Equipment/updateEquipment`, `equipmentId=${data.equipmentId}&equipmentMaintenanceCycle=${data.equipmentMaintenanceCycle}&equipmentDepartmentId=${data.equipmentDepartmentId}&equipmentStationId=${data.equipmentStationId}&equipmentRemarks=${data.equipmentRemarks}&equipmentNumber=${data.equipmentNumber}&equipmentManufacturer=${data.equipmentManufacturer}&equipmentFactoryNumber=${data.equipmentFactoryNumber}&equipmentInitiateState=${data.equipmentInitiateState}&equipmentPurchaseTime=${data.equipmentPurchaseTime}&equipmentName=${data.equipmentName}&equipmentModel=${data.equipmentModel}`);

/**
 * 模具工装列表(无分页)
 */

let findMouldToolsListNoPage = (data) => axios.post(`/erp_back/mouldtools/findMouldToolsListNoPage`);

/**
 * 模具工装列表
 * 参数名	必选	类型	说明
 * mouldToolsType	否	int	模具工装类型(1拉伸-凸模，2拉伸-凹模，3拉伸-切边模，4拉伸-翻边模，5冲压-落料，6冲压-冲孔，7冲压-成型，8冲压-整形)
 * mouldToolsNumber	否	string	模具工装编号
 * mouldToolsName	否	string	模具工装名称
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let mouldtoolsList = (data) => axios.post(`/erp_back/mouldtools/findMouldToolsList`, `mouldToolsType=${data.mouldToolsType}&mouldToolsNumber=${data.mouldToolsNumber}&mouldToolsName=${data.mouldToolsName}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 模具工装新增
 * 参数名	必选	类型	说明
 * mouldToolsName	是	string	模具名称
 * mouldToolsNumber	是	string	模具工装编号
 * mouldToolsType	是	int	模具工装类型(1拉伸-凸模，2拉伸-凹模，3拉伸-切边模，4拉伸-翻边模，5冲压-落料，6冲压-冲孔，7冲压-成型，8冲压-整形)
 * mouldToolsModel	是	String	模具工装型号
 */

let addMouldTools = (data) => axios.post(`/erp_back/mouldtools/addMouldTools`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 模具工装详情
 * 参数名	必选	类型	说明
 * mouldToolsId	是	Long	模具工装主键id
 */

let mouldToolsDetail = (mouldToolsId) => axios.post(`/erp_back/mouldtools/mouldToolsDetail`, `mouldToolsId=${mouldToolsId}`);

/**
 * 模具工装编辑
 * 参数名	必选	类型	说明
 * mouldToolsId	是	Long	模具工装主键id
 * mouldToolsNumber	否	string	模具工装编号
 * mouldToolsName	否	string	模具工装名称
 * mouldToolsModel	否	string	模具工装型号
 * mouldToolsType	否	int	模具工装类型(1拉伸-凸模，2拉伸-凹模，3拉伸-切边模，4拉伸-翻边模，5冲压-落料，6冲压-冲孔，7冲压-成型，8冲压-整形)
 */

let updateMouldTools = (data) => axios.post(`/erp_back/mouldtools/updateMouldTools`, `mouldToolsId=${data.mouldToolsId}&mouldToolsNumber=${data.mouldToolsNumber}&mouldToolsName=${data.mouldToolsName}&mouldToolsModel=${data.mouldToolsModel}&mouldToolsType=${data.mouldToolsType}`);

/**
 * 删除模具工装
 * 参数名	必选	类型	说明
 * mouldToolsId	是	Long	模具工装主键id
 */

let deleteMouldTools = (mouldToolsId) => axios.post(`/erp_back/mouldtools/deleteMouldTools`, `mouldToolsId=${mouldToolsId}`);

/**
 * 工位列表
 * 参数名	必选	类型	说明
 * areaId	否	Long	区域id
 * stationNumber	否	string	工位号
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findStation = (data) => axios.post(`/erp_back/station/findStation`, `areaId=${data.areaId}&stationNumber=${data.stationNumber}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 工位列表(无分页)
 */

let findStationNoPage = (data) => axios.post(`/erp_back/station/findStationNoPage`);

/**
 * 新增工位
 * 参数名	必选	类型	说明
 * stationLocation	是	string	工位位置描述
 * areaId	是	Long	区域id
 * stationNumber	是	string	工位号
 */

let addStation = (data) => axios.post(`/erp_back/station/addStation`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 编辑工位
 * 参数名	必选	类型	说明
 * stationId	是	Long	工位主键id
 * areaId	否	Long	区域ID
 * stationNumber	否	string	工位号
 * stationLocation	否	工位位置描述
 */

let updateStation = (data) => axios.post(`/erp_back/station/updateStation`, `stationId=${data.stationId}&areaId=${data.areaId}&stationNumber=${data.stationNumber}&stationLocation=${data.stationLocation}`);

/**
 * 删除工位
 * 参数名	必选	类型	说明
 * stationId	是	Long	工位主键id
 */

let deleteStation = (stationId) => axios.post(`/erp_back/station/deleteStation`, `stationId=${stationId}`);

/**
 * 工位详情
 * 参数名	必选	类型	说明
 * stationId	是	Long	工位主键id
 */

let findStationById = (stationId) => axios.post(`/erp_back/station/findStationById`, `stationId=${stationId}`);

/**
 * 通知模板列表
 * 参数名	必选	类型	说明
 * roleId	否	Long	角色主键id
 * messageTemplateState	否	int	模板状态(1/使用 2/冻结 0/删除)
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findMessageTemplates = (data) => axios.post(`/erp_back/messagetemplate/findMessageTemplates`, `roleId=${data.roleId}&messageTemplateState=${data.messageTemplateState}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);

/**
 * 设置角色
 * 参数名	必选	类型	说明
 * roleId	否	Long	角色主键id， 是一个Long类型的数组
 * messageTemplateId	是	Long	通知模板主键id
 */

let setRole = (data) => axios.post(`/erp_back/messagetemplate/setRole`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 查找关联角色id
 * 参数名	必选	类型	说明
 * messageTemplateId	是	Long	通知模板主键id
 */

let findMessageTemplatesById = (messageTemplateId) => axios.post(`/erp_back/messagetemplate/findMessageTemplatesById`, `messageTemplateId=${messageTemplateId}`);

/**
 * 冻结通知模板
 * 参数名	必选	类型	说明
 * messageTemplateId	是	Long	通知模板主键id
 */

let freezeMessageTemplate = (messageTemplateId) => axios.post(`/erp_back/messagetemplate/freezeMessageTemplate`, `messageTemplateId=${messageTemplateId}`);

/**
 * 解冻通知模板
 * 参数名	必选	类型	说明
 * messageTemplateId	是	Long	通知模板主键id
 */

let thaweMessageTemplate = (messageTemplateId) => axios.post(`/erp_back/messagetemplate/thaweMessageTemplate`, `messageTemplateId=${messageTemplateId}`);

/**
 * 通知记录
 * 参数名	必选	类型	说明
 * messageType	是	string	用户名
 * roleId	是	string	密码
 * adminName	否	string	昵称
 * pageIndex	否	Integer	当前页数
 * pageSize	否	Integer	页大小
 */

let findMessage = (data) => axios.post(`/erp_back/messagetemplate/findMessage`, `messageType=${data.messageType}&roleId=${data.roleId}&adminName=${data.adminName}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);


//检验工作数据管理

//生产任务管理
/**
 * 生产需求单列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	页面量
 * state	是	int	状态（0/未处理 1/已处理）
 * type	否	int	订单类型 (1/国内 2/国外）
 * number	否	string	订单编号
 */

let getOrdersList = (data) => axios.get(`/erp_back/requirements/getOrdersList`,{params:data});

/**
 * 未处理订单详情接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 */

let productionOrderInfo = (ordersId) => axios.post(`/erp_back/requirements/orderInfo`, `ordersId=${ordersId}`);

/**
 * 需求单信息接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 */

let requirementsInfo = (ordersId) => axios.post(`/erp_back/requirements/requirementsInfo`, `ordersId=${ordersId}`);

/**
 * 点击生成需求单接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 */

let firstGenerate = (ordersId) => axios.post(`/erp_back/requirements/firstGenerate`, `ordersId=${ordersId}`);

/**
 * 半成品列表
 * 参数名	必选	类型	说明
 */

let halfProductList = () => axios.get(`/erp_back/requirements/halfProductList`);

/**
 * 生产需求单设置产品生产数量接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 * halfNumJson	是	string	半成品生产计划条目数据
 * finishNumJson	是	string	产品生产计划条目数据
 * newHalfProductsJson	是	string	新的半成品备货条目数据
 * endTime	是	date	计划截止时间
 */
let secondGenerate = (ordersId, halfNumJson, finishNumJson, newHalfProductsJson, endTime) => axios.post(`/erp_back/requirements/secondGenerate`, `ordersId=${ordersId}&halfNumJson=${halfNumJson}&finishNumJson=${finishNumJson}&newHalfProductsJson=${newHalfProductsJson}&endTime=${endTime}`);

/**
 * 取消需求单接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 */

let rejectGenerate = (ordersId) => axios.post(`/erp_back/requirements/rejectGenerate`, `ordersId=${ordersId}`);

/**
 * 发布需求单，组装条目的时间接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 * procurementNumJson	是	string	采购计划条目数据
 * procurementTimesJson	是	string	采购条目时间
 * productionTimesJson	是	string	生产计划时间
 */
let publishGenerate = (ordersId, procurementNumJson, procurementTimesJson, productionTimesJson) => axios.post(`/erp_back/requirements/publishGenerate`, `ordersId=${ordersId}&procurementNumJson=${procurementNumJson}&procurementTimesJson=${procurementTimesJson}&productionTimesJson=${productionTimesJson}`);

/**
 * 订单-需求单列表接口
 * 参数名	必选	类型	说明
 */

let productionTaskList = () => axios.get(`/erp_back/orderschedule/productionTaskList`);

/**
 * 订单排期更新时间接口
 * 参数名	必选	类型	说明
 * productionTaskId	是	long	需求单id
 * procurementTimesJson	是	string	采购计划条目时间
 * productionTimesJson	是	string	生产计划时间
 */
let changeTimes = (productionTaskId, procurementTimesJson, productionTimesJson) => axios.post(`/erp_back/orderschedule/changeTimes`, `productionTaskId=${productionTaskId}&procurementTimesJson=${procurementTimesJson}&productionTimesJson=${productionTimesJson}`);

/**
 * 需求单-生产计划-工序安排详细表接口
 * 参数名	必选	类型	说明
 */

let productionTaskListRelease = () => axios.get(`/erp_back/productionTaskAllocation/productionTaskList`);

/**
 * 同班组人员列表接口
 * 参数名	必选	类型	说明
 * adminName	否	string	职员名称
 */

let productionTaskAdminList = (adminName) => axios.get(`/erp_back/productionTaskAllocation/adminList?adminName=` + adminName);

/**
 * 员工工序任务详情接口
 * 参数名	必选	类型	说明
 * productionAdminId	是	long	工序任务id
 */

let findAdminProcessInfo = (productionAdminId) => axios.post(`/erp_back/productionTaskAllocation/findAdminProcessInfo`, `productionAdminId=${productionAdminId}`);

/**
 * 更新已分配的员工工序任务时间安排接口
 * 参数名	必选	类型	说明
 * productionAdminId	是	long	人员工序任务id
 * startTime	是	date	开始时间
 * endTime	否	date	结束时间
 */

let updateAdminProcessTime = (productionAdminId, startTime, endTime) => axios.post(`/erp_back/productionTaskAllocation/updateAdminProcessTime`, `productionAdminId=${productionAdminId}&startTime=${startTime}&endTime=${endTime}`);

/**
 * 转移工序任务接口
 * 参数名	必选	类型	说明
 * productionAdminId	是	long	员工工序任务
 * newAdminId	是	long	新的更改人员id
 * startTime	否	date	任务开始时间
 * endTime	否	date	任务结束时间
 */

let changeAdminProcess = (productionAdminId, startTime, endTime, newAdminId) => axios.post(`/erp_back/productionTaskAllocation/changeAdminProcess`, `productionAdminId=${productionAdminId}&startTime=${startTime}&endTime=${endTime}&newAdminId=${newAdminId}`);

/**
 * 获取产品工序任务排期中上一步工序开始时间接口
 * 参数名	必选	类型	说明
 * id	是	long	本次工序分配id
 * type	是	int	获取类型(1/从订单任务列表往时间排序表拉（id传工序分配任务id） 2/其他拖拽情况（id传员工工序任务id）)
 */

let getLastWorkstageStartTime = (id, type) => axios.post(`/erp_back/productionTaskAllocation/getLastWorkstageStartTime`, `id=${id}&type=${type}`);

/**
 * 工序任务分配人员接口
 * 参数名	必选	类型	说明
 * productionWorkstageId	是	long	工序安排任务id
 * adminId	是	long	人员id
 * number	是	string	分配数量
 * startTime	是	date	任务开始时间
 * endTime	是	date	任务结束时间
 * timeConsuming	是	string	预计工时
 */

let allocationProcessToAdmin = (productionWorkstageId, adminId, number, startTime, endTime, timeConsuming) => axios.post(`/erp_back/productionTaskAllocation/allocationProcessToAdmin`, `productionWorkstageId=${productionWorkstageId}&adminId=${adminId}&number=${number}&startTime=${startTime}&endTime=${endTime}&timeConsuming=${timeConsuming}`);

/**
 * 员工工序任务平移接口
 * 参数名	必选	类型	说明
 * translationJson	是	string	工序任务时间段拼接串
 */

let processMissionTranslation = (translationJson) => axios.post(`/erp_back/productionTaskAllocation/processMissionTranslation`, `translationJson=${translationJson}`);

/**
 * 变更员工工序任务数量,时间接口
 * 参数名	必选	类型	说明
 * productionWorkstageId	是	long	生产计划工序分配任务id
 * productionAdminId	是	long	人员工序任务id
 * number	否	string	更改数量
 * startTime	否	date	开始时间
 * endTime	否	date	结束时间
 */

let recallAdminProcess = (productionAdminId, number, startTime, endTime) => axios.post(`/erp_back/productionTaskAllocation/recallAdminProcess`, `productionAdminId=${productionAdminId}&number=${number}&startTime=${startTime}&endTime=${endTime}`);


//订单管理


/**
 *  订单列表
 * @param pageIndex 页码
 * @param pageSize  页面量
 * @param ordersType  订单类型
 * @param createStartTime   时间选择区段
 * @param createEndTime   时间选择区段
 * @param clientName    客户名称
 * @param ordersNum   订单编号
 * @param orderState    订单状态
 */
let findByCondition = (pageIndex,pageSize,ordersType,createStartTime,createEndTime,clientName,ordersNum,orderState) =>axios.get(`/erp_back/orders/findByCondition?pageIndex=` + pageIndex+'&pageSize='+pageSize+'&ordersType='+ordersType+'&createStartTime='+createStartTime+'&createEndTime='+createEndTime+'&clientName='+clientName+'&ordersNum='+ordersNum+'&orderState='+orderState)


/**
 * 删除订单
 * @param oId 订单id
 */
let deleteOrders =(oId) =>axio.post(`/erp_back/orders/deleteOrders`, `oId=${oId}`)


/**
 * 跟进订单信息
 * @param ordersId    订单id
 */
let followOrders= (ordersId) =>axios.post(`/erp_back/orders/followOrders`, `ordersId=${ordersId}`)

/**
 * 订单确认生产完成
 * @param orderId 订单id
 */
let makeSureProduct = (orderId)=>axios.post(`/erp_back/orders/makeSureProduct`, `orderId=${orderId}`)

/**
 * 坏账接口
 * @param orderId 订单id
 */
let badDebt = (orderId)=>axios.post(`/erp_back/orders/badDebt`, `orderId=${orderId}`)

/**
 * 确认签收接口
 * @param orderId 订单id
 */
let ordersConfirmReceipt = (orderId)=>axios.post(`/erp_back/orders/ordersConfirmReceipt`, `orderId=${orderId}`)

/**
 * 订单详情
 * @param ordersId
 */
let ordersDetail =(ordersId) =>axios.get(`/erp_back/orders/ordersDetail`, {params:{ordersId:ordersId}})

/**
 *  订单审核列表
 * @param pageIndex 页码
 * @param pageSize  页面量
 * @param ordersType  订单类型
 * @param createStartTime   时间选择区段
 * @param createEndTime   时间选择区段
 * @param clientName    客户名称
 * @param ordersNum   订单编号
 * @param orderCheckState    订单审核状态1待审核 2已审核 3 已取消
 */
let ordersCheckList = (pageIndex,pageSize,ordersType,createStartTime,createEndTime,clientName,ordersNum,orderCheckState) =>axios.get(`/erp_back/ordersCheck/findByCheckOrder?pageIndex=` + pageIndex+'&pageSize='+pageSize+'&ordersType='+ordersType+'&createStartTime='+createStartTime+'&createEndTime='+createEndTime+'&clientName='+clientName+'&ordersNum='+ordersNum+'&orderCheckState='+orderCheckState)

/**
 *  订单审核通过
 * @param ordersId   订单id
 */
let passCheck = (ordersId)=>axios.post(`/erp_back/ordersCheck/passOrders`, `ordersId=${ordersId}`)

/**
 *  订单审核详情
 * @param ordersId   订单id
 */
let ordersCheckDetail = (ordersId)=>axios.post(`/erp_back/ordersCheck/ordersCheckDetail`, `ordersId=${ordersId}`)

/**
 *  录入接口
 */
let addOrders = (data)=>axios.post(`/erp_back/orders/addOrders`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})

/**
 *  编辑接口
 */
let editOrders = (data)=>axios.post(`/erp_back/orders/editOrders`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})

/**
 *  拆分接口
 */
let splitOrders = (data)=>axios.post(`/erp_back/orders/splitOrders`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})

/**
 *  客户列表
 */
let getSalesmanByPermission = (data)=>axios.get(`/erp_back/admin/getSalesmanByPermission`)

/**
 *  可订购产品列表
 */
let canBuyProductList = (data)=>axios.get(`/erp_back/orders/canBuyProductList`)

/**
 *  可订购产品列表
 *  clientId	是	long	客户id
 */
let historyProduct = (clientId)=>axios.post(`/erp_back/orders/historyProduct`, `clientId=${clientId}`)

/**
 *  获取汇率
 *  rateType 1人名币2美元3欧元
 */
let getRate = (rateType)=>axios.get(`/erp_back/rate/getRate`, {params:{rateType:rateType}})



//仓库管理
/**
 * 采购入库列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页条数
 * qualityState	否	int	质检状态 （1未质检2质检中3已完成)
 * planState	否	int	采购状态(1采购中2已完成3已入库)
 * startFinishTime	否	date	截止起始时间
 * endFinishTime	否	date	截止结束时间
 * materialName	否	string	材料名称
 * materialsNumber	否	string	材料编号
 * productionTaskNum	否	string	生产需求单号
 * purchaseState	否	int	生产需求采购状态（1未完成2完成 ）
 */

let purchaseImportList = (data) => axios.get(`/erp_back/procurementPlan/list`,{params:data});

/**
 * 采购详情接口
 * 参数名	必选	类型	说明
 * productiveTaskId	是	long	生产任务号
 */

let purchaseImportDetail = (productiveTaskId) => axios.get(`/erp_back/procurementPlan/detail?productiveTaskId=` + productiveTaskId);

/**
 * 通知质检员接口
 * 参数名	必选	类型	说明
 * procurementPlanId	是	long	采购计划id
 */

let notifyCheck = (procurementPlanId) => axios.get(`/erp_back/procurementPlan/notifyCheck?procurementPlanId=` + procurementPlanId);

/**
 * 采购计划查看库存或存储历史记录接口
 * 参数名	必选	类型	说明
 * procurementPlanId	是	long	采购计划id
 */

let planDetail = (procurementPlanId) => axios.get(`/erp_back/procurementPlan/planDetail?procurementPlanId=` + procurementPlanId);

/**
 * 获取所有区域的接口
 */

let allAreaList = () => axios.get(`/erp_back/area/allAreaList`);

/**
 * 获取所有区域的接口
 * areaId
 */

let getByAreaId = (areaId) => axios.get(`/erp_back/storageRack/getByAreaId?areaId=` + areaId);

/**
 * 采购入库入库接口
 * procurementPlanId	是	long	采购条目id
 * storageRackId	是	long	货架id
 * enterNum	是	double	入库量
 */

let warehousingEnter = (procurementPlanId, storageRackId, enterNum) => axios.get(`/erp_back/procurementPlan/enter?procurementPlanId=` + procurementPlanId + '&storageRackId=' + storageRackId + '&enterNum=' + enterNum);

/**
 * 货架列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页显示条数
 * areaName	否	string	区域名
 * storageRackType	否	int	货架类型(1/大 2/中 3/小)
 * storageRackNumber	否	string	货架编号
 */

let goodsShelvesList = (data) => axios.get(`/erp_back/storageRack/list`, {params:data});

/**
 * 货架删除接口
 * 参数名	必选	类型	说明
 * storageRackId	是	long	货架id
 */

let storageRackDelete = (storageRackId) => axios.get(`/erp_back/storageRack/delete?storageRackId=` + storageRackId);

/**
 * 货架详情接口
 * 参数名	必选	类型	说明
 * storageRackId	是	long	货架id
 */

let storageRackDetail = (storageRackId) => axios.get(`/erp_back/storageRack/detail?storageRackId=` + storageRackId);

/**
 * 货架新增接口
 * 参数名	必选	类型	说明
 * storageRackAreaId	是	long	区域id
 * storageRackNumber	是	string	货架号
 * storageRackType	是	int	货架类型(1/大 2/中 3/小)
 */

let storageRackAdd = (data) => axios.post(`/erp_back/storageRack/add`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 货架更新接口
 * 参数名	必选	类型	说明
 * storageRackId	是	long	货架主键
 * storageRackAreaId	是	long	区域id
 * storageRackNumber	是	string	货架号
 * storageRackType	是	int	货架类型(1/大 2/中 3/小)
 */

let storageRackUpdate = (data) => axios.post(`/erp_back/storageRack/update`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 得到区最大货架号
 * 参数名	必选	类型	说明
 * areaId
 */

let getMaxAreaNum = (areaId) => axios.get(`/erp_back/storageRack/getMaxAreaNum?areaId=` + areaId);

/**
 * 区域列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	页面量
 * keyWord	否	string	关键字
 * type	否	int	区域类型（”货架管理”, 0), (“工位管理”, 1）
 */

let areaList = (data) => axios.get(`/erp_back/area/areaList`, {params:data});

/**
 * 区域删除接口
 * 参数名	必选	类型	说明
 * areaId	是	long	区域id
 */

let deleteArea = (areaId) => axios.post(`/erp_back/area/deleteArea`, `areaId=${areaId}`);

/**
 * 区域打印二维码
 * @param areaId
 */
let printingQRode = (areaId) => axios.post(`/erp_back/area/printingQRode`, `areaId=${areaId}`)

/**
 * 区域新增接口
 * 参数名	必选	类型	说明
 * areaName	是	string	区域名称
 * areaLocation	是	string	区域位置描述
 * areaType	是	int	区域类型
 */

let addArea = (data) => axios.post(`/erp_back/area/addArea`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 区域编辑接口
 * 参数名	必选	类型	说明
 * areaId	是	long	区域id
 * areaName	是	string	区域名称
 * areaLocation	是	string	区域位置描述
 * areaType	是	int	区域类型
 */

let editArea = (data) => axios.post(`/erp_back/area/editArea`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 区域详情接口
 * 参数名	必选	类型	说明
 * areaId	是	long	区域id
 */

let areaInfo = (areaId) => axios.post(`/erp_back/area/areaInfo`, `areaId=${areaId}`);

/**
 * 盘库任务列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	页面量
 * state	是	int	任务状态（1盘库中 2审核中 3已完成 4已驳回 0/删除标志）
 * startTime	否	date	任务开始时间
 * endTime	否	date	任务截止时间
 * number	否	string	任务编号
 */

let stocktakesList = (pageIndex,pageSize,state,startTime,endTime,number) => axios.get(`/erp_back/stocktakes/stocktakesList?pageIndex=`+pageIndex+'&pageSize='+pageSize+'&state='+state+'&startTime='+startTime+'&endTime='+endTime+'&number='+number);

/**
 * 盘库任务新增接口
 * 参数名	必选	类型	说明
 * ids	是	string	货架id组
 * stocktakesNumber	是	string	任务编号
 * stocktakesAdminId	是	long	负责人id
 * stocktakesEndTime	是	date	截止日期
 */

let addStocktakes = (stocktakesNumber,stocktakesAdminId,stocktakesEndTime,ids) => axios.post(`/erp_back/stocktakes/addStocktakes`, `stocktakesNumber=${stocktakesNumber}&stocktakesAdminId=${stocktakesAdminId}&stocktakesEndTime=${stocktakesEndTime}&ids=${ids}`);

/**
 * 盘库任务详情接口
 * 参数名	必选	类型	说明
 * stocktakesId	是	long	任务主键id
 */

let stocktakesInfo = (stocktakesId) => axios.post(`/erp_back/stocktakes/stocktakesInfo`, `stocktakesId=${stocktakesId}`);

/**
 * 盘库任务提交审核接口
 * 参数名	必选	类型	说明
 * stocktakesId	是	long	任务主键id
 */

let submitApproval = (stocktakesId) => axios.post(`/erp_back/stocktakes/submitApproval`, `stocktakesId=${stocktakesId}`);

/**
 * 采购完成接口
 * 参数名	必选	类型	说明
 * productiveTaskId	是	long	生产任务id
 */

let procurementPlanBuyOver = (productiveTaskId) => axios.get(`/erp_back/procurementPlan/buyOver?productiveTaskId=` + productiveTaskId);

/**
 * 生产入库管理列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页条数
 * productionType	否	string	类型 1/产品 2/半成品生产）
 * startFinishTime	否	string	计划起始时间
 * endFinishTime	否	date	计划结束时间
 * productNumber	否	string	产品编号
 * productionTaskNum	否	string	生产需求单号
 * productionTaskState	否	int	生产需求生产状态（1未完成2完成 ）
 */

let productionInventoryList = (data) => axios.get(`/erp_back/productionPlan/list`, {params:data});

/**
 * 生产入库详情接口
 * 参数名	必选	类型	说明
 * productionTaskId	是	long	生产任务id
 */

let productionInventoryDetail = (productionTaskId) => axios.get(`/erp_back/productionPlan/detail?productionTaskId=` + productionTaskId);

/**
 * 生产计划查看库存或存储历史记录接口
 * 参数名	必选	类型	说明
 * productionPlanId	是	long	生产计划id
 */

let productionInventoryPlanDetail = (productionPlanId) => axios.get(`/erp_back/productionPlan/planDetail?productionPlanId=` + productionPlanId);

/**
 * 生产计划入库操作接口
 * 参数名	必选	类型	说明
 * productionPlanId	是	long	生产计划id
 * storageRackId	是	long	货架id
 * enterNum	是	double	入库量
 */

let productionInventoryPlanEnter = (productionPlanId,storageRackId,enterNum) => axios.get(`/erp_back/productionPlan/enter?productionPlanId=` + productionPlanId + '&storageRackId=' + storageRackId + '&enterNum=' + enterNum);

/**
 * 生产计划确认入库操作接口
 * 参数名	必选	类型	说明
 * productionPlanId	是	long	生产计划id
 */

let productionInventoryPlanGetEnter = (productionPlanId) => axios.get(`/erp_back/productionPlan/getEnter?productionPlanId=` + productionPlanId);

/**
 * 发货出库列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页条数
 * productionType	否	int	1品 2/半成品生产）
 * productionOutState	否	int	货状态 (1 待备货 2 备货中 3备货完成)
 * startDeliveryTime	否	date	交货起始时间
 * endDeliveryTime	否	string	交货结束时间
 * ordersNumber	否	string	订单号
 * ordersReceivingState	否	int	-1 已发货 2 未发货
 */

let deliveryOutList = (data) => axios.get(`/erp_back/productionPlan/outList`, {params:data});

/**
 * 发货出库详情接口
 * 参数名	必选	类型	说明
 * productionTaskId	是	long	生产任务id
 */

let deliveryOutListDetail = (productionTaskId) => axios.get(`/erp_back/productionPlan/outDetail?productionTaskId=` + productionTaskId);

/**
 * 发货出库出库接口
 * 参数名	必选	类型	说明
 * productionPlanId	是	long	生产计划id
 * storageRackId	是	long	货架id
 * outNum	是	double	出库量
 */

let deliveryOutListOut = (productionPlanId, storageRackId, outNum) => axios.get(`/erp_back/productionPlan/out?productionPlanId=` + productionPlanId + '&storageRackId=' + storageRackId + '&outNum=' + outNum);

/**
 * 出库查看库存或存储历史记录接口
 * 参数名	必选	类型	说明
 * productionPlanId	是	long	生产计划id
 */

let deliveryoutPlanDetail = (productionPlanId) => axios.get(`/erp_back/productionPlan/outPlanDetail?productionPlanId=` + productionPlanId);

/**
 * 确认发货接口
 * 参数名	必选	类型	说明
 * ordersId	是	long	订单id
 */

let deliveryoutSendProduct = (ordersId) => axios.get(`/erp_back/productionPlan/sendProduct?ordersId=` + ordersId);

/**
 * 生产领料列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页显示条数
 * adminName	否	int	领料人名称
 * goodsType	否	int	物料类型(-1 全部 1 原料 2半成品)
 * thingsName	否	string	物料名
 * thingsNumber	否	string	物料编号
 * taskNum	否	string	生产任务号
 * state	是	int	领料状态 (1待领取(未确认) 2已领取 3.未配好)
 */

let productionRequisitionList = (data) => axios.get(`/erp_back/productionMaterials/list`, {params:data});

/**
 * 生产领料领料详情接口
 * 参数名	必选	类型	说明
 * productionMaterialsId	是	long	员工生产领料关联主键
 */

let productionRequisitionDetail = (productionMaterialsId) => axios.get(`/erp_back/productionMaterials/detail?productionMaterialsId=` + productionMaterialsId);

/**
 * 领料出库接口
 * 参数名	必选	类型	说明
 * productionMaterialsId	是	long	生产领料管理主键
 * storageList	是	list	货架出库量关联列表
 * storageRackId	是	long	货架id
 * outQuality	是	double	出库量
 */

let productionRequisitionOutWarehouse = (data) => axios.post(`/erp_back/productionMaterials/outWarehouse`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 材料列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	string	每页显示条数
 * areaId	否	long	区域id
 * storageRackId	否	long	货架id
 * number	是	string	编号
 * name	否	string	名
 * model	否	string	型号
 * type	是	string	物料类型 1原料 2产品 3 模具工装
 */

let materialstoolsList = (data) => axios.get(`/erp_back/storageRackCargo/thingsList`, {params:data});

/**
 * 库存设置警戒值接口
 * 参数名	必选	类型	说明
 * goodsId	是	long	物品id
 * goodsClasses	是	string	物品类型1原料 2 成品半成品 3 模具
 * warningValue	是	double	警戒值
 */

let setWarning = (goodsId, goodsClasses, warningValue) => axios.get(`/erp_back/storageRackCargo/setWarning?goodsId=` + goodsId + '&goodsClasses=' + goodsClasses + '&warningValue=' + warningValue);

/**
 * 物料详情接口
 * 参数名	必选	类型	说明
 * goodsClasses	是	string	物料类型 1原料 2成品半成品 3 模具
 * goodsId	是	string	物料id
 */

let materialsListDetail = (goodsId, goodsClasses) => axios.get(`/erp_back/storageRackCargo/detail?goodsId=` + goodsId + '&goodsClasses=' + goodsClasses);

/**
 * 盘库任务管理员工接口
 * 参数名	必选	类型	说明
 */

let getStocktakeAdminByPermission = () => axios.get(`/erp_back/admin/getStocktakeAdminByPermission`);

/**
 * 质检方案员工接口
 * 参数名	必选	类型	说明
 */

let getQualityAdminByPermission = () => axios.get(`/erp_back/admin/getQualityAdminByPermission`);


//财务管理
/**
 * 到款审核列表管理
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页显示条数
 * ordersType	否	int	订单类型(-1 全部 1/国内 2/国外 3/子订单)
 * ordersNum	是	string	密码
 * paymentState	是	int	收款支付状态(0 未付款1 已付款 )
 */

let paymentList = (data) => axios.get(`/erp_back/ordersPaymentPlan/paymentList`,{params:data});

/**
 * 收款计划详情接口
 * 参数名	必选	类型	说明
 * ordersPaymentPlanId	是	long	收款计划id
 */

let ordersPayDetail = (ordersPaymentPlanId) => axios.get(`/erp_back/ordersPaymentPlan/detail?ordersPaymentPlanId=` + ordersPaymentPlanId);

/**
 * 开票确认接口
 * 参数名	必选	类型	说明
 * ordersPaymentPlanId	是	long	收款计划id
 * startTime	是	date	开票时间
 */

let startTicket = (ordersPaymentPlanId, startTime) => axios.get(`/erp_back/ordersPaymentPlan/startTicket?ordersPaymentPlanId=` + ordersPaymentPlanId + '&startTime=' + startTime);

/**
 * 确认收款接口
 * 参数名	必选	类型	说明
 * ordersPaymentPlanId	是	long	收款计划id
 * getTime	是	date	付款时间
 */

let getMoney = (ordersPaymentPlanId, getTime) => axios.get(`/erp_back/ordersPaymentPlan/getMoney?ordersPaymentPlanId=` + ordersPaymentPlanId + '&getTime=' + getTime);

/**
 * 付款审核管理列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	页面量
 * suppliersId	否	long	供应商id
 * productionTaskNum	否	string	需求单编号
 * payState	是	int	付款状态（1/未付款 2/已付款）
 */

let paymentCheckList = (data) => axios.get(`/erp_back/paymentCheck/paymentCheckList`,{params:data});

/**
 * 供应商下拉列表接口
 */

let getSuppliersList = () => axios.get(`/erp_back/paymentCheck/getSuppliersList`);

/**
 * 付款确认接口
 * 参数名	必选	类型	说明
 * procurementPlanId	是	long	采购计划id
 */

let makeSurePay = (procurementPlanId) => axios.post(`/erp_back/paymentCheck/makeSurePay`, `procurementPlanId=${procurementPlanId}`);

/**
 * 盘库审核列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页显示条数
 * stocktakesNum	否	string	任务号
 * stocktakesState	是	int	任务是否审核 2 未审核 3 已审核
 */

let libraryCheckList = (data) => axios.get(`/erp_back/stocktakes/checkList`,{params:data});

/**
 * 盘库任务详情接口
 * 参数名	必选	类型	说明
 * stocktakesId	是	long	盘库任务id
 */

let librarycheckDetail = (stocktakesId) => axios.get(`/erp_back/stocktakes/checkDetail?stocktakesId=` + stocktakesId);

/**
 * 通过或者驳回接口
 * 参数名	必选	类型	说明
 * stocktakesId	是	long	盘库任务id
 * state	是	int	审核结果 3 通过 4 驳回
 */

let librarycheckUpdate = (stocktakesId, state) => axios.get(`/erp_back/stocktakes/update?stocktakesId=` + stocktakesId + '&state=' + state);

/**
 * 原材料价格审核列表接口
 * 参数名	必选	类型	说明
 * pageIndex	否	int	页码
 * pageSize	否	int	每页显示条数
 * materialsState	是	int	原材料申请状态(1/未审核 2/已审核)
 * materialsNumber	否	string	材料编号
 */

let listMaterialsPriceApply = (data) => axios.get(`/erp_back/materials/listMaterialsPriceApply`,{params:data});

/**
 * 原材料价格审核列表接口
 * 参数名	必选	类型	说明
 * materialsPriceApplyId	是	long	审核条目id
 */

let listMaterialsPriceDetail = (materialsPriceApplyId) => axios.post(`/erp_back/materials/detail`,`materialsPriceApplyId=${materialsPriceApplyId}`);

/**
 * 通过价格审核接口
 * 参数名	必选	类型	说明
 * materialsPriceApplyId	是	long	审核条目id
 */

let listMaterialsPriceAccept = (materialsPriceApplyId) => axios.get(`/erp_back/materials/accept?materialsPriceApplyId=` + materialsPriceApplyId);

/**
 * 通过价格审核接口
 * 参数名	必选	类型	说明
 * materialsPriceApplyId	是	long	审核条目id
 */

let listMaterialsPriceReject = (materialsPriceApplyId) => axios.get(`/erp_back/materials/reject?materialsPriceApplyId=` + materialsPriceApplyId);



//采购管理

//系统管理
/**
 *员工列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页显示条数
 * adminName	否	string	员工昵称
 * roleName	是	string	角色名
 * adminState	是	int	员工状态(1/使用 2/冻结 0/删除)
 * teamsId	否	long	班组id
 */

let adminList = (data) => axios.get(`/erp_back/admin/adminList`,{params:data});

/**
 *所有角色接口
 */

let getRoleList = () => axios.get(`/erp_back/role/getRoleList`);

/**
 *获取所有的班组接口
 */

let allTeamList = () => axios.get(`/erp_back/teams/allTeamList`);

/**
 *员工删除接口
 * 参数名	必选	类型	说明
 * adminId	是	long	员工id
 */

let deleteAdmin = (adminId) => axios.get(`/erp_back/admin/deleteAdmin?adminId=`+adminId);

/**
 * 员工冻结接口
 * 参数名	必选	类型	说明
 * adminId	是	long	员工id
 */

let freezeAdmin = (adminId) => axios.get(`/erp_back/admin/freezeAdmin?adminId=`+adminId);

/**
 * 用户恢复接口
 * 参数名	必选	类型	说明
 * adminId	是	long	员工id
 */

let normalAdmin = (adminId) => axios.get(`/erp_back/admin/normalAdmin?adminId=`+adminId);

/**
 * 员工新增接口
 * 参数名	必选	类型	说明
 * adminAccount	是	string	账号
 * password	是	string	密码
 * adminName	是	string	昵称
 * adminPhone	是	string	联系方式
 * adminIsQualityCheck	是	int	是否为质检员1质检员 0 非质检员
 * roleIdList	是	list	角色列表
 * teamsId	是	long	班组id
 */

let addAdmin = (data) => axios.post(`/erp_back/admin/addAdmin`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 员工更新接口
 * 参数名	必选	类型	说明
 * adminId	是	long	员工主键
 * adminAccount	是	string	账号
 * password	是	string	密码
 * adminName	是	string	昵称
 * adminPhone	是	string	联系方式
 * adminIsQualityCheck	是	int	是否为质检员1质检员 0 非质检员
 * roleIdList	是	list	角色列表
 * teamsId	是	long	班组id
 */

let updateAdmin = (data) => axios.post(`/erp_back/admin/updateAdmin`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 员工详情接口
 * 参数名	必选	类型	说明
 * adminId	是	long	员工主键
 */

let detailAdmin = (adminId) => axios.get(`/erp_back/admin/detailAdmin?adminId=` + adminId);

/**
 * 角色列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	int	页码
 * pageSize	是	int	每页显示条数
 * roleName	否	string	角色名称
 * roleState	是	int	角色（1、使用中；0、冻结）
 */

let listRole = (data) => axios.get(`/erp_back/role/listRole`,{params:data});

/**
 * 角色删除接口
 * 参数名	必选	类型	说明
 * roleId	是	long	角色id
 */

let deleteRole = (roleId) => axios.get(`/erp_back/role/deleteRole?roleId=` +roleId);

/**
 * 角色解冻冻结接口
 * 参数名	必选	类型	说明
 * roleId	是	long	角色id
 */

let changeRole = (roleId) => axios.get(`/erp_back/role/changeRole?roleId=` +roleId);

/**
 * 角色新增接口
 * 参数名	必选	类型	说明
 * roleName	是	string	角色名称
 * roleDescription	是	string	角色描述
 * tpermissions	是	list	权限列表
 * rolePermissionList	是	list	列表
 */

let addRole = (data) => axios.post(`/erp_back/role/addRole`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 角色详情接口
 * 参数名	必选	类型	说明
 * roleId	是	long	角色id
 */

let getRole = (roleId) => axios.get(`/erp_back/role/getRole?roleId=` +roleId);


/**
 * 角色获取权限树
 */

let getPermissions = () => axios.get(`/erp_back/permission/getPermissions`);

/**
 * 角色更新接口
 * 参数名	必选	类型	说明
 * roleName	是	string	角色名称
 * roleId	是	long	角色id
 * roleDescription	是	string	角色描述
 * tpermissions	是	list	权限列表
 * rolePermissionList	是	list	列表
 */

let updateRole = (data) => axios.post(`/erp_back/role/updateRole`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 登录接口
 * 参数名	必选	类型	说明
 * adminAccount	是	string	账号
 * password	是	string	密码
 */
let login = (adminAccount, password) => axios.post(`/erp_back/admin/login`,`adminAccount=${adminAccount}&password=${password}`);

/**
 * 校验是否接口
 */
let logout = () => axios.get(`/erp_back/admin/logout`);

/**
 * 校验是否接口
 */
let checkLogin = () => axios.get(`/erp_back/admin/checkLogin`);

//质检管理
/**
 * 质检员列表接口(无分页)
 * 参数名	必选	类型	说明
 * qualityCheckPlanNumber 质检方案名搜索
 */

let searchQualityCheckPlanList = (qualityCheckPlanNumber) => axios.get(`/erp_back/qualityCheckPlan/searchQualityCheckPlanList`,{params:{qualityCheckPlanNumber: qualityCheckPlanNumber}});

/**
 * 质检员列表接口
 * 参数名	必选	类型	说明
 * pageIndex	是	Integer	页码
 * pageSize	是	string	页面大小
 */

let qualityAdminList = (data) => axios.get(`/erp_back/qualityCheckPlan/qualityAdminList`,{params:data});

/**
 * 删除质检员接口
 * 参数名	必选	类型	说明
 * adminId	是	Long	管理员ID
 */

let deleteAdminQuality = (adminId) => axios.post(`/erp_back/qualityCheckPlan/deleteAdminQuality`,`adminId=${adminId}`);

/**
 * 质检类别列表接口
 */

let qualityCheckTypeList = () => axios.get(`/erp_back/qualityCheckPlan/qualityCheckTypeList`);

/**
 * 检验工序列表接口
 */

let procedureCategoryList = () => axios.get(`/erp_back/procedureCategory/procedureCategoryList`);


/**
 * 质检员权限详情
 * 参数名	必选	类型	说明
 * adminId	是	Long	管理员ID
 */

let getAdminQuality = (adminId) => axios.get(`/erp_back/qualityCheckPlan/getAdminQuality?adminId=` + adminId);

/**
 * 配置质检员权限接口
 * 参数名	必选	类型	说明
 * adminId	是	Long	管理员ID
 * qualityTypeList	是	list	密码
 * procedureCategoryList	否	list	昵称
 */

let updateAdminQuality = (data) => axios.post(`/erp_back/qualityCheckPlan/updateAdminQuality`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 质检任务列表(待检验)接口
 * 参数名	必选	类型	说明
 * pageIndex	是	string	页码
 * pageSize	是	string	页面
 * qualityCheckTypeId	否	Long	质检类型
 * startTime	否	date	开始时间
 * endTime	否	date	结束时间
 * cargoType	否	integer	0/全部 1/产品 2/原料
 * cargoNumber	否	String	产品/原料编号
 * qualityTaskNum	否	String	质检任务编号
 */

let qualityTaskList = (data) => axios.get(`/erp_back/qualityTask/qualityTaskList`,{params:data});

/**
 * 质检任务列表(已检验)接口
 * 参数名	必选	类型	说明
 * pageIndex	是	string	页码
 * pageSize	是	string	页面
 * qualityCheckTypeId	否	Long	质检类型
 * startTime	否	date	开始时间
 * endTime	否	date	结束时间
 * cargoType	否	integer	0/全部 1/产品 2/原料
 * cargoNumber	否	String	产品/原料编号
 * qualityTaskNum	否	String	质检任务编号
 */

let qualityTaskListFinished = (data) => axios.get(`/erp_back/qualityTask/qualityTaskListFinished`,{params:data});

/**
 * 质检任务详情接口
 * 参数名	必选	类型	说明
 * qualityTaskId	是	Long	质检任务ID
 */

let getQualityTask = (qualityTaskId) => axios.get(`/erp_back/qualityTask/getQualityTask?qualityTaskId=` + qualityTaskId);

/**
 * 质检详情接口
 * 参数名	必选	类型	说明
 * qualityTaskRecordId	是	Long	质检任务ID
 */

let getQualityTaskRecord = (qualityTaskRecordId) => axios.get(`/erp_back/qualityTask/getQualityTaskRecord?qualityTaskRecordId=` + qualityTaskRecordId);

/**
 * 把不合格的记录加入到工序不良记录中
 * 参数名	必选	类型	说明
 * qualityTaskRecordId	是	Long	质检记录ID
 */

let addToTcBadnessRecord = (qualityTaskRecordId) => axios.post(`/erp_back/qualityTask/addToTcBadnessRecord?qualityTaskRecordId=` + qualityTaskRecordId);

/**
 * 质检方案列表口
 * 参数名	必选	类型	说明
 * pageIndex	是	string	页码
 * pageSize	是	string	页面大小
 * qualityCheckPlanState	否	string	1/使用 2/冻结
 * qualityCheckPlanNumber	否	string	编号
 * startTime	否	string	开始时间
 * endTime	否	string	结束时间
 * adminName	否	string	制定人
 */

let qualityCheckPlanList = (data) => axios.get(`/erp_back/qualityCheckPlan/qualityCheckPlanList`,{params:data});

/**
 * 上线质检方案接口
 * 参数名	必选	类型	说明
 * qualityCheckPlanId	是	Long	质检方案ID
 */

let onlineQualityCheckPlan = (qualityCheckPlanId) => axios.post(`/erp_back/qualityCheckPlan/onlineQualityCheckPlan`, `qualityCheckPlanId=${qualityCheckPlanId}`);

/**
 * 下线质检方案接口
 * 参数名	必选	类型	说明
 * qualityCheckPlanId	是	Long	质检方案ID
 */

let offlineQualityCheckPlan = (qualityCheckPlanId) => axios.post(`/erp_back/qualityCheckPlan/offlineQualityCheckPlan`, `qualityCheckPlanId=${qualityCheckPlanId}`);

/**
 * 新增质检方案接口
 * 参数名	必选	类型	说明
 * qualityCheckPlanNumber	是	string	质检方案编号
 * qualityCheckPlanAdminId	是	string	制定人ID
 * pointNames	是	list	质检点列表
 */

let addQualityCheckPlan = (data) => axios.post(`/erp_back/qualityCheckPlan/addQualityCheckPlan`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 质检方案详情
 * 参数名	必选	类型	说明
 * 参数名	必选	类型	说明
 * qualityCheckPlanId	是	Long	用户名
 */

let getQualityCheckPlan = (qualityCheckPlanId) => axios.get(`/erp_back/qualityCheckPlan/getQualityCheckPlan?qualityCheckPlanId=` + qualityCheckPlanId);

/**
 * 更新质检方案接口
 * 参数名	必选	类型	说明
 * qualityCheckPlanId
 * qualityCheckPlanNumber	是	string	质检方案编号
 * qualityCheckPlanAdminId	是	string	制定人ID
 * pointNames	是	list	质检点列表
 */

let updateQualityCheckPlan = (data) => axios.post(`/erp_back/qualityCheckPlan/updateQualityCheckPlan`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 判断能否更新质检方案
 * 参数名	必选	类型	说明
 * qualityCheckPlanId	是	Long	质检方案ID
 */

let checkUpdateQualityCheckPlan = (qualityCheckPlanId) => axios.get(`/erp_back/qualityCheckPlan/checkUpdateQualityCheckPlan?qualityCheckPlanId=` + qualityCheckPlanId);

/**
 * 工序类别管理-列表
 * @param pageIndex 页码
 * @param pageSize 页面大小
 * @param pacState 类别状态(1/启用 2/下线 0/删除)
 * @returns {AxiosPromise}
 */
let listProcedureCategory = (data) => axios.get(`/erp_back/procedureCategory/listProcedureCategory`,{params:data});

/**
 * 工序类别管理-删除
 * @param pcId 工序类别id
 * @returns {AxiosPromise}
 */
let deleteProcedureCategory = (pcId) => axios.post(`/erp_back/procedureCategory/deleteProcedureCategory`,`pcId=${pcId}`);

/**
 * 工序类别管理-上/下线状态切换
 * @param pcId 工序类别id
 * @returns {AxiosPromise}
 */
let toggleProcedureCategory = (pcId) => axios.post(`/erp_back/procedureCategory/toggleProcedureCategory`,`pcId=${pcId}`);

/**
 * 工序类别管理-新增
 * @param pcNum 工序类别编号
 * @param pcName 工序类别名称
 * @returns {AxiosPromise}
 */
let addProcedureCategory = (data) => axios.post(`/erp_back/procedureCategory/addProcedureCategory`,JSON.stringify(data),{headers: {'Content-Type': 'application/json'}});

/**
 * 工序类别管理-编辑
 * @param pcId 工序类别id
 * @param pcNum 工序类别编号
 * @param pcName 工序类别名称
 * @returns {AxiosPromise}
 */
let editProcedureCategory = (data) => axios.post(`/erp_back/procedureCategory/editProcedureCategory`,JSON.stringify(data),{headers: {'Content-Type': 'application/json'}});

/**
 * 获取详情
 * @param procedureCategoryId 工序ID
 * @returns {AxiosPromise}
 */
let getProcedureCategory = (procedureCategoryId) => axios.get(`/erp_back/procedureCategory/getProcedureCategory?procedureCategoryId=`+procedureCategoryId);

/**
 * 采购需求单列
 * @param pageIndex 页码
 * @param pageSize 每页条数
 * @param planState 采购状态(1采购中2已完成3已入库)
 * @param materialsNumber 材料编号
 * @param productionTaskNum 生产需求单号
 * @param purchaseState 生产需求采购状态（1未完成2完成 ）
 * @returns {AxiosPromise}
 */
let procurementPlanList =(data) => axios.get(`/erp_back/procurementPlan/list`,{params:data});

/**
 * 采购需求单详情
 * @param productiveTaskId 生产任务号
 * @returns {AxiosPromise}
 */
let procurementPlanDetail =(productiveTaskId) => axios.get(`/erp_back/procurementPlan/detail`,{params:{productiveTaskId:productiveTaskId}});

/**
 * 申请价格变更接口
 * @param materialsId 材料id
 * @param materialsNewPrice 材料新价格
 * @param remark 备注
 * @returns {AxiosPromise}
 */
let changePrice = (materialsId, materialsNewPrice, remark) => axios.post(`/erp_back/materials/changePrice`, `materialsId=${materialsId}&materialsNewPrice=${materialsNewPrice}&remark=${remark}`);


/**
 * 需求单信息接口
 * 参数名	必选	类型	说明
 * taskId	是	long	生产任务id
 */

let requirementsInfoByTaskId = (taskId) => axios.post(`/erp_back/requirements/requirementsInfoByTaskId`, `taskId=${taskId}`);


/**
 *
 * @param pageIndex
 *            页码
 * @param pageSize
 *            页面量
 * @param createStartTime
 *            创建时间选择区段开始
 * @param createEndTime
 *            创建时间选择区段截止
 * @param teamsName
 *            班组名称
 * @param adminName
 *            负责人
 * @param procedureNumber
 *            工序编号
 * @param productNumber
 *            产品编号
 * @param orderNumber
 *            订单编号
 * @param missionState                                                                   ?stocktakesId=` + stocktakesId + '&state=' + state
 *            工序任务状态(1/进行中 2/已完成)
 */
let processMissionList =(pageIndex,pageSize,createStartTime,createEndTime,teamsName,adminName,procedureNumber,productNumber,orderNumber,missionState) =>axios.get(`/erp_back/productionMissionCount/processMissionList?pageIndex=`+pageIndex+'&pageSize='+pageSize+'&createStartTime='+createStartTime+'&createEndTime='+createEndTime+'&teamsName='+teamsName+'&adminName='+adminName+'&procedureNumber='+procedureNumber+'&productNumber='+productNumber+'&orderNumber='+orderNumber+'&missionState='+missionState)

/**
 *
 * @param productionAdminId  工序任务id
 */
let processTaskInfo =(productionAdminId)=>axios.post(`/erp_back/productionMissionCount/processTaskInfo`, `productionAdminId=${productionAdminId}`)
/**
 * 材料详情接口
 * 参数名	必选	类型	说明
 * materialsId	是	long	材料id
 */
let materialsInfo = (materialsId) => axios.post(`/erp_back/materials/materialsInfo`, `materialsId=${materialsId}`);

export {
  //产品及工艺管理
  productList,deleteProduct,cancelProduct,releaseProduct,getProduct,updateProduct,addProduct,productRoutingList,cancelRouting,releaseRouting,getRouting,semiFinishedProductList,getProductProcedure,writeRoutings,procedureList,getProduceDraw,getProductDraw,

  //仓库管理
  purchaseImportList, purchaseImportDetail, notifyCheck, planDetail, allAreaList, getByAreaId, warehousingEnter, goodsShelvesList, storageRackDelete, storageRackDetail, storageRackAdd, storageRackUpdate, getMaxAreaNum, areaList, deleteArea, addArea, editArea, areaInfo, stocktakesList, addStocktakes, stocktakesInfo, submitApproval, procurementPlanBuyOver, productionInventoryList, productionInventoryDetail, productionInventoryPlanDetail, productionInventoryPlanEnter, productionInventoryPlanGetEnter, deliveryOutList, deliveryOutListDetail, deliveryOutListOut, deliveryoutPlanDetail, deliveryoutSendProduct, productionRequisitionList, productionRequisitionDetail, productionRequisitionOutWarehouse, materialstoolsList, setWarning, materialsListDetail, getStocktakeAdminByPermission, getQualityAdminByPermission,printingQRode,

  //基础数据管理
  findClientListNoPage,findClientList,clientDetail,freezeClient,thawClient,addClient,updateClient,findTeamsListNoPage,findTeamsList,addTeams,teamsDetail,updateTeams,deleteTeams,materialsAll,materialsList,materialsOperationRecordList,deleteMaterials,addMaterials,editMaterials,allqualityCheckPlanList,findSuppliersList,suppliersDetail,freezeSuppliers,thawSuppliers,addSuppliers,updateSuppliers,findEquipmentListNoPage,findEquipmentList,findEquipmentByid,maintenanceEquipment,processedEquipment,addEquipment,updateEquipment,findMouldToolsListNoPage,mouldtoolsList,addMouldTools,mouldToolsDetail,updateMouldTools,deleteMouldTools,findStation,findStationNoPage,addStation,updateStation,deleteStation,findStationById,findMessageTemplates,setRole,findMessageTemplatesById,freezeMessageTemplate,thaweMessageTemplate,findMessage,materialsCheckInfo,

  //检验工作数据管理

  //生产任务管理
  getOrdersList, productionOrderInfo, requirementsInfo, firstGenerate, halfProductList, secondGenerate, rejectGenerate, publishGenerate, productionTaskList, changeTimes, productionTaskListRelease, productionTaskAdminList, findAdminProcessInfo, updateAdminProcessTime, changeAdminProcess, getLastWorkstageStartTime, allocationProcessToAdmin, processMissionTranslation, recallAdminProcess,
  processMissionList,processTaskInfo,

  //订单管理
  findByCondition,deleteOrders,followOrders,makeSureProduct,badDebt,ordersConfirmReceipt,ordersDetail,ordersCheckList,passCheck,ordersCheckDetail,addOrders,editOrders,splitOrders,getSalesmanByPermission,canBuyProductList,historyProduct,getRate,

  //财务管理
  paymentList, ordersPayDetail, startTicket, getMoney, paymentCheckList, getSuppliersList, makeSurePay, libraryCheckList, librarycheckDetail, librarycheckUpdate, listMaterialsPriceApply, listMaterialsPriceDetail, listMaterialsPriceAccept, listMaterialsPriceReject,

  //采购管理
  procurementPlanList,changePrice,procurementPlanDetail,requirementsInfoByTaskId,materialsInfo,

  //系统管理
  login,checkLogin,logout,adminList, getRoleList, allTeamList, deleteAdmin, freezeAdmin, normalAdmin, addAdmin, updateAdmin, detailAdmin, listRole, deleteRole, addRole, changeRole, getRole,getPermissions, updateRole,

  //质检管理
  searchQualityCheckPlanList, qualityAdminList, deleteAdminQuality, qualityCheckTypeList, getAdminQuality, updateAdminQuality, procedureCategoryList, qualityTaskList, qualityTaskListFinished, getQualityTask, getQualityTaskRecord, qualityCheckPlanList, addToTcBadnessRecord, onlineQualityCheckPlan, offlineQualityCheckPlan, addQualityCheckPlan, getQualityCheckPlan, updateQualityCheckPlan, checkUpdateQualityCheckPlan,

  //工序类别管理
  listProcedureCategory,deleteProcedureCategory,editProcedureCategory,toggleProcedureCategory,addProcedureCategory,getProcedureCategory
}

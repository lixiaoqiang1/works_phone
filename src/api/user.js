import request from '@/utils/request'

//登录
export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/v1/userInfo',
    method: 'get'
  })
}
//验证码
export function sendCode() {
  // return request({
  //   url: '/send_code',
  //   method: 'post'
  // })
}
//退出
export function logout() {
  return request({
    url: '/logout',
    method: 'GET'
  })
}
//获取所有设备接口
export function allshebei(query) {
  return request({
    url: '/api/v1/devices',
    method: 'GET',
    params: query
  })
}

//获取全部部门列表
export function company() {
  return request({
    url: '/api/v1/company',
    method: 'GET'
  })
}
//通话记录接口
export function callRecords(query) {
  return request({
    url: '/api/v1/callRecords',
    method: 'GET',
    params: query
  })
}
//某人详细通话记录
export function callRecords1(query) {
  return request({
    url: '/api/v1/callRecords/'+ query.user_id,
    method: 'GET'
  })
}
//某人详细通话记录查询
export function searchRecords(query) {
  console.log(query)
  return request({
    url: '/api/v1/records',
    method: 'GET',
    params: query
  })
}
//通话录音接口
export function records(query) {
  return request({
    url: '/api/v1/records',
    method: 'GET',
    params: query
    
  })
}
//短信记录接口
export function msgRecords(query) {
  return request({
    url: '/api/v1/msgRecords',
    method: 'GET',
    params: query
    
  })
}

//获取所有角色
export function roles() {
  return request({
    url: '/api/v1/roles',
    method: 'GET'
  })
}

//新增角色
export function addroles(data) {
  return request({
    url: '/api/v1/roles',
    method: 'POST',
    data
  })
}
//编辑角色
export function rolesput(data) {
  return request({
    url: '/api/v1/roles/'+ data.id,
    method: 'put',
    data
  })
}
//删除角色
export function rolesdelete(data) {
  return request({
    url: '/api/v1/roles/'+ data.id,
    method: 'delete',
    data
  })
}
// 获取所有角色
export function huoquroles(query) {
  return request({
    url: '/api/v1/roles',
    method: 'GET',
    params: query
  })
}
//获取绑定日志接口
export function bindLogs(query) {
  return request({
    url: '/api/v1/bindLogs',
    method: 'GET',
    params: query
  })
}
//获取绑定日志接口
export function devicesbind(data) {
  return request({
    url: '/api/v1/devices/bind/'+ data.id,
    method: 'PUT',
    data
  })
}
//获取全部员工列表
export function usersname() {
  return request({
    url: '/api/v1/users',
    method: 'get'
  })
}
//编辑密码
export function editPwd(data) {
  return request({
    url: '/api/v1/editPwd',
    method: 'put',
    data
  })
}


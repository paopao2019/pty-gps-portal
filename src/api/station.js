import service from '@/utils/request'


// 增
export const addStation = (data) => {
  return service({
    url: "/station/addStation",
    method: 'post',
    data
  })
}

// 删
export const deleteStation = (data) => {
  return service({
    url: "/station/deleteStation",
    method: 'delete',
    data
  })
}


// 改
export const updateStation = (data) => {
  return service({
    url: "/station/updateStation",
    method: 'put',
    data
  })
}

// 查
export const getStationList = (data) => {
  return service({
    url: "/station/getStationList",
    method: 'post',
    data
  })
}

// 距离计算
export const getDistanceList = (params) => {
  return service({
    url: "/station/calculate",
    method: 'get',
    params
  })
}
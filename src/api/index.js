import { api } from "@/common/api";

function transformResponse(resp) {
  let { code, msg, data } = JSON.parse(resp);
  return { success: code === 1, msg, body: data };
}

export const service = {
  org:{
    getTree:()=>api.get('/app-api/fuxing/organization/list')
  },
  token:() => api.post('/app-api/fuxing/hik/account/info'),
  device: {
    // 分页查询
    page: (query) => api.get(`/app-api/fuxing/vision-device/page`, { params: query }),
    // 删除
    delete: (data) => api.post(`/oa/contribute/delete`, data),
    // 详情
    one: (id) => api.get(`/oa/contribute/${id}`),
    // 根据区域选择查询统计信息
    tree: (query) => api.get(`/oa/contribute/contributeReport`, { params: query }),
    // 导出
    ReportExport: (query) =>
      api.get(`/oa/contribute/contributeReportExport`, {
        params: query,
        responseType: "blob",
      }),
  },
  warnVideo: {
    // 分页查询
    page: (query) => api.get(`/app-api/fuxing/vision-device/warning/page`, { params: query }),
    // 删除
    delete: (data) => api.post(`/oa/contribute/delete`, data),
    // 详情
    one: (id) => api.get(`/oa/contribute/${id}`),
    // 根据区域选择查询统计信息
    tree: (query) => api.get(`/oa/contribute/contributeReport`, { params: query }),
    // 导出
    ReportExport: (query) =>
      api.get(`/oa/contribute/contributeReportExport`, {
        params: query,
        responseType: "blob",
      }),
  },
  warnHandle:{
    add: (data) => api.post(`/app-api/fuxing/warning/handle/create`,data),
    one: (id) => api.get(`/app-api/fuxing/warning/handle/get`,{params:{id}}),
  },
  warn: {
    // 分页查询
    page: (params) => api.get(`/app-api/fuxing/vision-device/warning/list`, { params }),
    // 删除
    delete: (data) => api.post(`/oa/contribute/delete`, data),
    // 详情
    one: (id) => api.get(`/oa/contribute/${id}`),
    // 根据区域选择查询统计信息
    tree: (query) => api.get(`/oa/contribute/contributeReport`, { params: query }),
    // 导出
    ReportExport: (query) =>
      api.get(`/oa/contribute/contributeReportExport`, {
        params: query,
        responseType: "blob",
      }),
  },
  dict:{
    query: (type) => api.get(`/app-api/system/dict-data/type`, { params:{type} }),
  },
  cache:{
    group: () => api.get(`/app-api/fuxing/group/list`),
  }
};

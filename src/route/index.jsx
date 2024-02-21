/**
 * 路由
 */

const mode = import.meta.env.MODE
var r = [];
if (mode == 'yxjk') {
    r = r.filter(v => {
        return v.id != '门户'
    })
}
export const routes = r

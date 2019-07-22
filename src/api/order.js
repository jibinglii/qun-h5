import http from '$utils/http'
export default {
    async view(id){
        return await http.get('api/v2/qun_order/' + id)
    }
}

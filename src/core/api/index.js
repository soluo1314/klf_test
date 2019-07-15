import fly from './http'

class Apis {
    getfood() {
        return fly.request("/customer/common/page/food/choose?ver=v2", {
            admin_id: "88997",
            lwm_appid: "dh129ahsd9898123gjhjfamnxoo1",
            food_type: 1,
            shop_id: 374933,
            from_type: 1,
            lwm_sess_token: "saekl2t1d7o0jfuke36i4bv0i3",
            nonce: '13508',
            sign: 'CF3CFAC8BE4E6C957CFF31B6F804CDEA'
        }, {
                method: "post",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
    }
    infover() {
        return fly.request("/customer/common/shop/shop/info?ver=v2", {
            shop_id: '374933',
            lwm_sess_token: 'saekl2t1d7o0jfuke36i4bv0i3',
            lwm_appid: 'dh129ahsd9898123gjhjfamnxoo1',
            admin_id: '88997',
            nonce: '37312',
            sign: 'C3239B5C782D2E436C1CB88BCA7CC2BB',
            from_type: '1'
        }, {
                method: "post",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
    }
    listly() {
        return fly.request("/customer/crm/communion/comment/list", {
            shop_id: '374933',
            lwm_sess_token: 'saekl2t1d7o0jfuke36i4bv0i3',
            lwm_appid: 'dh129ahsd9898123gjhjfamnxoo1',
            admin_id: '88997',
            nonce: '68983',
            sign: 'DDAB47A781012F1E84F0FB4AD194B5DB',
            from_type: '1',
            tag: 0,
            num: 20
        }, {
                method: "post",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
    }
}
export default new Apis();
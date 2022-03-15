import { request } from '../request/request'
Page({
    data: {
        orderProject:'',
        orderDate:'',
        orderTime:'',
        demo:'',
        errorMsg:''
    },

    QueryParams:{
        id:'',
        demo:''
    },

    //获取用户信息
    handleInfo(){
        let demo = this.QueryParams.demo;
        this.setData({demo})
        console.log(this.data.demo);
        let id = this.QueryParams.id;
        request({url:'/serve/check/orderDetail',data:{id}})
        .then(
            res => {
                console.log(res);
                let orderProject = res.data.data.orderProject;
                let orderDate = res.data.data.orderDate;
                let orderTime = res.data.data.orderTime;
                let errorMsg = res.data.data.remark;
                this.setData({orderProject,orderDate,orderTime,errorMsg})
            }
        )
    },

    //取消预约
    handleDelete(){
        let id = this.QueryParams.id;
        let orderTime = this.data.orderTime;
        let date = this.data.orderDate;
        let project = this.data.orderProject
        wx.showModal({
            title: '提示',
            content: '是否确认取消预约',
            success: (result) => {
                if(result.confirm){
                    request({url:'/serve/order/cancelOrder',data:{ id, orderTime, date, project }})
                    .then(
                        res => {
                            let msg = res.data.msg;
                            wx.showToast({
                                title: msg,
                                icon: 'none',
                                mask: false
                            });
                            setTimeout(() =>{
                                wx.navigateBack({
                                  url: '../order_mine/order_mine',
                                })
                            },1000)
                        }
                    )
                }else{
                    console.log('用户点击取消');
                }
            },
        });
    },

    onLoad(option){
        this.QueryParams.id = option.id
        this.QueryParams.demo = option.demo
        this.handleInfo()
    }
})
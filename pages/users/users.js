import {request } from '../request/request'

Page({
    data: {

    },

    handleSuper(){
        if(wx.getStorageSync('token')) {
            request({url:'/login/checkAdmin',data:{token:wx.getStorageSync('token')}})
            .then(
                res => {
                    console.log(res)
                    if(res.data.data){
                        wx.setStorageSync('medicalCard',res.data.data.medicalCard);
                        wx.setStorageSync('name',res.data.data.name);
                        wx.setStorageSync('sex',res.data.data.sex);
                        wx.setStorageSync('tel',res.data.data.tel);
                        wx.setStorageSync('relId',res.data.data.relId);
                        let medicalCard = res.data.data.medicalCard;
                        this.localCheck(medicalCard);
                    }else{
                        wx.navigateTo({
                        url: '../super_user/super_user',
                        })
                    }
                }
        )}
    },

    handleFive(){
        let token = wx.getStorageSync('token');
        if(token) {
            request({url:'/login/checkConsumer',data:{token}})
            .then(
                res => {
                    console.log(res);
                    if(res.data.data){
                        wx.setStorageSync('medicalCard',res.data.data.medicalCard);
                        wx.setStorageSync('name',res.data.data.name);
                        wx.setStorageSync('sex',res.data.data.sex);
                        wx.setStorageSync('tel',res.data.data.tel);
                        wx.setStorageSync('black',res.data.data.black);
                        wx.setStorageSync('defaults',res.data.data.defaults);
                        wx.setStorageSync('inspectId',res.data.data.inspectId);
                        wx.setStorageSync('relId',res.data.data.relId);
                        wx.setStorageSync('relationship',res.data.data.relationship);
                        wx.setStorageSync('updateTime',res.data.data.updateTime);
                        wx.reLaunch({
                        url: '../index/index',
                        })
                    }else{
                        wx.navigateTo({
                        url: '../userInfo/userInfo',
                        })
                    }
                }
            )
        }
    },

  //????????????????????????
    localCheck(number) {
        if(number === 's10001'){ //???????????????????????????????????????????????????????????????
        setTimeout(() => {
            wx.reLaunch({
                url:'/pages/super_index/super_index'
            })
        },0)
        }else if(number === 'n10002'){ //?????????????????????????????????????????????????????????
            setTimeout(() => {
                wx.reLaunch({
                    url: '/pages/nurse_order/nurse_order',
                })
            },0)
        }else if(number === 'n10003'){ //?????????????????????????????????????????????????????????
            setTimeout(() => {
                wx.reLaunch({
                    url: '/pages/nurse_injection/nurse_injection',
                })
            },0)
        }else if(number === 't10004'){ //?????????????????????????????????????????????????????????
            setTimeout(() => {
                wx.reLaunch({
                    url: '/pages/technician/technician',
                })
            },0)
        }
    },

    onShow(){
    //??????????????????????????????
    wx.hideHomeButton()
    }
})
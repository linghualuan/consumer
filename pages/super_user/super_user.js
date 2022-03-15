import { request } from '../request/request'
Page({
    data: {
        jobNum:'',     //账号
        password:'',     //密码
        number:''
    },

    //获取账号
    handleAccount(e){
        let jobNum = e.detail.value;
        this.setData({jobNum})
    },

    //获取密码
    handlePwd(e){
        let password = e.detail.value;
        this.setData({password})
    },

    //登录
    handleSubmit(){
        let jobNum = this.data.jobNum;
        let password = this.data.password;
        if(!jobNum || !password){
            wx.showToast({
              title: '账号或密码不能为空',
              icon:'none'
            })
        }else{
            wx.getUserProfile({
                desc:"小程序测试",
                success:(res) => {

                    //-------------------------------------------
                    console.log(res);
                    const userInfo = res.userInfo;
                    this.setData({ userInfo})
                    //把微信信息保存到本地
                    wx.setStorageSync("userInfo", userInfo);
                    //------------------------------------------
                    let token = wx.getStorageSync('token')
                    request({url:'/login/super/up',data:{jobNum:jobNum,password:password, token},method:'post',header: {"Content-Type":"application/x-www-form-urlencoded"}})
                    .then(
                        res => {
                            console.log(res);
                            if(res.data.code === 1){
                                let relId = res.data.data.relId;
                                let medicalCard = res.data.data.medicalCard;
                                wx.setStorageSync('relId',relId);
                                wx.setStorageSync('medicalCard',medicalCard);
                                wx.showToast({
                                    title: '登录成功',
                                    icon:'none'
                                })
                                let number = res.data.data.medicalCard;
                                if(number === 's10001'){
                                    setTimeout(() => {
                                        wx.reLaunch({
                                            url:'../super_index/super_index'
                                        })
                                    },1000)
                                }else if(number === 'n10002'){
                                    setTimeout(() => {
                                        wx.reLaunch({
                                            url: '../nurse_order/nurse_order',
                                        })
                                    },1000)
                                }else if(number === 'n10003'){
                                    setTimeout(() => {
                                        wx.reLaunch({
                                            url: '../nurse_injection/nurse_injection',
                                        })
                                    },1000)
                                }else if(number === 't10004'){
                                    setTimeout(() => {
                                        wx.reLaunch({
                                            url: '../technician/technician',
                                        })
                                    },1000)
                                }
                            }else{
                                wx.showToast({
                                    title: '请检查账号或者密码是否输入正确',
                                    icon:'none'
                                })
                            }
                        }
                    )


                    // //判断是否存在用户接口
                    // wx.request({
                    //     url: 'http://localhost:8881/serve/relation/checkInfo',
                    //     header: { 'content-type':'application/json', 'Authorization':'Bearer ' + wx.getStorageSync('token') },
                    //     success: (res)=>{
                    //         console.log(res);

                    //         //若后台存在账号
                    //         if(res.data.data){
                    //             wx.setStorageSync('medicalCard',res.data.data.medicalCard);
                    //             wx.setStorageSync('name',res.data.data.name);
                    //             wx.setStorageSync('sex',res.data.data.sex);
                    //             wx.setStorageSync('tel',res.data.data.tel);
                    //             wx.setStorageSync('black',res.data.data.black);
                    //             wx.setStorageSync('defaults',res.data.data.defaults);
                    //             wx.setStorageSync('inspectId',res.data.data.inspectId);
                    //             wx.setStorageSync('relId',res.data.data.relId);
                    //             wx.setStorageSync('relationship',res.data.data.relationship);
                    //             wx.setStorageSync('updateTime',res.data.data.updateTime);
                    //             wx.reLaunch({
                    //                 url:'../index/index'
                    //             })
                    //         }else{

                    //             //若后台没有账号
                    //         }
                    //     }
                    // });
                },
                fail:(res) => {
                    console.log("用户拒绝授权");
                }
            })
        }
    }
})
import { request } from '../request/request'
Page({
    data: {
        tabs:[
            { id:1, value:"未检查", isActive:true },
            { id:2, value:"检查成功", isActive:false },
            { id:3, value:"检查失败", isActive:false }
        ],

        userInfo:[],

        userInfoPassed:[],

        userInfoUnpassed:[]
    },

    handleItemTabChange(e){
        let index = e.detail;
        let tabs = this.data.tabs;
        tabs.forEach((v,i)=>{ i === index?v.isActive=true:v.isActive=false })
        this.setData({ tabs })
        if(index === 0){
            this.handleUserInfoUnpassed()
        }else if(index === 1){
            this.handleUserInfoPassed()
        }else{
            this.handleUserInfo()
        }
    },

    //获取检查失败
    handleUserInfo(){
        request({url:'/technician/getScanListAll',method:'get'})
        .then(
            res => {
                console.log(res);
                let records = res.data.data.records;
                let userInfo = [];
                for(let i =0;i<records.length;i++){
                    userInfo[i] = records[i]
                }
                this.setData({
                    userInfo
                })
            }
        )
        wx.stopPullDownRefresh();
    },

    //获取检查成功患者信息
    handleUserInfoPassed(){
        request({url:'/technician/getScanListOneAndTwo',method:'get'})
        .then(
            res => {
                console.log(res);
                let records = res.data.data.records;
                let userInfoPassed = [];
                for(let i =0;i<records.length;i++){
                    userInfoPassed[i] = records[i]
                }
                this.setData({ userInfoPassed })

            }
        )
    },

    //获取未检查患者信息
    handleUserInfoUnpassed(){
        request({url:'/technician/getScanListZero',method:'get'})
        .then(
            res => {
                console.log(res)
                let records = res.data.data.records;
                let userInfoUnpassed = [];
                for(let i =0;i<records.length;i++){
                    userInfoUnpassed[i] = records[i]
                }
                this.setData({ userInfoUnpassed })

            }
        )
    },

    onShow(){
        
        //左上角小房子消失
        wx.hideHomeButton()

        this.handleUserInfoUnpassed();
    },

    onPullDownRefresh(){
        this.handleUserInfo();
    }
})
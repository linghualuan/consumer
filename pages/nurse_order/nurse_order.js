import { request } from '../request/request'
Page({
    data: {
        tabs:[
            { id:1, value:"预约申请", isActive:true },
            { id:2, value:"已通过", isActive:false },
            { id:3, value:"未通过", isActive:false }
        ],

        userInfo:[],    //预约申请列表

        userInfoPassed:[],  //已通过列表

        userInfoUnpassed:[]     //未通过列表
    },

    handleQRCode(){
        wx.navigateTo({
            url: '../QRCodeImage/QRCodeImage'
        });
    },


    handleItemTabChange(e){
        let index = e.detail;
        let tabs = this.data.tabs;
        tabs.forEach((v,i)=>{ i === index?v.isActive=true:v.isActive=false })
        this.setData({ tabs })
        if(index === 0){
            this.handleUserInfo()
        }else if(index === 1){
            this.handleUserInfoPassed()
        }else{
            this.handleUserInfoUnpassed()
        }
    },

    handleUserInfo(){
        request({url:'/infoCommit/ApplicationList',data:{status:0},header:{'Authorization':'Bearer ' + wx.getStorageSync('token')}})
        .then(
            res => {
                console.log(res);
                console.log('预约申请');
                let userInfo = [];
                let records = res.data.data.records;
                for(let i = 0;i<records.length;++i){
                    userInfo[i] = records[i]
                }
                this.setData({ userInfo })
            }
        )
        wx.stopPullDownRefresh();
    },

    handleUserInfoPassed(){
        request({url:'/infoCommit/ApplicationList',data:{status:1},header:{'Authorization':'Bearer ' + wx.getStorageSync('token')}})
        .then(
            res => {
                console.log("已通过");
                console.log(res);
                let userInfoPassed = [];
                let records = res.data.data.records;
                for(let i = 0;i<records.length;++i){
                    userInfoPassed[i] = records[i]
                }
                this.setData({ userInfoPassed })
            }
        )
    },

    handleUserInfoUnpassed(){
        request({url:'/infoCommit/ApplicationList',data:{status:2},header:{'Authorization':'Bearer ' + wx.getStorageSync('token')}})
        .then(
            res => {
                let userInfoUnpassed = [];
                let records = res.data.data.records;
                for(let i = 0;i<records.length;++i){
                    userInfoUnpassed[i] = records[i]
                }
                this.setData({ userInfoUnpassed })
            }
        )
    },

    onLoad(){
        //页面刚加载时获取预约申请用户的数据
        this.handleUserInfo();
    },

     onShow(){
        //页面左上角小房子消失
        wx.hideHomeButton()
    },

    onPullDownRefresh(){
        this.handleUserInfo()
    }
})
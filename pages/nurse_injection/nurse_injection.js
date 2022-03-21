import { request } from '../request/request'
Page({
    data: {
        tabs:[
            { id:1, value:"签到注射", isActive:true },
            { id:2, value:"注射成功", isActive:false },
            { id:3, value:"注射失败", isActive:false }
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
            this.handleUserInfo()
        }else if(index === 1){
            this.handleUserInfoPassed()
        }else if(index === 2){
            this.handleUserInfoUnpassed()
        }
    },

    //获取签到注射患者的信息
    handleUserInfo(){
        request({url:'/nurseInjection/injectionList',data:{injectState:0}})
        .then(
            res => {
                console.log('获取签到注射患者的信息');
                console.log(res);
                let records = res.data.data.records;
                let userInfo = [];
                for(let i =0;i<records.length;i++){
                    userInfo[i] = records[i]
                }
                this.setData({ userInfo })
            }
        )
        wx.stopPullDownRefresh();
    },

    //获得注射成功患者的信息
    handleUserInfoPassed(){
        request({url:'/nurseInjection/injectionList',data:{injectState:1}})
        .then(
            res => {
                console.log('获得已注射患者的信息');
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

    //获得注射失败的患者的信息
    handleUserInfoUnpassed(){
        request({url:'/nurseInjection/injectionList',data:{injectState:2}})
        .then(
            res => {
                console.log('获得未通过注射的患者的信息');
                console.log(res);
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
        //页面刚加载时获取签到注射用户数据
        this.handleUserInfo();
        wx.hideHomeButton()
    },

    onPullDownRefresh(){
        this.handleUserInfo();
    }
})
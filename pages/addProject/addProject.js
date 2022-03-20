import { request } from '../request/request'
Page({

    data: {
        note:'',    //备注
        orderPeople:'', //预约人数
        orderProject:'',    //项目名称
        pendCheck:'',   //检查等待时间
        pendWait:'', //注射等待时间
        peopleNum:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,60,70,80,90,100,110]
    },

    //搜索框输入
    handleProject(e){
        console.log(e);
        let orderProject = e.detail.value;
        this.setData({orderProject})
    },

    handlePendWait(e){
        let pendWait = this.data.peopleNum[e.detail.value]
        this.setData({pendWait})
        console.log(this.data.pendWait);
    },

    handlePendCheck(e){
        let pendCheck = this.data.peopleNum[e.detail.value]
        this.setData({pendCheck})
    },

    handleOrderNumber(e){
      let orderPeople = this.data.peopleNum[e.detail.value]
      this.setData({orderPeople})
    },

    handleNote(e){
        let note = e.detail.value;
        this.setData({note})
    },

    handleSubmit(){
        let note = this.data.note;
        let orderPeople = this.data.orderPeople;
        let orderProject = this.data.orderProject;
        let pendCheck = this.data.pendCheck;
        let pendWait = this.data.pendWait;
        console.log(orderProject);
        if(!orderPeople || !orderProject || !pendCheck || !pendWait){
            wx.showToast({
                title:'请输入完整信息',
                icon:'none'
            })
        }else{
            request({url:'/superRoot/project/addNewProject',data:{note,orderPeople,orderProject,pendCheck,pendWait}})
            .then(
                res => {
                    console.log(res);
                    if(res.data.code === 1){
                        wx.showToast({
                            title: '添加项目成功',
                            icon: 'none',
                        });
                        setTimeout(() => {
                            wx.navigateBack({
                              url: '../super_index/super_index',
                            })
                        },1000)
                    }else{
                        wx.showToast({
                            title: '添加项目失败',
                            icon: 'none',
                        });
                    }
                }
            )
        }
    }

})
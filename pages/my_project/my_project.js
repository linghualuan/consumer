import { request } from '../request/request'
Page({
  data: {
      tabs:[
          {
              id:1,
              value:"进行中",
              isActive:true
          },
          {
              id:2,
              value:"已完成",
              isActive:false
          }
      ],
      projectItem:[], //正在进行中列表

      projectPassed:[]  //已完成列表
  },



  handleItemTabChange(e){
      let index = e.detail;
      let tabs = this.data.tabs;
      tabs.forEach((v,i)=>{i === index?v.isActive=true:v.isActive=false})
      this.setData({
          tabs
      })
      if(index === 0){
        this.getObject()  //获取正在进行中列表
      }else if(index === 1){
        this.handlePassed() //获取以完成列表
      }
  },

  getObject(){
    request({url:'/superRoot/project/getProjectList'})
    .then(
      res => {
        console.log(res);
        let records = res.data.data.records;
        let projectItem = [];
        if(records){
          for(let i =0;i<records.length;i++){
            projectItem[i] = records[i]
          }
          this.setData({ projectItem })
        }
      }
    )
  },

  handlePassed(){
    request({url:'/superRoot/setting/getOldSettingPeopleNum'})
    .then(
      res => {
        let records = res.data.data;
        let projectPassed = [];
        for(let i =0;i<records.length;i++){
          projectPassed[i] = records[i]
        }
        this.setData({ projectPassed })
        console.log(this.data.projectPassed);

      }
    )
  },

  onLoad(){
    // 获取对应数据
    this.getObject()
  },
})
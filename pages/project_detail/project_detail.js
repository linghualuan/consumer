import { request } from '../request/request'
Page({
  data: {
    totalNum:100,   //总预约数量
    canNum:[], //还可预约数量
    types:[],  //每个项目的可预约的日期
    index:0,
    times:[],
    addItem:false,
    numberList:[],
    datePost:'', //需要向后台提交的日期
    allTimeItem:[],  //所有日期的所有时间段
    orderProject:''
  },

  QueryParams:{
    orderProject:''
  },

  //点击下拉框获取日期
  handleChangeTime(e){
    let index = e.detail;
    let date = this.data.types;
    let datePost = date[index];
    this.setData({ datePost })
    let times = this.data.times;
    for(let i=0 ; i<date.length ; i++){
      if(this.data.datePost === date[i]){
        let time = [];
        time = times[i]
        this.setData({time})
      }
    }
  },

  handleInp(e){
    let time = this.data.time;
    let index = this.data.index;
    for(let i = 0 ; i<time.length ; i++){
      if(index === i){
        time[i].allNumber = parseInt(e.detail.value)
      }
    }
  },

  //获取默认要上传的时间
  handleDefaultDatePost(){
      let date = this.data.types;
      let datePost = date[0];
      this.setData({ datePost })
  },


  // 点击提交按钮
  handleSubmit(){
    let projectName = this.QueryParams.orderProject;
    let times = this.data.time;
    request({url:'/superRoot/setting/updateTimeAndNumber',data:{projectName,times},method:'post'})
    .then(
      res => {
        if(res.data.code === 1){
          wx.showToast({
            title: '修改成功',
            icon:'none'
          })
        }else if(res.data.code === 2){
          let a = res.data.msg;
          wx.showToast({
            title: a,
            icon:'none'
          })
          setTimeout(() => {
            this.handleItemDate()
          },700)
        }
      }
    )
  },

  //页面初始加载获取数据
  handleItemDate(){
    let projectName = this.QueryParams.orderProject;
    request({url:'/superRoot/setting/getDateTimeNumber',data:{projectName}})
    .then(
      res => {
        let types = [];
        for(let i = 0 ; i<res.data.data.length ; i++){
          types[i] = res.data.data[i].date;
        }
        this.setData({ types })
        this.handleDefaultDatePost()
        let times = [];
        for(let i = 0 ; i<types.length ; i++){
          times[i] = res.data.data[i].times
        }
        this.setData({ times })
        let time = []
        time = this.data.times[0];
        this.setData({ time })
        }
    )
  },

  //获取每天每个时间段的下标
  handleShowIndex(e){
    let index = e.detail.current;
    this.setData({ index })
  },

  onLoad(option){

    this.setData({orderProject:option.orderProject})

    this.QueryParams.orderProject = option.orderProject;

    this.handleItemDate();
  }
})
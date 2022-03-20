import { request, requestLoading } from '../request/request'
Page({
    data: {
        project:[],
        search:'',
        projectDemo:[]
    },

    QueryParams:{
        current:1,
        size:10
    },

    pages:1,

    handleSearch(e){
        let orderProject = e.detail.value;
        request({url:'/serve/project/projectList',data:{orderProject}})
        .then(
            res => {
                let project = res.data.data.records;
                this.setData({project})
                console.log(this.data.project);
            }
        )
    },

    //获取可预约项目的列表
    handleA(){
        requestLoading({url:'/serve/project/projectList',data:{pageNumber:this.QueryParams.current,pageSize:this.QueryParams.size},header:{'Authorization':`Bearer ${ this.data.token }`}})
        .then(
            res => {
                console.log(res);
                this.pages = res.data.data.pages;
                this.setData({
                    project:[...this.data.project,...res.data.data.records]
                })
                console.log(this.data.project);
            }
        )
    },

    onReachBottom(){
        console.log('页数：'+this.QueryParams.current);
        if(this.QueryParams.current >= this.pages){
            wx.showToast({
              title: '没有下一页数据了',
              icon:'none'
            })
        }else{
            this.QueryParams.current++;
            console.log(this.QueryParams.current);
            this.handleA()
        }
    },

    onLoad(){
        this.handleA();
    },
})
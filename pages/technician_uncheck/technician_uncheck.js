import { request } from '../request/request'
Page({

    data: {
        medicalCard:'',
        name:'',
        sex:'',
        age:'',
        tel:'',
        project:'',
        turnTime:''
    },

    QueryParams:{
        id:''
    },

    handleUserInfo(){
        let id = this.QueryParams.id;
        request({url:'/technician/getDetailScan',data:{id}})
        .then(
            res => {
                console.log(res);
                let data = res.data.data;
                let medicalCard = data.medicalCard;
                let name = data.name;
                let sex = data.sex;
                let age = data.age;
                let tel = data.tel;
                let project = data.project;
                let turnTime = data.turnTime;
                let errorMsg = data.errorMsg;
                this.setData({ medicalCard, name, sex, age, tel, project, turnTime,errorMsg })
            }
        )
    },

    onLoad(option){

        console.log(option);

        this.QueryParams.id = option.id;

        this.handleUserInfo();
    }
})
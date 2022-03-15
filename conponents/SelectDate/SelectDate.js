Component({

    properties: {
        select:{
            type:Array,
            value:[]
        }
    },

    data: {
        isSelect:false,
        info:'请选择',  //选框显示的信息
        selectDate:'',   //用户选择的时间段
        lengthSelect:0
    },
    methods: {

        //点击获取时间段长度
        handleLengthSelect(){
            let lengthSelect = this.properties.select;
            this.setData({lengthSelect})
        },

        //若isSelect为true，则显示时下拉列表，否则不显示
        handleTap(){
            let isSelect = this.data.isSelect;
            isSelect = !isSelect;
            this.setData({ isSelect })
            this.handleLengthSelect()
        },

        //选择时间段
        handleSelect(e){
            console.log(e);
            let index = e.currentTarget.dataset.index;
            this.triggerEvent("selectChange",index);
            let isSelect = this.data.isSelect;
            let select = this.properties.select;
            let info = this.data.info;
            info = select[index].slice(0,11);
            isSelect = !isSelect;
            this.setData({
                isSelect,info
            })
        }
    }
})


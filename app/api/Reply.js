import React from 'react';
import ReactDOM from 'react-dom';
import  {Input,Form,Selected,FormGroup,ModalTrigger,Modal} from 'amazeui-react';
import Process  from '../api/process.js';
class Reply extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value : "",
      isActive:false,
      modalStr:"",
      imid:""
    }
  }
  
changevalue(e){
  let that = this;
  that.setState({
    value:e.target.value
  });
}

handleSubmit(e){
  e.preventDefault();
  var imid = e.target.dataset.reactid.split(".")[2].split("$")[1];
  console.log(imid);
  let that = this;
  let process = new Process({
    "url":"http://1.fzmy1.applinzi.com/index.php/Home/reply/addReply?",
    options:{
      "imid":imid,
      "tcontent":this.state.value,
      "iuid":"2",
      "callback":"lists"
    },
    headers:{},
    callback:function(data){
      data = JSON.parse(data.slice(0,-1).slice("lists".length+1));
      console.log(data.success);
      if(data.success == true){
        that.setState({
          imid:imid,
          modalStr:"回复成功",
          isActive:true
        })
      }else{
         that.setState({
          modalStr:"回复失败，请重试",
          isActive:true
        })
      }
    }
  });
  console.log(1);
  process.push();
 } 

 handleClick(e){
  e.preventDefault();
  window.location.reload();
 }

  render(){
    let _this = this;
    console.log(this.state.value);
    var modal =  (function(){
      return <Modal type="alert" title="提示" onClick={_this.handleClick.bind(_this)}>{_this.state.modalStr}</Modal>
    }());

    return (
      <Form horizontal onSubmit={_this.handleSubmit.bind(_this)}>
        <Input 
          type="textarea" 
          label="回复" 
          labelClassName="am-u-sm-2" 
          wrapperClassName="am-u-sm-10" 
          value={this.state.value} 
          onChange={_this.changevalue.bind(_this)} />
   
        <ModalTrigger  modal={modal} open={this.state.isActive}>
          <Input
           type="submit" 
           amStyle="primary" 
           value="提交" 
           wrapperClassName="am-u-sm-offset-2 am-u-sm-10" />
        </ModalTrigger>    
      </Form>     
   )
  }
}

export default Reply;
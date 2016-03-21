import React from 'react';
import ReactDOM from 'react-dom';
import  {Input,Form,Grid,Col,ModalTrigger,Modal,Button} from 'amazeui-react';
import SelectCPT from '../api/SelectCPT.js';
import Process  from '../api/process.js';
class MfzxCPT extends React.Component{
	constructor(props){
    	super(props);
	    this.state={
	    	vtitle:"",
	        vphonenum:"",
	        lawtype:"",
	        tcontent:"",
	        vphoto:"",
	        ilid:"",
	        message:[],
	        isActive:false,
	        modalStr:"",
	        estatus:""
	    }
  }

    componentWillMount(){
	  	let that = this;
	  	console.log(window.location.href.split('&_')[0].split('=')[2].split("'")[1]);
	  	let ilidnew = window.location.href.split('=')[1].split('?')[0];
	  	let estatusnew = window.location.href.split('&_')[0].split('=')[2].split("'")[1];
		that.setState({
			ilid:ilidnew,
			estatus:estatusnew
		}); 
  }

 	getvalue(newvalue){
	 	let that = this;
	 	that.setState({
	 		lawtype:newvalue
	 	});
 	}

  	changValue(e){
  		console.log(this.refs.content.getValue());
  		let that = this;
  		console.log(e.target.files[0]);
  		var file = e.target.files[0];
  		var reader = new FileReader();
  	reader.onloadend=function(file){ //第六步 监听文件读取结束  this.result获取读取内容
		// The end 处理
		that.setState({
			vphoto:this.result
		})
	} 
	reader.readAsDataURL(file);//第七步 发起读取动作
  		that.setState({
	  		vtitle:this.refs.title.getValue(),
	 		vphonenum:this.refs.phonenum.getValue(),
	 		tcontent:this.refs.content.getValue()
	 		
  		});
  	}


  	handleSubmit(e){
 	let that = this;
  	console.log(this.state.vtitle);
  	console.log(this.state.vphonenum);
  	console.log(this.state.tcontent);
  	console.log(this.state.estatus);
  	console.log(this.state.vphoto);
		let process = new Process({
			"url":"http://1.fzmy1.applinzi.com/index.php/Home/Message/addMessage",
			options:{
				"vtitle":this.state.vtitle,
				"estatus":this.state.estatus,
				"vphonenum":this.state.vphonenum,
				"lawtype":this.state.lawtype,
				"tcontent":this.state.tcontent,
				"ilid":this.state.ilid,
				"tpicture":this.state.vphoto,
				"callback":"message"
		},
		method:"POST",
		headers:{},
		callback:function(data){
			console.log(data);
			data = JSON.parse(data.slice(0,-1).slice("message".length+1));
			console.log(data.success);
		    if(data.success == true){
		        that.setState({
			        modalStr:"发表成功",
			        isActive:true
		        })
		    }else{
		         that.setState({
		          modalStr:"发表失败，请重试",
		          isActive:true
		        })
		    }
		}
	});
	process.push();
  }
  
  	updatephoto(e){
  		e.preventDefault();
  		console.log("aa");
  		this.setState({
  			vphoto:this.refs.photo.getValue()
  		});
  		
  	}

  	handleClick(e){
  		e.preventDefault();
  	    window.location.reload();
 	}

 	unSubmit(e){
 		e.preventDefault();
 		window.location.reload();
 	}

	render (){
		let _this=this;
		console.log(this.state.ilid);
		console.log(this.state.estatus);
		  	var modal =  (function(){
                return <Modal 
                		  type="alert" 
                		  title="提示" 
                		  onClick={_this.handleClick.bind(_this)}>
                		{_this.state.modalStr}
                		</Modal>
            }());

		return(
			<Form horizontal className="form1">
				<Grid>
		   			<Col sm={12}>
		   				<Input 
		   					label="咨询标题" 
		   					ref="title" 
		   					value={this.state.title} 
		   					className="input1" 
		   					labelClassName="am-u-sm-4" 
		   					wrapperClassName="am-u-sm-10" 
		   					onChange={_this.changValue.bind(_this)} />
		   			</Col>
		   			<Col sm={12}>
		   				<Input 
		   					label="手机号码"
		   					ref="phonenum" 
		   					value={this.state.phonenum} 
		   					className="input1" 
		   					labelClassName="am-u-sm-4" 
		   					wrapperClassName="am-u-sm-10"
		   					onChange={_this.changValue.bind(_this)} />
		   			</Col>
		    		<Col sm={12}>
		    			<span className="law1">法律门类</span>
		    		</Col>
		    		<Col sm={12}>
		    			<SelectCPT callbackGetvalue={_this.getvalue.bind(_this)}/>
		    		</Col>
		   			<Col sm={12}>
		   				<Input 
		   					type="textarea" 
		   					id="text1" 
		   					ref="content" 
		   					value={this.state.content} 
		   					className="input1" 
		   					label="咨询子项" 
		   					labelClassName="am-u-sm-4" 
		   					wrapperClassName="am-u-sm-10" 
		   					onChange={_this.changValue.bind(_this)} />
		   			</Col>
		   			<Col sm={12}>
		   				<div>
			   				<Input 
			   					type="file" 
			   					className="input1" 
			   					ref="photo" 
			   					label="上传图片" 
			   					labelClassName="am-u-sm-4"
			   				    wrapperClassName="am-u-sm-10" 
			   				    help="请选择所需上传的图片"
			   				    onChange={_this.changValue.bind(_this)}/>
			   				<Button 
					            amStyle="secondary" 
					            onClick={_this.updatephoto.bind(_this)}>
					          上传
				          	</Button>
			          	</div>
		   			</Col>
		      		<Col sm={6}>
		      			<Input 
		      				type="reset"  
		      				value="取消" 
		      				className="but1" 
		      				amStyle="danger" 
		      				standalone 
		      				onClick={_this.unSubmit.bind(_this)}/>
		      		</Col>
		      		<ModalTrigger  modal={modal} open={this.state.isActive}>
		      		<Col sm={6}>
		      			<Input 
		      				type="submit" 
		      				value="提交" 
		      				className="but1" 
		      				amStyle="primary" 
		      				standalone 
		      				onClick={_this.handleSubmit.bind(_this)}/>
		      		</Col>
    				</ModalTrigger> 
    			</Grid>
    		</Form>
		);
	}
}
export default MfzxCPT;
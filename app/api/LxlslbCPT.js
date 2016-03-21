import React from 'react';
import ReactDOM from 'react-dom';
import  {List,ListItem,Badge,FormGroup,Input} from 'amazeui-react';
import Process  from '../api/process.js';
class LxlslbCPT extends React.Component{
	constructor(props){
	    super(props);
	    this.state={
	    laws : [],
	    estatus:""
	    }
  }
    componentWillMount(){
    	let that = this;
      let process = new Process({
      	"url":"http://1.fzmy1.applinzi.com/index.php/Home/law/queryLawByEstatus?",
      	options:{
        	"name":"laws",
          "estatus":"'离线'",
          "callback":"laws"
    	},
        headers:{},
        callback:function(data){
        	console.log(data);
         	data = JSON.parse(data.slice(0,-1).slice("laws".length+1));
          that.setState({
          	laws: data.data
        	});
          console.log(that.state.laws);
        }
    });
    console.log(1);
    process.push();
  }
  render(){
    let _this = this;
    let law = _this.state.laws.map(function(data,index){
      return (
        <div>
          <span>{data.vname}</span>
          <span>上线时间:{data.donlinetime}</span>
        </div>
      );
    });
    return (
        <List static>
          {law}
        </List>
      );
  }

}
export default LxlslbCPT;
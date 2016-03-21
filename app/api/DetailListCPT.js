import React from 'react';
import ReactDOM from 'react-dom';
import  {List,ListItem,Badge} from 'amazeui-react';
class DetailListCPT extends React.Component{
	constructor(props){
		super(props);
		this.state={
		lists : []
		}
	}
		componentWillMount(){
			let that = this;
			let process = new Process({
			"url":"http://1.fzmy1.applinzi.com/index.php/Home/Message/test?",
			options:{
				"name":"lists",
				"imid":"2",
			"callback":"lists"
		},
		headers:{},
		callback:function(data){
			console.log(data);
			data = JSON.parse(data.slice(0,-1).slice("lists".length+1));
			that.setState({
			lists: data.data
		});
		console.log(that.state.lists);
		}
		});
		console.log(1);
		process.push();
	}
	render(){
		console.log(this.state.lists);
		let lis = this.state.lists.map(function(data,index){
			return (
					<p key={index}>{data.tcontent}</p>
				);
		});
		return (
				<div>{lis}</div>
			)
	}
}

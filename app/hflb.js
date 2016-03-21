import React from 'react';
import { Slider , Container , Main,Panel,ListItem,List,Pagination} from 'amazeui-react';
import Process  from './api/process.js';
import Reply from './api/Reply.js';
class Hflb extends React.Component{
 	constructor(props){
		super(props);
		this.state={
		lists : [],
		imid:"",
		start:"0",
		limit:"20",
		title:[]
		}
	}
	
	componentWillMount(){
		let that = this;
		let imid = window.location.href.split('=')[1].split('&_')[0];
		let process = new Process({
			"url":"http://1.fzmy1.applinzi.com/index.php/Home/Message/queryReply?",
			options:{
				"name":"lists",
				"id":imid,
				"callback":"lists",
				start:that.state.start,
				limit:that.state.limit
			},
			headers:{},
			callback:function(data){
				console.log(data.data);
				data = JSON.parse(data.slice(0,-1).slice("lists".length+1));
				that.setState({
				title:data.data[0],
				lists: data.data,
				imid:imid
				});
			}
		});
		process.push();
	}

	componentDidUpdate(){
		var title = document.getElementById('title1');
		title.children[0].innerHTML=this.state.title.vtitle;
	}

	render(){
		let lists = this.state.lists;
		lists = lists.shift();
		let lis = this.state.lists.map(function(data,index){
			return (
				<List key={index} static fill>
					<ListItem href="" >
       					{data.tcontent}
		      		</ListItem>
		        </List>	
			);
		});

		return (
			<div>	
			    <Panel id="title1" header="title" amStyle="primary">
			     	{lis}
			    </Panel>
			    <Reply key={this.state.imid}/>
			</div>
		)
	}

}
export default Hflb;
import React from 'react';
import NavBarCPT from './api/NavBarCPT.js';
import { Header } from 'amazeui-react';
import HeaderPfjy from './storage/HeaderPfjy.js';
import ZxlslbCPT from './api/ZxlslbCPT.js';
class Pfjy extends React.Component{
	render(){
		return (
			<div>
				<Header {...HeaderPfjy} />
				<NavBarCPT index="普法教育" />
				<ZxlslbCPT />
			</div>
		);
	}
	
}
export default Pfjy;
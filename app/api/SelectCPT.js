import React from 'react';
import ReactDOM from 'react-dom';
import  {Selected} from 'amazeui-react';
import SelectDate from '../storage/SelectDate.js';
class SelectCPT extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selvale : ""
    }
  }

  changValue(newvalue){
    let that = this;
    that.setState({
      selvale:newvalue
    });
    console.log(newvalue);
    console.log(this);
    this.props.callbackGetvalue(newvalue);
  }

  render(){
    let _this= this;
      console.log(this.state.selvale);
    var selects = {
      data: SelectDate,
    }
    return (
      <div>
        <Selected 
          {...selects} 
          placeholder="请选择法律门类..." 
          onChange={_this.changValue.bind(_this)}/>
      </div>
    )
  }
}

export default SelectCPT;
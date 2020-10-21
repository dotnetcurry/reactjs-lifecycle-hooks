import React, { Component } from 'react';
class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle:true,
            value:0
        };
    }
    handleClick=()=>{
        if(this.state.toggle){
            this.setState({toggle:false});
        } else {
            this.setState({toggle:true});
        }
    }

    componentDidMount=()=>{
        console.log('Parent Component of ComponentDidMount is invoked');
       
    }
    componentDidUpdate=()=>{
        console.log('Parent Component ComponentDidUpdate is invoked');
    }

    render() { 
        if(this.state.toggle){
            return ( 
                <div className="container">
                    <input type="button" value="Toggle" className="btn btn-success"
                     onClick={this.handleClick.bind(this)}/>
                    <FirstChildComponent/>
                </div>
            );
        } else {
            return ( 
                <div className="container">
                      <input type="button" value="Toggle" className="btn btn-success"
                     onClick={this.handleClick.bind(this)}/>
                    <input type="text" value={this.state.value} 
                      onChange={(evt)=> {this.setState({value: parseInt(evt.target.value)})}}/>
                    <SecondChildComponent data={this.state.value}/>
                </div>
            );
        }
        
    }
}

class FirstChildComponent extends Component {
      state = {
          xPos:0,
          yPos:0
      };

      captureMousePositions=(evt)=> {
          this.setState({xPos:evt.clientX});
          this.setState({yPos:evt.clientY});
      }
      componentDidMount=()=>{
          console.log('First Child Component of ComponentDidMount is invoked');
          window.addEventListener('mousemove', this.captureMousePositions);
      }
      componentDidUpdate=()=>{
          console.log('First Child Component of  ComponentDidUpdate is invoked');
      }
      componentWillUnmount=()=>{
        console.log('First Child Component of  ComponentWillUnmont is invoked');
         window.removeEventListener('mousemove', this.captureMousePositions);
      }
      render(){
        return(
            <div className="container">
            <h2>The First Component</h2>

                <span>
        <strong>X Position {this.state.xPos}</strong> : <strong>Y Position {this.state.yPos}</strong>
                </span>
            </div>
        );
      }
    
}

class SecondChildComponent extends Component {
    componentDidMount=()=>{
        console.log('Second Child Component of ComponentDidMount is invoked');
    }
    componentDidUpdate=()=>{
        console.log('Second Child Component of  ComponentDidUpdate is invoked');
    }
    componentWillUnmount=()=>{
      console.log('Second Child Component of ComponentWillUnmont is invoked');
    }
    render(){
        return (
        <div className="container">
            <h2>The Second Components</h2>
            <div className="row-cols-1">
                <strong>
                    {this.props.data}
                </strong>
            </div>
        </div>
)    }
}

export default ParentComponent;
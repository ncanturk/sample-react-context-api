import React, { Component } from 'react'

class Test extends Component {
  constructor(props){
    super(props);
    console.log("constructor oluşturuldu")
  }

  componentDidMount() {
    console.log("componentDidMount medthodu çalıştı")
    this.setState({
      a:1
    })
  }
  componentDidUpdate = (prevProps, prevState) => {
    console.log("componentDidUpdate")
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate")
    return true
  }
  
  
  
  render() {
    console.log("Render Komutu çalıştı")
    return (
      <div>
        
      </div>
    )
  }
}
export default Test;
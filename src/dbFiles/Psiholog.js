import React from "react";
class Psiholog extends React.Component  { //extends React.Component
    constructor(Psiholog_ID, ime,prezime,email){
    super();
        // this.Psiholog_ID = Psiholog_ID;
        // this.ime=ime;
        // this.prezime=prezime;
        // this.email=email;
    }

  render(){
    // const list = [0,2,3,4,5,6];
    console.log(this.props.ime)
    return(
<h3>{this.props.map(e=>{return(<h1>{e}</h1>)})}</h3>
    )
  }

}

//module.exports = Psiholog;

export default Psiholog;

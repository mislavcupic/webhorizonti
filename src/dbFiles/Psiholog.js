// import React from "react";
class Psiholog   { //extends React.Component
    constructor(Psiholog_ID,ime,prezime,email,date){
        date = new Date().toLocaleString();
        // date = current.getYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        this.Psiholog_ID = Psiholog_ID;
        this.ime=ime;
        this.prezime=prezime;
        this.email=email;
        this.date=date;
     
    }

//   render(){
   
//      const list = [0,2,3,4,5,6];
//     console.log(this.props.Psiholog_ID);
//     return(
//       //Object.keys(employee).map((key, index)
// <h3>{list.map(e=>{return(<h1>{e}</h1>)})}</h3>
//     )
//   }

}
export default Psiholog
module.exports = Psiholog;

//export default Psiholog;

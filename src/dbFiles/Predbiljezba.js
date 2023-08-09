const Psiholog = require('./Psiholog')
const Predavanje = require('./Predavanje')

class Predbiljezba { //extends React.Component
    constructor(Predbiljezba_ID,Psiholog_ID,Predavanje_ID){
        Psiholog_ID = new Psiholog().Psiholog_ID;
        Predavanje_ID = new Predavanje().Predavanje_ID;
        this.Predbiljezba_ID = Predbiljezba_ID;
        this.Psiholog_ID = Psiholog_ID;
        this.Predavanje_ID = Predavanje_ID;
     
    }

}

module.exports = Predbiljezba;


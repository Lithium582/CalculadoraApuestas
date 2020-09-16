import React, { Component } from 'react'

export class Combo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            onChange: props.onChange,
            lista: props.lista
        };
    }

    _change = (e) => {
        if(this.state.onChange){
            this.state.onChange(e);
        }
    }

    render() {
        let opciones = [{
            id: "",
            texto: "--SIN SELECCIONAR--"
        }];
        opciones = opciones.concat(this.state.lista);

        let algo = opciones.length == 1 ? "disabled" : "";
        
        return (
            <div className="select">
                <select onChange={this._change} className="selectCOMBO" disabled={algo}>
                    {
                        opciones.map(obj => {
                            return (<option key={obj.id} value={obj.id}>{obj.texto}</option>)
                        })
                    }
                </select>
            </div>
        )
    }
}

export default Combo;
import React, { Component } from 'react'

export class Combo extends Component {
    render() {
        const opciones = this.props.lista;
        
        return (
            <div className="select">
                <select>
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
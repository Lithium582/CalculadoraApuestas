import React, { Component } from 'react';
import Combo from './combo.js';

export class Filtros extends Component {
    //state = {campeonatos: [], resultados: [], fechas: []}
    constructor(props) {
        super(props);
        //Defino el state
        this.state = {
            campeonatos: props.campeonatos,
            fechas: props.fechas,
            resultados: props.resultados,
            comboCampeonato: props.comboCampeonato
        };
    }

    _changeCampeonato = (e) => {
        let lista = this.state.comboCampeonato(e);
        console.log("LISTA FILTRO", lista);

        this.setState({
            fechas: lista
        });
    }

    _changeFechas = (e) => {
        console.log("HOLI");
    }

    render () {
        console.log("RENDER FILTRO", this.state);

        return (
            <div>
                <div>Campeonato:</div>
                <Combo
                    lista={this.state.campeonatos}
                    onChange={this._changeCampeonato}
                ></Combo>

                <div>Fecha:</div>
                <Combo
                    lista={this.state.fechas}
                    onChange={this._changeFechas}
                ></Combo>

                <div>Resultado:</div>
                <Combo
                    lista={this.state.resultados}
                    onChange={this._comboCampeonato}
                ></Combo>

                <div>Monto:</div>
                <input className="input inputFiltro" type="text" id="txtMontoApuesta" name="txtMontoApuesta" />

                <div>Apuesta:</div>
                <input className="input inputFiltro" type="text" id="txtCantidadPartidos" name="txtCantidadPartidos" />

                <hr />

                <button className="button is-info">
                    Calcular
                </button>
            </div>
        )
    }
}
import React, { Component } from 'react';
import Combo from './combo.js';

export class Filtros extends Component {
    //Llamo al constructor para que 
    render () {
        return (
            <div>
                <div>Campeonato:</div>
                <Combo lista={listaCampeonatos}></Combo>

                <div>Fecha:</div>
                <Combo lista={listaCampeonatos}></Combo>

                <div>Resultado:</div>
                <Combo lista={listaCampeonatos}></Combo>

                <div>Monto:</div>
                <input className="input" type="text" id="txtMontoApuesta" name="txtMontoApuesta" />

                <div>Apuesta:</div>
                <input className="input" type="text" id="txtCantidadPartidos" name="txtCantidadPartidos" />

                <button className="button is-info">
                    Calcular
                </button>
            </div>
        )
    }
}
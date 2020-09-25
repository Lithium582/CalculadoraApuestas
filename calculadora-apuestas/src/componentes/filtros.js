import React, { Component } from 'react';
import Combo from './combo.js';

export class Filtros extends Component {
    //state = {campeonatos: [], resultados: [], fechas: []}
    constructor(props) {
        super(props);
        //Defino el state
        this.state = {
            campeonatosCombo: props.campeonatos,
            fechasCombo: [],
            resultadosCombo: props.resultados,
            comboCampeonato: props.comboCampeonato,
            comboFechas: props.comboFecha,
            campeonatoSeleccionado: "",
            resultadoSeleccionado: "",
            montoIngresado: 0,
            combinacionApuesta: 0
        };
    }

    // #region "Controles"
    _changeCampeonato = (e) => {
        let campeonatoSeleccionado = this.state.comboCampeonato(e);
        let fechas = [];

        //Si selecciona un campeonato puntual, cargo las fechas disponibles. Sino, el combo de fechas permanece inhabilitado
        if (campeonatoSeleccionado.length === 1) {
            fechas = campeonatoSeleccionado[0].Fechas.map((e) => {
                return {
                  id: e.Fecha,
                  texto: e.Fecha
                }
            });
        }

        this.setState({
            fechasCombo: fechas,
            campeonatoSeleccionado: campeonatoSeleccionado
        });
    }

    _changeFechas = (e) => {
        //Si selecciono una fecha, es porque tengo un solo campeonato seleccionado
        let idFechaSel = e.currentTarget.value;
        //let campSeleccionado = this.state.campeonatoSeleccionado;
        //let fechasSeleccionadas = this.state.comboFechas(campSeleccionado[0].Torneo, idFechaSel);
        //console.log("PUTITO", fechasSeleccionadas);
        
        //campSeleccionado[0].Fechas = fechasSeleccionadas;

        this.setState({
            fechaSeleccionada: idFechaSel
            //campeonatoSeleccionado: campSeleccionado
        });
    }

    _changeResultados = (e) => {
        let idResultadoSel = e.currentTarget.value;

        this.setState({
            resultadoSeleccionado: idResultadoSel
        });
    }

    _changeMonto = (e) => {
        let monto = e.currentTarget.value;

        if (monto === ""){
            monto = 0;
        }

        this.setState({
            montoIngresado: monto
        });
    }

    _changeCombinacionApuesta = (e) => {
        let combinacionApuesta = e.currentTarget.value;

        if (combinacionApuesta === ""){
            combinacionApuesta = 0;
        }
        
        this.setState({
            combinacionApuesta: combinacionApuesta
        });
    }

    // #endregion

    //Botón Calcular
    _clickCalcular = (e) => {
        let coleccion = {};
        this.state.campeonatoSeleccionado.forEach((e) => {
            let torneoObj = {
                Campeonato: e.Torneo
            }

            if (this.state.fechaSeleccionada != "") {
                
            }

            coleccion.push(torneoObj);
        });

        console.log("COLECCIÓN CLICK", coleccion);
    }

    render () {
        console.log("EL ESTÉIT FILTROH", this.state);

        return (
            <div>
                <div>Campeonato:</div>
                <Combo
                    lista={this.state.campeonatosCombo}
                    onChange={this._changeCampeonato}
                ></Combo>

                <div>Fecha:</div>
                <Combo
                    lista={this.state.fechasCombo}
                    onChange={this._changeFechas}
                ></Combo>

                <div>Resultado:</div>
                <Combo
                    lista={this.state.resultadosCombo}
                    onChange={this._changeResultados}
                ></Combo>

                <div>Monto:</div>
                <input
                    className="input inputFiltro"
                    type="text"
                    id="txtMontoApuesta"
                    name="txtMontoApuesta"
                    onChange={this._changeMonto}
                />

                <div>Apuesta:</div>
                <input
                    className="input inputFiltro"
                    type="text"
                    id="txtCantidadPartidos"
                    name="txtCantidadPartidos" 
                    onChange={this._changeCombinacionApuesta}
                />

                <hr />

                <button className="button is-info" onClick={this._clickCalcular}>
                    Calcular
                </button>
            </div>
        )
    }
}
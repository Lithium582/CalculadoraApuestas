import React, { Component } from 'react';
import Combo from './combo.js';

export class Filtros extends Component {
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
            combinacionApuesta: 0,
            fechaSeleccionada: null
        };
    }

    // #region "Controles"
    _changeCampeonato = (e) => {
        let campeonatoSeleccionado = this.state.comboCampeonato(e);
        let fechas = [];

        //Si selecciona un campeonato puntual, cargo las fechas disponibles. Sino, el combo de fechas permanece inhabilitado
        if (campeonatoSeleccionado != null) {
            fechas = campeonatoSeleccionado.Fechas.map((e) => {
                return {
                  id: e.Fecha,
                  texto: e.Fecha
                }
            });
        }

        this.setState({
            fechasCombo: fechas,
            campeonatoSeleccionado: campeonatoSeleccionado,
            fechaSeleccionada: ""
        });
    }

    _changeFechas = (e) => {
        //Si selecciono una fecha, es porque tengo un solo campeonato seleccionado
        let idFechaSel = e.currentTarget.value;
        let objFechaSel = null;
        let campSeleccionado = this.state.campeonatoSeleccionado;

        let fechasAux = campSeleccionado.Fechas.filter((e) => {
            return e.Fecha == idFechaSel;
        });

        if (fechasAux.length > 0) {
            objFechaSel = fechasAux[0];
        }

        this.setState({
            fechaSeleccionada: objFechaSel
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

    // #region "Validar form y auxiliares"
    _validarForm = (e) => {
        let mensaje = "";
        if (!this.state.fechaSeleccionada) {
            mensaje += "\nSeleccione una fecha";
        }

        if (this.state.combinacionApuesta < 2) {
            mensaje += "\nLa combinación no es válida";
        }

        if (this.state.montoIngresado < 1) {
            mensaje += "\nEl monto no es válido";
        }

        return mensaje;
    }

    _obtenerPartidos = (fecha, idResultado, combApuestas) => {
        let partidosAcertados = [];
        let combinaciones = [];
        let resultado = this._obtenerResultados(idResultado);

        let resultadoFinal = fecha.Resultados.filter((e) => {
            return e.Resultado === resultado.Inicial;
        });

        partidosAcertados = resultadoFinal.map((e) => {
            return {
                Numero: e.Nro,
                Dividendo: e[resultado.Res]
            };
        });

        combinaciones = this._obtenerCombinaciones(partidosAcertados, combApuestas);

        // for (let i = 0; i < partidosAcertados.length; i++) {
        //     let partido1 = partidosAcertados[i];
            
        //     for (let j = (i+1); j < partidosAcertados.length; j++) {
        //         let partido2 = partidosAcertados[j];
        //         let objCombinacion = {
        //             Partidos: partido1.Numero + " - " + partido2.Numero,
        //             Dividendo: (partido1.Dividendo * partido2.Dividendo)
        //         }

        //         combinaciones.push(objCombinacion);
        //     }
        // }

        console.log("RESULTADO", resultado);
        console.log("RES FINAL", resultadoFinal);
        console.log("PARTIDOS", partidosAcertados);
        console.log("COMBINACIONES", combinaciones);

        return {
            Resultado: resultado.Res,
            PartidosAcertados: partidosAcertados,
            Combinaciones: combinaciones
        };
    }

    _obtenerTodos = (fecha) => {
        return [];
    }

    //Esta función me retorna el nombre del atributo y la inicial que identifican al resultado, según el ID recibido
    //Por ejemplo, si recibo '5', devuelvo {Res: 'Empate', Inicial: 'E'}
    _obtenerResultados(idResultado) {
        let inicial = "";
        let resultado = "";

        switch (idResultado) {
            case "1": {
                inicial = "L";
                resultado = "Local";
                break;
            }
            case "2": {
                inicial = "V";
                resultado = "Visita";
                break;
            }
            case "3": {
                inicial = "F";
                resultado = "Favorito";
                break;
            }
            case "4": {
                inicial = "N";
                resultado = "No Favorito";
                break;
            }
            case "5": {
                inicial = "E";
                resultado = "Empate";
                break;
            }
        }

        return {
            Inicial: inicial,
            Res: resultado
        };
    }

    _obtenerCombinaciones(partidos, combinaciones) {
        return this._obtenerCombinacionesRecursivo(partidos, [], combinaciones, []);
    }

    _obtenerCombinacionesRecursivo(partidos, combinacionesParcial, cantCombinaciones, combinacionesLlevan) {
        if (cantCombinaciones == 0) {
            let nuevaCombinacion = {
                Partidos: "",
                Dividendo: 1
            };

            for (let i = 0; i < combinacionesParcial.length; i++) {
                let posicionPartido = combinacionesParcial[i];
                let objPartido = partidos[posicionPartido];

                nuevaCombinacion.Partidos += objPartido.Numero + " - ";
                nuevaCombinacion.Dividendo = (nuevaCombinacion.Dividendo * objPartido.Dividendo);
            }

            combinacionesLlevan.push(nuevaCombinacion);

            return combinacionesLlevan;
        } else {
            let maximoParcial = 0;

            if (combinacionesParcial.length > 0) {
                maximoParcial = Math.max(...combinacionesParcial);
                maximoParcial++;
            }

            console.log("EL MÁX", maximoParcial);

            for (let i = maximoParcial; i < partidos.length; i++) {
                let combinacionesParcial2 = [...combinacionesParcial];
                combinacionesParcial2.push(i);

                this._obtenerCombinacionesRecursivo(partidos, combinacionesParcial2, (cantCombinaciones-1), combinacionesLlevan);
            }

            return combinacionesLlevan;
        }
    }
    // //#endregion

    //Botón Calcular
    _clickCalcular = (e) => {
        let formValido = this._validarForm();

        if (formValido == ""){
            console.log("SOY EL ESTÉIT", this.state);

            let resultados = [];
            let fechaSeleccionada = this.state.fechaSeleccionada;

            resultados = this._obtenerPartidos(fechaSeleccionada, this.state.resultadoSeleccionado, this.state.combinacionApuesta);

        } else {
            alert(formValido);
        }
    }

    render () {
        console.log("EL ESTÉIT FILTROH", this.state);
        let deshabilitado = this.state.fechaSeleccionada == "" ? "disabled" : "";

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
                
                <button className="button is-info" onClick={this._clickCalcular} disabled={deshabilitado}>
                    Calcular
                </button>
            </div>
        )
    }
}
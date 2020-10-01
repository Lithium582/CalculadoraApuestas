import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Titulo } from './componentes/titulo';
import { FileUploader } from './componentes/fileuploader';
import { Filtros } from './componentes/filtros';

class App extends Component {
  state = {
    archivoSubido: false,
    datos: null,
    campeonatos: [],
    monto: 0,
    tipoApuesta: "",
    resultados: [
    {
      id: 1,
      texto: "Locatario"
    },
    {
      id: 2,
      texto: "Visitante"
    },
    {
      id: 3,
      texto: "Favorito"
    },
    {
      id: 4,
      texto: "No Favorito"
    },
    {
      id: 5,
      texto: "Empate"
    }
  ]
  }

  //Esta función recibe la información del archivo cargado, carga las listas y setea el state, generando una nueva renderización del componente
  _handleArchivo = (datosArchivo) => {
    console.log("SOY EL JÁNDEL", datosArchivo);
    let campeonatos = [];

    datosArchivo.forEach(e => {
      campeonatos.push({
        id: e.Torneo,
        texto: e.Torneo 
      });
    });

    this.setState({
      archivoSubido: true,
      datos: datosArchivo,
      campeonatos: campeonatos
    });
  }

  //Controla el evento change del combo de Campeonatos
  _changeCampeonato = (e) => {
    let idCamp = e.currentTarget.value;

    if (idCamp != "") {
      let campeonatoSeleccionado = this.state.datos.filter((e) => {
        return e.Torneo.toUpperCase() === idCamp.toUpperCase();
      });

      console.log("CAMPEONATO SELECCIONADO", campeonatoSeleccionado);
      return campeonatoSeleccionado[0];
    }

    return null;
  }

  _changeFecha = (idCampeonato, idFecha) => {
    // console.log("SOMOS DATOS", this.state.datos);
    // console.log("SOY FECHA", idFecha);
    // console.log("SOY CAmpoeonao", idCampeonato);

    // let fechaSeleccionada = this.state.datos.filter((e) => {
    //   return e.Torneo.toUpperCase() == idCampeonato.toUpperCase();
    // });

    // console.log("GJHASGTJDGFDSJTGFGUYEFEI", fechaSeleccionada);
    
    // // [0].Fechas.filter((e) => {
    // //   return e.Fecha == idFecha || idFecha === "";
    // // })[0];

    // return fechaSeleccionada;
  }

  _renderFiltros = () => {
    return <div className="divFiltros">
            <Filtros
              campeonatos={this.state.campeonatos}
              // fechas={this.state.fechas}
              resultados={this.state.resultados}
              comboCampeonato={this._changeCampeonato}
              comboFecha={this._changeFecha}
              comboResultado={this._comboResultado}
            ></Filtros>
          </div>
  }

  render() {
    console.log("RENDER APP");
    return (
      <div className="App">
        <Titulo>Cálculo apuestas</Titulo>
        <FileUploader 
          id="inputArchivoResultados"
          formatos="JSON"
          onChange={this._handleArchivo}
        ></FileUploader>
        {/* <button onClick={this._handleArchivo} id="btnSubirArchivo" className="button is-info">
          Cargar
        </button> */}

        {
          this.state.archivoSubido
          ? this._renderFiltros()
          : ""
        }
      </div>
    );
  }
}

export default App;

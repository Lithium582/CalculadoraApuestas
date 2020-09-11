import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { Titulo } from './componentes/titulo';
import { FileUploader } from './componentes/fileuploader';
import { Filtros } from './componentes/filtros';

class App extends Component {
  state = {archivoSubido: false, datos: null, campeonatos: [], fechas: [], resultados: [], monto: 0, tipoApuesta: ""}

  //Esta función recibe la información del archivo cargado, carga las listas y setea el state, generando una nueva renderización del componente
  _handleArchivo = (datosArchivo) => {
    let campeonatos = []
    datosArchivo.forEach(e => {
      campeonatos.push(e.Torneo);
    });

    this.setState({datos: datosArchivo, archivoSubido: true, campeonatos: campeonatos});
  }

  _renderFiltros = () => {
    return <div className="divFiltros">
            <Filtros
              campeonatos={this.state.campeonatos}
            ></Filtros>
          </div>
  }

  render() {
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

        {this.state.archivoSubido
        ? this._renderFiltros()
        : ""
        }
      </div>
    );
  }
}

export default App;
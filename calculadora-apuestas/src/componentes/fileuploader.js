import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FileUploader extends Component {
    //SIEMPRE LLAMAR AL SUPER
    //Cargo el evento onChange en el state
    constructor(props) {
        super(props);
        //Defino el state
        this.state = {
            fileReader: null,
            onChange: props.onChange
        };
    }
    
    //Obtengo los tipos de algunas props
    static propTypes = {
        id: PropTypes.string,
        formatos: PropTypes.string
    }

    /*
        Función que maneja el evento "change" del input.
        En esta función se carga el archivo y se define un evento para que reciba esa carga y haga algo con el contenido del archivo
    */
    _handleFileUploader = (archivo) => {
        let fileReader = new FileReader();
        fileReader.onloadend = this._handleArchivo;
        fileReader.readAsText(archivo);

        this.setState({fileReader: fileReader});
    }

    /*
        Esta función recibe el contenido de la empresa.
        Intenta convertir a JSON en primer lugar, y si la conversión es exitosa, llama a la función "onChange" recibida para seguir con el flujo
        En el caso de fallar, se entiende que se esperaba otro formato y se pasa el archivo directamente a la función externa para que lo maneje
        Esto se hizo pensando en la mayor reutilización posible
    */
    _handleArchivo = () => {
        let contenido = this.state.fileReader.result;
        try {
            let elSheison = JSON.parse(contenido);

            this.state.onChange(elSheison);
        } catch (err) {
            this.state.onChange(contenido);
        }
    }
    
    render() {
        console.log("RENDER FILE");
        const {id, formatos} = this.props;
        
        return (
            <input
                type="file"
                id={id || "inputArchivo"}
                name={id || "inputArchivo"}
                accept={formatos}
                onChange={e => this._handleFileUploader(e.target.files[0])}
                ></input>
        )
        
    }
}
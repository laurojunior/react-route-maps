import axios from 'axios'
import React, { Component } from 'react'
import api from '../api'
import { withRouter } from 'react-router-dom'
const google=window.google
 
class CalcularRota extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nome: '',
      data_entrega: '',
      ponto_partida: '',
      ponto_destino: '',
    }
  }
 
  componentDidMount () {
    const entregaId = this.props.match.params.id
 
    axios.get(api.entregas+`/${entregaId}`).then(response => {
      this.setState({
        nome: response.data.nome,
        data_entrega: response.data.data_entrega,
        ponto_partida: response.data.ponto_partida,
        ponto_destino: response.data.ponto_destino
      })
    })
  }

  
    // Função para deletar um entrega
  initMap (e) {
   var directionsService = new google.maps.DirectionsService
   var directionsDisplay = new google.maps.DirectionsRenderer
    console.log('map initialized');
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsService.route({
      origin: this.state.ponto_partida,
      destination: this.state.ponto_destino,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    directionsDisplay.setMap(map);
    document.getElementById('map').setAttribute("style","height:500px");
  }

 
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>Calculo de Rota</div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <label htmlFor='nome'>Nome</label>
                    <input
                      id='nome'
                      type='text'
                      className='form-control'
                      name='nome'
                      value={this.state.nome}
                      disabled
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='data_entrega'>Data de Entrega</label>
                    <input
                      id='data_entrega'
                      type='text'
                      className='form-control'
                      name='date'
                      value={this.state.data_entrega}
                      disabled
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='ponto_partida'>Ponto de partida</label>
                    <input
                      id='ponto_partida'
                      type='text'
                      className='form-control'
                      name='ponto_partida'
                      value={this.state.ponto_partida}
                      disabled
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='ponto_destino'>Ponto de Destino</label>
                    <input
                      id='ponto_destino'
                      type='text'
                      className='form-control'
                      name='ponto_destino'
                      value={this.state.ponto_destino}
                      disabled
                    />
                  </div>                  
                  <button type="button" onClick={ () => this.props.history.goBack()} className='btn btn-default'>Voltar</button>
                  <button type="button" onClick={ () => this.initMap(this)} className='btn btn-default'>Gerar Rota</button>
                </form>
                <div id="map"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default CalcularRota

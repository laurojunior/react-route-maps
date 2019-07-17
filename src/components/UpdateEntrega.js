import axios from 'axios'
import React, { Component } from 'react'
import api from '../api'
import { withRouter } from 'react-router-dom'
 
class UpdateEntrega extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      nome: '',
      data_entrega: '',
      ponto_partida: '',
      ponto_destino: '',
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
 
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
 
  onSubmit (event) {
    event.preventDefault();
    const { history } = this.props
    const entrega = {
      nome: this.state.nome,
      data_entrega: this.state.data_entrega,
      ponto_partida: this.state.ponto_partida,
      ponto_destino: this.state.ponto_destino
    }
    axios.post(api.entregas+'/'+this.props.match.params.id, entrega)
      .then(response => {
        // redirect to the homepage
        history.push('/')
        //console.log('response: ', response)
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }
 
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>Create new entrega</div>
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
                      onChange={this.handleFieldChange}
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
                      onChange={this.handleFieldChange}
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
                      onChange={this.handleFieldChange}
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
                      onChange={this.handleFieldChange}
                    />
                  </div>                  
                  <button onClick={ () => this.props.history.goBack()} className='btn btn-default'>Cancelar</button>
                  <button className='btn btn-primary'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default UpdateEntrega
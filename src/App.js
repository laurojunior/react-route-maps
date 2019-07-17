import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import EntregasList from './components/EntregasList'
import CreateEntrega from './components/CreateEntrega'
import UpdateEntrega from './components/UpdateEntrega'
import CalcularRota from './components/CalcularRota'
 
import 'bootstrap/dist/css/bootstrap.css'
 
class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={EntregasList} />
            <Route path='/create' component={CreateEntrega} />
            <Route path='/entrega/:id' component={UpdateEntrega} />  
            <Route path='/rota/:id' component={CalcularRota} />     
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
 
export default App;
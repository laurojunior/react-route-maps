import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
 
class EntregasList extends Component {
 
    constructor () {
        super()
        // State é onde 'guardamos' as variáveis, os dados da nossa aplicação que sofrerão alterações. É onde basicamente declaramos todas as variáveis do nosso componente
        this.state = {
            entregas: []
        }
    }
 
    // componentDidMount - Esse método é chamado imediatamente após a montagem do componente.
    componentDidMount () {
        // Utilizamos agora o axios para requisitar a lista de entregas
        axios.get(api.entregas).then(response => {
            this.setState({
                entregas: response.data
            })
        })
    }
 
    // Função para deletar um entrega
    deleteContact (entregaId) {
            axios.delete(api.entregas+'/'+`${entregaId}`)
            .then(() => {
 
                    // Usamos o GET depois de uma requisição para atualizar a lista
                    return axios.get(api.entregas)
            })
            .then(res => {
 
                    // Editando os dados no state
                    const entregas = res.data;
                    this.setState({ entregas });
            })
    }
 
    render () {
                const { entregas } = this.state
                return (
                    <div className="container">
                    <h2>Lista de entregas</h2>
                    <table className="table ">
                            <thead>
                                    <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Data de Entrega</th>
                                            <th>Ponto de Partida</th>
                                            <th>Ponto de Destino</th>
                                            <th>
                                                <Link 
                                                    className='btn btn-primary btn-xs' 
                                                    to='/create'
                                                >
                                                            Adicionar entrega
                                                    </Link>
                                            </th>
                                    </tr>
                            </thead>
                            <tbody>
                                    {
                                        entregas.map((entrega, index) => (
                                            <tr key={entrega.id}>
                                                    <td>{entrega.id}</td>
                                                        <td>{entrega.nome}</td>
                                                            <td>{entrega.data_entrega}</td>
                                                            <td>{entrega.ponto_partida}</td>
                                                            <td>{entrega.ponto_destino}</td>                               
                                                            <td>
                                                            <Link 
                                                            className='btn btn-default btn-xs' 
                                                            to={`/entrega/${entrega.id}`}
                                                        >
                                                            Editar
                                                        </Link>
                                                            <Link 
                                                            className='btn btn-default btn-xs' 
                                                            to={`/rota/${entrega.id}`}
                                                        >
                                                            Rota
                                                        </Link>
                                                            <button 
                                                                className="btn btn-danger btn-xs btn-delete"
                                                                onClick={ () => this.deleteContact(entrega.id) }
                                                            >
                                                                Excluir
                                                            </button>
                                                    </td>
                                            </tr>
                                            ))
                                        }
                                            
                            </tbody>
                    </table>
            </div>
        )
        }
}
 
export default EntregasList
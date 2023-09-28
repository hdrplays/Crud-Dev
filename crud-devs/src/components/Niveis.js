import React from "react"
import { Table, Button, Form, Modal } from "react-bootstrap";
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Niveis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nivel: '',
            niveis : [],
            modalAberto: false
        }
    }

    //Montagem Componente
    componentDidMount(){
        this.buscarNiveis();
    }

    //Desmontagem Componente
    componentWillUnmount(){
        
    }

    buscarNiveis(){
        fetch("http://localhost:3333/niveis")
        .then(result => result.json())
        .then(dados => {
            this.setState({ niveis : dados})
        })
    }

    deletarNiveis = (id) => {
        fetch("http://localhost:3333/delete/niveis/" + id, { method: 'DELETE'})
        .then(result => {
            if(result.ok){
                this.buscarNiveis();
                toast.success('Nivel excluido com sucesso!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }else{
                toast.error('Não foi possivel excluir este nivel!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
        })
    }

    carregarNiveis = (id) => {
        fetch("http://localhost:3333/niveis/" + id, { method: 'GET'})
        .then(result => result.json())
        .then(niveis => {
            this.setState({ 
                id : niveis.id,
                nivel: niveis.nivel
            })
            this.abrirModal();
        })
    }

    cadastrarNiveis = (niveis) => {
        fetch("http://localhost:3333/create/niveis", { 
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(niveis)
        })
        .then(result => {
            if(result.ok){
                this.buscarNiveis();
                toast.success('Nivel cadastrado com sucesso!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
            else{
                toast.error('Não foi possivel cadastrar este nivel!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
        })
    }

    editarNiveis = (niveis) => {
        fetch("http://localhost:3333/edit/niveis/" + niveis.id, { 
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(niveis)
        })
        .then(result => {
            if(result.ok){
                this.buscarNiveis();
                toast.success('Nivel editado com sucesso!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
            else{
                toast.error('Não foi possivel editar este nivel!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
        })
    }

    renderTabela(){
        return(
            <div>
                <Table className="table-custom striped bordered hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nivel</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.niveis.map((niveis) => 
                            <tr key={niveis.id}>
                                <td>{niveis.id}</td>
                                <td>{niveis.nivel}</td>
                                <td>
                                    <Button variant="secondary" onClick={() => this.carregarNiveis(niveis.id)}>Atualizar</Button>  
                                    <Button variant="danger" onClick={() => this.deletarNiveis(niveis.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <ToastContainer position="top-center" autoClose={3000} /> {/* Configuração do Toastify */}
            </div>
        )
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    

    submit = () => {
        if(this.state.id == 0){
            const niveis = {
                nivel: this.state.nivel
            }
            this.cadastrarNiveis(niveis);
        }
        else{
            const niveis = {
                id: this.state.id,
                nivel: this.state.nivel
            }
            this.editarNiveis(niveis);
        }
        this.fecharModal();
    }

    reset = () => {
        this.setState({
            id: 0,
            nivel: ''
        })
        this.abrirModal();
    }

    fecharModal = () => {
        this.setState({
            modalAberto: false
        })
    }

    abrirModal = () => {
        this.setState({
            modalAberto: true
        })
    }

    renderForm(){
        return(
            <div>
                <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de Nivel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3 hidden" >
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="nivel">
                                <Form.Label>Nivel</Form.Label>
                                <Form.Control type="text" name="nivel" placeholder="Nivel" value={this.state.nivel} onChange={this.handleChange}/>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.submit}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="primary" className="botao-incluir" onClick={this.reset}>Incluir Nivel</Button>
            </div>
        )
    }

    render() {
        return(
            <div>
                {this.renderForm()}
                {this.renderTabela()}
            </div>
        )
    }
}

export default Niveis;
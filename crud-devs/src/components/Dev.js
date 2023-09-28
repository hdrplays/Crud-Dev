import React from "react"
import { Table, Button, Form, Modal } from "react-bootstrap";
import "../App.css";
import { format, parse } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dev extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: '',
            sexo: '',
            datanascimento: '',
            idade: '',
            hobby: '',
            nivel_id: '',
            dev : [],
            modalAberto: false,
            niveis: [],
        }
    }

    //Montagem Componente
    componentDidMount(){
        this.buscarDev();
        this.carregarNiveis();
    }

    //Desmontagem Componente
    componentWillUnmount(){
        
    }

    buscarDev(){
        fetch("http://localhost:3333/desenvolvedores")
        .then(result => result.json())
        .then(dados => {
            this.setState({ dev : dados})
        })
    }

    deletarDev = (id) => {
        fetch("http://localhost:3333/delete/desenvolvedor/" + id, { method: 'DELETE'})
        .then(result => {
            if(result.ok){
                this.buscarDev();
                toast.success('Desenvolvedor excluido com sucesso!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }else{
                toast.error('Não foi possivel excluir este desenvolvedor!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
        })
    }

    carregarDev = (id) => {
        fetch("http://localhost:3333/desenvolvedores/" + id, { method: 'GET'})
        .then(result => result.json())
        .then(dev => {
            this.setState({ 
                id : dev.id,
                nome: dev.nome,
                sexo: dev.sexo,
                datanascimento: format(parse(dev.datanascimento, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" , new Date()), 'yyyy-MM-dd'),
                idade: dev.idade,
                hobby: dev.hobby,
                nivel_id: dev.nivel_id
            })
            this.abrirModal();
        })
    }

    cadastrarDev = (dev) => {
        fetch("http://localhost:3333/create/desenvolvedor", { 
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dev)
        })
        .then(result => {
            if(result.ok){
                this.buscarDev();
                toast.success('Desenvolvedor cadastrado com sucesso!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
            else{
                toast.error('Não foi possivel cadastrar este desenvolvedor!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
        })
    }

    editarDev = (dev) => {
        fetch("http://localhost:3333/edit/desenvolvedor/" + dev.id, { 
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dev)
        })
        .then(result => {
            if(result.ok){
                this.buscarDev();
                toast.success('Desenvolvedor editado com sucesso!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
            else{
                toast.error('Não foi possivel editar este desenvolvedor!', {
                    position: toast.POSITION.BOTTOM_RIGHT, 
                    autoClose: 3000, 
                });
            }
        })
    }

    carregarNiveis = () => {
        fetch("http://localhost:3333/niveis")
        .then(result => result.json())
        .then(dados => {
            this.setState({ niveis : dados})
        })
    }

    renderTabela(){
        const { dev, currentPage, itemsPerPage } = this.state;
        const offset = currentPage * itemsPerPage;
        const currentItems = dev.slice(offset, offset + itemsPerPage);
        return(
            <div>
                <Table className="table-custom striped bordered hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>Idade</th>
                        <th>Hobby</th>
                        <th>Nivel</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.dev.map((dev) => 
                            <tr key={dev.id}>
                                <td>{dev.id}</td>
                                <td>{dev.nome}</td>
                                <td>{dev.sexo == "M" ? "Masculino" : "Feminino"}</td>
                                <td>{formatarData(dev.datanascimento)}</td>
                                <td>{dev.idade} Anos</td>
                                <td>{dev.hobby}</td>
                                <td>{dev.nivel}</td>
                                <td>
                                    <Button variant="secondary" onClick={() => this.carregarDev(dev.id)}>Atualizar</Button>  
                                    <Button variant="danger" onClick={() => this.deletarDev(dev.id)}>Excluir</Button>
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
            const dev = {
                nome: this.state.nome,
                sexo: this.state.sexo,
                datanascimento: format(parse(this.state.datanascimento, 'yyyy-MM-dd', new Date()), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
                idade: this.state.idade,
                hobby: this.state.hobby,
                nivel_id: this.state.nivel_id
            }
    
            this.cadastrarDev(dev);
        }
        else{
            const dev = {
                id: this.state.id,
                nome: this.state.nome,
                sexo: this.state.sexo,
                datanascimento: format(parse(this.state.datanascimento, 'yyyy-MM-dd', new Date()), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
                idade: this.state.idade,
                hobby: this.state.hobby,
                nivel_id: this.state.nivel_id
            }
    
            this.editarDev(dev);
        }
        this.fecharModal();
    }

    reset = () => {
        this.setState({
            id: 0,
            nome: '',
            sexo: '',
            datanascimento: '',
            idade: '',
            hobby: '',
            nivel_id: ''
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
                        <Modal.Title>Cadastro do Desenvolvedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3 hidden" >
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="nome" placeholder="Nome" value={this.state.nome} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="sexo">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Control as="select" name="sexo" value={this.state.sexo} onChange={this.handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="datanascimento">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control type="date" name="datanascimento" max="2999-12-31" placeholder="DD/MM/AAAA" value={this.state.datanascimento} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="idade">
                                <Form.Label>Idade</Form.Label>
                                <Form.Control type="number" name="idade" placeholder="Idade" value={this.state.idade} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="hobby">
                                <Form.Label>Hobby</Form.Label>
                                <Form.Control type="text" name="hobby" placeholder="Hobby" value={this.state.hobby} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="nivel_id">
                                <Form.Label>Nivel</Form.Label>
                                <Form.Control as="select" type="number" name="nivel_id" placeholder="Nivel" value={this.state.nivel_id} onChange={this.handleChange}>
                                    <option disabled>Selecione uma opção</option>
                                    {this.state.niveis.map((niveis) => 
                                        <option key={niveis.id} value={niveis.id}>{niveis.nivel}</option>
                                    )}
                                </Form.Control>
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

                <Button variant="primary" className="botao-incluir" onClick={this.reset}>Incluir Desenvolvedor</Button>
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
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

export default Dev;
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


class CreateProject extends Component {
  constructor(props) {
    super(props); 
    this.handleDateChange = this.handleDateChange.bind(this);
    //console.log(props)
    this.state = {
      solicitante: '',
      tiposolicitacao:'',
      titulo:'',
      descricao:'',
      tempoexecucao:'',
      prazoentrega: '',
      status:'aberto',
      revjustificativa:'',
      revtempoexecucao:'',
      dataconclusao:''
    };
  }
  handleDateChange(e){
    console.log(e.target.value)
    this.setState({
      [e.target.id]: new Date(e.target.value+" 00:00:00 GMT-03:00")
    });
    //console.log(new Date(e.target.value+" 00:00:00"));
  }
  componentDidMount() {
    M.AutoInit();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    //console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    //let today = new Date().toISOString().split("T")[0];
    let _this = this;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Criando um novo Entregavel</h5>
          <div className="input-field">
            <input type="text" id='solicitante' onChange={this.handleChange}/>
            <label htmlFor="solicitante">Solicitante</label>
          </div>
          <div className="input-field">
            <select id="tiposolicitacao" defaultValue="" onChange={this.handleChange} value={this.state.value}>
              <option value="" disabled>Selecione uma opção</option>
              <option value="Minuta">Minuta</option>
              <option value="DIP">DIP</option>
              <option value="GDTIC">GDTIC</option>
              <option value="Carta Externa">Carta Externa</option>
              <option value="Cronograma">Cronograma</option>
              <option value="Emails">Emails</option>
              <option value="SST">SST</option>
              <option value="Planilha">Planilha</option>
              <option value="Relatorio">Relatório</option>
              <option value="Apresentação">Apresentação</option>
              <option value="Outros">Outros</option>
            </select>
            <label htmlFor="tiposolicitacao">Tipo de Solicitação</label>
          </div>         
          <div className="input-field">
            <input type="text" id='titulo' onChange={this.handleChange}/>
            <label htmlFor="titulo">Titulo</label>
          </div>
          <div className="input-field">
            <textarea id="descricao" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="descricao">Descricao Geral</label>
          </div>
          <div className="input-field">
            <select id="tempoexecucao" defaultValue="" onChange={this.handleChange} value={this.state.value}>
              <option value="" disabled >Selecione uma opção</option>
              <option value="N1">N1 até 5 min</option>
              <option value="N2">N2 até 15 min</option>
              <option value="N3">N3 até 30 min</option>
              <option value="N4">N4 até 45 min</option>
              <option value="N5">N5 até 60 min</option>
              <option value="N6">N6 até 90 min</option>
              <option value="N7">N7 até 2 h</option>
              <option value="N8">N8 até 4 h</option>
              <option value="N9">N9 até 6 h</option>
              <option value="N10">N10 até 8 h</option>
              <option value="N11">N11 até 10 h</option>
              <option value="N12">N12 até 15 h</option>
              <option value="N13">N13 até 16 h</option>
              <option value="N14">N14 até 20 h</option>
              <option value="N15">N15 até 24 h</option>
              <option value="N16">N16 até 32 h</option>
              <option value="N17">N11 até 40 h</option>
            </select>
            <label htmlFor="tempoexecucao">Tempo de Execução</label>
          </div>
          <div className="input-field col s12">
            <input type='date' id="prazoentrega" onChange={this.handleDateChange}/>
            <label htmlFor="prazoentrega">Prazo de Entrega</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Criar</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
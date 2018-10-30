import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import { updateProject } from '../../store/actions/projectActions'
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import ReactDOM from 'react-dom';


class ProjectDetails extends Component {
  constructor(props) {
    super(props); 
    //console.log(props)
    this.state = {
      solicitante: props.project.solicitante,
      chave: props.project.chave,
      contato:props.project.contato,
      areasolicitante:props.project.areasolicitante,
      tiposolicitacao:props.project.tiposolicitacao,
      descricao:props.project.descricao,
      tempoexecucao:props.project.tempoexecucao,
      prazoentrega: props.project.prazoentrega
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }
  handleDateChange(e){
    //console.log(e.target)
    //console.log(new Date(this.props.project.prazoentrega.seconds*1000).getFullYear()+"-"+
    //            (new Date(this.props.project.prazoentrega.seconds*1000).getMonth()+1)+"-"+
    //            new Date(this.props.project.prazoentrega.seconds*1000).getDate())
    this.setState({
      [e.target.id]: new Date(e.target.value+" 00:00:00 GMT-03:00")
    });
    //console.log(new Date(e.target.value+" 00:00:00"));
  }
  componentDidMount(){
    //console.log(id);
    M.AutoInit();
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state);
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.updateProject(this.state,this.props.projectid);
    this.props.history.push('/');
  }
  render(){
  const { project, auth, projectid } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
  if (project) {
    return (
      <div className="container">
      <form className="white" onSubmit={this.handleSubmit}>
        <h5 className="grey-text text-darken-3">Editando Projeto</h5>
        <div className="input-field">
          <input type="text" defaultValue={project.solicitante} id='solicitante' onChange={this.handleChange} className="validate" />
          <label className="active" htmlFor="solicitante">Solicitante</label>
        </div>
        <div className="input-field">
          <input type="text" id='chave' defaultValue={project.chave} onChange={this.handleChange} className="validate" />
          <label className="active" htmlFor="chave">Chave</label>
        </div>
        <div className="input-field">
          <input type="text" id='contato'defaultValue={project.contato} onChange={this.handleChange} className="validate"/>
          <label  className="active" htmlFor="contato">Contato</label>
        </div>
        <div className="input-field">
          <input type="text" id='areasolicitante' defaultValue={project.areasolicitante} onChange={this.handleChange} className="validate"/>
          <label className="active" htmlFor="areasolicitante">Área Solicitante</label>
        </div>
        <div className="input-field">
          <select id="tiposolicitacao" onChange={this.handleChange} value={project.tiposolicitacao}>
            <option value="" disabled >Selecione uma opção</option>
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
          <textarea id="descricao" className="materialize-textarea" defaultValue={project.descricao} onChange={this.handleChange} className="validate"></textarea>
          <label className="active" htmlFor="descricao">Descricao Geral</label>
        </div>
        <div className="input-field">
          <select id="tempoexecucao" onChange={this.handleChange} value={project.tempoexecucao}>
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
          <label htmlFor="tempoexecucao">Tipo de Solicitação</label>
        </div>
        <div className="input-field col s12">
          <input type='date' id="prazoentrega" defaultValue={new Date(project.prazoentrega.seconds*1000).getFullYear()+"-"+
                                                            pad(new Date(project.prazoentrega.seconds*1000).getMonth()+1)+"-"+
                                                            pad(new Date(project.prazoentrega.seconds*1000).getDate())}
                              onChange={this.handleDateChange}/>
          <label htmlFor="prazoentrega">Prazo de Entrega</label>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Salvar</button>
        </div>
      </form>
    </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}
}

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth,
    projectid: id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (project,projectid) => dispatch(updateProject(project,projectid))
  }
}

function pad(n) {
	return n<10 ? '0'+n : n
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)
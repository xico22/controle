import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import XLSX from 'xlsx'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class ProjectReport extends Component {
    constructor(props) {
      super(props)
      this.state = {
        users: []
      }
      this.exportFile = this.exportFile.bind(this)
    }
  
    exportFile() {
      let users = [["Número", "Tipo", "Titulo", "Solicitante","Tempo de Execução","Status","Prazo de Entrega"]]
      //console.log(this.props.projects)
      this.props.projects.forEach((project) => {
        let userArray = [project.numero, project.tiposolicitacao, project.titulo, project.solicitante,
                         project.tempoexecucao, project.status,
                         new Date(project.prazoentrega.seconds*1000).toLocaleDateString()
                        ]
        users.push(userArray)
      })
  
      const wb = XLSX.utils.book_new()
      const wsAll = XLSX.utils.aoa_to_sheet(users)
      
      XLSX.utils.book_append_sheet(wb, wsAll, "Relatorio")
          XLSX.writeFile(wb, "Relatorio Entregaveis.xlsx")
    }
  
    render() {
      const { projects, auth } = this.props;
      //console.log(projects)
      if (!auth.uid) return <Redirect to='/signin' />
      return (
        <div style={style}>
          <div>
            <h1>Relatório de Entregáveis</h1>
            <button 
              onClick={this.exportFile}>Exportar Excel</button>
              <Paper className={projects.root}>
                <Table className={projects.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Número</CustomTableCell>
                      <CustomTableCell>Tipo</CustomTableCell>
                      <CustomTableCell>Titulo</CustomTableCell>
                      <CustomTableCell>Solicitante</CustomTableCell>
                      <CustomTableCell>Tempo de Execução</CustomTableCell>
                      <CustomTableCell>Status</CustomTableCell>
                      <CustomTableCell>Prazo</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(project => {
                      return (
                        <TableRow key={project.id}>
                          <CustomTableCell component="th" scope="row">
                            {project.numero}
                          </CustomTableCell>
                          <CustomTableCell>{project.tiposolicitacao}</CustomTableCell>
                          <CustomTableCell>{project.titulo}</CustomTableCell>
                          <CustomTableCell>{project.solicitante}</CustomTableCell>
                          <CustomTableCell>{project.tempoexecucao}</CustomTableCell>
                          <CustomTableCell>{project.status}</CustomTableCell>
                          <CustomTableCell>{new Date(project.prazoentrega.seconds*1000).toLocaleDateString()}</CustomTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
          </div>
        </div>
      );
    }
  }

  const style = {
    display: 'flex',
    justifyContent: 'center',
  }
  

  const mapStateToProps = (state) => {
    //console.log(state);
    return {
      projects: state.firestore.ordered.projects,
      auth: state.firebase.auth,
      notifications: state.firestore.ordered.notifications
    }
  }

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc']}
    ])
  )(ProjectReport);
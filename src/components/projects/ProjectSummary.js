import React from 'react'
import moment from 'moment'
import * as locales from 'moment/min/locales';

const ProjectSummary = ({project}) =>{
    moment.locale('pt-BR');
    console.log(moment(project.prazoentrega.seconds*1000))
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{project.tiposolicitacao}</span>
                <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                <p className='grey-text'>{moment(project.createdAt.toDate()).calendar()}</p>
                <p className='grey-text'>Prazo {moment(project.prazoentrega.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default ProjectSummary;
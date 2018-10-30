export const createProject = (project) =>{
    return(dispatch, getState,{getFirebase,getFirestore})=>{
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: 'CREATE_PROJECT', project});
        }).catch((err)=>{
            dispatch({type:'CREATED_PROJECT_ERROR', err})
        })
    }
}

export const updateProject = (project,projectid) =>{
    return(dispatch, getState,{getFirebase,getFirestore})=>{
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        firestore.collection('projects').doc(projectid).update({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: 'UPDATE_PROJECT', project});
        }).catch((err)=>{
            dispatch({type:'UPDATED_PROJECT_ERROR', err})
        })
    }
}
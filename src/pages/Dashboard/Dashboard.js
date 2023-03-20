import React, { useState } from 'react'
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext' 

//styles
import './Dashboard.css'
import ProjectFilter from './ProjectFilter';



export default function Dashboard() {

  const {user } = useAuthContext();
  const {documents, error} = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  }
  
  const filteredProjects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      /* Filter All */
      case "all":
        return true;
      /* Filter projects where i am involved */
      case "mine":
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if(user.uid === u.id){
            assignedToMe = true;
          }
        })
        return assignedToMe;
      /* Filter per category */
      case 'developement':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category)
        return document.category === currentFilter
      default:
        return true;
    }
  }) : null

  return (
    <div>
        <h2 className='page-title'>Dashboard</h2>
        {error && <p className='error'>{error}</p>}
        {documents && (
        <ProjectFilter 
        currentFilter={currentFilter}
        changeFilter={changeFilter}/>
        )}
        {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}

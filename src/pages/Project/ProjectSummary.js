import React from "react";
import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

//Style
import "./Project.css";


export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  const handleClick = (e) => {
    deleteDocument(project.id);
    history.push('/');
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">as</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        {project.assignedUsersList.map((user) => (
          <div key={user.id} className="assigned-user">
            <Avatar src={user.photoURL} />
          </div>
        ))}
      </div>
      {/* When this button is pressed the project will be deleted 
      * from the database and the user will be redirected to the home page */}
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as completed
        </button>
      )}
    </div>
  );
}

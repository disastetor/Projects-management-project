import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(), //Suggested to use uuid4 library to generate random ids, math.random is just for study purpose and it could generate the same value twice
    };

    await updateDocument(project.id, {
      //Spreading the project comments array and adding the comment
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project comments</h4>
      <ul>
        {/* mapping trough all comments and display them */}
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                {/* Comment user */}
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              {/* Comment date */}
              <div className="comment-date">
                <p>{formatDistanceToNow(comment.createdAt.toDate(),{addSuffix: true})}</p>
              </div>

              {/* Comment content */}
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        {/* Add new comment */}
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}></textarea>
        </label>

        {/* Add button */}
        <button className="btn"> Add comment</button>
      </form>
    </div>
  );
}

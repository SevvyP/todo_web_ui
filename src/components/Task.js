import React from "react";

function Task({ task }) {
  return (
    <li className="task">
      <input type="checkbox" id={`task-${task.id}`} />
      <label htmlFor={`task-${task.id}`} className="task-body">
        {task.body}
      </label>
      {task.children && task.children.length > 0 && (
        <ul className="task-children">
          {task.children.map((child) => (
            <Task key={child.id} task={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Task;

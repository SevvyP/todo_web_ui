import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Task from "./Task";

function Tasklist() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const callApi = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();

          const response = await fetch(
            "http://localhost:8081/tasks?user_id=<user>",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }

          const responseData = await response.json();
          setTasks(responseData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    callApi();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div className="task-list">
      {error && <div className="error">{error}</div>}
      {tasks && (
        <ul>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasklist;

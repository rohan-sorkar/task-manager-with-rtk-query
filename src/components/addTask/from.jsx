import React, { useEffect, useState } from "react";
import {useGetTeamsQuery} from '../../features/teams/teamsApi';
import {useGetProjectsQuery} from '../../features/projects/projectsApi';
import { useAddTaskMutation } from "../../features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const {data: teams} = useGetTeamsQuery();
  const {data: projects} = useGetProjectsQuery();
  const [addTask, {isLoading: addTaskLoading, isSuccess: isAddTaskSuccess}] = useAddTaskMutation();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [team, setTeam] = useState(null)
  const [project, setProject] = useState(null)

  const findTeam = (id) => {
    const selectedTeam = teams.find((t) => t.id == id);
    setTeam(selectedTeam)
  }
  const findProject = (id) => {
    const selectedProject = projects.find((p) => p.id == id);
    setProject(selectedProject)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      taskName,
      deadline,
      status: 'pending',
      project: {
        ...project
      },
      teamMember: {
        ...team
      }
    }
    addTask({...newTask})
  }

  useEffect(() => {
    if(isAddTaskSuccess) {
      navigate('/')
    }
  }, [isAddTaskSuccess])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        <select onChange={(e) => findTeam(e.target.value)} name="teamMember" id="lws-teamMember" required>
          <option value="" hidden>
            Select Job
          </option>
          {
            teams?.length > 0 && teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))
          }
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select onChange={(e) => findProject(e.target.value)} id="lws-projectName" name="projectName" required>
          <option value="" hidden>
            Select Project
          </option>
          {
            projects?.length > 0 && projects.map((p) => (
              <option key={p.id} value={p.id}>{p.projectName}</option>
            ))
          }
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" name="deadline" id="lws-deadline" required />
      </div>

      <div className="text-right">
        <button disabled={addTaskLoading} type="submit" className="lws-submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;

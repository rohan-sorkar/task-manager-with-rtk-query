import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTaskQuery, useUpdateTaskMutation } from "../../features/tasks/tasksApi";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";

const Form = () => {
  const navigate = useNavigate();
  const {taskId} = useParams();
  const {data: task, isSuccess} = useGetTaskQuery(taskId, {refetchOnMountOrArgChange: true});
  const {id, taskName: initialTaskName, deadline: initialDeadline, teamMember: initialTeamMember, project: initialProject, status: initialStatus} = task || {};
  const [taskName, setTaskName] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState('')
  const [teamMember, setTeamMember] = useState(null)
  const [project, setProject] = useState(null)

  useEffect(() => {
    if(isSuccess) {
      setTaskName(initialTaskName)
      setDeadline(initialDeadline)
      setTeamMember(initialTeamMember)
      setProject(initialProject)
      setStatus(initialStatus)
    }
  }, [isSuccess])

  const {data: teams} = useGetTeamsQuery();
  const {data: projects} = useGetProjectsQuery();

  const findTeam = (id) => {
    const selectedTeam = teams.find((t) => t.id == id);
    setTeamMember(selectedTeam)
  }
  const findProject = (id) => {
    const selectedProject = projects.find((p) => p.id == id);
    setProject(selectedProject)
  }

  const [updateTask, {isLoading: updateTaskLoading, isSuccess: isUpdateTaskSuccess}] = useUpdateTaskMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      taskName,
      deadline,
      status,
      project: {
        ...project
      },
      teamMember: {
        ...teamMember
      }
    }
    updateTask({id, data: {...newTask}})
  }

  useEffect(() => {
    if(isUpdateTaskSuccess) {
      navigate('/')
    }
  }, [isUpdateTaskSuccess])

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
        <select value={teamMember?.id} onChange={(e) => findTeam(e.target.value)} name="teamMember" id="lws-teamMember" required>
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
        <select value={project?.id} onChange={(e) => findProject(e.target.value)} id="lws-projectName" name="projectName" required>
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
        <button disabled={updateTaskLoading} type="submit" className="lws-submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
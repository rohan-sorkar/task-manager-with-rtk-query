import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { addProjectItem } from "../../features/projects/projectsSlice";

const ProjectLists = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const {projectItems} = useSelector((state) => state.projects)
  const dispatch = useDispatch();

  //decide what to render
  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    content = <h1>something went wrong!</h1>;
  }
  if (!isLoading && !isError && projects?.length === 0) {
    content = <h1>There is no projects!</h1>;
  }
  if (!isLoading && !isError && projects?.length > 0) {
    content = (
      <div className="mt-3 space-y-4">
        {projects.map((project) => (
          <div key={project.id} className='checkbox-container'>
            <input checked={projectItems.includes(project.projectName)} onChange={() => dispatch(addProjectItem(project.projectName))} type="checkbox" className={`${project.colorClass}`} />
            <p className="label">{project.projectName}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      {content}
    </div>
  );
};

export default ProjectLists;

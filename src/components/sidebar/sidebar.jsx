import React from "react";
import ProjectLists from "./project-lists";
import TeamMembers from "./team-members";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ProjectLists />
      <TeamMembers />
    </div>
  );
};

export default Sidebar;

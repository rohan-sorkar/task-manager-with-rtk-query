import React from "react";
import TaskListItem from "./taskListItem";
import TaskListsContainer from "./taskListsContainer";

const TaskLists = () => {
  return (
    <TaskListsContainer>
      <TaskListItem/>
    </TaskListsContainer>
  );
};

export default TaskLists;

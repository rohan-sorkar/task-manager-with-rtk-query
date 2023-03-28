import React from "react";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import TaskListItem from "./taskListItem";
import TaskListsContainer from "./taskListsContainer";

const TaskLists = () => {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    content = <h1>something went wrong!</h1>;
  }
  if (!isLoading && !isError && tasks?.length === 0) {
    content = <h1>There is no tasks!</h1>;
  }
  if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks.map((task) => <TaskListItem key={task.id} task={task} />);
  }

  return (
    <TaskListsContainer>
      {content}
    </TaskListsContainer>
  );
};

export default TaskLists;

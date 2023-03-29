import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import TaskListItem from "./taskListItem";
import TaskListsContainer from "./taskListsContainer";

const TaskLists = () => {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const {projectItems} = useSelector((state) => state.projects)
  const {searchTerm} = useSelector((state) => state.search)
  const performFilter = (tasks) => {
    if(tasks?.length > 0) {
      return tasks.filter((task) => projectItems.includes(task.project.projectName))
    }
  }
  const filteredTasks = performFilter(tasks);

  const performSearch = (tasks) => {
    if(tasks?.length > 0) {
      return tasks.filter((task) => task.taskName.toLowerCase().includes(searchTerm))
    }
  }

  const searchedTasks = performSearch(filteredTasks)


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
    content = searchedTasks?.length > 0 && searchedTasks.map((task) => <TaskListItem key={task.id} task={task} />);
  }

  return (
    <TaskListsContainer>
      {content}
    </TaskListsContainer>
  );
};

export default TaskLists;

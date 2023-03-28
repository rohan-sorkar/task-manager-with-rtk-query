import Sidebar from "../components/sidebar/sidebar";
import TaskLists from "../components/task-lists/taskLists";

const Home = () => {
  return (
    <div className="container relative">
      <Sidebar />
      <TaskLists />
    </div>
  );
};

export default Home;

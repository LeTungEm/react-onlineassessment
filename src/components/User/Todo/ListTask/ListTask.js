import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../../../context/Context";
import UsersService from "../../../../service/UsersService";
import Heading from "../../../UI/Library/Heading";
import CompletedIcon from "../../../UI/Library/icon/CompletedIcon";
import NotCompletedIcon from "../../../UI/Library/icon/NotCompletedIcon";

const users = new UsersService();
const ListTask = ({ userID }) => {
  const [buttonLoading, setButtonLoading] = useState([]);
  const [tasks, setTasks] = useState([]);

  const { todoContext } = useContext(Context);
  const { userTasks, setUserTasks } = todoContext;

  const countCompletedTasks = () => {
    let sum = 0;
    tasks.forEach((task) => {
      if (task.completed === true) {
        sum++;
      }
    });
    return sum;
  };

  const sortList = async (list) => {
    let result = [];
    let data = await list;
    data.map((task) => {
      if (task.completed === false) result = [task, ...result];
      else result = [...result, task];
      return 0;
    });
    return result;
  };

  const getAllTasks = useCallback(async (userID) => {
    let data = await users.getByID(userID);
    return data.data;
  }, []);

  const findTaskIndexByID = (id) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const completeTask = (taskID) => {
    setButtonLoading((pre) => [...pre, taskID]);
    users.completeTask(taskID).then(async (res) => {
      if (res.data) {
        let taskChangedIndex = findTaskIndexByID(res.data.id);
        let taskCopy = [...tasks];
        taskCopy[taskChangedIndex] = res.data;
        let listSorted = await sortList(taskCopy);
        let listTask = userTasks;
        listTask[userID] = listSorted;
        setUserTasks(listTask);
        setTasks((pre) => {
          pre[taskChangedIndex] = res.data;
          return pre;
        });
        setButtonLoading((pre) =>
          pre.filter((loading) => loading !== res.data.id)
        );
      } else {
        setButtonLoading([]);
      }
    });
  };

  useEffect(() => {
    if (userID) {
      let listTask = userTasks;
      if (listTask[userID] !== undefined) {
        setTasks(listTask[userID]);
      } else {
        let result = getAllTasks(userID);
        let listSorted = sortList(result);
        listSorted.then((res) => {
          listTask[userID] = res;
          setUserTasks(listTask);
          setTasks(res);
        });
      }
    }
  }, [getAllTasks, setUserTasks, userID, userTasks]);

  let newListTask = [];
  tasks.forEach((task) => {
    if (task.completed === false) newListTask = [task, ...newListTask];
    else newListTask = [...newListTask, task];
  });
  return (
    <>
      <Heading text="Tasks" />
      <ul className="border rounded-lg h-[500px] overflow-x-scroll [&>*]:text-sm">
        {newListTask.map((task) => {
          return (
            <li key={task.id} className={"py-3 px-6 border-b"}>
              {task.completed ? <CompletedIcon /> : <NotCompletedIcon />}
              &nbsp;
              {task.title}
              {task.completed ? (
                ""
              ) : (
                <button
                  onClick={() => completeTask(task.id)}
                  className={
                    "float-right bg-white border rounded-[4px] px-1 ml-10 hover:text-blue-500 group hover:border-blue-500 duration-200"
                  }
                >
                  <span
                    className={
                      (buttonLoading.includes(task.id)
                        ? "animate-spin mr-2 "
                        : "hidden ") +
                      "duration-300 inline-block w-3 h-3 border-t-2 rounded-full group-hover:border-blue-500"
                    }
                  ></span>
                  Mark done
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-2">
        done {countCompletedTasks()}/{tasks.length}
      </div>
    </>
  );
};

export default ListTask;

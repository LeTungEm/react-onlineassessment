import { useState } from "react";
import Header from "../components/UI/Header/Header";
import TodoLayout from "../components/User/Todo/Layout/TodoLayout";
import ListTask from "../components/User/Todo/ListTask/ListTask";
import UserSelection from "../components/User/Todo/UserSelection/UserSelection";

const TodoPage = () => {
    const [userID, setUserID] = useState('');
    return (
        <div className="bg-gradient-to-b from-white to-gray-100">
            <Header />
            <TodoLayout>
                <UserSelection setUserID={setUserID}/>
                <ListTask userID={userID}/>
            </TodoLayout>
        </div>
    );
}

export default TodoPage
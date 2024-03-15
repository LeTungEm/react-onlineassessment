import { useState, createContext } from "react";

const Context = createContext();

function Provider({children}){

    const [userTasks, setUserTasks] = useState([]);
    const todoContext = {
        userTasks,
        setUserTasks
    }

    return (
        <Context.Provider value={{todoContext}}>
            {children}
        </Context.Provider>
    );
}

export {Context, Provider}
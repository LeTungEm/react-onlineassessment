import { useEffect, useState } from "react";
import UsersService from "../../../../service/UsersService";
import Heading from "../../../UI/Library/Heading";

const UserSelection = ({ setUserID }) => {

    const [userSelected, setUserSelected] = useState('');
    const [listUser, setListUser] = useState([]);
    const [listFiltered, setListFiltered] = useState([]);
    const [dropdownStatus, setMenuStatus] = useState(false);
    const [placeHolder, setPlaceHolder] = useState("Select user");

    const handleDropdown = () => {
        if (placeHolder !== "") {
            if (dropdownStatus === true) {
                setUserSelected(placeHolder);
            } else {
                setUserSelected("");
            }
            setMenuStatus(pre => !pre);
        }
        else {
            setMenuStatus(true);
        }
        if (listFiltered.length === 0) {
            let listfiltered = filterUser('');
            setUserSelected('');
            setListFiltered(listfiltered);
        }
    }

    const changeSearch = (e) => {
        let search = e.target.value;
        let listfiltered = filterUser(search);
        setUserSelected(search);
        setListFiltered(listfiltered);
    }

    const selectUser = (user) => {
        setUserID(user.id);
        setUserSelected(user.name);
        setMenuStatus(false);
        setPlaceHolder(user.name);
        setListFiltered(listUser);
    }

    const filterUser = (search) => {
        let listfiltered;
        if (search !== '') {
            listfiltered = listUser.filter(user =>
                user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
        } else {
            listfiltered = listUser;
        }
        return listfiltered;
    }

    useEffect(() => {
        let user = new UsersService();

        user.getAll().then(res => {
            setListUser(res.data);
            setListFiltered(res.data);
        })
    }
        , []);

    return (
        <>
            <div>
                <Heading text="User" />
                <span onClick={() => handleDropdown()} className={dropdownStatus ? "content-[''] fixed top-0 left-0 w-full h-full" : ""}></span>
                <div className={(dropdownStatus ? "border-blue-500 " : "") + "relative border rounded-lg hover:border-blue-500 w-[200px]"}>
                    <input onClick={() => handleDropdown()} className={"w-[170px] outline-0 text-sm rounded-lg py-1 p-2"} placeholder={placeHolder} type="text" value={userSelected} onChange={changeSearch} />
                    <span className={dropdownStatus ? "hidden" : ""}>
                        <i className="fa fa-angle-down text-gray-300"></i>
                    </span>
                    <span className={dropdownStatus ? "" : "hidden"}>
                        <i className="fa fa-search text-gray-300 text-xs"></i>
                    </span>
                    <ul style={{ '--rowWidth': `${42.5 * listFiltered.length}px` }} className={(dropdownStatus ? `opacity-100 z-20 ` + (listFiltered.length > 0 ? 'h-[var(--rowWidth)] ' : '') : "h-0 -z-50 -translate-y-5 overflow-hidden opacity-0 ") + " max-h-[256px] cursor-pointer duration-300 absolute top-[120%] left-0 w-full overflow-y-scroll scrollbar-hide border rounded-lg bg-white shadow-2xl p-1 [&>*]:text-sm"}>
                        {listFiltered.map(user => {
                            return (<li onClick={() => selectUser(user)} key={user.id} className={(user.name === placeHolder ? "bg-blue-100 font-medium " : "hover:bg-gray-100 ") + "whitespace-nowrap p-2 rounded-md"}>{user.name}</li>);
                        })}

                        {
                            listFiltered.length === 0 ?
                                (
                                    <div className="flex flex-col justify-center items-center gap-2 py-2">
                                        <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
                                        <span className="text-gray-500">暂无数据</span>
                                    </div>
                                )
                                : ''
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default UserSelection
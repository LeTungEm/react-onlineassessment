import { Link } from "react-router-dom";
import MobieMenuIcon from "../Library/icon/MobieMenuIcon";
import { useState } from "react";
import CloseMobieMenuIcon from "../Library/icon/CloseMobieMenuIcon";

const Header = () => {

    const [mobieMenuStatus, setMobieMenuStatus] = useState(false);

    return (
        <div className="flex items-center py-3 px-4 border border-gray-100">
            <MobieMenuIcon handleButton={setMobieMenuStatus} className="md:hidden mr-5 text-lg text-gray-800" />
            <img className="h-8" src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="geekup-logo-general" />
            <div onClick={() => setMobieMenuStatus(pre => !pre)} className={(mobieMenuStatus?"":"hidden ")+"fixed top-0 left-0 bg-black bg-opacity-50 z-40 w-full h-full md:hidden"}></div>
            <ul className={(mobieMenuStatus?"translate-x-0 ":"-translate-x-full ")+" duration-300 fixed top-0 bottom-0 left-0 text-sm py-1 px-3 bg-white w-[256px] z-50 md:w-auto md:-translate-x-0 md:relative md:flex md:ml-2"}>
                <li className="mr-3 font-medium hidden md:inline-block"><Link to={'/'} >Test</Link></li>
                <li><Link className="block py-2 px-4 rounded-lg bg-gray-100 md:py-0 md:px-0 md:bg-white" to={'/todo'}>To do</Link></li>
                <span onClick={() => setMobieMenuStatus(pre => !pre)} className={(mobieMenuStatus?"":"hidden ")+"absolute top-5 right-0 bg-white p-1 rounded-full -mr-3 text-gray-400 hover:text-black md:hidden"}><CloseMobieMenuIcon/></span>
            </ul>
        </div>
    );
}

export default Header
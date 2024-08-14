import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../../assets/images/3.png";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";


export default function SideBar({ toggleSidebar }) {


    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
        toggleSidebar()
    };



    let logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="sidebar-container ">
            <Sidebar className="vh-100 bg-transparent" collapsed={isCollapsed}>
                <button onClick={handleToggle} style={{ border: "none", background: "none" }}>
                    <img className="" src={logo} alt="" style={{
                        width: isCollapsed ? "4rem" : "8rem",
                        transition: "all 300ms"

                    }} />
                </button>
                <Menu>
                    <MenuItem
                        icon={<i className="fa fa-home"></i>}
                        component={<Link to="/dashboard" />}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        icon={<i className="fa fa-users"></i>}
                        component={<Link to="/dashboard/users" />}
                    >
                        Users
                    </MenuItem>
                    <MenuItem
                        icon={<i className="fa-solid fa-utensils"></i>}
                        component={<Link to="/dashboard/recipestList" />}
                    >
                        Recipes
                    </MenuItem>
                    <MenuItem
                        icon={<i className="fa-regular fa-calendar-days"></i>}
                        component={<Link to="/dashboard/categoriesList" />}
                    >
                        Categories
                    </MenuItem>
                    <MenuItem
                        icon={<i className="fa-solid fa-unlock"></i>}

                    >
                        Change Password
                    </MenuItem>

                    <MenuItem
                        icon={<i className="fa-solid fa-right-from-bracket"></i>}
                        onClick={logOut}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

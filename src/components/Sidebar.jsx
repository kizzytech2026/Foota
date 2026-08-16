import { NavLink } from "react-router-dom";

function Sidebar() {
    const navigation = [
        {
            name:"Dashboard",
            path:"/",
        },
        {
            name:"Squad",
            path:"/squad",
        },
        {
            name:"Matches",
            path:"/matches",
        },
        {
            name:"Statistics",
            path:"/statistics",
        },
        {
            name:"Settings",
            path:"/settings",
        },
    ];
return(
    <aside className="sidebar">
        <nav>
            {navigation.map((item) => (
                <NavLink 
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                    }>
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>

            ))}
        </nav>
    </aside>
);

}

export default Sidebar;
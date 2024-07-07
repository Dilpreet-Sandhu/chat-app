import { AccountCircleRounded, Dashboard, Group, Message } from "@mui/icons-material";


const adminTabs = [
    {
        name : "Dashboard",
        path:"/admin/dashboard",
        icon:<Dashboard htmlColor="black"/>,
    },
    {
        name : "User",
        path:"/admin/user-managment",
        icon:<AccountCircleRounded htmlColor="black"/>,
    },
    {
        name : "Chat",
        path:"/admin/chat-management",
        icon:<Group htmlColor="black"/>,
    },
    {
        name : "Message",
        path:"/admin/message-management",
        icon:<Message htmlColor="black"/>,
    }
]

export default adminTabs;
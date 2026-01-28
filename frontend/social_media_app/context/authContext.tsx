import { createContext, useContext, useEffect, useState } from "react"
import type UserData from '../interfaces/userInterface.ts'
import { apiRequest } from "../lib/apiRequest.ts";

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context)
        return null

    return context;
}

function AuthContextProvider({ children }) {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        apiRequest.get('/auth/islogin')
        .then((res) => {
            if(res.status === 200){
                setUser(res.data.user)
            }
            console.log(res.data)
        })
        .catch((error) => console.log(error.response.data));
    }, [])

    console.log(user)

    

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;






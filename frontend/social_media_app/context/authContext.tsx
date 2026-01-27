import { createContext, useState } from "react"
import type UserData from '../interfaces/userInterface'

const [user, setUSer] = useState<UserData | null>(null);

export const AuthContext = createContext(user);


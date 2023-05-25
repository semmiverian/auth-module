import { createContext } from 'react';

interface AuthContext {
  user: { id: number; email: string };
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;

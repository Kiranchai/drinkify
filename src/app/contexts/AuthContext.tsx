import { createContext, useContext, useEffect, useState } from "react";

export interface IUser {
  email: String;
  id: string;
  isLoggedIn: Boolean;
  cards: String[];
}

export interface AuthContextType {
  currentUser?: IUser;
  pending: Boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: AuthContextType;
}) => {
  //   const [currentUser, setCurrentUser] = useState<AuthContextType>({
  //     pending: true,
  //   });

  //   const fetchUser = async () => {
  //     fetch(`${SERVER_DOMAIN}/api/auth/isLoggedIn`, {
  //       headers: fetchHeaders,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.type === "error") {
  //           setCurrentUser({ pending: false });
  //           return console.log(data.message);
  //         } else {
  //           setCurrentUser({ currentUser: data, pending: false });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     fetchUser();
  //   }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

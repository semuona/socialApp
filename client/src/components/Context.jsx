import React from "react";
import { createContext, useState } from "react";

export const SocialAppContext = createContext();

export default function AppContext({ children }) {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <SocialAppContext.Provider
      value={{ users, setUsers, loggedInUser, setLoggedInUser, posts, setPosts }}
    >
      {children}
    </SocialAppContext.Provider>
  );
}

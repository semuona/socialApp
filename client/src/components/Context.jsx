import React from "react";
import { createContext, useState } from "react";

export const SocialAppContext = createContext();

export default function AppContext({ children }) {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] = useState(null);

  return (
    <SocialAppContext.Provider
      value={{ user, setUser, loggedInUser, setLoggedInUser, posts, setPosts }}
    >
      {children}
    </SocialAppContext.Provider>
  );
}

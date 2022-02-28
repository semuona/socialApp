import React from "react";
import { createContext, useState } from "react";

export const SocialAppContext = createContext();

export default function SocialAppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [post, setPost] = useState({});

  return (
    <SocialAppContextProvider
      value={{ user, setUser, loggedInUser, setLoggedInUser, post, setPost }}
    >
      {children}
    </SocialAppContextProvider>
  );
}

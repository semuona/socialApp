import { useContext, useEffect } from "react";
import { SocialAppContext } from "./Context";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  const { user, setUser } = useContext(SocialAppContext);

  useEffect(() => {
    if (!user) history.push("/");
  });

  const handleLogout = () => {
    setUser(null);

    history.push("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      Hello this is home
    </div>
  );
}

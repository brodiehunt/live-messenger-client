import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import AppContext from "../hooks/StateContext";

export default function AuthCallbackPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const user = query.get("user")
      ? JSON.parse(decodeURIComponent(query.get("user")))
      : null;

    if (user) {
      dispatch({
        type: "setUser",
        data: user,
      });
      return navigate(`/${user._id}/account`);
    }
  }, []);

  return <div>Some kind of loading page</div>;
}

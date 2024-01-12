import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import useWindowSize from "../hooks/UseWindowSize";
import { getAccount } from "../services/accountServices";
import AppContext from "../hooks/StateContext";
import Conversations from "./Conversations";
import SocketContext, { SocketProvider } from "../hooks/socket";
import { useToast } from "../hooks/useToast";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import useScroll from "../hooks/useScroll";

const MainWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  max-height: 100vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
  .outlet-container {
    position: relative;
    min-height: 100svh;
    max-height: 100vh;
    overflow-y: scroll;
    scrollbar-width: none;
    /* padding-bottom: 2rem; */
  }
  @media (min-width: 768px) {
    display: flex;
    width: 100%;

    .outlet-container {
      flex-grow: 1;
      padding-top: 0;
    }

    .outlet-container::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default function MainApp() {
  useScroll();
  const [height, width] = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isHomePage = pathSegments.length === 1;
  const { store, dispatch } = useContext(AppContext);
  const socket = useContext(SocketContext);
  const user = store.user;
  const { ToastComponent, activateToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAccount();
        const retrievedUser = response.data.data;
        if (!retrievedUser) {
          navigate("/signin");
        }

        dispatch({
          type: "setUser",
          data: retrievedUser,
        });
        dispatch({
          type: "setRequests",
          data: { count: retrievedUser.newRequests },
        });
      } catch (error) {
        if (error.response) {
          navigate("/signin");
        }
        console.log(error);
      }
    };

    if (user) {
      return;
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newRequest", (friendship) => {
        if (friendship) {
          const requestsState = { ...store.newRequests };
          requestsState.count = requestsState.count + 1;
          dispatch({
            type: "setRequests",
            data: requestsState,
          });
          activateToast(
            `New friend request.`,
            `${friendship.userDetails.username} sent you a request`,
            "success"
          );
        }
      });

      socket.on("requestAccepted", (friendship) => {
        console.log("event fired");
        if (friendship) {
          const otherUser = friendship.users.find((userObj) => {
            return userObj._id !== user._id;
          });
          activateToast(
            "Friendship Accepted",
            `${otherUser.username} accepted your friend request`,
            "success"
          );
        }
      });

      return () => {
        socket.off("newRequest");
        socket.off("requestAccepted");
      };
    }
  }, [socket]);

  if (!user) return <div></div>;

  return (
    <SkeletonTheme baseColor="#c2cfd6" highlightColor="#f0f3f5">
      <MainWrapper className="main-app">
        <ToastComponent />
        {width <= 768 ? (
          isHomePage ? (
            <Conversations user={user} />
          ) : (
            <div className="outlet-container">
              <Outlet />
            </div>
          )
        ) : (
          <>
            <Conversations user={user} />
            <div className="outlet-container">
              <Outlet />
            </div>
          </>
        )}
      </MainWrapper>
    </SkeletonTheme>
  );
}

import { ASD, Socket } from "Connection";
import HomePage from "pages/base/Home";
import LoginPage from "pages/base/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/UserSlice";


function App() {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  useEffect(() => {
    Socket.on("logout", () => dispatch(setUser(null)))
    Socket.on("disconnect", () => dispatch(setUser(null)))
    return () => {
      Socket.off("logout")
      Socket.off("disconnect")
    }
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center bg-primary">
      {user ? (
        <HomePage />
        ) : (
        <LoginPage onLogin={null} />
      )}
    </div>
  );
}

export default App;

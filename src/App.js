import { ASD, Socket } from "Connection";
import HomePage from "pages/base/Home";
import LoginPage from "pages/base/Login";
import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    Socket.on("logout", () => setUser(null))
    Socket.on("disconnect", () => setUser(null))
    return () => {
      Socket.off("logout")
      Socket.off("disconnect")
    }
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center bg-primary">
      {user ? (
        <HomePage user={user} />
        ) : (
        <LoginPage onLogin={setUser} />
      )}
    </div>
  );
}

export default App;

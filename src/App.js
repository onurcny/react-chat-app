import HomePage from "pages/base/Home";
import LoginPage from "pages/base/Login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="h-full w-full flex items-center justify-center bg-primary">
      {user ? (
        <HomePage />
        ) : (
        <LoginPage onLogin={setUser} />
      )}
    </div>
  );
}

export default App;

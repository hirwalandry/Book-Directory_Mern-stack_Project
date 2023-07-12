import { React, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import { ToastContainer } from "react-toastify";
import Books from "./components/books";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import BookForm from "./components/bookForm";
import Notification from "./components/notification";
import Logout from "./components/logout";
import auth from "./services/authService";
import { getRequests } from "./services/requestService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);
  const getsUsers = async () => {
    const client = auth.getCurrentUser();
    setUser(client);
  };
  const getsRequests = async () => {
    const result = await getRequests();
    setRequests(result.data);
  };

  useEffect(() => {
    const getUser = localStorage.getItem("token");
    getsUsers();
    if (getUser) {
      getsRequests();
    }
  }, []);
  return (
    <div>
      <NavBar user={user} totalRequests={requests.length} />
      <ToastContainer />
      <main className="container">
        <Routes>
          <Route
            path="/books/:bookId"
            element={
              <ProtectedRoute user={user}>
                <BookForm />
              </ProtectedRoute>
            }
          />
          <Route path="/books" element={<Books user={user} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate replace to="/books" />} />
          <Route path="/*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

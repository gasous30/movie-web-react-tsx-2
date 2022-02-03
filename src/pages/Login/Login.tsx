import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.scss";
import axios from "axios";

const Login = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [email, setEmail] = useState<String>("");
  const [pass, setPass] = useState<String>("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/register`;
    navigate(path);
  };

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.LoginCard}>
        <form>
          <h2>LOGIN</h2>
          <div className={styles.InputGroup}>
            <p>Email</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.InputGroup}>
            <p>Password</p>
            <div className={styles.InputGroup2}>
              <input
                type={isShow ? "password" : "text"}
                onChange={(e) => setPass(e.target.value)}
              />
              {!isShow ? (
                <i
                  className="fa fa-eye"
                  aria-hidden={true}
                  onClick={handleShow}
                />
              ) : (
                <i
                  className="fa fa-eye-slash"
                  aria-hidden={true}
                  onClick={handleShow}
                />
              )}
            </div>
          </div>
          <div className={styles.FooterForm}>
            <p className={styles.Link} onClick={routeChange}>
              <u>Don't have account? Sign Up</u>
            </p>
            <div className={styles.ButtonGroup}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const mailformat =
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                  if (email.match(mailformat)) {
                    let user = {
                      email: email,
                      password: pass,
                    };
                    axios
                      .post(
                        "https://movie-web-api-182.herokuapp.com/api/user/login",
                        user
                      )
                      .then((res) => {
                        sessionStorage.setItem("auth-token", res.data);
                        window.location.reload();
                      })
                      .catch((err) => alert(err.response.data));
                  } else {
                    alert("Please input the right email");
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

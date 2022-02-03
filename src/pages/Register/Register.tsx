import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Register.module.scss";
import { User } from "./interface";
import axios from "axios";

const Register = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [pass, setPass] = useState<String>("");
  const [confPass, setConfPass] = useState<String>("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.LoginCard}>
        <form>
          <h2>REGISTER</h2>
          <div className={styles.InputGroup}>
            <p>Name</p>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
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
          <div className={styles.InputGroup}>
            <p>Confirm Password</p>
            <div className={styles.InputGroup2}>
              <input
                type={isShow ? "password" : "text"}
                onChange={(e) => setConfPass(e.target.value)}
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
              <u>Already have account? Login</u>
            </p>
            <div className={styles.ButtonGroup}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const mailformat =
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                  if (name.length >= 2) {
                    if (email.length >= 6) {
                      if (pass.length >= 8) {
                        if (email.match(mailformat)) {
                          if (pass === confPass) {
                            let newUser = {
                              name: name,
                              email: email,
                              password: pass,
                            };
                            axios
                              .post(
                                "https://movie-web-api-182.herokuapp.com/api/user/register",
                                newUser
                              )
                              .then(() => {
                                if (window.confirm("Sucesfully registered!")) {
                                  window.location.reload();
                                }
                              })
                              .catch((err) => alert(err.response.data));
                          } else {
                            alert("Confirm password doesn't match");
                          }
                        } else {
                          alert("Please input the right email");
                        }
                      } else {
                        alert("password must be more than 8 character");
                      }
                    } else {
                      alert("email must be more than 6 character");
                    }
                  } else {
                    alert("name must be more than 2 character");
                  }
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

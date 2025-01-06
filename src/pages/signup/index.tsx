import { useState } from "react";

const Signup = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  
  return (
    <div className="sign-up-page-container signup">
      <div className="sign-up-container">
        <h1>Welcome!</h1>
        <p>Please sign up to continue</p>
        <form>
          <label>Username</label>
          <input type="text" placeholder="Placeholder" onChange={(e) => {setUsername(e.target.value)}} />
          <label>Email Address</label>
          <input type="email" placeholder="Placeholder" onChange={(e) => {setEmail(e.target.value)}} />

          <label>Password</label>
          <input type="password" placeholder="Placeholder" onChange={(e) => {setPass(e.target.value)}} />
          

          <label>Confirm Password</label>
          <input type="password" placeholder="Placeholder" onChange={(e) => {setConfirm(e.target.value)}} />

          <p className="password-note">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>

          <button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              const data = new FormData()
              data.append('username', userName)
              data.append('pass', pass)
              data.append('email', email)
              const req = await fetch("https://localhost:3000/", {
                body: data,
                method: "POST"
              })
              if(req.status === 200){
                location.href = "/profile";
              }
            }}
          >
            Sign Up
          </button>
          <p>
            Have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

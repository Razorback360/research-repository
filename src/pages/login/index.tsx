const login = () => {
  return (
    <div className="log-in-page-container login">
      <div className="log-in-container">
        <h1>Welcome Back!</h1>
        <p>Please log in to continue</p>
        <form>
          <label>Email Address</label>
          <input type="email" placeholder="Placeholder" />

          <label>Password</label>
          <input type="password" placeholder="Placeholder" />
          <p className="password-note">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>

          <div className="log-in-checkbox-container">
            <div className="checkbox-label">
              <input type="checkbox"/>
              <label>Remember me</label>
            </div>
            <div className="forgot-password flex">
              <a href="#"> Forgot password? </a>
            </div>
          </div>

          <button type="submit" onClick={(e) => {e.preventDefault(); location.href = "/profile"}}>Log In</button>
          <p>
            No account yet? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default login;

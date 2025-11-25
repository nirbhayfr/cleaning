
export const Login = () => {
  return (
   <div className="container">

  
    <div className="banner">
        <img src="logo.jpeg" alt="Banner" />
    </div>

    
    <div className="login-box">
        <h2>Enter Your Moblile Number </h2>
        <h2>For Mobile Vertification</h2>

        <form>
             <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.05 11.05 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2H18C9.71 21 3 14.29 3 6V5z" />
          </svg>
            <input type="email" placeholder="+ 91 -"  />
          
            <button className="login-btn">Get OTP</button>
        </form>

        <div className="google-btn">
            <img src="google.png" alt="Google" />
            <span>Continue with Google</span>
        </div>

       
    </div>

</div>
  )
}

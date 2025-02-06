import google from "../assets/google.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage(props) {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  return (
    <div className="bg-green-300 h-full w-full flex justify-center items-center">
      <div className="h-[600px] w-[450px] bg-red-400 flex flex-col items-center rounded-[35px]">
        <div className="text-[30px] font-sans">Sign In.</div>
        <div className="flex justify-center items-center gap-[10px] rounded-[20px] border-white border-2 py-[15px] w-[260px] font-sans">
          <img className="w-[20px] h-[20px]" src={google} />
          <p>Continue with Google</p>
        </div>
        <div>or</div>
        <div className="border-white border-2 rounded-[20px] py-[15px] px-[25px] w-[260px]">
          <input
            type="text"
            placeholder="email"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            className="bottom-[5px] bg-transparent  w-[210px] focus:outline-none text-4 placeholder-gray-200"
          />
        </div>
        <div className="border-white border-2 rounded-[20px] py-[15px] px-[25px] w-[260px] mt-2">
          <input
            type="text"
            placeholder="password"
            value={passwordText}
            onChange={(e) => setPasswordText(e.target.value)}
            className="bottom-[5px] bg-transparent  w-[210px] focus:outline-none text-4 placeholder-gray-200"
          />
        </div>
        <div>Sign in</div>
        <div>
          <Link>Create Account</Link>
        </div>
        <div>
          <Link>Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

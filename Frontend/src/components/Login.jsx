import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'

function Login() {
  const [authUser,setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo={
      email:data.email,
      password:data.password,
  }
  await axios.post("https://bookstoreapp-avcu.onrender.com/user/login", userInfo)
  .then((res)=>{
      console.log(res.data)
      if(res.data){   
        toast.success('Login Successfully');
        document.getElementById("my_modal_3").close();
        localStorage.setItem("User",JSON.stringify(res.data.user));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
  }).catch((err) => {
     if(err.response){
      console.log(err);
      toast.error("Error: " + err.response.data.message);
      setTimeout(() => {}, 2000);
     }
  });
  }
  const dialogRef = useRef()
  return (
    <div>
      <dialog ref={dialogRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
              dialogRef.current.close()
            }}>✕</button>
            <h3 className="font-bold text-lg">Login</h3>
            <div className="mt-4 space-y-2">
              <span>
                Email
              </span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>)}
            </div>
            <div className="mt-4 space-y-2">
              <span>
                Password
              </span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (<span className="text-sm text-red-500">This field is required</span>)}
            </div>
            <button className="bg-pink-500 mt-6 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
              Login
            </button>
          </form>

          <div className="flex justify-around mt-4">

            <p>
              Not registered?{" "}
              <Link to="/signup" className="underline text-blue-500 cursor-ponter">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Login

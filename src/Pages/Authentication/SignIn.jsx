import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../Social/Google";
import useAuth from "../../hook/useAuth";

const SignIn = () => {

 const { signIn} = useAuth();
const navigate = useNavigate()

 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm();

 const onSubmit = (data) => {
   const { email, password } = data;

   signIn(email, password)
     .then(() => {
       navigate("/")
       return alert("your login successfull");
     })
    
 };


 return (
   <div className="py-10 flex items-center justify-center px-3 bg-[#f5f4f4] shadow-inner">
     <div className="w-[550px] bg-[#fa441218] shadow-xl  rounded-lg lg:px-10 px-3 py-8">
       <h1 className="text-center text-4xl font-bold text-[#FA4612]">
         Log In
       </h1>
       <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
         <label>
           <span className="text-[#FA4612] font-medium text-xl py-2 block">
             {" "}
             Email*
           </span>
           <input
             type="email"
             placeholder="Please Enter Your Email"
             className="w-full border-2 outline-[#FA4612] rounded-md px-4 py-3"
             {...register("email", { required: true })}
           />
           {errors.email && (
             <span className="text-red-700">This field is required</span>
           )}
         </label>

         <label className="block">
           <span className="text-[#FA4612] font-medium text-xl py-2 block">
             {" "}
             Password*
           </span>
           <input
             type="password"
             placeholder="Please Enter Your Password"
             className="w-full border-2 outline-[#FA4612] rounded-md px-4 py-3"
             {...register("password", { required: true })}
           />

           <div className="flex justify-between">
             <p>
               {errors.password && (
                 <span className="text-red-700">This field is required</span>
               )}
             </p>
             <Link className="text-blue-900 underline">Forget Password ?</Link>
           </div>
         </label>

         <label className="mt-8 block">
           <input
             type="submit"
             value="Log In"
             className="w-full bg-[#FA4612] btn hover:bg-[#FA4612] text-white text-xl font-semibold outline-none"
           />
         </label>
       </form>

       <div className="flex justify-center items-center gap-6 mt-5">
         <Google></Google>
       </div>

       <div className="mt-2">
         <p className="text-center">
           New to this website ? Please ?
           <Link to="/signup" className="underline font-bold text-blue-400">
             Register
           </Link>
         </p>
       </div>
     </div>
   </div>
 );
};

export default SignIn;
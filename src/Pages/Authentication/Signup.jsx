import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import Google from "../../Social/Google";

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, photo, password } = data;
    // console.log(name, photo, email, password);

    if (password.length < 6) {
      // console.log("password least 6 chraacter or longer");
      return alert("password least 6 chraacter or longer");
    }

    signUp(email, password)
      .then((result) => {
        // console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        navigate("/");
        return alert("your register successfull");
      })
      .catch((error) => {
        console.error(error);
        return alert(error.message);
      });
  };

  return (
    <div className="h-auto py-10 flex items-center justify-center px-3 bg-[#f5f4f4] shadow-inner">
      <div className="w-[550px] bg-[#fa441218] shadow-xl rounded-lg lg:px-10 px-3 py-8">
        <h1 className="text-center text-4xl font-bold text-[#FA4612]">
          Register
        </h1>
        <form onSubmit={handleSubmit(handleRegister)} className="mt-8">
          <label className="block">
            <span className="text-[#FA4612] font-medium text-xl py-2 block">
              {" "}
              Name*
            </span>
            <input
              type="text"
              placeholder="Please Enter Your Name"
              className="w-full border-2 outline-[#FA4612] rounded-md px-4 py-3"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-700">This field is required</span>
            )}
          </label>
          <label className="block">
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
              Photo URL
            </span>
            <input
              type="text"
              placeholder="Please Enter Your Photo URL"
              className="w-full border-2 outline-[#FA4612] rounded-md px-4 py-3"
              {...register("photo")}
            />
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
            {errors.password && (
              <span className="text-red-700">This field is required</span>
            )}
          </label>

          <label className="mt-5 block">
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-[#FA4612] btn hover:bg-[#FA4612] text-white text-xl font-semibold outline-none"
            />
          </label>
        </form>
        <div>
          <Google></Google>
        </div>
        <div className="mt-2">
          <p className="text-center">
            you are already register ? Please ?
            <Link to="/signin" className="underline font-bold text-blue-400">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

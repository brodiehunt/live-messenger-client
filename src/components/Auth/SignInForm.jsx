import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/UseForm";
import InputField from "../InputField";
import FormButton from "../FormButton";
import FormStyles from "../styles/Auth/Form";
import { signInUserLocal } from "../../services/authServices";
import AppContext from "../../hooks/StateContext";

const SignInForm = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    inputs,
    inputErrors,
    setInputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverErrors,
    setServerErrors,
    handleChange,
    handleBlur,
    validateSubmit,
    resetForm,
  } = useForm({ email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setServerErrors(null);
    if (!validateSubmit("signin")) return null;

    setIsLoading(true);
    try {
      const response = await signInUserLocal(inputs);
      const user = response.data.data;
      const jwt = response.data.jwt;

      sessionStorage.setItem("jwt", jwt);
      dispatch({
        type: "setUser",
        data: user,
      });
      dispatch({
        type: "setRequests",
        data: { count: user.newRequests },
      });
      return navigate(`/${user._id}/account`);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          setInputErrors({ ...inputs, ...error.response.data.error });
        } else if (error.response.status === 401) {
          setServerErrors("Incorrect email or password");
        } else {
          setServerErrors(error.response.data.error);
        }
      } else if (error.request) {
        setServerErrors(error.message);
        if (error.code === "ECONNABORTED") {
          alert(
            "Request has timed out. This is because heroku server spins down after 30 minutes of inactivity. Try again now, and you should be able to log in."
          );
        }
      } else {
        console.log("Some whack error i havent considered", error);
      }
    }
    setIsLoading(false);
  }

  return (
    <FormStyles
      onSubmit={handleSubmit}
      aria-busy={isLoading}
      $loading={isLoading}
      role="form"
    >
      {serverErrors && <div className="server-error">{serverErrors}</div>}
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        value={inputs.email}
        errorMessage={inputErrors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.email}
        disabled={isLoading}
      >
        Email
      </InputField>
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        value={inputs.password}
        errorMessage={inputErrors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        elRef={fieldRefs.password}
        disabled={isLoading}
      >
        Password
      </InputField>
      <FormButton disabled={isLoading}>Sign in</FormButton>
    </FormStyles>
  );
};

export default SignInForm;

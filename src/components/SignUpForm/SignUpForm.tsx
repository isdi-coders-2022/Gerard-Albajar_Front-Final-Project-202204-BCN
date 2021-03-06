import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/store";
import { signUpUserThunk } from "../../redux/thunks/userThunks/userThunks";
import { UserRegister } from "../../types/types";
import SignUpFormStyled from "./SignUpFormStyled";

const SignUpForm = (): JSX.Element => {
  const formInitialState: UserRegister = {
    name: "",
    mail: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(formInitialState);

  const changeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const dispatch: AppDispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();

  const signUpUser = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    dispatch(signUpUserThunk(formData, navigate));

    setFormData(formInitialState);
  };

  const disabledIf =
    formData.name === "" ||
    formData.mail === "" ||
    formData.username === "" ||
    formData.password === "";

  return (
    <SignUpFormStyled>
      <h2> Sign-Up </h2>
      <form onSubmit={signUpUser} noValidate autoComplete="off">
        <label htmlFor="name"> Name </label>
        <input id="name" value={formData.name} onChange={changeData} />
        <label htmlFor="mail"> Mail </label>
        <input id="mail" value={formData.mail} onChange={changeData} />
        <label htmlFor="username"> Username </label>
        <input id="username" value={formData.username} onChange={changeData} />
        <label htmlFor="password"> Password </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={changeData}
        />
        <button
          disabled={disabledIf}
          style={{
            opacity: disabledIf ? 0.5 : 1,
            pointerEvents: disabledIf ? "none" : "initial",
          }}
          type="submit"
        >
          Sign-Up
        </button>
      </form>
    </SignUpFormStyled>
  );
};

export default SignUpForm;

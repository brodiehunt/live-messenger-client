import { useRouteError, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import styled from "styled-components";

const ErrorPageStyles = styled.div`
  a {
    text-decoration: none;
    color: #28283d;

    .circle-1 {
      background-color: #4d96a9;
    }

    .circle-2 {
      background-color: #855fb1;
    }
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    color: #28283d;
  }

  p {
    text-align: center;
  }

  .button {
    display: block;
    margin: 0 auto;
    font-size: 1rem;
    font-weight: 900;
    padding: 0.5rem 1.5rem;
    border-radius: 1.8125rem;
    outline: none;
    border: none;
    color: #fafafa;
    background-color: #855fb1;
    transition: 0.2s ease-in all;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: #d9b8ff;
      box-shadow: 0 4px 8px 0 rgba(133, 95, 177, 0.4);
    }

    &:focus {
      outline: 2px solid #855fb1;
    }
  }
`;

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);
  const goBack = () => {
    navigate(-2);
  };

  return (
    <ErrorPageStyles>
      <Logo />
      <h1>Oops! {error?.status && error.status} Error</h1>
      <p>Sorry, an error has occurred.</p>
      <button className="button" onClick={goBack}>
        Go back
      </button>
    </ErrorPageStyles>
  );
}

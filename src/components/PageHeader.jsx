import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const PageHeaderStyles = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem 0rem;
  background-color: var(--background-light);
  z-index: 10;
  background: white;
  border-bottom: 1px solid rgba(135, 135, 157, 0.3);

  a {
    width: 2rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .back-arrow {
    width: 30px;
    height: 30px;
    color: var(--primary);
  }

  @media (min-width: 768px) {
    a {
      display: none;
    }

    h1 {
      font-size: 2rem;
      margin-left: 2rem;
    }
  }
`;
export default function PageHeader({ pageTitle, user }) {
  return (
    <PageHeaderStyles>
      <Link to={`/${user._id}`}>
        <IoIosArrowBack className="back-arrow" />
      </Link>
      <h1>{pageTitle}</h1>
    </PageHeaderStyles>
  );
}

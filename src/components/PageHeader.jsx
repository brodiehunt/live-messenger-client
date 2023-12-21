import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from "react-icons/io";

const PageHeaderStyles = styled.div`
  display: flex;
  align-items: center;
  /* padding: 1rem; */
  gap: 3rem;

  a {
    border-right: 1px solid black;
  }

  .back-arrow {
    width: 30px;
    height: 30px;
    color: var(--primary);
  }

`
export default function PageHeader({pageTitle, user}) {

  return (
    <PageHeaderStyles>
      <Link to={`/${user._id}`}>
        <IoIosArrowBack className="back-arrow"/>
      </Link>
      <h1>{pageTitle}</h1>
    </PageHeaderStyles>
  )
}
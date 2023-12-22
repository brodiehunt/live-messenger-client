import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from "react-icons/io";

const PageHeaderStyles = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem 0;
  gap: 3rem;
  background-color: white;
  z-index: 10;
  

  a {
    /* border-right: 1px solid black; */
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
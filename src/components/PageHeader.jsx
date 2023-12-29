import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from "react-icons/io";

const PageHeaderStyles = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  background-color: var(--background-light);
  z-index: 10;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;

  a {
    /* border-right: 1px solid black; */
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
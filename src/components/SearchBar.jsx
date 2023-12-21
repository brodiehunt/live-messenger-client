import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
const SearchBarStyles = styled.form`

  position: relative;
  padding: 1rem;
  border-bottom: 1px solid var(--text-light);
  input {
    color: var(--text-dark);
    width: 100%;
    padding: 0.8rem;
    padding-left: 2rem;
    font-size: 1rem;
    border: 1px solid rgba(135, 135, 157, 0.6);
    border-radius: 0.3rem;
  }

  input::placeholder {
    color: var(--text-light);
  }

  input:focus {
    outline: 2px solid var(--primary);
  }

  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.5rem;

  }
`;


export default function SearchBar() {

  return (
    <SearchBarStyles>
      <input
        type='text'
        name="search"
        id=""
        value=""
        placeholder="Search Conversations"
        onChange={() => console.log('hello')}
      />
      <IoSearch className="search-icon"/>
    </SearchBarStyles>
  )

}
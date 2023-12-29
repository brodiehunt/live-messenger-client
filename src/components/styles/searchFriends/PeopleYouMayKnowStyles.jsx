import styled from "styled-components";

const PeopleYouMayKnowStyles = styled.div`
  padding: 1rem 2rem;

  h2 {
    margin-bottom: 1rem;
  }

  .results-container {
    margin-top: 0.5rem;
    min-height: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1.5rem;
  }

  .no-suggestions {
    text-align: center;
    margin-top: 2rem;
  }

  @media (min-width: 450px) {
    .results-container {
      flex-direction: row;
    }
  }
`;

export default PeopleYouMayKnowStyles;
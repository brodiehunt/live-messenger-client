import styled from "styled-components";

const HeroStyles = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  
  .img-center {
    width: 100%;
    margin-bottom: 3rem;
  }
  .img-left, 
  .img-right {
    display: none;
  }

  .header-content {
    width: calc(100% - 3rem);
    max-width: 450px;
    margin: 0 auto;
    text-align: center;
  }

  .header-content h1 {
    color: var(--text-dark);
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 2.75rem;
    margin-bottom: 1.5rem;
  }

  .header-content p {
    color: var(--text-light);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.625rem;
    margin-bottom: 2rem;
  }

  .links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 5rem;

    a {
      padding: 1rem 1.8rem;
      color: var(--background-light);
      border-radius: 1.8125rem;
      font-weight: 900;
      line-height: 1.625rem;
      transition: 0.2s ease-in all;
    }

    .link-primary {
      background-color: var(--primary);
    }
    .link-primary:hover,
    .link-primary:focus {
      background-color: var(--primary-hover);
      box-shadow: 0 4px 8px 0 rgba(77, 150, 169, 0.4);
      outline: none;
    } 

    .link-primary:focus {
      outline: 2px solid var(--primary)
    }

    .link-secondary {
      background-color: var(--secondary);
    }

    .link-secondary:hover,
    .link-secondary:focus {
      background-color: var(--secondary-hover);
      outline: none;
    } 

    .link-secondary:focus {
      outline: 2px solid var(--secondary)
    }
  }

  @media (min-width: 768px) {
    .img-center {
      margin-bottom: 4.5rem;
    }

    .header-content h1 {
      font-size: 3rem;
      font-weight: 900;
      line-height: 3rem;
      margin-bottom: 1.5rem;
    }

    .links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 10rem;
    }
  }

  @media (min-width: 1024px) {

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    gap: 2rem;
    margin-bottom: 10rem;

    .img-center {
      display: none;
    }

    .img-left, 
    .img-right {
      display: block;
      max-width: 100%;
    }

    .img-left {
      justify-self: start;
    }

    .img-right {
      justify-self: end;
    }

    .header-content {
      min-width: 450px;
      max-width: 540px;
    }

    .links {
      margin-bottom: 0;
    }
  }
`;

export default HeroStyles;
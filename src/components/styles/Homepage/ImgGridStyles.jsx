import styled from "styled-components";

const ImgGridStyles = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  margin-bottom: 10rem;

  .image-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-bottom: 3.5rem;
  }

  .img-container img {
    border-radius: 1rem;
    max-width: 100%;
  }

  .statement {
    color: var(--primary);
    font-size: 1rem;
    font-weight: 900;
    line-height: 1.625rem;
    letter-spacing: 0.25rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  h2 {
    color: var(--text-dark);
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.25rem;
    margin-bottom: 2rem;
  }

  p {
    color: var(--text-light);
    font-weight: 500;
    line-height: 1.625rem;
  }

  @media (min-width: 768px) {
    padding: 0 2.5rem;

    .image-grid {
      grid-template-columns: repeat(4, 1fr);
      max-width: 1100px;
      margin: 3.5rem auto;
      margin-bottom: 5rem;
    }

    h2 {
      font-size: 2.5rem;
      line-height: 2.75rem;
      max-width: 450px;
      margin-left: auto;
      margin-right: auto;
    }

    p {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (min-width: 1024px) {
    p {
      font-size: 1.125rem;
    }
  }
`;

export default ImgGridStyles;

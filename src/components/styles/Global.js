import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Red Hat Display', sans-serif;
        font-size: 1rem;
        --primary: #4d96a9;
        --secondary: #855fb1;
        --primary-hover: #8fe2f9;
        --secondary-hover: #d9b8ff;
        --text-dark: #28283d;
        --text-light: #87879d;
        --background-light: #fafafa;
        --error-red: rgba(255, 0, 0, 0.8);
        --success-green: rgba(0, 255, 0, 0.8);
        max-width: 1440px;
        margin: 0 auto;
        
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    button {
        font-family: 'Red Hat Display', sans-serif;
        -webkit-tap-highlight-color: transparent;
    }
`;

export default GlobalStyles;
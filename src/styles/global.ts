import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    --white:#fff;
    --titlePrimary:${props => props.theme.colors.titlePrimary};
    --background: ${props => props.theme.colors.background};
    --secundary: ${props => props.theme.colors.secundary};
    --gray-line:#dcdde0;
    --text:${props => props.theme.colors.text};
    --text-highlight:#b3b9ff;
    --title:#89a2d6;
    --red:#e83f5b;
    --green:#4cd62b;
    --blue:#5965e0;
    --blue-dark:#4953b8;
    --blue-twitter:${props => props.theme.colors.blueTwitter};
    --blueLight: ${props => props.theme.colors.blueLight};
    --lineBotton: ${props => props.theme.colors.lineBotton}
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}
  
/* Handle */
::-webkit-scrollbar-thumb {
    background: var(--secundary); 
    border-radius: 10px;
}
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--title); 
}

@media(max-width:1080px){
    html{
        font-size: 93.75%;
    }
}

@media(max-width:720px){
    html{
        font-size: 87.5%;
    }
}

@media(min-width:768px) {
    html {
        font-size: 86.5%;
    }
}

body {
    background-color: var(--background);
    color: var(--text);
}

body, input, textarea, button {
    font: 400 1rem "Inter", sans-serif;
}

button{
    cursor: pointer;
}

a{
    color: inherit;
    text-decoration: none;
}

`;
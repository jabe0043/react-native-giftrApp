import { createContext, useContext } from 'react';


const ThemeContext = createContext();

function ThemeProvider(props){

  const theme = {
    colors: {
      primary: '#5bbba9',
      secondary: '#635d97',
      tertiary: '#fac372',
      error: '#ec6761',
      black: '#212427',
      gray: '#808080',
    },

    text:{
      large: "50",
      h2: "1.953rem",
      h3: "1.25rem",
      reg: "1rem"
    },

    container: {
      flex: 1,
      display:"flex",
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingHorizontal: 20,
      height:"100%",
    },

    header:{
      height:"200%",
    }
  };

  return (
    <ThemeContext.Provider value={theme}{...props}/>
  );
};


function useTheme() {
  return useContext(ThemeContext);
};

export { useTheme, ThemeProvider};
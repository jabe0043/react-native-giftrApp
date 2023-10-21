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

    types:{
      title: 42,
      subtitle: 31.25,
      subtitle2: 25.00,
      text: 16,
      smtext:12.80
    },

    heroContainer:{ 
      flex:.5,
      width:"100%", 
      backgroundColor:"#468b80", 
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },

    bgImage: {
      flex: 1,
      backgroundColor:"#5dbaab", 
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },

    headerOverlay:{
      width:"100%", 
      height:"100%", 
      display:"flex", 
      justifyContent:"center",
      backgroundColor: '#00000040',
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20
    },

    heroTitle: {
      color: 'white',
      fontSize: 42,
      lineHeight: 40,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingTop: 50
    },

    // BUTTONS
    btn:{
      height:50, 
      width:"49%", 
      backgroundColor:"#5dbaab", 
      display:"flex", 
      justifyContent:"center", 
      alignItems:"center", 
      borderRadius:7
    },

    btnSecondary:{
      backgroundColor:"#eb7474"
    },
  

    btnDisabled: {
      backgroundColor:"#5dbaab55", 
    },

    btnTextStyle: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },

    btnContainer:{
    alignSelf:"center",
    width:"95%",
    paddingBottom:20,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
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
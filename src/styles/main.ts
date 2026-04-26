import { StyleSheet } from "react-native";

export const StylesMain = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,             
    justifyContent: "center",
    alignItems: "center",    
  },

  content: {
    width: "100%",           
    justifyContent: "center",
    rowGap: 15,              
  },

  title: {
    width: "100%",          
    textAlign: "center",     
    fontSize: 26,            
    fontWeight: "bold",
    marginBottom: 20,        
  },

  link: {
    marginTop: 10,
    color: "#1e90ff",
    fontSize: 16,
    textAlign: "center",     
  },
});
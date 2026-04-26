import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    
    input: {
        flex: 1, 
        padding: 12,
        paddingRight: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        backgroundColor: '#fff',
    }, 

    icon: {
        position: 'absolute',
        right: 12, 
        height: '100%',
        justifyContent: 'center',
    },

    errorMensage: {
        color: 'red', 
        marginTop: 4,
        fontSize: 12,
    }
});
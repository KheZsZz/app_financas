import { StyleSheet, Platform } from "react-native";

export const Styles = StyleSheet.create({
  // Container base para o Toast personalizado (tipo info/azul)
  baseContainer: {
    height: 70,
    width: '90%',
    backgroundColor: '#1e90ff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Sombra para Android
    elevation: 8,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },

  textContainer: {
    marginLeft: 15,
    flex: 1,
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  description: {
    color: '#f0f0f0',
    fontSize: 13,
    marginTop: 2,
  },

  // Estilização customizada para os toasts padrão (Success/Error)
  standardToast: {
    height: 70,
    backgroundColor: '#fff',
    borderLeftWidth: 6,
    elevation: 4,
  },

  iconContainer: {
    justifyContent: 'center',
    paddingLeft: 15,
  }
});
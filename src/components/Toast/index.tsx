import React from 'react';
import { View, Text } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { Styles } from './styles';

export const toastConfig: ToastConfig = {
  
  success: (props) => (
    <BaseToast
      {...props}
      style={[Styles.standardToast, { borderLeftColor: '#2ecc71' }]}
      text1Style={Styles.title}
      text2Style={Styles.description}
      renderLeadingIcon={() => (
        <View style={Styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={28} color="#2ecc71" />
        </View>
      )}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={[Styles.standardToast, { borderLeftColor: '#e74c3c' }]}
      renderLeadingIcon={() => (
        <View style={Styles.iconContainer}>
          <Ionicons name="alert-circle" size={28} color="#e74c3c" />
        </View>
      )}
    />
  ),


  info: ({ text1, text2 }) => (
    <View style={Styles.baseContainer}>
      <Ionicons name="information-circle" size={30} color="#fff" />
      <View style={Styles.textContainer}>
        <Text style={Styles.title}>{text1}</Text>
        {text2 && <Text style={Styles.description}>{text2}</Text>}
      </View>
    </View>
  )
};
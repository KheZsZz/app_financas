import { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { Styles } from './styles'


type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
} & TextInputProps;

export function InputText<T extends FieldValues>({
  control,
  name,
  error,
  secureTextEntry,
  ...rest
}: FormInputProps<T>) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecureField = secureTextEntry; 
  const showText = isSecureField && !isPasswordVisible;

  return (
    <View style={Styles.container}>
      <View style={Styles.content}> 
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={showText}
              style={[Styles.input, isSecureField && { paddingLeft: 12 }]}
              {...rest}
            />
          )}
        />

        {isSecureField && (
          <TouchableOpacity 
            style={Styles.icon} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons 
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
              size={22} 
              color="#888" 
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={Styles.errorMensage}>{error}</Text>}
    </View>
  );
}
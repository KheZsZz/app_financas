import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

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
  ...rest
}: FormInputProps<T>) {
  return (
    <View style={Styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={Styles.input}
            {...rest}
          />
        )}
      />

      {error && (
        <Text style={Styles.errorMensage}>
          {error}
        </Text>
      )}
    </View>
  );
}

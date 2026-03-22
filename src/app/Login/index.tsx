import { View, Text } from 'react-native';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/Button'

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginProps } from '@/schemas/loginSchema';

import { Styles } from './styles'


export const Login = () => {

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginProps>({
    resolver: zodResolver(loginSchema)
  });

  function onSubmit(data: LoginProps) {
    console.log(data);
  }

  return (
    <View style={Styles.container}>
        <Text style={Styles.title}>Login page</Text>  
        <InputText  
            control={control}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            error={errors.email?.message}
        />

        <InputText
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            error={errors.password?.message}
        />

        <Button name="Entrar" onPress={handleSubmit(onSubmit)} />

    </View>
  )
} 
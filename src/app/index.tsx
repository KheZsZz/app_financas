import { View, Text, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router"; 
import { LoginUserSchema, LoginFormData } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StylesMain } from "@/styles/main";
import { InputText } from "@/components/InputText";
import { Button } from "@/components/Button";
import { supabase } from "@/config/supabase";

const App = () => {

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const handleSingIn = async (data: LoginFormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email_user,
        password: data.password_user,
      });
      if (error){
        console.error("Login error:", error);
        throw error;
      } 
    } catch (error:any) {
      const message = error?.message || "Erro ao realizar login";
      Alert.alert("Falha na autenticação", message);
      
    }
  }

  return (
    <View style={StylesMain.container}>
      <Text style={StylesMain.title}>Login Screen</Text>
      <View style={StylesMain.content}>

        <InputText
          name="email_user"
          control={control}
          placeholder="Enter your email"
          error={errors.email_user?.message}
        />

        <InputText
          name="password_user"
          placeholder="Enter your password"
          control={control}
          secureTextEntry={true}
          error={errors.password_user?.message}
        />

        <Button
          icon="enter"
          name="Enter"
          isLoading={isSubmitting}
          onSubmit={handleSubmit(handleSingIn)}
        />

        <Link href="/Register" style={StylesMain.link}>
          Don't have an account? Register here
        </Link>

      </View>
    </View>
  );
};
export default App;

import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { LoginUserSchema, LoginFormData } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StylesMain } from "@/styles/main";
import { InputText } from "@/components/InputText";
import { Button } from "@/components/Button";

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  return (
    <View style={StylesMain.container}>
      <Text style={StylesMain.title}>Login</Text>
      <View>
        <InputText
          name="email_user"
          control={control}
          error={errors.email_user?.message}
        />
        <InputText
          name="password_user"
          control={control}
          error={errors.password_user?.message}
        />
        <Button
          icon="arrow-forward"
          name="Login"
          isLoading={isSubmitting}
          onSubmit={handleSubmit(() => {})}
        />
      </View>
    </View>
  );
};
export default App;

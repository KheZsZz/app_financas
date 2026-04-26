import Head from "expo-router/head";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Loadding } from "@/components/Loadding";
import { toastConfig } from '@/components/Toast';


function AuthGuard() {
  const { user, isInitializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isPublicPage = segments[0] === undefined || segments[0] === "Register";

    if (!user && inAuthGroup) {
      router.replace("/");
    } else if (user && isPublicPage) {
      router.replace("/(auth)/Dashboard");
    }
  }, [user, isInitializing, segments]);

  if (isInitializing) {
    return <Loadding />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen 
        name="Register" 
        options={{ 
          headerShown: true, 
          headerTitle: "Criar Conta",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#1e90ff" }
        }} 
      />
      <Stack.Screen name="(auth)" options={{ gestureEnabled: false }} />
    </Stack>
  );
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <Head>
        <title>Finanças</title>
        <meta name="description" content="Gerenciador de Finanças Pessoais" />
      </Head>

      <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />
      
      <AuthGuard />

      <Toast 
        config={toastConfig} 
        position="bottom"
        bottomOffset={70}
        visibilityTime={5000}
      />
    </AuthProvider>
  );
};

export default RootLayout;
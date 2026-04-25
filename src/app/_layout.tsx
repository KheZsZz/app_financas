import Head from "expo-router/head";
import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { supabase } from "@/config/supabase";
import { Loadding } from "@/components/Loadding";

const Layout = () => {
  const router = useRouter();
  const segments = useSegments();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

      const inAuthGroup = segments[0] === "(auth)";

      if (!session && inAuthGroup) {
        router.replace("/"); 
      } else if (session && (segments[0] === undefined || segments[0] === "Register")) {
        router.replace("/(auth)/Dashboard");
      }
      setIsInitializing(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [segments]);

  if (isInitializing) {
    return (
      <Loadding />
    );
  }

  return (
    <>
      <Head>
        <title>Finanças</title>
        <meta name="description" content="Gerenciador de Finanças Pessoais" />
      </Head>
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="Register" options={{ headerShown: true, headerTitle: "Criar Conta" }} />
        <Stack.Screen name="(auth)" options={{ gestureEnabled: false }} />
      </Stack>
    </>
  );
};

export default Layout;
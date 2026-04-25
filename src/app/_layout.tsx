import { Tabs, Stack } from "expo-router";
import Head from "expo-router/head";

const Layout = () => {
  return (
    <>
      <Head>
        <title>Finanças</title>
        <meta name="description" content="Expo Router Layouts Demo" />
      </Head>
      <Stack>
        <Stack.Screen name="index" options={{ headerShadowVisible: false }} />
      </Stack>
    </>
  );
};
export default Layout;

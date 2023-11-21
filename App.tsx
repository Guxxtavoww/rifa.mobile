import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import * as Updates from "expo-updates";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { getApps, initializeApp } from "firebase/app";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Routes from "@/routes";
import { THEME } from "@/styles/theme.styles";
import { firebaseConfig } from "@/lib/firebase.lib";
import { fetchFonts } from "@/utils/fetch-fonts.util";
import { persistedStore, store } from "@/redux/store.redux";
import { Loader } from "@/components";

export const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const prepare = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          return;
        }

        await Promise.all([Updates.checkForUpdateAsync(), fetchFonts()])
          .then(([{ isAvailable }, _]) => isAvailable || false)
          .then(async (isAvailable) => {
            if (isAvailable) {
              await Updates.fetchUpdateAsync();
              await Updates.reloadAsync();
            }
          });

        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  if (!dataLoaded) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <QueryClientProvider client={queryClient}>
          <NativeBaseProvider>
            <StatusBar
              animated
              backgroundColor={THEME.colors.screen_white_background}
            />
            <Routes />
          </NativeBaseProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

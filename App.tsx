import "react-native-gesture-handler";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./src/components/TabBar";
import Home from "./src/screens/Home";
import Urgent from "./src/screens/Urgent";
import EXPDates from "./src/screens/EXPDates";
import Manage from "./src/screens/Manage";
import AddItems from "./src/screens/AddItems";
import { Colors } from "./src/common/palette";
import Details from "./src/screens/Details";

interface AppLoaderProps {
  children: React.ReactElement;
}

interface AnimatedSplashScreenProps extends AppLoaderProps {}

export type RootRouteParamList = {
  home: undefined;
  urgent: undefined;
  date: undefined;
  manage: undefined;
  add: undefined;
  details: {
    id?: string;
  };
};

export type NavigationHookProps = BottomTabNavigationProp<RootRouteParamList>;

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  return (
    <AppLoader>
      <MainScreen />
    </AppLoader>
  );
}

const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
  const [isAppReady, setAppReady] = React.useState<boolean>(false);
  const [fontLoaded] = useFonts({
    Quicksand_Regular: require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    Quicksand_Medium: require("./assets/fonts/Quicksand/Quicksand-Medium.ttf"),
    Quicksand_Bold: require("./assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    Pattaya_Regular: require("./assets/fonts/Pattaya/Pattaya-Regular.ttf"),
  });

  React.useEffect(() => {
    async function prepareSplashScreen() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAppReady(true);
      } catch (e) {
        console.log(e);
      }
    }

    async function requestPermission() {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("App require permission to access gallery");
        }
      }
    }

    if (fontLoaded) {
      prepareSplashScreen();
      requestPermission();
    }
  }, [fontLoaded]);

  if (!isAppReady) return null;

  return <AnimatedSplashScreen>{children}</AnimatedSplashScreen>;
};

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ children }) => {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false);

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = React.useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.error(e);
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            source={require("./assets/splash.png")}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator<RootRouteParamList>();

const MainScreen: React.FC = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          initialRouteName="home"
          backBehavior="history"
          sceneContainerStyle={{
            backgroundColor: Colors.White,
          }}
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "Quicksand_Bold",
              color: Colors.Grey,
            },
          }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen key={`nav-tab-home`} name={"home"} component={Home} />
          <Tab.Screen
            key={`nav-tab-urgent`}
            name={"urgent"}
            component={Urgent}
            options={{
              title: "Urgent item(s)",
            }}
          />
          <Tab.Screen
            key={`nav-tab-add`}
            name={"add"}
            component={AddItems}
            options={{
              title: "Add item(s)",
            }}
          />
          <Tab.Screen
            key={`nav-tab-date`}
            name={"date"}
            component={EXPDates}
            options={{
              title: "Expiry dates",
            }}
          />
          <Tab.Screen
            key={`nav-tab-manage`}
            name={"manage"}
            component={Manage}
            options={{
              title: "Manage items",
            }}
          />
          <Tab.Screen
            key={`nav-tab-details`}
            name={"details"}
            component={Details}
            options={{
              title: "Detail items",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

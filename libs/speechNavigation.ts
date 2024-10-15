import { Href, router } from "expo-router";

type Screen = {
  path: Href<string | object>;
  name: string;
}

const Screens: Record<string, Screen> = {
  home: {
    path: "/(tabs)",
    name: "home"
  },
  explore: {
    path: "/(tabs)/explore",
    name: "explore"
  }
}

const isNavigationCommand = (value: string) => {
  return !!value.match(/\b(go to|navigate to)\b/g)?.[0]
}

const getScreen = (value: string) => {
  return Object.values(Screens).find(({ name: screenName }) => value.match(screenName)?.[0]);
}

export const speechNavigate = (value: string) => {
  if (!isNavigationCommand(value)) {
    return;
  }

  const screen = getScreen(value);

  if (!!screen) {
    router.navigate(screen.path);
  }
}
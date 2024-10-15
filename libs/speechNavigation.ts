import { router } from "expo-router";

enum Screens {
  Home = 'home',
  Explore = 'explore',
}

const isNavigationCommand = (value: string) => {
  return !!value.match(/\b(go to|navigate to)\b/g)?.[0]
}

const getScreen = (value: string) => {
  return Object.values(Screens).find((screen) => value.match(screen)?.[0]);
}

export const speechNavigate = (value: string) => {
  if (!isNavigationCommand(value)) {
    return;
  }

  const screen = getScreen(value);

  if (!!screen) {
    router.navigate(screen);
  }
}
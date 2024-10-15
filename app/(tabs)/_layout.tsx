import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MicButton } from '@/components/MicButton';
import { addSpeechResultListener } from '@/modules/speech-recognition';
import { speechNavigate } from '@/libs/speechNavigation';
import { ToastAndroid } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const eventSubscription = addSpeechResultListener((event) => {
      ToastAndroid.show(event.value, ToastAndroid.SHORT);
      speechNavigate(event.value);
    });

    return () => eventSubscription.remove();
  })

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
      <MicButton />
    </>
  );
}

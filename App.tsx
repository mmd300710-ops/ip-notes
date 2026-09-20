import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import NotesScreen from "./src/screens/NotesScreen";
import SignInScreen from "./src/screens/SignInScreen";
import GlassScaffold from "./src/components/GlassScaffold";
import { subscribeAuth, type AuthUser } from "./src/services/auth";
import { adsManager } from "./src/services/ads";

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = subscribeAuth((u) => {
      setUser(u);
      setLoadingAuth(false);
    });

    adsManager.init().catch(() => {});
    return () => { unsub?.(); };
  }, []);

  if (loadingAuth) {
    return (
      <GlassScaffold>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      </GlassScaffold>
    );
  }

  return user ? <NotesScreen user={user} /> : <SignInScreen />;
}

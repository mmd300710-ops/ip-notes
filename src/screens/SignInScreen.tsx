import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import GlassScaffold from "../components/GlassScaffold";
import { signInWithGoogle } from "../services/auth";

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <GlassScaffold>
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "900" }}>IP Notes</Text>
        <Text style={{ color: "rgba(255,255,255,0.75)", marginTop: 10 }}>
          Google Sign-In (Firebase Auth)
        </Text>

        <TouchableOpacity
          disabled={loading}
          onPress={async () => {
            setLoading(true);
            try {
              await signInWithGoogle();
            } finally {
              setLoading(false);
            }
          }}
          style={{
            marginTop: 28,
            paddingVertical: 14,
            borderRadius: 18,
            backgroundColor: "rgba(255,255,255,0.14)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.22)",
            alignItems: "center",
          }}
        >
          {loading ? <ActivityIndicator /> : <Text style={{ color: "white", fontWeight: "900" }}>Continue with Google</Text>}
        </TouchableOpacity>
      </View>
    </GlassScaffold>
  );
}

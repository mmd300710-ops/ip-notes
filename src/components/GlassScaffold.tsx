import React from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function GlassScaffold({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <View style={styles.panel}>
        <BlurView intensity={55} tint="dark" style={StyleSheet.absoluteFill} />
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#070A12", padding: 14 },
  panel: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#6D28D9",
    opacity: 0.35,
    top: -120,
    left: -120,
  },
  glow2: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "#22C55E",
    opacity: 0.25,
    bottom: -160,
    right: -120,
  },
});

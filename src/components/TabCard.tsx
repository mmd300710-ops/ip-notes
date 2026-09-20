import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import type { NoteTab } from "../services/storage";

export default function TabCard({
  tab,
  active,
  onPress,
  onDelete,
}: {
  tab: NoteTab;
  active: boolean;
  onPress: () => void;
  onDelete: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, active ? styles.cardActive : styles.cardInactive]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text numberOfLines={1} style={[styles.title, active && styles.titleActive]}>
          {tab.title}
        </Text>
        <Text onPress={onDelete} style={styles.del}>
          ×
        </Text>
      </View>
      <Text style={styles.sub}>Updated {new Date(tab.updatedAt).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  cardActive: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.35)",
  },
  cardInactive: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.12)",
  },
  title: { color: "white", fontWeight: "900" },
  titleActive: { color: "white" },
  sub: { color: "rgba(255,255,255,0.65)", marginTop: 6, fontSize: 11 },
  del: { color: "#FB7185", fontWeight: "900", fontSize: 22, paddingLeft: 8 },
});

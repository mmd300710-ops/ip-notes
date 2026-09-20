import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function EditorCard({
  title,
  text,
  onChangeText,
  onSave,
  onDelete,
}: {
  title: string;
  text: string;
  onChangeText: (t: string) => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>

      <TextInput
        value={text}
        onChangeText={onChangeText}
        multiline
        placeholder="Write your notes…"
        placeholderTextColor="rgba(255,255,255,0.35)"
        style={styles.input}
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={onDelete} style={[styles.btn, styles.btnDanger]}>
          <Text style={[styles.btnText, styles.dangerText]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={[styles.btn, styles.btnPrimary]}>
          <Text style={[styles.btnText, styles.primaryText]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16 },
  title: { color: "white", fontSize: 18, fontWeight: "900" },
  input: {
    marginTop: 12,
    flex: 1,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.20)",
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  btn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  btnText: { fontWeight: "900", textAlign: "center" },
  btnDanger: { backgroundColor: "rgba(251,113,133,0.12)", borderColor: "rgba(251,113,133,0.45)" },
  dangerText: { color: "#FB7185" },
  btnPrimary: { backgroundColor: "rgba(255,255,255,0.14)", borderColor: "rgba(255,255,255,0.22)" },
  primaryText: { color: "white" },
});

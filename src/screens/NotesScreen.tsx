import React, { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import GlassScaffold from "../components/GlassScaffold";
import PlusButton from "../components/PlusButton";
import TabCard from "../components/TabCard";
import EditorCard from "../components/EditorCard";
import type { AuthUser } from "../services/auth";
import {
  deleteTabEverywhere,
  loadContents,
  loadTabs,
  saveTabs,
  upsertContent,
  uidTab,
} from "../services/storage";

export default function NotesScreen({ user }: { user: AuthUser }) {
  const uid = user.uid;

  const [tabs, setTabs] = useState<any[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [contents, setContents] = useState<Record<string, any>>({});
  const [text, setText] = useState("");

  async function refreshAll() {
    const [t, c] = await Promise.all([loadTabs(uid), loadContents(uid)]);
    setTabs(t);
    setContents(c);
    const nextActive = activeTabId && t.some((x) => x.tabId === activeTabId) ? activeTabId : (t[0]?.tabId ?? null);
    setActiveTabId(nextActive);
    if (nextActive) setText(c[nextActive]?.rawText ?? "");
    else setText("");
  }

  useEffect(() => { refreshAll().catch(() => {}); }, []);

  const activeTab = useMemo(() => tabs.find((t) => t.tabId === activeTabId) ?? null, [tabs, activeTabId]);

  async function createNewTab() {
    const id = uidTab();
    const newTab = { tabId: id, title: `Untitled ${tabs.length + 1}`, updatedAt: Date.now() };
    const nextTabs = [newTab, ...tabs];
    setTabs(nextTabs);
    setActiveTabId(id);
    setText("");
    await saveTabs(uid, nextTabs);
    await upsertContent(uid, id, "");
  }

  async function saveActive() {
    if (!activeTabId) return;
    await upsertContent(uid, activeTabId, text);
    const nextTabs = tabs.map((t) => (t.tabId === activeTabId ? { ...t, updatedAt: Date.now() } : t));
    setTabs(nextTabs);
    await saveTabs(uid, nextTabs);
    Alert.alert("Saved", "Tab saved locally.");
  }

  async function deleteActive() {
    if (!activeTabId) return;

    Alert.alert("Delete tab?", "This removes the tab and its content.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTabEverywhere(uid, activeTabId);
          await refreshAll();
        },
      },
    ]);
  }

  return (
    <GlassScaffold>
      <View style={{ flex: 1, paddingTop: 8 }}>
        <View style={{ paddingHorizontal: 16, paddingBottom: 10, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 16, flex: 1 }}>IP Notes</Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{user.email ?? user.uid}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }}>
            {tabs.map((t) => (
              <TabCard
                key={t.tabId}
                tab={t}
                active={t.tabId === activeTabId}
                onPress={() => {
                  setActiveTabId(t.tabId);
                  setText(contents[t.tabId]?.rawText ?? "");
                }}
                onDelete={() => {
                  setActiveTabId(t.tabId);
                  deleteActive().catch(() => {});
                }}
              />
            ))}
            {!tabs.length && (
              <View style={{ padding: 14, justifyContent: "center" }}>
                <Text style={{ color: "rgba(255,255,255,0.65)" }}>No tabs yet. Tap +</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={{ flex: 1, marginTop: 6 }}>
          <EditorCard
            title={activeTab?.title ?? "No tab selected"}
            text={text}
            onChangeText={setText}
            onSave={saveActive}
            onDelete={deleteActive}
          />
        </View>

        <PlusButton onPress={createNewTab} />
      </View>
    </GlassScaffold>
  );
}

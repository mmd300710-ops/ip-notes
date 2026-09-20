import AsyncStorage from "@react-native-async-storage/async-storage";

export type NoteTab = {
  tabId: string;
  title: string;
  updatedAt: number;
};

export type NoteContent = {
  contentId: string;
  tabId: string;
  rawText: string;
  updatedAt: number;
  version: number;
};

const keyTabs = (uid: string) => `ipnotes::tabs::${uid}`;
const keyContents = (uid: string) => `ipnotes::contents::${uid}`;

function uid() {
  return `tab_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export async function loadTabs(uidStr: string): Promise<NoteTab[]> {
  const raw = await AsyncStorage.getItem(keyTabs(uidStr));
  if (!raw) return [];
  return JSON.parse(raw);
}

export async function saveTabs(uidStr: string, tabs: NoteTab[]) {
  await AsyncStorage.setItem(keyTabs(uidStr), JSON.stringify(tabs));
}

export async function loadContents(uidStr: string): Promise<Record<string, NoteContent>> {
  const raw = await AsyncStorage.getItem(keyContents(uidStr));
  if (!raw) return {};
  return JSON.parse(raw);
}

export async function upsertContent(uidStr: string, tabId: string, rawText: string) {
  const contents = await loadContents(uidStr);
  const now = Date.now();
  const existing = contents[tabId];

  const next: NoteContent = existing
    ? { ...existing, rawText, updatedAt: now, version: existing.version + 1 }
    : {
        contentId: `content_${Math.random().toString(16).slice(2)}`,
        tabId,
        rawText,
        updatedAt: now,
        version: 1
      };

  contents[tabId] = next;
  await AsyncStorage.setItem(keyContents(uidStr), JSON.stringify(contents));
}

export async function deleteTabEverywhere(uidStr: string, tabId: string) {
  const tabs = (await loadTabs(uidStr)).filter((t) => t.tabId !== tabId);
  await saveTabs(uidStr, tabs);

  const contents = await loadContents(uidStr);
  delete contents[tabId];
  await AsyncStorage.setItem(keyContents(uidStr), JSON.stringify(contents));
}

export function uidTab() {
  return uid();
}

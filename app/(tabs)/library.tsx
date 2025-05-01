import { Book } from "@/components/Book";
import { Dropdown } from "@/components/Dropdown";
import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { Track } from "@/components/providers/player/PlayerProvider";
import { Tabs } from "@/components/Tabs";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  FlatList,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

export default function Library() {
  const [tab, setTab] = useState("all");
  const [orderBy, setOrderBy] = useState("activity");
  const router = useRouter();
  const store = useStore<Track>("books");
  const [books, setBooks] = useState<Track[]>(() => {
    return Object.values(store.all());
  });

  const downloaded = books.filter((book) => book.source.local);
  const notStarted = books.filter((book) => book.status === "not_started");
  const started = books.filter((book) => book.status === "in_progress");
  const finished = books.filter((book) => book.status === "finished");

  useEffect(() => {
    store.all$((data) => {
      setBooks(Object.values(data));
    });
  }, []);

  const tabs = [
    { id: "all", label: "All", items: books },
    { id: "in_progress", label: "In progress", items: started },
    { id: "downloaded", label: "Downloaded", items: downloaded },
    { id: "not_started", label: "Not Started", items: notStarted },
    { id: "finished", label: "Finished", item: finished },
  ];

  const order = [
    { id: "activity", label: "Recent activity" },
    { id: "duration-descending", label: "Length - longest to shortest" },
    { id: "duration-ascending", label: "Length - shortest to longest" },
    { id: "alpha-ascending", label: "Alphabetical - A to Z" },
    { id: "alpha-descending", label: "Alphabetical - Z to A" },
  ];

  return (
    <SafeAreaView>
      <Tabs items={tabs} active={tab} onChange={setTab} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
      >
        <Text style={{ color: "#ffffff" }}>
          Results: {tabs.find((item) => item.id === tab)?.items?.length || 0}
        </Text>
        <Dropdown items={order} active={orderBy} onChange={setOrderBy} />
      </View>
      <FlatList
        data={tabs.find((item) => item.id === tab)?.items}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push(`/details/${item.id}`)}
              >
                <Book item={item} />
              </TouchableOpacity>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

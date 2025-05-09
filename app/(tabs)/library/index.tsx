import { Book } from "@/components/Book";
import { Dropdown } from "@/components/Dropdown";
import { useStore } from "@/components/providers/datbase/DatabaseProvider";
import { Track } from "@/components/providers/player/PlayerProvider";
import { Tabs } from "@/components/Tabs";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";

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
    return store.all$((data) => {
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
    {
      id: "activity",
      label: "Recent activity",
      icon: <IconSymbol name="clock" size={16} />,
    },
    {
      id: "duration-descending",
      label: "Length - longest to shortest",
      icon: <IconSymbol name="clock" size={16} />,
    },
    {
      id: "duration-ascending",
      label: "Length - shortest to longest",
      icon: <IconSymbol name="clock" size={16} />,
    },
    {
      id: "alpha-ascending",
      label: "Alphabetical - A to Z",
      icon: <IconSymbol name="textformat.size" size={16} />,
    },
    {
      id: "alpha-descending",
      label: "Alphabetical - Z to A",
      icon: <IconSymbol name="textformat.size" size={16} />,
    },
  ];

  const orderFunction = (a: Track, b: Track) => {
    switch (orderBy) {
      case "activity":
        return b.lastPlayedAt - a.lastPlayedAt;
      case "duration-descending":
        return b.duration - a.duration;
      case "duration-ascending":
        return a.duration - b.duration;
      case "alpha-ascending":
        return a.title.localeCompare(b.title);
      case "alpha-descending":
        return b.title.localeCompare(a.title);
    }

    return b.lastPlayedAt - a.lastPlayedAt;
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        <Tabs items={tabs} active={tab} onChange={setTab} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 16,
          }}
        >
          <ThemedText>
            Results: {tabs.find((item) => item.id === tab)?.items?.length || 0}
          </ThemedText>
          <Dropdown
            items={order}
            active={orderBy}
            onChange={setOrderBy}
            prefix={<IconSymbol name="arrow.up.arrow.down.square" size={16} />}
          />
        </View>
        <FlatList
          data={[...(tabs.find((item) => item.id === tab)?.items || [])].sort(
            orderFunction
          )}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push(`/library/${item.id}`)}
                >
                  <Book item={item} />
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

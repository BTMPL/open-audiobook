import { Platform } from "react-native";
import { Row, Store } from "tinybase/store";
import {
  Provider,
  useCreatePersister,
  useStore as useTinyStore,
} from "tinybase/ui-react";

import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";

import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  store: Store;
};
export const DatabaseProvider = ({ children, store }: Props) => {
  const data = useAndStartPersister(store);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    data?.load().then(() => {
      setReady(true);
    });
  }, [data]);

  if (!ready) return null;

  return <Provider store={store}>{children}</Provider>;
};

const useAndStartPersister = (store: Store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) =>
      Platform.OS === "web"
        ? createLocalPersister(store, "books")
        : createExpoSqlitePersister(store, SQLite.openDatabaseSync("books.db")),
    [],
    (persister) =>
      persister.load().then(() => {
        persister.startAutoSave();
      }),
    [],
    (persister) => {
      console.log("Persister detroying");
      persister.save();
      persister.stopAutoSave();
    }
  );

export type StoreName = "books";

type StoreableObject = { id: string } & Object;

export const useStore = <T extends StoreableObject>(storeName: StoreName) => {
  const store = useTinyStore();
  return Model<T>(storeName, store!);
};

const Model = <T extends StoreableObject>(table: StoreName, store: Store) => {
  const add = (object: T) => {
    const id = object.id;
    store.setRow(table, id, serialize(object));
    return { [id]: object };
  };
  const update = (id: string, object: Partial<T>): T =>
    unserialize(
      store.setPartialRow(table, id, serialize(object)).getRow(table, id)
    );
  const remove = (id: string) => store.delRow(table, id);
  const byId = (id: string): T | undefined => {
    const data = unserialize(store.getRow(table, id));
    if (data?.id) return data as T;
    return undefined;
  };

  const byId$ = (id: string, callback: (data: T) => void) => {
    store.addRowListener(table, id, (store, tableId) => {
      const data = unserialize(store.getRow(table, id));
      if (data?.id) return callback(data as T);
    });
  };
  const all = (): Record<T["id"], T> =>
    Object.entries(store.getTable(table)).reduce((acc, [key, value]) => {
      acc[key] = unserialize(value);
      return acc;
    }, {} as Record<string, Record<keyof T, any>>);

  const all$ = (callback: (all: Record<T["id"], T>) => void) => {
    store.addTableListener(table, (store, tableId) => {
      return callback(all());
    });
  };

  return {
    add,
    update,
    remove,
    byId,
    byId$,
    all,
    all$,
  };
};

export function serialize<T extends StoreableObject | Partial<StoreableObject>>(
  track: T
): Row {
  return Object.entries(track).reduce((acc, [key, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      acc[key] = value;
    } else {
      acc[key] = JSON.stringify(value);
    }
    return acc;
  }, {} as Row);
}

export function unserialize<T extends StoreableObject>(row: Row): T {
  return Object.entries(row).reduce((acc, [key, value]) => {
    if (typeof value === "string") {
      try {
        acc[key as keyof T] = JSON.parse(value);
      } catch (e) {
        acc[key as keyof T] = value;
      }
    } else {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Record<keyof T, any>);
}

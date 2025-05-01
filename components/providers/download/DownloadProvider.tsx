import * as FileSystem from "expo-file-system";
import React from "react";
import { MMKV } from "react-native-mmkv";

const store = new MMKV({
  id: "downloader",
});

const DownloadContext = React.createContext<{
  start: (
    url: string,
    fileName: string,
    callback: (percentage: number, done: boolean, uri?: string) => void
  ) => {
    pause: () => Promise<void>;
  };
  resume: (
    url: string,
    callback: (percentage: number, done: boolean, uri?: string) => void
  ) => Promise<string | undefined>;
}>({
  start: () => {
    throw new Error("start function not implemented");
  },
  resume: () => {
    throw new Error("resume function not implemented");
  },
});

export const useDownload = () => {
  const context = React.useContext(DownloadContext);
  if (!context) {
    throw new Error("useDownload must be used within a DownloadProvider");
  }
  return context;
};

export const DownloadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = React.useMemo(
    () => ({
      start: (
        url: string,
        fileName: string,
        callback: (percentage: number, done: boolean, uri?: string) => void
      ) => {
        let downloadResumable: FileSystem.DownloadResumable;
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "files/", {
          intermediates: true,
        }).then(() => {
          downloadResumable = FileSystem.createDownloadResumable(
            url,
            FileSystem.documentDirectory + "files/" + fileName,
            {},
            (progress) => {
              const percentage = Math.round(
                (progress.totalBytesWritten /
                  progress.totalBytesExpectedToWrite) *
                  100
              );
              callback(percentage, false);
            }
          );

          downloadResumable.downloadAsync().then((result) => {
            if (result) callback(100, true, result.uri);
          });
        });

        return {
          pause: async () => {
            await downloadResumable.pauseAsync();
            store.set(
              `pausedDownload.${url}`,
              JSON.stringify(downloadResumable.savable())
            );
          },
        };
      },

      resume: async (
        url: string,
        callback: (percentage: number, done: boolean, uri?: string) => void
      ): Promise<string | undefined> => {
        const downloadSnapshotJson = store.getString(`pausedDownload.${url}`);
        if (!downloadSnapshotJson) {
          console.log("No paused download found");
          return;
        }
        const downloadSnapshot = JSON.parse(downloadSnapshotJson);
        const downloadResumable = new FileSystem.DownloadResumable(
          downloadSnapshot.url,
          downloadSnapshot.fileUri,
          downloadSnapshot.options,
          (progress) => {
            const percentage = Math.round(
              (progress.totalBytesWritten /
                progress.totalBytesExpectedToWrite) *
                100
            );
            callback(percentage, false);
          },
          downloadSnapshot.resumeData
        );

        downloadResumable.resumeAsync().then((result) => {
          if (result) callback(100, true, result.uri);
        });
      },
    }),
    []
  );
  return (
    <DownloadContext.Provider value={value}>
      {children}
    </DownloadContext.Provider>
  );
};

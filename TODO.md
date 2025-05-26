- i18n + a11y
- splash + icon
- playback speed - change to predefined buttons + slider from 0.5x to 3x
- remove the pull-down animation from details card, make it actually dismiss the screen
- downloaded assets are gone after app update
  - this is caused by iOS generating new uuid folder for each app install, e.g.: we're storing local cover/url as
    file:///Users/btm/Library/Developer/CoreSimulator/Devices/B33F984F-A666-4E3B-BF29-B5D5F9FE494D/data/Containers/Data/Application/1D9F1F5B-7BC9-4D0C-83B2-3490A367075E/Documents/files/2.jpg while we should only store "files/2.jpg" and use FileSystem.documentDirectory as the prefix

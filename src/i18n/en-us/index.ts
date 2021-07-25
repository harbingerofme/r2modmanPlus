export default {
  R2Modman: {
    runningMigration: {
      needBackgroundWork: "An update to the manager has occurred and needs to do background work.",
      gameSelectSoon: "The option to select a game will appear once the work has completed.",
    },
    errors: {
      error: "Error",
      solution: "Suggestion",
      close: "close",
    },
  },
  Navigation: {
    launchModded: "Start modded",
    //TODO: write all nav stuff
    online: "Online"
  },
  GameSelectionScreen: {
    storeSelection: {
      title: "Which store manages your game?",
      label: "Select a platform:",
      confirm: "Select platform",
    },
    hero: {
      title: "Game selection",
      subtitle: "Which game are you managing your mods for?",
    },
    search: {
      label: "Search",
      placeholder: "Search for a game",
    },
    buttons: {
      confirm: "Select game",
      makeDefault: "Set as default"
    },
  },
  Help: {
    title: "Help",
    subtitle: "Common problems and their potential solutions",
    gettingStarted: {
      title: "Getting started with installing mods",
      howDownload: "Go to the \"@:Navigation.online\" tab, find a mod and hit download. It'll also download the dependencies saving you time.",
      howLaunchModded: "Once you've installed the mods you'd like, click on **\"@:Navigation.launchModded\"** in the top left"
    },
    slowGame: {
      title: "Slow game with mods / stuttering?",
      probableCause: "This is likely due to a mod throwing errors.",
      binarySearch: "One solution is to attempt to disable half of your mods and check to see if the issue persists.\n If the issue still remains then disable another half. Continue doing this until the issue is solved.",
      maybeOptimisationMods: "In the case of stuttering there may be optimization mods to help with this.",
    },
    dedicatedServer: {
      title: "Dedicated servers",
      text: "Dedicated servers aren't directly supported through the manager.\n However, a solution is to instead copy the contents of your profile folder into your dedicated server folder yourself.",
    },
    launchFromSteam: {
      title: "",
      design: "",
      howChange: "",
      
    },
  },
};

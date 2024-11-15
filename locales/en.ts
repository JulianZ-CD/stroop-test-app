const enTranslations = {
  common: {
    signOut: "Sign out",
    backToHome: "Back to Home",
    startNewTest: "Start New Test",
    greetings: "Dear participant: ",
  },
  home: {
    title: "Stroop Test App",
    todoSection: {
      title: "Todos",
      newTodo: "+ new todo",
    },
    stroopSection: {
      title: "Stroop Test",
      description: "Test your cognitive abilities with the Stroop Test",
      languageReminder: "Please select your native language",
      startButton: "Start Stroop Test",
    },
    statsSection: {
      title: "Statistics",
      description: "View test results and statistics (requires login)",
      viewStats: "View Statistics",
      maleParticipants: "Male Participants",
      femaleParticipants: "Female Participants",
      totalParticipants: "Total Participants",
    }
  },
  stroopTest: {
    title: "Stroop Test",
    instructions: {
      part1:
        "In the first round, all colours are displayed in black font. Select the corresponding tile that matches the name of the colour.",
      part2:
        "In the second round, the colour of the font will not match the name of the colour that is written. Select the corresponding tile that matches the colour of the FONT.",
      part3: "For example, if you see RED in blue font, select the \"blue\" tile because the font is blue.",
      totalTrials: "Total trials: {{total}} ({{perSeries}} per series)",
    },
    colors: {
      red: "Red",
      yellow: "Yellow",
      blue: "Blue",
      black: "Black",
      green: "Green",
    },
    errors: {
      usernameRequired: "Please enter a username",
      usernameTaken: "This username is already taken",
      checkingUsername: "Error checking username availability",
      musicRequired: "Please select background music first",
      musicError: "Error playing music, please try again",
      genderRequired: "Please select gender",
    },
    progress: {
      practiceRound: "Practice Round",
      testRound: "Test Round",
      trial: "Trial {{current}} / {{total}}",
    },
    alerts: {
      tooManyErrors:
        "The error rate is too high, please answer the questions carefully. The test will be restarted.",
    },
    results: {
      completed: "Test Completed! Congratulations!",
      practiceRound: "Practice Round",
      testRound: "Test Round",
      overallPerformance: "Overall Performance",
      correctAnswers: "Correct Answers",
      mistakes: "Mistakes",
      minResponseTime: "Minimum Response Time",
      maxResponseTime: "Maximum Response Time",
      avgResponseTime: "Average Response Time",
      totalAccuracy: "Total Accuracy",
      totalTestingTime: "Total Testing Time",
    },
    buttons: {
      start: "Start Test",
      continue: "Continue Test",
    },
    username: {
      title: "Please enter your username",
      placeholders: "Enter your preferred username",
    },
    musicSelection: {
      title: "Select Background Music",
      mozart: "Mozart",
      pop_music: "Pop Music",
      no_music: "Don't play music",
    },
    gender: {
      label: "Please select your gender",
      male: "Male",
      female: "Female",
    },
    firstPhase: {
      title: "First Phase - Practice Round",
      instructions: `
        In the first round, all colours are displayed in black font. Select the corresponding tile that matches the name of the colour written.<br/><br/>
        For example, if you see "<span style="color: black; font-weight: bold">YELLOW</span>", select the "yellow" tile.
      `
    },
    secondPhase: {
      title: "Second Phase - Test Round",
      instructions: `
        In the second round, the colour of the font will not match the name of the colour that is written. Select the corresponding tile that matches the colour of the FONT.<br/><br/>
        For example, if you see <span style="color: blue">RED</span>, select the "blue" tile because the font is blue.
      `
    },
  },
};

export default enTranslations;

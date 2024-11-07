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
      startButton: "Start Stroop Test",
    },
  },
  stroopTest: {
    title: "Stroop Test",
    instructions: {
      part1: "In the first round (practice), all words displayed in black color.",
      part2: "In the second round (test), the colors will be different from the words.",
      part3: "Always click the color that matches the MEANING of the word.",
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
      genderRequired: "Please select gender"
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
      female: "Female"
    },
    firstPhase: {
      title: "First Phase - Practice Round",
      instructions: "In this phase, all words will be displayed in BLACK. Click the color button that matches the MEANING of the word.",
    },
    secondPhase: {
      title: "Second Phase - Test Round",
      instructions: "In this phase, words will be displayed in DIFFERENT colors. Still click the color button that matches the MEANING of the word, not its display color.",
    },
  },
};

export default enTranslations;

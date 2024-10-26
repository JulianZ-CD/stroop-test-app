export default {
    common: {
      signOut: "Sign out",
      backToHome: "Back to Home",
      startNewTest: "Start New Test",
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
        part1: "In the first round (practice), the color of each word matches its meaning.",
        part2: "In the second round (test), the colors will be different from the words.",
        part3: "Always click the color that matches the MEANING of the word.",
        totalTrials: "Total trials: {{total}} ({{perSeries}} per series)",
      },
      progress: {
        practiceRound: "Practice Round",
        testRound: "Test Round",
        trial: "Trial {{current}} / {{total}}",
      },
      results: {
        completed: "Test Completed!",
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
    },
  }
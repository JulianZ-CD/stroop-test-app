export default {
    common: {
      signOut: "Déconnexion",
      backToHome: "Retour à l'accueil",
      startNewTest: "Nouveau test",
    },
    home: {
      title: "Application de Test de Stroop",
      todoSection: {
        title: "Tâches",
        newTodo: "+ nouvelle tâche",
      },
      stroopSection: {
        title: "Test de Stroop",
        description: "Testez vos capacités cognitives avec le test de Stroop",
        startButton: "Commencer le test de Stroop",
      },
    },
    stroopTest: {
      title: "Test de Stroop",
      instructions: {
        part1: "Dans la première série (pratique), la couleur de chaque mot correspond à sa signification.",
        part2: "Dans la deuxième série (test), les couleurs seront différentes des mots.",
        part3: "Cliquez toujours sur la couleur qui correspond à la SIGNIFICATION du mot.",
        totalTrials: "Nombre total d'essais : {{total}} ({{perSeries}} par série)",
      },
      colors: {
        red: "rouge",
        yellow: "jaune",
        blue: "bleu",
        black: "noir",
        green: "vert",
      },
      progress: {
        practiceRound: "Série d'entraînement",
        testRound: "Série de test",
        trial: "Essai {{current}} / {{total}}",
      },
      results: {
        completed: "Test terminé !",
        practiceRound: "Série d'entraînement",
        testRound: "Série de test",
        overallPerformance: "Performance globale",
        correctAnswers: "Réponses correctes",
        mistakes: "Erreurs",
        minResponseTime: "Temps de réponse minimum",
        maxResponseTime: "Temps de réponse maximum",
        avgResponseTime: "Temps de réponse moyen",
        totalAccuracy: "Précision totale",
        totalTestingTime: "Temps total du test",
      },
      buttons: {
        start: "Commencer le test",
      },
    },
  }
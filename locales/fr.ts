const frTranslations = {
    common: {
      signOut: "Déconnexion",
      backToHome: "Retour à l'accueil",
      startNewTest: "Nouveau test",
      greetings: "Cher participant : ",
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
        part1: "Dans la première série (pratique), tous les mots sont affichés en noir.",
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
      errors: {
        usernameRequired: "Veuillez entrer un nom d'utilisateur",
        usernameTaken: "Ce nom d'utilisateur est déjà pris",
        checkingUsername: "Erreur lors de la vérification du nom d'utilisateur",
        musicRequired: "Veuillez sélectionner la musique de fond",
        musicError: "Erreur lors de la lecture de la musique, veuillez réessayer",
        genderRequired: "Veuillez sélectionner votre genre"
      },
      alerts: {
        tooManyErrors: "Le taux d'erreur est trop élevé, veuillez répondre aux questions attentivement. Le test va redémarrer.",
      },
      musicSelection: {
        title: "Sélectionner la musique de fond",
        mozart: "Mozart",
        pop_music: "Musique Pop",
        no_music: "Pas de musique"
      },
      gender: {
        label: "Veuillez sélectionner votre genre",
        male: "Homme",
        female: "Femme"
      },
      username: {
        title: "Veuillez entrer votre nom d'utilisateur",
        placeholders: "Entrez votre nom d'utilisateur préféré",
      },
      firstPhase: {
        title: "Première Phase - Série d'entraînement",
        instructions: "Dans cette phase, tous les mots seront affichés en NOIR. Cliquez sur le bouton de couleur qui correspond à la SIGNIFICATION du mot.",
      },
      secondPhase: {
        title: "Deuxième Phase - Série de test",
        instructions: "Dans cette phase, les mots seront affichés en DIFFÉRENTES couleurs. Cliquez toujours sur le bouton de couleur qui correspond à la SIGNIFICATION du mot, pas à sa couleur d'affichage.",
      },
    },
  }

export default frTranslations;

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
        languageReminder: "Veuillez sélectionner votre langue maternelle",
        startButton: "Commencer le test de Stroop",
      },
      statsSection: {
        title: "Statistiques",
        description: "Voir les résultats des tests et les statistiques (connexion requise)",
        viewStats: "Voir les statistiques",
        maleParticipants: "Participants masculins",
        femaleParticipants: "Participants féminins",
        totalParticipants: "Nombre total de participants"
      }
    },
    stroopTest: {
      title: "Test de Stroop",
      instructions: {
        part1: "Dans la première série (pratique), tous les mots sont affichés en noir.",
        part2: "Dans le deuxième tour, la couleur de la police ne correspondra pas au nom de la couleur écrite. Sélectionnez la tuile correspondante qui correspond à la couleur de la POLICE.",
        part3: "Par exemple, si vous voyez ROUGE en police bleue, sélectionnez la tuile \"bleue\" car la police est bleue.",
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
        continue: "Continuer le test",
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
        instructions: `
          Dans le premier tour, toutes les couleurs sont affichées en noir. Sélectionnez la tuile correspondante qui correspond au nom de la couleur écrite.<br/><br/>
          Par exemple, si vous voyez "<span style="color: black; font-weight: bold">JAUNE</span>", sélectionnez la tuile "jaune".
        `
      },
      secondPhase: {
        title: "Deuxième Phase - Série de test",
        instructions: `
          Dans le deuxième tour, la couleur de la police ne correspondra pas au nom de la couleur écrite. Sélectionnez la tuile correspondante qui correspond à la couleur de la POLICE.<br/><br/>
          Par exemple, si vous voyez <span style="color: blue">ROUGE</span>, sélectionnez la tuile "bleue" car la police est bleue.
        `
      },
    },
  }

export default frTranslations;

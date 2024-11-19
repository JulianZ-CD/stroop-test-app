const hiTranslations = {
  common: {
    signOut: "साइन आउट",
    backToHome: "होम पर वापस जाएं",
    startNewTest: "नया टेस्ट शुरू करें",
    greetings: "प्रिय प्रतिभागी: ",
  },
  home: {
    title: "स्ट्रूप टेस्ट ऐप",
    todoSection: {
      title: "कार्य सूची",
      newTodo: "+ नया कार्य",
    },
    stroopSection: {
      title: "स्ट्रूप टेस्ट",
      description: "स्ट्रूप टेस्ट के साथ अपनी संज्ञानात्मक क्षमताओं का परीक्षण करें",
      languageReminder: "कृपया अपनी मातृभाषा चुनें",
      startButton: "स्ट्रूप टेस्ट शुरू करें",
    },
    statsSection: {
      title: "आंकड़े",
      description: "टेस्ट परिणाम और आंकड़े देखें (लॉगिन आवश्यक है)",
      viewStats: "आंकड़े देखें",
      maleParticipants: "पुरुष प्रतिभागी",
      femaleParticipants: "महिला प्रतिभागी",
      totalParticipants: "कुल प्रतिभागी",
    },
  },
  stroopTest: {
    title: "स्ट्रूप टेस्ट",
    instructions: {
      part1: "पहले राउंड में, सभी रंग काले फॉन्ट में प्रदर्शित होते हैं। रंग के नाम से मेल खाने वाली टाइल का चयन करें।",
      part2: "दूसरे राउंड में, फॉन्ट का रंग लिखे गए रंग के नाम से मेल नहीं खाएगा। फॉन्ट के रंग से मेल खाने वाली टाइल का चयन करें।",
      part3: 'उदाहरण के लिए, यदि आप नीले फॉन्ट में लाल देखते हैं, तो "नीला" टाइल चुनें क्योंकि फॉन्ट नीला है।',
      totalTrials: "कुल प्रयास: {{total}} (प्रति श्रृंखला {{perSeries}})",
    },
    colors: {
      red: "लाल",
      yellow: "पीला",
      blue: "नीला",
      black: "काला",
      green: "हरा",
    },
    errors: {
      usernameRequired: "कृपया उपयोगकर्ता नाम दर्ज करें",
      usernameTaken: "यह उपयोगकर्ता नाम पहले से लिया जा चुका है",
      checkingUsername: "उपयोगकर्ता नाम की उपलब्धता की जांच में त्रुटि",
      musicRequired: "कृपया पहले पृष्ठभूमि संगीत चुनें",
      musicError: "संगीत चलाने में त्रुटि, कृपया पुनः प्रयास करें",
      genderRequired: "कृपया लिंग चुनें",
    },
    progress: {
      practiceRound: "अभ्यास राउंड",
      testRound: "टेस्ट राउंड",
      trial: "प्रयास {{current}} / {{total}}",
    },
    alerts: {
      tooManyErrors: "त्रुटि दर बहुत अधिक है, कृपया प्रश्नों का सावधानीपूर्वक उत्तर दें। टेस्ट को पुनः प्रारंभ किया जाएगा।",
    },
    results: {
      completed: "टेस्ट पूरा हुआ! बधाई हो!",
      practiceRound: "अभ्यास राउंड",
      testRound: "टेस्ट राउंड",
      overallPerformance: "समग्र प्रदर्शन",
      correctAnswers: "सही उत्तर",
      mistakes: "गलतियाँ",
      minResponseTime: "न्यूनतम प्रतिक्रिया समय",
      maxResponseTime: "अधिकतम प्रतिक्रिया समय",
      avgResponseTime: "औसत प्रतिक्रिया समय",
      totalAccuracy: "कुल सटीकता",
      totalTestingTime: "कुल परीक्षण समय",
    },
    buttons: {
      start: "टेस्ट शुरू करें",
      continue: "टेस्ट जारी रखें",
    },
    username: {
      title: "कृपया अपना उपयोगकर्ता नाम दर्ज करें",
      placeholders: "अपना पसंदीदा उपयोगकर्ता नाम दर्ज करें",
    },
    trialsInput: {
      label: "प्रति श्रृंखला प्रयासों की संख्या",
      placeholder: "प्रयासों की संख्या दर्ज करें (सुझाव: {{suggestions}})",
    },
    musicSelection: {
      title: "पृष्ठभूमि संगीत चुनें",
      mozart: "मोज़ार्ट",
      pop_music: "पॉप संगीत",
      no_music: "संगीत न चलाएं",
    },
    gender: {
      label: "कृपया अपना लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
    },
    firstPhase: {
      title: "पहला चरण - अभ्यास राउंड",
      instructions: `
        पहले राउंड में, सभी रंग काले फॉन्ट में प्रदर्शित होते हैं। लिखे गए रंग के नाम से मेल खाने वाली टाइल का चयन करें।<br/><br/>
        उदाहरण के लिए, यदि आप "<span style="color: black; font-weight: bold">पीला</span>" देखते हैं, तो "पीला" टाइल चुनें।
      `,
    },
    secondPhase: {
      title: "दूसरा चरण - टेस्ट राउंड",
      instructions: `
        दूसरे राउंड में, फॉन्ट का रंग लिखे गए रंग के नाम से मेल नहीं खाएगा। फॉन्ट के रंग से मेल खाने वाली टाइल का चयन करें।<br/><br/>
        उदाहरण के लिए, यदि आप <span style="color: blue">लाल</span> देखते हैं, तो "नीला" टाइल चुनें क्योंकि फॉन्ट नीला है।
      `,
    },
  },
};

export default hiTranslations; 
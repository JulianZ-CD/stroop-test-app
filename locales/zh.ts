const cnTranslations = {
  common: {
    signOut: "退出登录",
    backToHome: "返回首页",
    startNewTest: "开始新测试",
    greetings: "亲爱的参与者：",
  },
  home: {
    title: "斯特鲁普测试应用",
    todoSection: {
      title: "待办事项",
      newTodo: "+ 新建待办",
    },
    stroopSection: {
      title: "斯特鲁普测试",
      description: "通过斯特鲁普测试检测你的认知能力",
      startButton: "开始斯特鲁普测试",
    },
  },
  stroopTest: {
    title: "斯特鲁普测试",
    instructions: {
      part1: "在第一轮（练习轮）中，所有单词都显示为黑色。",
      part2: "在第二轮（测试轮）中，颜色将与单词不同。",
      part3: "请始终点击与单词含义相匹配的颜色。",
      totalTrials: "总试验次数：{{total}}（每轮{{perSeries}}次）",
    },
    colors: {
      red: "红色",
      yellow: "黄色",
      blue: "蓝色",
      black: "黑色",
      green: "绿色",
    },
    progress: {
      practiceRound: "练习轮",
      testRound: "测试轮",
      trial: "第 {{current}} / {{total}} 次",
    },
    results: {
      completed: "测试完成！",
      practiceRound: "练习轮",
      testRound: "测试轮",
      overallPerformance: "整体表现",
      correctAnswers: "正确答案",
      mistakes: "错误",
      minResponseTime: "最短响应时间",
      maxResponseTime: "最长响应时间",
      avgResponseTime: "平均响应时间",
      totalAccuracy: "总体准确率",
      totalTestingTime: "总测试时间",
    },
    buttons: {
      start: "开始测试",
    },
    errors: {
      usernameRequired: "请输入用户名",
      usernameTaken: "该用户名已被使用",
      checkingUsername: "检查用户名可用性时出错",
      musicRequired: "请先选择背景音乐",
      musicError: "播放音乐时出错，请重试",
      genderRequired: "请选择性别"
    },
    placeholders: {
      enterUsername: "请输入您的首选用户名",
    },
    alerts: {
      tooManyErrors: "错误率过高，请认真回答问题。测试将重新开始。",
    },
    musicSelection: {
      title: "选择背景音乐",
      mozart: "莫扎特",
      pop_music: "流行音乐",
      no_music: "不播放音乐"
    },
    gender: {
      label: "请选择您的性别",
      male: "男",
      female: "女"
    }
  },
};

export default cnTranslations;

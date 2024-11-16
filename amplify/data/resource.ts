import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  StroopTest: a
    .model({
      username: a.string(),
      gender: a.string(),
      selectedMusic: a.string(),
      firstTestTotalTime: a.float(),
      secondTestTotalTime: a.float(),
      allTestTotalTime: a.float(),
      timestamp: a.string(),
      rightFirstSeries: a.integer(),
      rightSecondSeries: a.integer(),
      mistakesFirstSeries: a.integer(),
      mistakesSecondSeries: a.integer(),
      averageResponsePercent: a.float(),
      minTimeFirstSeries: a.float(),
      minTimeSecondSeries: a.float(),
      maxTimeFirstSeries: a.float(),
      maxTimeSecondSeries: a.float(),
      averageResponseTimeFirstSeries: a.float(),
      averageResponseTimeSecondSeries: a.float(),
      avgResponseDelay: a.float(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['create', 'read']),
      allow.authenticated().to(['read', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

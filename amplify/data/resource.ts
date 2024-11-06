import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  StroopTest: a
    .model({
      userId: a.string(),
      username: a.string(),
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
      testingTime: a.float(),
      selectedMusic: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
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

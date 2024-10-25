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
      timestamp: a.string(),
      rightFirstSeries: a.integer(),
      rightSecondSeries: a.integer(),
      mistakesFirstSeries: a.integer(),
      mistakesSecondSeries: a.integer(),
      averageResponsePercent: a.float(),
      minTimeFirstSeries: a.integer(),
      minTimeSecondSeries: a.integer(),
      maxTimeFirstSeries: a.integer(),
      maxTimeSecondSeries: a.integer(),
      avgTimeFirstSeries: a.float(),
      avgTimeSecondSeries: a.float(),
      avgResponseDelay: a.float(),
      testingTime: a.float(),
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
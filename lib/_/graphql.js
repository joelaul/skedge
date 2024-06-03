const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    entry: {
      type: EntryType,
      description: "one tattle log entry",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (parent, args) =>
        await Entry.findOne({ id: args.id }).exec(),
    },
    entries: {
      type: new GraphQLList(EntryType),
      description: "a list of all tattle log entries",
      resolve: async () => await Entry.find().sort({ id: 1 }),
    },
  }),
});

const EntryType = new GraphQLObjectType({
  name: "Entry",
  description: "one tattle log entry",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    stats: { type: new GraphQLNonNull(StatsType) },
  }),
});

const StatsType = new GraphQLObjectType({
  name: "Stats",
  description: "contains a tattle log entry's stats",
  fields: () => ({
    atk: { type: new GraphQLNonNull(GraphQLInt) },
    def: { type: new GraphQLNonNull(GraphQLInt) },
    hp: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`

type Book {
    id: ID!
    title: String
    author: [Author]
}

type Author {
    id: ID!
    name: String
}

# ROOT TYPE

type Query {
    books: [Book]
    book (id: ID!): Book
    authors: [Author]
    author (id: ID!): Author
}

type Mutation {
    createAuthor(
        id: ID!,
        name: String
    ): Author
}
`;

const books = [
    {
        id: 1,
        title: 'The Awakening',
        authorId: 1
    },
    {
        id: 2,
        title: 'City of Glass',
        authorId: 2
    }
];

const authors = [
    {
        id: 1,
        name: 'SangNX'
    },
    {
        id: 2,
        name: 'SangNX123'
    }
];


const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
        book: (parent, args) => books.find(book => book.id.toString() === args.id),
        author: (parent, arg) => authors.find(author => author.id.toString() === arg.id)
    },

    Book: {
        author: (parent, args) => authors.find(author => author.id.toString() === parent.authorId)
    },

    ///MUTATION
    Mutation: {
        createAuthor: (parent, args) => args
    }
};



const {
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
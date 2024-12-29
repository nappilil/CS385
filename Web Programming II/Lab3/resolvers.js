import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import {
  authors as authorCollection,
  books as bookCollection,
  publishers as publisherCollection
} from './config/mongoCollections.js';
import validation from './helpers.js';
import redis from 'redis';
const client = redis.createClient();
await client.connect();
/* parentValue - References the type def that called it
    so for example when we execute numOfEmployees we can reference
    the parent's properties with the parentValue Paramater
*/

/* args - Used for passing any arguments in from the client
    for example, when we call 
    addEmployee(firstName: String!, lastName: String!, employerId: Int!): Employee
  	
*/

export const resolvers = {
  Query: {
    authors: async () => {
      const cached = await client.get("authors"); // check if in cache
      if (cached) {
        console.log("authors In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((object) => {
          object._id = new ObjectId(object._id);
          object.books.forEach((bookId) => {
            bookId = new ObjectId(bookId);
          });
        });
        return cache;
      }
      const authors = await authorCollection();
      const allAuthors = await authors.find({}).toArray();
      if (!allAuthors) {
        //Could not get list
        throw new GraphQLError(`Internal Server Error`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      await client.set('authors', JSON.stringify(allAuthors)); // send list to cache
      await client.expire("authors", 3600);
      console.log('authors Sent to the Cache');
      return allAuthors;
    },
    books: async () => {
      const cached = await client.get("books"); // check if in cache
      if (cached) {
        console.log("books In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((object) => {
          object._id = new ObjectId(object._id);
          object.authorId = new ObjectId(object.authorId);
          object.publisherId = new ObjectId(object.publisherId);
        })
        return cache;
      }
      const books = await bookCollection();
      const allBooks = await books.find({}).toArray();
      if (!allBooks) {
        //Could not get list
        throw new GraphQLError(`Internal Server Error`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      await client.set('books', JSON.stringify(allBooks), 'EX', 3600);
      console.log('books Sent to the Cache');
      return allBooks;
    },
    publishers: async () => {
      const cached = await client.get("publishers"); // check if in cache
      if (cached) {
        console.log("publishers In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((object) => {
          object._id = new ObjectId(object._id);
          object.books.forEach((bookId) => {
            bookId = new ObjectId(bookId);
          });
        });
        return cache;
      }
      const publishers = await publisherCollection();
      const allPublishers = await publishers.find({}).toArray();
      if (!allPublishers) {
        //Could not get list
        throw new GraphQLError(`Internal Server Error`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      await client.set("publishers", JSON.stringify(allPublishers), 'EX', 3600);
      console.log('publishers Sent to the Cache');
      return allPublishers;
    },
    getAuthorById: async (_, args) => {
      // error checking
      try {
        args._id = validation.checkId(args._id);
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CACHE
      const cached = await client.get(`author:${args._id}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache._id = new ObjectId(cache._id);
        cache.books.forEach((bookId) => {
          bookId = new ObjectId(bookId)
        })
        return cache;
      }
      // MONGODB
      const authors = await authorCollection();
      const author = await authors.findOne({ _id: new ObjectId(args._id) });
      if (!author) {
        //can't find the author
        throw new GraphQLError('Author Not Found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SEND TO CACHE
      await client.set(`author:${args._id}`, JSON.stringify(author), 'EX', 3600);
      console.log('Sent to the Cache');
      return author;
    },
    getBookById: async (_, args) => {
      // ERROR CHECKING
      try {
        args._id = validation.checkId(args._id);
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CACHE
      const cached = await client.get(`book:${args._id}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache._id = new ObjectId(cache._id);
        cache.authorId = new ObjectId(cache.authorId);
        cache.publisherId = new ObjectId(cache.publisherId);
        return cache;
      }
      // MONGODB
      const books = await bookCollection();
      const book = await books.findOne({ _id: new ObjectId(args._id) });
      if (!book) {
        //can't find the book
        throw new GraphQLError('Book Not Found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SEND to CACHE
      await client.set(`book:${args._id}`, JSON.stringify(book), 'EX', 3600);
      console.log('Sent to the Cache');
      return book;
    },
    getPublisherById: async (_, args) => {
      // ERROR CHECKING
      try {
        args._id = validation.checkId(args._id);
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CACHE
      const cached = await client.get(`publisher:${args._id}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache._id = new ObjectId(cache._id);
        cache.books.forEach((bookId) => {
          bookId = new ObjectId(bookId)
        })
        return cache;
      }
      // MONGODB
      const publishers = await publisherCollection();
      const publisher = await publishers.findOne({ _id: new ObjectId(args._id) });
      if (!publisher) {
        //can't find the publisher
        throw new GraphQLError('Publisher Not Found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      //SEND TO CACHE
      await client.set(`publisher:${args._id}`, JSON.stringify(publisher), 'EX', 3600);
      console.log('Sent to the Cache');
      return publisher;
    },
    getChaptersByBookId: async (_, args) => {
      // ERROR CHECKING
      try {
        args.bookId = validation.checkId(args.bookId);
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CACHE
      const cached = await client.get(`books:chapters:${args.bookId}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        return cache;
      }
      // MONGODB
      const books = await bookCollection();
      const book = await books.findOne({ _id: new ObjectId(args.bookId) });
      if (!book) {
        //Could not find book
        throw new GraphQLError(`Book Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SEND TO CACHE
      await client.set(`books:chapters:${args.bookId}`, JSON.stringify(book.chapters), 'EX', 3600);
      console.log('Sent to the Cache');
      return book.chapters;
    },
    booksByGenre: async (_, args) => {
      // ERROR CHECKING
      try {
        args.genre = validation.checkString(args.genre, "genre");
      } catch (e) {
        throw new GraphQLError('Invalid Genre', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CACHE
      const cached = await client.get(`genre:${args.genre}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((book) => {
          book._id = new ObjectId(book._id);
          book.authorId = new ObjectId(book.authorId);
          book.publisherId = new ObjectId(book.publisherId);
        })
        return cache;
      }
      // MONGODB
      const books = await bookCollection();
      const book = await books
        .find({ genre: args.genre })
        .toArray();
      if (!book) {
        //Could not get list
        throw new GraphQLError(`Genre Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SEND TO CACHE
      await client.set(`genre:${args.genre}`, JSON.stringify(book), 'EX', 3600);
      console.log('Sent to the Cache');
      return book;
    },
    publishersByEstablishedYear: async (_, args) => {
      // ERROR CHECKING
      try {
        validation.checkRange(args.min, args.max);
      } catch (e) {
        throw new GraphQLError('Invalid Min/Max', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CACHE
      const cached = await client.get(`foundedYear:${args.min}:${args.max}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((object) => {
          object._id = new ObjectId(object._id);
          object.books.forEach((bookId) => {
            bookId = new ObjectId(bookId);
          });
        });
        return cache;
      }
      // MONGO DB
      const publishers = await publisherCollection();
      const publisher = await publishers
        .find({
          establishedYear:
            { $gt: args.min - 1, $lt: args.max + 1 }
        })
        .toArray();
      if (!publisher) {
        //Could not get list
        throw new GraphQLError(`Publisher Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SET CACHE
      await client.set(`foundedYear:${args.min}:${args.max}`, JSON.stringify(publisher), 'EX', 3600);
      console.log('Sent to the Cache');
      return publisher;
    },
    searchAuthorByName: async (_, args) => {
      // ERROR CHECKING
      try {
        args.searchTerm = validation.checkString(args.searchTerm, "searchTerm");
      } catch (e) {
        throw new GraphQLError('Invalid searchTerm', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CHECK CACHE
      const cached = await client.get(`search:author:${args.searchTerm}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((object) => {
          object._id = new ObjectId(object._id);
          object.books.forEach((bookId) => {
            bookId = new ObjectId(bookId);
          });
        });
        return cache;
      }
      // MONGODB
      const authors = await authorCollection();
      const author = await authors
        .find({ name: { $regex: args.searchTerm, $options: 'i' } }) // https://www.geeksforgeeks.org/mongodb-regex/
        .toArray();
      if (!author) {
        //Could not get list
        throw new GraphQLError(`Author Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SET CACHE
      await client.set(`search:author:${args.searchTerm}`, JSON.stringify(author), 'EX', 3600);
      console.log('Sent to the Cache');
      return author;
    },
    searchBookByTitle: async (_, args) => {
      // ERROR CHECKING
      try {
        args.searchTerm = validation.checkString(args.searchTerm, "searchTerm");
      } catch (e) {
        throw new GraphQLError('Invalid searchTerm', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CHECK CACHE
      const cached = await client.get(`search:book:${args.searchTerm}`); // check if in cache
      if (cached) {
        console.log("In the cache");
        let cache = JSON.parse(cached);
        cache.forEach((object) => {
          object._id = new ObjectId(object._id);
          object.authorId = new ObjectId(object.authorId);
          object.publisherId = new ObjectId(object.publisherId);
        });
        return cache;
      }
      // MONGODB
      const books = await bookCollection();
      const book = await books
        .find({ title: { $regex: args.searchTerm, $options: 'i' } }) // https://www.geeksforgeeks.org/mongodb-regex/
        .toArray();
      if (!book) {
        //Could not get list
        throw new GraphQLError(`Book Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // SET CACHE
      await client.set(`search:book:${args.searchTerm}`, JSON.stringify(book), 'EX', 3600);
      console.log('Sent to the Cache');
      return book;
    }
  },
  Author: {
    numOfBooks: async (parentValue) => {
      //console.log(`parentValue in Author`, parentValue);
      const books = await bookCollection();
      const numOfBooks = await books.count({
        authorId: parentValue._id
      });
      return numOfBooks;
    },
    books: async (parentValue) => {
      const books = await bookCollection();
      const authored = await books
        .find({ authorId: parentValue._id })
        .toArray();
      return authored;
    }
  },
  Publisher: {
    numOfBooks: async (parentValue) => {
      const books = await bookCollection();
      const numOfBooks = await books.count({
        publisherId: parentValue._id
      });
      return numOfBooks;
    },
    books: async (parentValue) => {
      const books = await bookCollection();
      const published = await books
        .find({ publisherId: parentValue._id })
        .toArray();
      return published;
    }
  },
  Book: {
    author: async (parentValue) => {
      //console.log(`parentValue in Employee`, parentValue);
      const authors = await authorCollection();
      const author = await authors.findOne({ _id: parentValue.authorId });
      return author;
    },
    publisher: async (parentValue) => {
      //console.log(`parentValue in Employee`, parentValue);
      const publishers = await publisherCollection();
      const publisher = await publishers.findOne({ _id: parentValue.publisherId });
      return publisher;
    }
  },
  Mutation: {
    addAuthor: async (_, args) => {
      // ERROR CHECKING
      // NAME
      try {
        args.name = validation.checkString(args.name, "name");
      } catch (e) {
        throw new GraphQLError('Invalid Name', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // BIO
      let bio = undefined;
      if (args.bio) {
        try {
          args.bio = validation.checkString(args.bio, "bio");
        } catch (e) {
          console.log(e);
          throw new GraphQLError('Invalid Bio', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }
        bio = args.bio;
      }
      // DATE OF BIRTH
      try {
        args.dateOfBirth = validation.checkDate(args.dateOfBirth, "date of birth");
      } catch (e) {
        throw new GraphQLError('Invalid Date of Birth', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // MONGODB
      // NEW AUTHOR
      const authors = await authorCollection();
      const newAuthor = {
        _id: new ObjectId(),
        name: args.name,
        bio: bio,
        dateOfBirth: args.dateOfBirth,
        books: []
      };
      // INSERT
      let insertAuthor = await authors.insertOne(newAuthor);
      if (!insertAuthor.acknowledged || !insertAuthor.insertedId) {
        throw new GraphQLError(`Could not Add Author`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      // UPDATE CACHE
      let cached;
      cached = await client.get("authors");
      if (cached) await client.del("authors");
      const keys = await client.keys(`search:author:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const searchTerm = key.replace(`search:author:`, ''); // just grab the searchTerm
          cached = await client.get(`search:author:${searchTerm}`);
          if (cached) { // if search term contains from old name or new name must reset cache for both
            if (newAuthor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              await client.del(key); // clear the cache
            }
          }
        }
      }
      return newAuthor;
    },
    editAuthor: async (_, args) => {
      // ERROR CHECKING
      // ID
      try {
        args._id = validation.checkId(args._id, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // AUTHOR EXISTS
      const authors = await authorCollection();
      let newAuthor = await authors.findOne({ _id: new ObjectId(args._id) });
      if (!newAuthor) {
        throw new GraphQLError(`Author Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      let oldAuthorName = newAuthor.name;
      if (newAuthor) {
        // NAME
        if (args.name) {
          try {
            args.name = validation.checkString(args.name, "name");
          } catch (e) {
            throw new GraphQLError('Invalid Name', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newAuthor.name = args.name;
        }
        // BIO
        if (args.bio) {
          try {
            args.bio = validation.checkString(args.bio, "bio");
          } catch (e) {
            throw new GraphQLError('Invalid Bio', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newAuthor.bio = args.bio;
        }
        // DATE OF BIRTH
        if (args.dateOfBirth) {
          try {
            args.dateOfBirth = validation.checkDate(args.dateOfBirth, "date of birth");
          } catch (e) {
            throw new GraphQLError('Invalid Date Of Birth', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newAuthor.dateOfBirth = args.dateOfBirth;
        }
        // UPDATE
        await authors.updateOne({ _id: new ObjectId(args._id) }, { $set: newAuthor });
      } else {
        throw new GraphQLError(
          `Could not update author with _id of ${args._id}`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      // UPDATE CACHE
      let cached;
      cached = await client.get("authors");
      if (cached) await client.del("authors"); // clear the cache

      cached = await client.get(`author:${args._id}`);
      if (cached) await client.set(`author:${args._id}`, JSON.stringify(newAuthor), 'EX', 3600); // update the cache

      const keys = await client.keys(`search:author:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const searchTerm = key.replace(`search:author:`, ''); // just grab the searchTerm
          cached = await client.get(`search:author:${searchTerm}`);
          if (cached) { // if search term contains from old name or new name must reset cache for both
            if (newAuthor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              oldAuthorName.toLowerCase().includes(searchTerm.toLowerCase())) {
              await client.del(key); // clear the cache
            }
          }
        }
      }
      return newAuthor;
    },
    removeAuthor: async (_, args) => {
      // ERROR CHECKING
      let cached;
      try {
        args._id = validation.checkId(args._id, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // see if publisher exists
      const publishers = await publisherCollection();
      const books = await bookCollection();
      const authors = await authorCollection();
      const authorInfo = await authors.findOne({ _id: new ObjectId(args._id) });
      if (!authorInfo) {
        throw new GraphQLError(`Author Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // deletes all of publishers books
      // if the author has books
      if (authorInfo.books.length !== 0) {
        for (let i = 0; i < authorInfo.books.length; i++) {
          const bookId = authorInfo.books[i];
          let bookInfo = await books.findOne({ _id: bookId });
          if (!bookInfo) {
            throw new GraphQLError(`Book Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          // remove bookId from the publisher's books array for each book in author's books array
          const publisherId = bookInfo.publisherId;
          let publisher = await publishers.findOne({ _id: publisherId });
          if (!publisher) {
            throw new GraphQLError(`Publisher Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          // if the publisher has books
          if (publisher.books.length !== 0) {
            let updatedBookList = [];
            publisher.books.forEach((publisherBook) => {
              if (publisherBook.toString() !== bookId.toString()) {
                updatedBookList.push(publisherBook);
              }
            });
            publisher.books = updatedBookList;
            let updatedInfo = await publishers.findOneAndUpdate(
              { _id: publisher._id },
              { $set: publisher },
              { returnDocument: 'after' }
            );
            // if publisher cannot be updated method should throw
            if (!updatedInfo) throw 'Error: Could not update Publisher successfully';
            /**
                        // UPDATE PUBLISHER CACHE
                        // PUBLISHERS
                        cached = await client.get("publishers");
                        if (cached) await client.del(`publishers`);
            
                        // PUBLISHERBYID
                        cached = await client.get(`publisher:${publisher._id.toString()}`);
                        if (cached) await client.set(`publisher:${publisher._id.toString()}`, JSON.stringify(publisher), 'EX', 3600);
            
                        // PUBLISHERBYESTABLISHEDYEAR
                        const keys = await client.keys(`foundedYear:*:*`); // get all searchTerm keys
                        if (keys.length !== 0) {
                          for (let i = 0; i <= keys.length - 1; i++) {
                            const key = keys[i];
                            const min = key.split(`:`)[1]; // just grab the range
                            const max = key.split(`:`)[2];
                            cached = await client.get(`foundedYear:${Number(min)}:${Number(max)}`); // check if in cache
                            if (cached) {
                              if (publisher.establishedYear >= Number(min) && publisher.establishedYear <= Number(max)) {
                                await client.del(`foundedYear:${Number(min)}:${Number(max)}`);
                              }
                            }
                          }
                        }
                          */
          }
          // delete each book in author's books array
          const deletedBook = await books.findOneAndDelete({ _id: bookId });
          if (!deletedBook) {
            throw new GraphQLError(
              `Could not delete book with _id of ${bookId}`,
              {
                extensions: { code: 'NOT_FOUND' }
              }
            );
          }
          // UPDATE BOOK CACHE
          //BOOKS
          cached = await client.get(`books`);
          if (cached) await client.del(`books`);
          // GETBOOKBYID
          cached = await client.get(`book:${bookId.toString()}`);
          if (cached) await client.del(`book:${bookId.toString()}`); // clear the cache
          // CHAPTERSBYBOOKID
          cached = await client.get(`books:chapters:${bookId.toString()}`);
          if (cached) await client.del(`books:chapters:${bookId.toString()}`); // clear the cache
          // BOOKSBYGENRE
          cached = await client.get(`genre:${bookInfo.genre}`);
          if (cached) await client.del(`genre:${bookInfo.genre}`); // clear cache of book genres
          // SEARCHBOOKBYTITLE
          const keys = await client.keys(`search:book:*`); // get all searchTerm keys
          if (keys.length !== 0) {
            for (let i = 0; i <= keys.length - 1; i++) {
              const key = keys[i];
              const searchTerm = key.replace(`search:book:`, ''); // just grab the searchTerm
              cached = await client.get(`search:book:${searchTerm}`);
              if (cached) {
                if (bookInfo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  await client.del(key); // clear the cache
                }
              }
            }
          }
        }
        // UPDATE BOOK CACHE IF NEEDED
        cached = await client.get("books");
        if (cached) await client.del("books"); // clear the cache        
      }
      // finally delete the author
      const deletedAuthor = await authors.findOneAndDelete({ _id: new ObjectId(args._id) });
      if (!deletedAuthor) {
        throw new GraphQLError(
          `Could not delete author with _id of ${args._id}`,
          {
            extensions: { code: 'NOT_FOUND' }
          }
        );
      }
      // UPDATE AUTHOR CACHES
      cached = await client.get("authors");
      if (cached) await client.del("authors"); // clear the cache

      cached = await client.get(`author:${args._id}`);
      if (cached) await client.del(`author:${args._id}`); // clear the cache

      const keys = await client.keys(`search:author:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const searchTerm = key.replace(`search:author:`, ''); // just grab the searchTerm
          cached = await client.get(`search:author:${searchTerm}`);
          if (cached) {
            if (authorInfo.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              await client.del(key); // clear the cache
            }
          }
        }
      }
      return deletedAuthor;
    },
    addPublisher: async (_, args) => {
      // ERROR CHECKING
      // NAME
      try {
        args.name = validation.checkString(args.name, "name");
      } catch (e) {
        throw new GraphQLError('Invalid Name', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // ESTABLISHED YEAR
      try {
        args.establishedYear = validation.checkYear(args.establishedYear, "established year");
      } catch (e) {
        throw new GraphQLError('Invalid Established Year', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // LOCATION
      try {
        args.location = validation.checkString(args.location, "location");
      } catch (e) {
        throw new GraphQLError('Invalid Location', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // NEW PUBLISHER
      const newPublisher = {
        _id: new ObjectId(),
        name: args.name,
        establishedYear: args.establishedYear,
        location: args.location,
        books: []
      };
      // MONGODB
      // INSERT
      const publishers = await publisherCollection();
      let insertPublisher = await publishers.insertOne(newPublisher);
      if (!insertPublisher.acknowledged || !insertPublisher.insertedId) {
        throw new GraphQLError(`Could not Add Publisher`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      // UPDATE CACHING
      let cached;
      // PUBLISHERS
      cached = await client.get("publishers");
      if (cached) await client.del("publishers");

      // GETPUBLISHERBYESTABLISHEDYEAR
      const keys = await client.keys(`foundedYear:*:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const min = key.split(`:`)[1]; // just grab the range
          const max = key.split(`:`)[2];
          cached = await client.get(`foundedYear:${Number(min)}:${Number(max)}`); // check if in cache
          if (cached) {
            if (newPublisher.establishedYear >= Number(min) && newPublisher.establishedYear <= Number(max)) {
              await client.del(`foundedYear:${Number(min)}:${Number(max)}`);
            }
          }
        }
      }
      return newPublisher;
    },
    editPublisher: async (_, args) => {
      // ERROR CHECKING
      try {
        args._id = validation.checkId(args._id, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // MONGODB
      // CHECK IF PUBLISHER EXISTS
      const publishers = await publisherCollection();
      let newPublisher = await publishers.findOne({ _id: new ObjectId(args._id) });
      console.log(newPublisher);
      let oldEstablishedYear = newPublisher.establishedYear;
      if (newPublisher) {
        // NAME
        if (args.name) {
          try {
            args.name = validation.checkString(args.name, "name");
          } catch (e) {
            throw new GraphQLError('Invalid Name', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newPublisher.name = args.name;
        }
        // ESTABLISHED YEAR
        if (args.establishedYear) {
          try {
            args.establishedYear = validation.checkYear(args.establishedYear, "established year");
          } catch (e) {
            throw new GraphQLError('Invalid Established Year', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newPublisher.establishedYear = args.establishedYear;
        }
        // LOCATION
        if (args.location) {
          try {
            args.location = validation.checkString(args.location, "location");
          } catch (e) {
            throw new GraphQLError('Invalid Location', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newPublisher.location = args.location;
        }
        // UPDATE
        await publishers.updateOne({ _id: new ObjectId(args._id) }, { $set: newPublisher });
      } else {
        throw new GraphQLError(
          `Could not update publisher with _id of ${args._id}`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      // UPDATE CACHE
      let cached;
      // PUBLISHERS
      cached = await client.get("publishers");
      if (cached) await client.del("publishers"); // clear the cache

      // GETPUBLISHERBYID
      cached = await client.get(`publisher:${args._id}`);
      if (cached) await client.set(`publisher:${args._id}`, JSON.stringify(newPublisher), 'EX', 3600); // update the cache

      //GETPUBLISHERBYESTABLISHEDYEAR
      const keys = await client.keys(`foundedYear:*:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const min = key.split(`:`)[1]; // just grab the range
          const max = key.split(`:`)[2];
          cached = await client.get(`foundedYear:${Number(min)}:${Number(max)}`); // check if in cache
          if (cached) {
            if (newPublisher.establishedYear >= Number(min) && newPublisher.establishedYear <= Number(max) ||
            oldEstablishedYear >= Number(min) && oldEstablishedYear <= Number(max)) {
              await client.del(`foundedYear:${Number(min)}:${Number(max)}`);
            }
          }
        }
      }
      return newPublisher;
    },
    removePublisher: async (_, args) => {
      let cached;
      // ERROR CHEKCING
      try {
        args._id = validation.checkId(args._id, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // see if publisher exists
      const publishers = await publisherCollection();
      const books = await bookCollection();
      const authors = await authorCollection();
      const publisherInfo = await publishers.findOne({ _id: new ObjectId(args._id) });
      if (!publisherInfo) {
        throw new GraphQLError(`Publisher Not Found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      // deletes all of publishers books
      if (publisherInfo.books.length !== 0) {
        for (let i = 0; i < publisherInfo.books.length; i++) {
          const bookId = publisherInfo.books[i];
          const bookInfo = await books.findOne({ _id: bookId });
          if (!bookInfo) {
            throw new GraphQLError(`Book Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          // remove bookId from the author's books array for each book in publisher's books array
          const authorId = bookInfo.authorId;
          let author = await authors.findOne({ _id: authorId });
          if (!author) {
            throw new GraphQLError(`Author Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          let updatedBookList = [];
          author.books.forEach((authorBook) => {
            if (authorBook.toString() !== bookId.toString()) {
              updatedBookList.push(authorBook);
            }
          });
          author.books = updatedBookList;
          let updatedInfo = await authors.findOneAndUpdate(
            { _id: author._id },
            { $set: author },
            { returnDocument: 'after' }
          );
          // if author cannot be updated method should throw
          if (!updatedInfo) throw 'Error: Could not update Author successfully';

          // UPDATE AUTHOR CACHE
          // AUTHORS
          cached = await client.get(`authors`);
          if (cached) await client.del(`authors`);

          // GETAUTHORBYID
          cached = await client.get(`author:${author._id.toString()}`);
          if (cached) await client.set(`author:${author._id.toString()}`, JSON.stringify(author), 'EX', 3600);

          // SEARCHAUTHORBYNAME
          let keys = await client.keys(`search:author:*`); // get all searchTerm keys
          if (keys.length !== 0) {
            for (let i = 0; i <= keys.length - 1; i++) {
              const key = keys[i];
              const searchTerm = key.replace(`search:author:`, ''); // just grab the searchTerm
              cached = await client.get(`search:author:${searchTerm}`);
              if (cached) {
                if (author.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  await client.del(key); // clear the cache
                }
              }
            }
          }
          // delete each book in publisher's books array
          const deletedBook = await books.findOneAndDelete({ _id: bookId });
          if (!deletedBook) {
            throw new GraphQLError(
              `Could not delete book with _id of ${bookId}`,
              {
                extensions: { code: 'NOT_FOUND' }
              }
            );
          }
          // UPDATE BOOK CACHE
          // BOOKS
          cached = await client.get(`books`);
          if (cached) await client.del(`books`);
          // GETBOOKBYID
          cached = await client.get(`book:${bookId.toString()}`);
          if (cached) await client.del(`book:${bookId.toString()}`); // clear the cache
          // GETCHAPTERSBYBOOKID
          cached = await client.get(`books:chapters:${bookId.toString()}`);
          if (cached) await client.del(`books:chapters:${bookId.toString()}`); // clear the cache
          // GETBOOKBYGENRE
          cached = await client.get(`genre:${bookInfo.genre}`);
          if (cached) await client.del(`genre:${bookInfo.genre}`); // clear cache of book genres
          // SEARCHBOOKBYTITLE
          keys = await client.keys(`search:book:*`); // get all searchTerm keys
          if (keys.length !== 0) {
            for (let i = 0; i <= keys.length - 1; i++) {
              const key = keys[i];
              const searchTerm = key.replace(`search:book:`, ''); // just grab the searchTerm
              cached = await client.get(`search:book:${searchTerm}`);
              if (cached) {
                if (bookInfo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  await client.del(key); // clear the cache
                }
              }
            }
          }
        }
        // UPDATE BOOK CACHE IF NEEDED
        cached = await client.get("books");
        if (cached) await client.del("books"); // clear the cache    
      }
      // finally delete the publisher
      const deletedPublisher = await publishers.findOneAndDelete({ _id: new ObjectId(args._id) });
      if (!deletedPublisher) {
        throw new GraphQLError(
          `Could not delete publisher with _id of ${args._id}`,
          {
            extensions: { code: 'NOT_FOUND' }
          }
        );
      }
      // UPDATE PUBLISHER CACHE
      cached = await client.del("publishers");
      if (cached) await client.del("publishers"); // clear the cache

      // GETPUBLISHERBYID
      cached = await client.del(`publisher:${args._id}`);
      if (cached) await client.del(`publisher:${args._id}`); // clear the cache

      //GETPUBLISHERBYESTABLISHEDYEAR
      const keys = await client.keys(`foundedYear:*:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const min = key.split(`:`)[1]; // just grab the range
          const max = key.split(`:`)[2];
          cached = await client.get(`foundedYear:${Number(min)}:${Number(max)}`); // check if in cache
          if (cached) {
            if (publisherInfo.establishedYear >= Number(min) && publisherInfo.establishedYear <= Number(max)) {
              await client.del(`foundedYear:${Number(min)}:${Number(max)}`);
            }
          }
        }
      }
      return deletedPublisher;
    },
    addBook: async (_, args) => {
      // ERROR CHECKING
      // AUTHOR ID
      try {
        args.authorId = validation.checkId(args.authorId, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid authorId', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // PUBLISHER ID
      try {
        args.publisherId = validation.checkId(args.publisherId, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid publisherId', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // TITLE
      try {
        args.title = validation.checkString(args.title, "title");
      } catch (e) {
        throw new GraphQLError('Invalid title', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // PUBLICATION DATE
      try {
        args.publicationDate = validation.checkDate(args.publicationDate, "publicationDate");
      } catch (e) {
        console.log(e);
        throw new GraphQLError('Invalid publicationDate', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      // GENRE
      try {
        args.genre = validation.checkString(args.genre, "genre");
      } catch (e) {
        throw new GraphQLError('Invalid genre', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CHAPTERS
      try {
        args.chapters = validation.checkChapters(args.chapters, "chapters");
      } catch (e) {
        console.log(e);
        throw new GraphQLError('Invalid Chapters', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // MONGODB
      //make sure they entered a valid author ID
      const books = await bookCollection();
      const authors = await authorCollection();
      const publishers = await publisherCollection();
      let author = await authors.findOne({ _id: new ObjectId(args.authorId) });
      if (!author) {
        throw new GraphQLError(
          `Could not Find Author with an ID of ${args.authorId}`,
          {
            extensions: { code: 'BAD_USER_INPUT' }
          }
        );
      }
      let publisher = await publishers.findOne({ _id: new ObjectId(args.publisherId) });
      if (!publisher) {
        throw new GraphQLError(
          `Could not Find Publisher with an ID of ${args.publisherId}`,
          {
            extensions: { code: 'BAD_USER_INPUT' }
          }
        );
      }
      // NEWBOOK
      const newBook = {
        _id: new ObjectId(),
        title: args.title,
        publicationDate: args.publicationDate,
        genre: args.genre,
        authorId: new ObjectId(args.authorId),
        publisherId: new ObjectId(args.publisherId),
        chapters: args.chapters
      };
      author.books.push(newBook._id);
      let updatedInfo = await authors.findOneAndUpdate(
        { _id: new ObjectId(args.authorId) },
        { $set: author },
        { returnDocument: 'after' }
      );
      // if author cannot be updated method should throw
      if (!updatedInfo) throw 'Error: Could not update Author successfully';
      publisher.books.push(newBook._id);
      updatedInfo = await publishers.findOneAndUpdate(
        { _id: new ObjectId(args.publisherId) },
        { $set: publisher },
        { returnDocument: 'after' }
      );
      // if publisher cannot be updated method should throw
      if (!updatedInfo) throw 'Error: Could not update Publisher successfully';
      // insert book
      let insertedBooks = await books.insertOne(newBook);
      if (!insertedBooks.acknowledged || !insertedBooks.insertedId) {
        throw new GraphQLError(`Could not Add Book`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      // UPDATE CACHE
      // BOOKS
      let cached;
      cached = await client.get(`books`);
      if (cached) await client.del(`books`);
      // GETBOOKBYGENRE
      cached = await client.get(`genre:${newBook.genre}`);
      if (cached) await client.del(`genre:${newBook.genre}`); // clear cache of book genres
      // SEARCHBOOKBYTITLE
      const keys = await client.keys(`search:book:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const searchTerm = key.replace(`search:book:`, ''); // just grab the searchTerm
          cached = await client.get(`search:book:${searchTerm}`);
          if (cached) {
            if (newBook.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              await client.del(key); // clear the cache
            }
          }
        }
      }
      return newBook;
    },
    editBook: async (_, args) => {
      // ERROR CHECKING
      // ID
      try {
        args._id = validation.checkId(args._id, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      // CHECK IF BOOK EXISTS
      const books = await bookCollection();
      let newBook = await books.findOne({ _id: new ObjectId(args._id) });
      let oldGenre = newBook.genre;
      let oldTitle = newBook.title;
      if (newBook) {
        // TITLE
        if (args.title) {
          try {
            args.title = validation.checkString(args.title, "title");
          } catch (e) {
            throw new GraphQLError('Invalid title', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newBook.title = args.title;
        }
        // PUBLICATION DATE
        if (args.publicationDate) {
          try {
            args.publicationDate = validation.checkDate(args.publicationDate, "publicationDate");
          } catch (e) {
            throw new GraphQLError('Invalid publicationDate', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newBook.publicationDate = args.publicationDate;
        } // GENRE
        if (args.genre) {
          try {
            args.genre = validation.checkString(args.genre, "genre");
          } catch (e) {
            throw new GraphQLError('Invalid genre', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newBook.genre = args.genre;
        }
        // CHAPTERS
        if (args.chapters) {
          try {
            args.chapters = validation.checkChapters(args.chapters, "chapters");
          } catch (e) {
            throw new GraphQLError('Invalid chapters', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          newBook.chapters = args.chapters;
        }
        // AUTHOR ID
        if (args.authorId) {
          const authors = await authorCollection();
          try {
            args.authorId = validation.checkId(args.authorId, "authorId");
          } catch (e) {
            throw new GraphQLError('Invalid authorId', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          let oldAuthor = await authors.findOne({ _id: new ObjectId(newBook.authorId) });
          if (!oldAuthor) {
            throw new GraphQLError(`Author Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          // gets rid of book from old author
          let updatedBookList = [];
          oldAuthor.books.forEach((bookId) => {
            if (bookId.toString() !== args._id.toString()) {
              updatedBookList.push(bookId);
            }
          });
          oldAuthor.books = updatedBookList;
          let updatedInfo = await authors.findOneAndUpdate(
            { _id: oldAuthor._id },
            { $set: oldAuthor },
            { returnDocument: 'after' }
          );
          // if author cannot be updated method should throw
          if (!updatedInfo) {
            throw new GraphQLError(`Author Could Not Be Updated`, {
              extensions: { code: 'INTERNAL__SERVER_ERROR' }
            });
          }
          let newAuthor = await authors.findOne({ _id: new ObjectId(args.authorId) });
          if (!newAuthor) {
            throw new GraphQLError(`Author Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          newAuthor.books.push(new ObjectId(args._id)) // add book to updated author id
          updatedInfo = await authors.findOneAndUpdate(
            { _id: newAuthor._id },
            { $set: newAuthor },
            { returnDocument: 'after' }
          )
          // if author cannot be updated method should throw
          if (!updatedInfo) {
            throw new GraphQLError(`Author Could Not Be Updated`, {
              extensions: { code: 'INTERNAL_SERVER_ERROR' }
            });
          }
          newBook.authorId = new ObjectId(args.authorId); // update book with the new author id provided
        }
        // PUBLISHER ID
        if (args.publisherId) {
          try {
            args.publisherId = validation.checkId(args.publisherId, "publisherId");
          } catch (e) {
            throw new GraphQLError('Invalid publisherId', {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          const publishers = await publisherCollection();
          let newPublisher = await publishers.findOne({ _id: new ObjectId(args.publisherId) });
          if (!newPublisher) {
            throw new GraphQLError(`Could not Find Publisher with an ID of ${args.publisherId}`, {
              extensions: { code: 'BAD_USER_INPUT' }
            })
          }
          let oldPublisher = await publishers.findOne({ _id: new ObjectId(newBook.publisherId) });
          if (!oldPublisher) {
            throw new GraphQLError(`Publisher Not Found`, {
              extensions: { code: 'NOT_FOUND' }
            });
          }
          // gets rid of book from old publisher
          let updatedBookList = [];
          oldPublisher.books.forEach((bookId) => {
            if (bookId.toString() !== args._id.toString()) {
              updatedBookList.push(bookId);
            }
          });
          oldPublisher.books = updatedBookList;
          let updatedInfo = await publishers.findOneAndUpdate(
            { _id: oldPublisher._id },
            { $set: oldPublisher },
            { returnDocument: 'after' }
          );
          // if publisher cannot be updated method should throw
          if (!updatedInfo) {
            throw new GraphQLError(`Publisher Could Not Be Updated`, {
              extensions: { code: 'INTERNAL_SERVER_ERROR' }
            });
          }
          newPublisher.books.push(new ObjectId(args._id)) // add book to new publisher
          updatedInfo = await publishers.findOneAndUpdate(
            { _id: newPublisher._id },
            { $set: newPublisher },
            { returnDocument: 'after' }
          )
          // if publisher cannot be updated method should throw
          if (!updatedInfo) {
            throw new GraphQLError(`Publisher Could Not Be Updated`, {
              extensions: { code: 'INTERNAL_SERVER_ERROR' }
            });
          }
          newBook.publisherId = new ObjectId(args.publisherId); // update book with the new publisher id provided
        }
      } else {
        throw new GraphQLError(`Could not find book with _id of ${args._id}`, {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      const updatedBook = await books.updateOne({ _id: new ObjectId(args._id) }, { $set: newBook });
      if (!updatedBook) {
        throw new GraphQLError(`Could not update book with _id of ${args._id}`, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
      // UPDATE CACHE
      // BOOKS
      let cached;
      cached = await client.get(`books`);
      if (cached) await client.del(`books`);
      // GETBOOKBYID
      cached = await client.get(`book:${args._id}`);
      if (cached) await client.set(`book:${args._id}`, JSON.stringify(newBook), 'EX', 3600); // update the cache
      // GETCHAPTERSBYBOOKID
      cached = await client.get(`books:chapters:${args._id}`);
      if (cached) await client.del(`books:chapters:${args._id}`); // update the cache
      // GETBOOKBYGENRE FOR OLD & NEW
      // NEW
      cached = await client.get(`genre:${newBook.genre}`);
      if (cached) await client.del(`genre:${newBook.genre}`); // clear cache of book genres
      // OLD
      cached = await client.get(`genre:${oldGenre}`);
      if (cached) await client.del(`genre:${oldGenre}`); // clear cache of book genres
      // SEARCHBOOKBYTITLE
      const keys = await client.keys(`search:book:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const searchTerm = key.replace(`search:book:`, ''); // just grab the searchTerm
          cached = await client.get(`search:book:${searchTerm}`);
          if (cached) {
            if (newBook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              oldTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
              await client.del(key); // clear the cache
            }
          }
        }
      }
      return newBook;
    },
    removeBook: async (_, args) => {
      const books = await bookCollection();
      const authors = await authorCollection();
      const publishers = await publisherCollection();
      try {
        args._id = validation.checkId(args._id, "ID");
      } catch (e) {
        throw new GraphQLError('Invalid ID', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      let book = await books.findOne({ _id: new ObjectId(args._id) });
      if (!book) {
        throw new GraphQLError(
          `Could not Find Book with an ID of ${args._id}`,
          {
            extensions: { code: 'BAD_USER_INPUT' }
          }
        );
      }
      let author = await authors.findOne({ _id: book.authorId });
      if (!author) {
        throw new GraphQLError(
          `Could not Find Author with an ID of ${args.authorId}`,
          {
            extensions: { code: 'NOT_FOUND' }
          }
        );
      }
      let publisher = await publishers.findOne({ _id: book.publisherId });
      if (!publisher) {
        throw new GraphQLError(
          `Could not Find Publisher with an ID of ${args.publisherId}`,
          {
            extensions: { code: 'NOT_FOUND' }
          }
        );
      }
      // delete the book from the author and publisher books array
      let updatedBookList = [];
      author.books.forEach((bookId) => {
        if (bookId.toString() !== args._id) {
          updatedBookList.push(bookId);
        }
      });
      author.books = updatedBookList;
      let updatedInfo = await authors.findOneAndUpdate(
        { _id: author._id },
        { $set: author },
        { returnDocument: 'after' }
      );
      // if author cannot be updated method should throw
      if (!updatedInfo) throw 'Error: Could not update Author successfully';

      updatedBookList = [];
      publisher.books.forEach((bookId) => {
        if (bookId.toString() !== args._id) {
          updatedBookList.push(bookId);
        }
      });
      publisher.books = updatedBookList;
      updatedInfo = await publishers.findOneAndUpdate(
        { _id: publisher._id },
        { $set: publisher },
        { returnDocument: 'after' }
      );
      // if publisher cannot be updated method should throw
      if (!updatedInfo) throw 'Error: Could not update Publisher successfully';
      const deletedBook = await books.findOneAndDelete({ _id: new ObjectId(args._id) });
      if (!deletedBook) {
        throw new GraphQLError(
          `Could not delete book with _id of ${args._id}`,
          {
            extensions: { code: 'NOT_FOUND' }
          }
        );
      }
      // UPDATE CACHE
      // BOOKS
      let cached;
      cached = await client.get(`books`);
      if (cached) await client.del(`books`);
      // GETBOOKBYID
      cached = await client.get(`book:${args._id}`);
      if (cached) await client.del(`book:${args._id}`); // update the cache
      // GETCHAPTERSBYBOOKID
      cached = await client.get(`books:chapters:${args._id}`);
      if (cached) await client.del(`books:chapters:${args._id}`); // update the cache
      // GETBOOKBYGENRE
      cached = await client.get(`genre:${book.genre}`);
      if (cached) await client.del(`genre:${book.genre}`); // clear cache of book genres
      // SEARCHBOOKBYTITLE
      const keys = await client.keys(`search:book:*`); // get all searchTerm keys
      if (keys.length !== 0) {
        for (let i = 0; i <= keys.length - 1; i++) {
          const key = keys[i];
          const searchTerm = key.replace(`search:book:`, ''); // just grab the searchTerm
          cached = await client.get(`search:book:${searchTerm}`);
          if (cached) {
            if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              await client.del(key); // clear the cache
            }
          }
        }
      }
      return deletedBook;
    }
  }
};

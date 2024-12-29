// This data file should export all functions using the ES6 standard as shown in the lecture code
import { movies } from '../config/mongoCollections.js'; // import collection
import { ObjectId } from 'mongodb';
import validation from '../helpers.js'

const exportedMethods = {
    /** 
     * GET api/movies : shows a list of movies by default
     * shows first 20 movies in the collection. If a querystring links to an exernal site variable ?skip=n is provided you will skip the first n movies. 
     * If a querystring variable ?take=y is provided, it will show y number of movies. By default, the route will show up to 20 movies; at most, it will show 100 movies
     * */
    async create(
        title,      // string
        cast,       // [{firstName: string, lastName: string}, ... ]
        info,       // {director: string, yearReleased: number}
        plot,       // string
        rating     // number
        // comments [objects]
    ) {
        // All fields need to be supplied
        if (title === undefined ||
            cast === undefined ||
            info === undefined ||
            plot === undefined ||
            rating === undefined) {
            throw `Error: All fields need to be supplied`
        }
        // validation
        title = validation.checkString(title, 'Title');
        if (title.length > 150) throw `Error: 'Title' must be less than 150 chars`;
        cast = validation.checkCast(cast, 'Cast');
        info = validation.checkInfo(info, 'Info');
        plot = validation.checkString(plot, 'Plot');
        if (plot.length > 500) throw `Error: 'Plot' must be less than 500 chars`;
        rating = validation.checkRating(rating, 'Rating');

        let comments = [];
        // make new movie
        const newMovie = {
            title,
            cast,
            info,
            plot,
            rating,
            comments
        };

        const movieCollection = await movies();
        const insertInfo = await movieCollection.insertOne(newMovie);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Error: Could not add movie';
        newMovie._id = newMovie._id.toString(); // convert to string
        return newMovie // return result
    },

    async getAll() {
        const movieCollection = await movies();
        let movieList = await movieCollection.find({}).toArray();
        if (!movieList) throw `Could not get all movies`
        movieList = movieList.map((element) => {
            element._id = element._id.toString() // convert all element ids to strings
            return element;
        });
        return movieList;
    },

    async get(movieId) {
        // error checking
        movieId = validation.checkId(movieId, 'Id URL Param');
        // convert id to ObjectId before querying to DB
        const movieCollection = await movies();
        const movie = await movieCollection.findOne({ _id: new ObjectId(movieId) });
        // if no movie exists with that id the method should throw
        if (movie === null) throw 'Error: No movie with that id';
        else {
            movie._id = movie._id.toString();
            return movie; // return movie
        }
    },

    async update(
        movieId,
        title,
        cast,
        info,
        plot,
        rating
    ) {
        // All fields need to be supplied
        if (movieId === undefined ||
            title === undefined ||
            cast === undefined ||
            info === undefined ||
            plot === undefined ||
            rating === undefined) {
            throw `Error: All fields need to be supplied`
        }
        // validation
        movieId = validation.checkId(movieId, 'Id');
        title = validation.checkString(title, 'Title');
        if (title.length > 150) throw `Error: 'Title' must be less than 150 chars`;
        plot = validation.checkString(plot, 'Plot');
        if (plot.length > 500) throw `Error: 'Plot' must be less than 500 chars`;
        cast = validation.checkCast(cast, 'Cast');
        info = validation.checkInfo(info, 'Info');
        rating = validation.checkRating(rating, 'Rating');

        const movieCollection = await movies();
        const movie = await movieCollection.findOne({ _id: new ObjectId(movieId) });
        // if no movie exists with that id the method should throw
        if (movie === null) throw 'Error: No movie with that id';
        const updatedMovie = {
            title: title,
            cast: cast,
            info: info,
            plot: plot,
            rating: rating,
        }
        const updatedInfo = await movieCollection.findOneAndUpdate(
            { _id: new ObjectId(movieId) },
            { $set: updatedMovie },
            { returnDocument: 'after' }
        );
        // if movie cannot be updated method should throw
        if (!updatedInfo) throw 'Error: Could not update movie successfully';
        updatedInfo._id = updatedInfo._id.toString();
        // if success return enitre movie object after it is updated
        return updatedInfo;
    },

    async createComment(
        movieId,
        name,
        comment,
    ) {
        // All fields need to be supplied
        if (movieId === undefined ||
            name === undefined ||
            comment === undefined) {
            throw `Error: All fields need to be supplied`
        }
        // validation
        movieId = validation.checkId(movieId, 'Movie Id');
        name = validation.checkString(name, 'Name');
        name = validation.checkName(name, 'Name');
        comment = validation.checkString(comment, 'Comment');
        if (comment > 500) throw `Error: comment must be less than 500 chars`;

        const movieCollection = await movies();
        const movie = await movieCollection.findOne({ _id: new ObjectId(movieId) });
        // if no movie exists with that id the method should throw
        if (movie === null) throw 'Error: No movie with that id';
        // make new comment
        const newComment = {
            _id: new ObjectId(), // make new objectId
            name: name,
            comment: comment
        };
        // update new movie
        let updatedInfo = await movieCollection.findOneAndUpdate(
            { _id: new ObjectId(movieId) },
            { $push: { comments: newComment } }, // add new comment to list
            { returnDocument: 'after' }
        );
        // if movie cannot be updated method should throw
        if (!updatedInfo) throw 'Error: Could not update movie successfully';
        updatedInfo._id = updatedInfo._id.toString();
        return updatedInfo // return result
    },

    async getAllComments(movieId) {
        // Error Checking
        movieId = validation.checkId(movieId, "Id URL Param");
        // get all reviews for that movie
        const movieCollection = await movies();
        const allComments = await movieCollection
            .find({ _id: new ObjectId(movieId) })
            .project({ _id: 0, comments: 1 }) // only include comments
            .toArray();
        // an array of comment objects
        if (allComments === null) throw 'Error: No movie with that id';
        return allComments[0].comments;
    },

    async getComment(commentId) {
        // Error Checking
        commentId = validation.checkId(commentId, "Id URL Param");
        // get all the comments
        const movieCollection = await movies();
        const foundComment = await movieCollection.findOne(
            { 'comments._id': new ObjectId(commentId) },
            { projection: { _id: 0, 'comments.$': 1 } }
        );
        if (!foundComment) throw 'Comment Not found';
        return foundComment.comments[0];
    },

    async deleteComment(movieId, commentId) {
        movieId = validation.checkId(movieId, "Id URL Param");
        commentId = validation.checkId(commentId, 'Id URL Param');
        let movie = this.get(movieId);
        // if no movie exists with that id the method should throw
        if (movie === null) throw 'Error: No movie with that id';
        const oldComment = await this.getComment(commentId); // get old comment
        const movieCollection = await movies();
        const deletedInfo = await movieCollection.findOneAndUpdate(
            { comments: oldComment },
            { $pull: { comments: oldComment } },
            { returnDocument: 'after' }
        );
        // if movie cannot be updated method should throw
        if (!deletedInfo) throw 'Error: Could not update movie successfully';
        const updatedMovie = this.get(movieId);
        return updatedMovie;
    }

};
export default exportedMethods;

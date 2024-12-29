import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import movies from '../data/movies.js';

const db = await dbConnection();
await db.dropDatabase();

let movie = undefined, comment = undefined;

// seed all the movies
for (let i = 1; i <= 200; i++) {
    try {
        movie = await movies.create(
            "Movie " + i.toString(),
            [{ firstName: "Movie", lastName: "Star" }, { firstName: "Cast", lastName: "Member" }],
            { director: "Director Name", yearReleased: 2002 },
            "laksjdhfalweuhf lakj fhlkwejhflkjd hflkj hflksjhdf lksjhfdlkjashdlfhweiuf lksjdhflks jdlkjshlkfjhsldkj flksjhflkdjnclkjdhf lkj hflkaj dlksj hflkaj fdslkadsjhf lksj hfdlksjhfdlkjshfd",
            4.5
        )
    } catch (e) {
        console.log(e);
    }

    // Adds comments to each movie
    try {
        await movies.createComment(
            movie._id,
            "Commenter Name",
            "This is my first comment for the movie!"
        )
    } catch (e) {
        console.log(e);
    }

    try {
        await movies.createComment(
            movie._id,
            "Commenter Name",
            "This is my 2nd comment for the movie!"
        )
    } catch (e) {
        console.log(e);
    }
    try {
        await movies.createComment(
            movie._id,
            "Commenter Name",
            "This is my 3rd comment for the movie!"
        )
    } catch (e) {
        console.log(e);
    }
    let allComments = await movies.getAllComments(movie._id.toString()); // array of objects
    comment = await movies.getComment(allComments[0]._id.toString()); // returns one comment
    try {
        await movies.deleteComment(
            movie._id.toString(),
            comment._id.toString(),
        )
    } catch (e) {
        console.log(e);
    }
}

// Should update the last movie in the database
// http://localhost:3000/api/movies/?skip=199
try {
    await movies.update(
        movie._id,
        "Movaur Two Hundaur",
        [{ firstName: "Actaur", lastName: "One" }, { firstName: "Actaur", lastName: "Two" }],
        { director: "Directaur Name", yearReleased: 1999 },
        "laksjdhfalweuhf lakj fhlkwejhflkjd hflkj hflksjhdf lksjhfdlkjashdlfhweiuf lksjdhflks jdlkjshlkfjhsldkj flksjhflkdjnclkjdhf lkj hflkaj dlksj hflkaj fdslkadsjhf lksj hfdlksjhfdlkjshfd",
        3.9
    )
} catch (e) {
    console.log(e);
}
// some error checking
try {
    await movies.create(
        "",
        [{ firstName: "Movie", lastName: "Star" }, { firstName: "Cast", lastName: "Member" }],
        { director: "Director Name", yearReleased: 2002 },
        "laksjdhfalweuhf lakj fhlkwejhflkjd hflkj hflksjhdf lksjhfdlkjashdlfhweiuf lksjdhflks jdlkjshlkfjhsldkj flksjhflkdjnclkjdhf lkj hflkaj dlksj hflkaj fdslkadsjhf lksj hfdlksjhfdlkjshfd",
        4.5
    )
} catch (e) {
    console.log(e);
}

try {
    await movies.create(
        "Movie",
        [{ firstName: "Movie", lastName: "Star" }, { firstName: "Cast", lastName: "Member" }],
        { director: "Director Name", yearReleased: 2002 },
        "laksjdhfalweuhf lakj fhlkwejhflkjd hflkj hflksjhdf lksjhfdlkjashdlfhweiuf lksjdhflks jdlkjshlkfjhsldkj flksjhflkdjnclkjdhf lkj hflkaj dlksj hflkaj fdslkadsjhf lksj hfdlksjhfdlkjshfd",
        -1
    )
} catch (e) {
    console.log(e);
}
try {
    await movies.create(
        "Movie",
        [{ firstName: "Movie", lastName: "Star" }, { firstName: "Cast", lastName: "Member" }],
        { director: "Director Name", yearReleased: 2002 },
        4.9
    )
} catch (e) {
    console.log(e);
}
try {
    await movies.create(
        "Movie",
        [{ firstName: "Movie" }, { firstName: "Cast", lastName: "Member" }],
        { director: "Director Name", yearReleased: 2002 },
        "laksjdhfalweuhf lakj fhlkwejhflkjd hflkj hflksjhdf lksjhfdlkjashdlfhweiuf lksjdhflks jdlkjshlkfjhsldkj flksjhflkdjnclkjdhf lkj hflkaj dlksj hflkaj fdslkadsjhf lksj hfdlksjhfdlkjshfd",
        4.9
    )
} catch (e) {
    console.log(e);
}
try {
    await movies.create(
        "Movie",
        [{ firstName: "Movie", lastName:"Star" }, { firstName: "Cast", lastName: "Member" }],
        { director: "Director Name" },
        "laksjdhfalweuhf lakj fhlkwejhflkjd hflkj hflksjhdf lksjhfdlkjashdlfhweiuf lksjdhflks jdlkjshlkfjhsldkj flksjhflkdjnclkjdhf lkj hflkaj dlksj hflkaj fdslkadsjhf lksj hfdlksjhfdlkjshfd",
        4.9
    )
} catch (e) {
    console.log(e);
}
try {
    await movies.createComment(
        movie._id,
        true,
        "This is my 3rd comment for the movie!"
    )
} catch (e) {
    console.log(e);
}
try {
    await movies.createComment(
        "0918324980173209847",
        "Commenter",
        "This is my 3rd comment for the movie!"
    )
} catch (e) {
    console.log(e);
}
console.log();




console.log('Done seeding database');

await closeConnection();
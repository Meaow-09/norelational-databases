const {MongoClient} = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
    await client.connect();
    const users = client.db("blog_db").collection("users");

    await users.deleteMany({});

    // TODO 1: insert a user with an embedded address object.
    // The address must have at least a city and a country field.
    await users.insertOne({
        name: "Fendy",
        email: "fendy@example.com",
        address: {
            city: "New York",
            country: "America"
        }
    })
    // TODO 2: insert a user with a skills array containing at least 3 items.
    await users.insertOne({
        name: "Gabriel",
        email: "gabriel@example.com",
        skills: ["Baking", "Cooking", "Drawing"]
    })
    // TODO 3: use insertMany to insert at least 5 users in a single call.
    // Requirements:
    //   - At least 2 users must have address.country set to "France"
    //   - At least 2 users must have a skills array with at least 1 item
    await users.insertMany([
        {
            name: "Henry",
            email: "henry@example.com",
            address: {
                city: "Nice",
                country: "France"
            }
        },
        {
            name: "Jose",
            email: "jose@example.com",
            address: {
                city: "Provence",
                country: "France"
            }
        },
        {
            name: "Klein",
            email: "klein@example.com",
            address: {
                city: "Lyon",
                country: "France"
            },
            skills: ["Programming"]
        },
        {
            name: "Leo",
            email: "leo@example.com",
            skills: ["Driving", "Horsing", "Hiking"]
        },
        {
            name: "Marie",
            email: "marie@example.com",
            skills: ["Marketing", "Photography", "Networking"]
        }
    ])
    // TODO 4: retrieve all documents and log each user's name.
    await users.find({name: 1})
    // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
    await users.find({"address.city": "Paris"})
    // TODO 6: find all users whose address.country is "France" and log their names.
    await users.find({name: 1, "address.country": "France"})
    // TODO 7: find all users who have a skills field and log their names.
    await users.find({name: 1, skills: {$exists: true}})

    await client.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

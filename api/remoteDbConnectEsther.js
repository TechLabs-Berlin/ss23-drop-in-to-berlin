if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// setup of the MongoDbAtlas
const dbURL = process.env.DB_URL;
//mongodb://127.0.0.1:27017/friends-shelves
mongoose.connect(`${dbURL}FriendsShelves`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
});
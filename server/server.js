const express = require('express');
const cors = require("cors");
const path = require("path");

// Load env Variables.
require('dotenv').config();

// Constants
const PORT = process.env.PORT;

// Setup
const app = express();

const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.use(
    cors({
        origin: "*", // Allow only your frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);



app.use(express.json()); // Middleware

// Data base connection.
const connectDb = require("./config/db");
connectDb(); // Stablish database connection.

// Global Variables
const USER_ROUTER = require("./routes/userRouter");
const MOVIE_ROUTER = require("./routes/movieRoute");
const THEATER_ROUTER = require("./routes/theatreRoute");
const SHOW_ROUTER = require("./routes/showRoute");
const BOOKING_ROUTER = require("./routes/bookingRoute");

// Routes.
app.use("/api/users", USER_ROUTER);
app.use("/api/movies", MOVIE_ROUTER);
app.use("/api/theatres", THEATER_ROUTER);
app.use("/api/shows", SHOW_ROUTER);
app.use("/api/bookings", BOOKING_ROUTER);

app.get("/", (req, res) =>
    res.status(201).send("Welcome to the home page.")
);

app.use((req, res) =>
    res.status(404).json({ message: "page not found" })
);


app.listen(PORT, () => {
    console.log(`server is running on port`);
});





// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3001", // Replace with your frontend's URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Allow cookies to be sent
// }));


// // Database Connection
// mongoose
//     .connect("mongodb://localhost:27017/event", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Database connected"))
//     .catch((err) => console.error("Database connection error:", err));

// // Schemas
// const eventSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     start_date_time: { type: String, required: true },
//     end_date_time: { type: String, required: true },
//     type: { type: String, required: true },
// });

// const userSchema = mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const Events = mongoose.model("Events", eventSchema);
// const User = mongoose.model("User", userSchema);

// // Routes
// app.post("/post", async (req, res) => {
//     try {
//         const { name, description, start_date_time, end_date_time, type } = req.body;
//         const event = await Events.create({ name, description, start_date_time, end_date_time, type });
//         res.status(200).json({ message: "Event created successfully", event });
//     } catch (err) {
//         res.status(400).json({ message: "Error occurred", error: err.message });
//     }
// });

// app.get("/read", async (req, res) => {
//     try {
//         const events = await Events.find();
//         res.status(200).json({ message: "Events retrieved successfully", events });
//     } catch (err) {
//         res.status(400).json({ message: "Error occurred", error: err.message });
//     }
// });

// app.post("/register", async (req, res) => {
//     try {
//         const { username, email, password, confirm_password } = req.body;

//         if (password !== confirm_password) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already in use" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ username, email, password: hashedPassword });

//         res.status(201).json({ message: "User registered successfully", user });
//     } catch (err) {
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// });

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid password" });
//         }

//         res.status(200).json({ message: "Login successful", user });
//     } catch (err) {
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// });

// // Server
// const PORT = process.env.port || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent
}));

// Database Connection
mongoose
    .connect("mongodb://localhost:27017/event", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

// Schemas
const eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    start_date_time: { type: String, required: true },
    end_date_time: { type: String, required: true },
    type: { type: String, required: true },
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Events = mongoose.model("Events", eventSchema);
const User = mongoose.model("User", userSchema);

// Routes
app.post("/post", async (req, res) => {
    try {
        const { name, description, start_date_time, end_date_time, type } = req.body;
        const event = await Events.create({ name, description, start_date_time, end_date_time, type });
        res.status(200).json({ message: "Event created successfully", event });
    } catch (err) {
        res.status(400).json({ message: "Error occurred", error: err.message });
    }
});

app.get("/read", async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json({ message: "Events retrieved successfully", events });
    } catch (err) {
        res.status(400).json({ message: "Error occurred", error: err.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// DELETE Route for deleting an event by ID
app.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Events.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

// Server
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

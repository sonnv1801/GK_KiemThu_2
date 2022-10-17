require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ktpm2:ktpm2@ktpm2.l26xums.mongodb.net/?retryWrites=true&w=majority`,
      {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
// app.use("/api/user", userRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));

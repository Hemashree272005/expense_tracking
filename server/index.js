import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import authRouter from "./routes/auth.route.js";
import budgetRouter from "./routes/budget.route.js";
import expenseRouter from "./routes/expense.route.js";
import statsRouter from "./routes/stats.route.js";

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/stats", statsRouter);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Expense Tracker Base Route",
    client: process.env.CLIENT_URL,
  });
});

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).send({ success: false, message: "Server Error" });
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { API_V1 } from "./constants.js";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(
  cors({
    origin: "http://localhost:8001",
    credentials: true,
    methods: "GET, POST, DELETE, PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Importing routes
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

// For processiong Frontend Pages
app.use(`/`, userRouter);

// For processing backend queries
app.use(`${API_V1}/users`, userRouter);
app.use(`${API_V1}/videos`, videoRouter); // fix this confusion

export { app };

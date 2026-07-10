

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const paymentRoutes = require("./routes/Payment");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const chatbotRoutes = require("./routes/chatbot");

const PORT = process.env.PORT || 4000;



database.connect();
 

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://museum-online-ticket-chatbot-phi.vercel.app",
  ...(process.env.FRONTEND_URL || "").split(",").map((origin) => origin.trim()).filter(Boolean),
];

app.use(
  cors({
    origin(origin, callback) {
      // Requests from tools such as Postman have no Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

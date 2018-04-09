import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

module.exports = app => {
    app.use(bodyParser.json());
    app.set("port", 3000);
    app.use(app.auth.initialize());
    app.use(helmet());
    app.use(cors({
		origin: ["http://localhost:3001"], //THE ADDRESS OF THE CLIENT YOU ALLOW TO ACCESS THE API
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"]
	}));
};
import { Router } from "express";

import messageRoutes from "../modules/message/message.route";
import chatRoute from "../modules/chat/chat.route";

const router: Router = Router();

// API routes
router.get("/api", (req, res) => {
	res.json({
		message: "Website Builder API",
		endpoints: {
			messages: "/v1/messages",
			chat: "/v1/chat",
		},
	});
});

// Routes
router.use("/v1/chat", chatRoute);
router.use("/v1/message", messageRoutes);

export default router;

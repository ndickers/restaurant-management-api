"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoute = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const authorize_1 = require("../middleware/authorize");
const comment_controller_1 = require("./comment.controller");
exports.commentRoute = new hono_1.Hono();
const inputComment = zod_1.z.object({
    user_id: zod_1.z.number(),
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number(),
    comment_text: zod_1.z.string(),
    is_complaint: zod_1.z.boolean(),
    is_praise: zod_1.z.boolean(),
    street_address_2: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string(),
});
exports.commentRoute.delete("/comments/:id", authorize_1.adminAuth, comment_controller_1.removeComment);
exports.commentRoute.get("/comments", authorize_1.authorizeAll, comment_controller_1.getAllComment);
exports.commentRoute.get("/comments/:id", authorize_1.authorizeAll, comment_controller_1.getOneComment);
exports.commentRoute.patch("/comments/:id", authorize_1.authorizeAll, comment_controller_1.updateComment);
exports.commentRoute.post("/comments", (0, zod_validator_1.zValidator)("json", inputComment, (result, c) => {
    if (result.success) {
        return c.json({ message: "Succesfully added" });
    }
    else {
        return c.json({ message: "Confirm your data types" });
    }
}), authorize_1.authorizeAll, comment_controller_1.addComment);

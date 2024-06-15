"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeComment = exports.updateComment = exports.addComment = exports.getOneComment = exports.getAllComment = void 0;
const comment_service_1 = require("./comment.service");
async function getAllComment(c) {
    const response = await (0, comment_service_1.serveAllComment)();
    try {
        if (response === null) {
            return c.json({ message: "No registered comment" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: "Server error, try again later" }, 404);
    }
}
exports.getAllComment = getAllComment;
async function getOneComment(c) {
    const id = c.req.param("id");
    const response = await (0, comment_service_1.fetchOneComment)(id);
    try {
        if (response === null) {
            return c.json({ message: "Comment is not found" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
exports.getOneComment = getOneComment;
async function addComment(c) {
    const commentText = await c.req.json();
    const response = await (0, comment_service_1.serveComment)(commentText);
    try {
        if (response) {
            return c.json({ message: "Comment added successfully" });
        }
        else {
            return c.json({ message: "Unable to add comment" });
        }
    }
    catch (error) {
        return c.json(error);
    }
}
exports.addComment = addComment;
async function updateComment(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
    const response = await (0, comment_service_1.serveCommentUpdate)(id, updateContent);
    try {
        if (response === null) {
            return c.json({
                message: "You trying to update a comment that does not exist",
            });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
exports.updateComment = updateComment;
async function removeComment(c) {
    const id = c.req.param("id");
    const response = await (0, comment_service_1.deleteComment)(id);
    try {
        if (response !== null) {
            return c.json({ message: "Comment deleted successfully" });
        }
        else {
            return c.json({ message: "You cannot delete non existing comment" });
        }
    }
    catch (error) {
        return c.json(error, 404);
    }
}
exports.removeComment = removeComment;

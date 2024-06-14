import { serveAllComment, serveComment, fetchOneComment, serveCommentUpdate, deleteComment, } from "./comment.service.ts";
export async function getAllComment(c) {
    const response = await serveAllComment();
    try {
        if (response.length === 0) {
            return c.json({ message: "No registered comment" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: "Server error, try again later" }, 404);
    }
}
export async function getOneComment(c) {
    const id = c.req.param("id");
    const response = await fetchOneComment(id);
    try {
        if (response.length === 0) {
            return c.json({ message: "Comment is not found" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
export async function addComment(c) {
    const commentText = await c.req.json("");
    const response = await serveComment(commentText);
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
export async function updateComment(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
    const response = await serveCommentUpdate(id, updateContent);
    try {
        if (response.length === 0) {
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
export async function removeComment(c) {
    const id = c.req.param("id");
    const response = await deleteComment(id);
    try {
        if (response.length !== 0) {
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
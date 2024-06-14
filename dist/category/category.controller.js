import { serveAllCategory, serveCategory, fetchOneCategory, serveCategoryUpdate, deleteCategory, } from "./category.service.ts";
export async function getAllCategory(c) {
    const response = await serveAllCategory();
    try {
        if (response.length === 0) {
            return c.json({ message: "No category found" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
export async function getOneCategory(c) {
    const id = c.req.param("id");
    const response = await fetchOneCategory(id);
    try {
        if (response.length === 0) {
            return c.json({ message: "No category found" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
export async function addCategory(c) {
    const newDetails = await c.req.json("");
    const response = await serveCategory(newDetails);
    try {
        if (response) {
            return c.json({
                message: "Category added successfully",
                content: response,
            });
        }
        else {
            return c.json({ message: "Unable to create new category" });
        }
    }
    catch (error) {
        return c.json(error);
    }
}
export async function updateCategory(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
    const response = await serveCategoryUpdate(id, updateContent);
    try {
        if (response.length === 0) {
            return c.json({
                message: "The category you are trying to update, does not exist",
            });
        }
        return c.json({
            message: "Category updated successfully",
            content: response,
        });
    }
    catch (error) {
        return c.json(error);
    }
}
export async function removeCategory(c) {
    const id = c.req.param("id");
    const response = await deleteCategory(id);
    try {
        if (response.length !== 0) {
            return c.json({ message: "Category deleted successfully" });
        }
        else {
            return c.json({ message: "You cannot delete non existing category" });
        }
    }
    catch (error) {
        return c.json(error, 404);
    }
}

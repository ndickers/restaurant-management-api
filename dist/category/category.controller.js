"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.updateCategory = exports.addCategory = exports.getOneCategory = exports.getAllCategory = void 0;
const category_service_1 = require("./category.service");
async function getAllCategory(c) {
    const response = await (0, category_service_1.serveAllCategory)();
    try {
        if (response === null) {
            return c.json({ message: "No category found" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllCategory = getAllCategory;
async function getOneCategory(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, category_service_1.fetchOneCategory)(id);
    try {
        if (response === null) {
            return c.json({ message: "No category found" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneCategory = getOneCategory;
async function addCategory(c) {
    const newDetails = await c.req.json();
    const response = await (0, category_service_1.serveCategory)(newDetails);
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
        return c.json({ message: error });
    }
}
exports.addCategory = addCategory;
async function updateCategory(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, category_service_1.serveCategoryUpdate)(id, updateContent);
    try {
        if (response === null) {
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
        return c.json({ message: error });
    }
}
exports.updateCategory = updateCategory;
async function removeCategory(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, category_service_1.deleteCategory)(id);
    try {
        if (response !== null) {
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
exports.removeCategory = removeCategory;

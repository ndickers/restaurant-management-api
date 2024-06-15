import { serveAllMenuItem, serveMenuItem, fetchOneMenuItem, serveMenuItemUpdate, deleteMenuItem, } from "./menu_item.service";
export async function getAllMenuItem(c) {
    const response = await serveAllMenuItem();
    try {
        if (response.length === 0) {
            return c.json({ message: "No registered menu item" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function getOneMenuItem(c) {
    const id = Number(c.req.param("id"));
    const response = await fetchOneMenuItem(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "The list menu does not exist" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function addMenuItem(c) {
    const newItemMenu = await c.req.json();
    const response = await serveMenuItem(newItemMenu);
    try {
        if (response) {
            return c.json({
                message: "Menu item added  succesfully",
                content: response,
            });
        }
        else {
            return c.json({ message: "List item was not successfully added" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function updateMenuItem(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await serveMenuItemUpdate(id, updateContent);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "You cannot update non existsing menu item" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function removeMenuItem(c) {
    const id = Number(c.req.param("id"));
    const response = await deleteMenuItem(id);
    try {
        if (Object.keys(response).length !== 0) {
            return c.json({ message: "Menu item does not exist" }, 404);
        }
        else {
            return c.json({ message: "Menu item is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}

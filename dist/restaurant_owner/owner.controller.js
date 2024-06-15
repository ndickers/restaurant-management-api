import { serveAllOwner, serveOwner, fetchOneOwner, serveOwnerUpdate, deleteResOwner, } from "./owner.service";
export async function getAllOwner(c) {
    const response = await serveAllOwner();
    try {
        if (response === null) {
            return c.json({
                message: "Currently there is no registered restaurant owner",
            });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function getOneOwner(c) {
    const id = Number(c.req.param("id"));
    const response = await fetchOneOwner(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "The owner does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function addOwner(c) {
    const newOwner = await c.req.json();
    const response = await serveOwner(newOwner);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Unable to create new owner" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function updateOwner(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await serveOwnerUpdate(id, updateContent);
    try {
        if (response === null) {
            return c.json({ message: "Unable to update restaurant owner" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function deleteOwner(c) {
    const id = Number(c.req.param("id"));
    const response = await deleteResOwner(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Restaurant owner does not exist" }, 404);
        }
        else {
            return c.json({ message: "Restaurant owner is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}

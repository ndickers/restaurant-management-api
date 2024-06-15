import { serveAllStatusCatalog, serveStatusCatalog, fetchOneStatusCatalog, serveStatusCatalogUpdate, deleteStatusCatalog, } from "./status_cat.service";
export async function getAllStatusCatalog(c) {
    const response = await serveAllStatusCatalog();
    try {
        if (response.length === 0) {
            return c.json({ message: "No status catalog currently" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function getOneStatusCatalog(c) {
    const id = Number(c.req.param("id"));
    const response = await fetchOneStatusCatalog(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Status catalog does not exists" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function addStatusCatalog(c) {
    const newCatalog = await c.req.json();
    const response = await serveStatusCatalog(newCatalog);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Status catalogue cannot be added" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function updateStatusCatalog(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await serveStatusCatalogUpdate(id, updateContent);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Status catalogue did not update" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
export async function deleteCatalogStatus(c) {
    const id = Number(c.req.param("id"));
    const response = await deleteStatusCatalog(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Status catalog does not exist" }, 404);
        }
        else {
            return c.json({ message: "Status catalog is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}

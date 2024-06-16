"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCatalogStatus = exports.updateStatusCatalog = exports.addStatusCatalog = exports.getOneStatusCatalog = exports.getAllStatusCatalog = void 0;
const status_cat_service_1 = require("./status_cat.service");
async function getAllStatusCatalog(c) {
    const response = await (0, status_cat_service_1.serveAllStatusCatalog)();
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
exports.getAllStatusCatalog = getAllStatusCatalog;
async function getOneStatusCatalog(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, status_cat_service_1.fetchOneStatusCatalog)(id);
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
exports.getOneStatusCatalog = getOneStatusCatalog;
async function addStatusCatalog(c) {
    const newCatalog = await c.req.json();
    const response = await (0, status_cat_service_1.serveStatusCatalog)(newCatalog);
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
exports.addStatusCatalog = addStatusCatalog;
async function updateStatusCatalog(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, status_cat_service_1.serveStatusCatalogUpdate)(id, updateContent);
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
exports.updateStatusCatalog = updateStatusCatalog;
async function deleteCatalogStatus(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, status_cat_service_1.deleteStatusCatalog)(id);
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
exports.deleteCatalogStatus = deleteCatalogStatus;

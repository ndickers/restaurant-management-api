"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeState = exports.updateState = exports.addState = exports.getOneState = exports.getAllState = void 0;
const state_service_1 = require("./state.service");
async function getAllState(c) {
    const response = await (0, state_service_1.serveAllState)();
    try {
        if (response.length === 0) {
            return c.json({ message: "The is no state currently" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getAllState = getAllState;
async function getOneState(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, state_service_1.fetchOneState)(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "The state does not exist" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.getOneState = getOneState;
async function addState(c) {
    const newState = await c.req.json();
    const response = await (0, state_service_1.serveState)(newState);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Unable to add state" }, 404);
        }
        else {
            return c.json(response);
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.addState = addState;
async function updateState(c) {
    const id = Number(c.req.param("id"));
    const updateContent = await c.req.json();
    const response = await (0, state_service_1.serveStateUpdate)(id, updateContent);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "Unable to update the state" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.updateState = updateState;
async function removeState(c) {
    const id = Number(c.req.param("id"));
    const response = await (0, state_service_1.deleteState)(id);
    try {
        if (Object.keys(response).length === 0) {
            return c.json({ message: "State does not exist" }, 404);
        }
        else {
            return c.json({ message: "State is deleted succesfully" });
        }
    }
    catch (error) {
        return c.json({ message: error });
    }
}
exports.removeState = removeState;

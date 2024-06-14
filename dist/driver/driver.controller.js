import { serverAllDriver, addDriver, fetchOneDriver, deleteDriver, serveUpdate, } from "./driver.service";
export async function getDrivers(c) {
    const response = await serverAllDriver();
    try {
        if (response.length === 0) {
            return c.json({ message: "Currently there is no registered driver" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(response, 404);
    }
}
export async function getOneDriver(c) {
    const id = c.req.param("id");
    const response = await fetchOneDriver(id);
    try {
        if (response.length === 0) {
            return c.json({ message: "The driver is not registered" }, 404);
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error, 404);
    }
}
export async function postDriver(c) {
    const driver = await c.req.json();
    const response = await addDriver(driver);
    try {
        if (response.length === 0) {
            return c.json({ message: "Driver was unable to be added" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
export async function updateDriver(c) {
    const id = c.req.param("id");
    const updateContent = await c.req.json("");
    const response = await serveUpdate(id, updateContent);
    try {
        if (response.length === 0) {
            return c.json({ message: "You cannot update non existing driver" });
        }
        return c.json(response);
    }
    catch (error) {
        return c.json(error);
    }
}
export async function removeDriver(c) {
    const id = c.req.param("id");
    const response = await deleteDriver(id);
    try {
        if (response.length !== 0) {
            return c.json({ message: "Driver deleted successfully" });
        }
        else {
            return c.json({
                message: "You are trying to delete non existing driver",
            });
        }
    }
    catch (error) {
        return c.json(error, 404);
    }
}

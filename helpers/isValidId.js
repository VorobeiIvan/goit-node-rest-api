import mongoose from "mongoose";
import HttpError from "./HttpError.js";

export const isValidId = (req, _, next) => {
        const {id} = req.params
        const isValid = mongoose.isValidObjectId(id)
        if (!isValid) {
            next(HttpError(400, 'invalid object id'));
        }
        next();
};
import { Schema } from "express-validator";

const createSchema: Schema = {
    callsign: {
        isString: { options: [] },
        trim: { options: [] },
        isLength: { options: { min: 1, max: 10 } },
        toUpperCase: { options: [] },
        isAlphanumeric: { options: [] }
    },
    name: {
        isString: { options: [] },
        trim: { options: [] },
        isLength: { options: { min: 1, max: 50 } }
    },
    email: {
        isString: { options: [] },
        trim: { options: [] },
        isEmail: { options: [] },
        toLowerCase: { options: [] }
    },
    password: {
        isString: { options: [] },
        trim: { options: [] },
        isLength: { options: { min: 8, max: 64 } },
        isStrongPassword: { options: [{ minLength: 8 }] }
    }
};
export default createSchema;

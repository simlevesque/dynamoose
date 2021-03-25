import CustomError = require("./Error");
import {Model} from "./Model";
import {Item} from "./Item";
import Internal = require("./Internal");
const {internalProperties} = Internal.General;

let aliases: {[name: string]: string} = {};
let models: {[name: string]: Model<Item>} = {};

const returnObject = <T extends Item>(input: Model<T> | string): Model<T> | never => {
	if (input instanceof Model) {
		models[input[internalProperties].originalName] = input;
		aliases[input[internalProperties].name] = input[internalProperties].originalName;
		return input;
	} else if (typeof input === "string") {
		const alias = aliases[input];
		const result = models[input] || models[alias];
		return result as Model<T>;
	} else {
		throw new CustomError.InvalidParameter("You must pass in a Model or table name as a string.");
	}
};
returnObject.clear = (): void => {
	models = {};
	aliases = {};
};

export = returnObject;

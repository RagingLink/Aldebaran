import { CommandMetadata } from "../interfaces/Command.js";
import Client from "../structures/Client.js";
import C from "./Command.js";

export default abstract class Command extends C {
	constructor(client: Client, metadata: CommandMetadata) {
		super(client, {
			perms: metadata.perms === undefined
				? { aldebaran: ["ADMINISTRATOR"] }
				: { ...metadata.perms },
			...metadata
		});
		this.category = "Developer";
		this.color = "#e74c3c";
	}
}

import { Command } from "../../groups/FunCommand.js";
import MessageContext from "../../structures/aldebaran/MessageContext.js";
import AldebaranClient from "../../structures/djs/Client.js";

export default class KaomojiCommand extends Command {
	constructor(client: AldebaranClient) {
		super(client, { description: "Displays a random kaomoji" });
	}

	// eslint-disable-next-line class-methods-use-this
	async run(ctx: MessageContext) {
		ctx.message.delete().catch(() => {});
		ctx.reply((await ctx.client.nekoslife.sfw.catText()).cat);
	}
};
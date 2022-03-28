import { MessageEmbed } from "discord.js";
import { Command } from "../../groups/SettingsCommand.js";
import AldebaranClient from "../../structures/djs/Client.js";
import MessageContext from "../../structures/contexts/MessageContext.js";
import { SocialProfileProperty } from "../../utils/Constants.js";

export default class SetprofileCommand extends Command {
	constructor(client: AldebaranClient) {
		super(client, {
			description: "Changes your profile information",
			example: "aboutme My name is Xxx_FortnitePro_xxX!",
			args: {
				section: {
					as: "string",
					desc: "The name of the profile's section you want to edit"
				},
				input: {
					as: "string",
					desc: "What you want to write in the section you just selected"
				}
			}
		});
	}

	// eslint-disable-next-line class-methods-use-this
	async run(ctx: MessageContext) {
		const args = ctx.args as { section: string, input: string };
		const profile = await ctx.author.profile();
		const sectionMatches = {
			profilepicturelink: "profilePictureLink",
			favoritegames: "favoriteGames",
			profilecolor: "profileColor",
			favoritemusic: "favoriteMusic",
			sociallinks: "socialLinks",
			zodiacname: "zodiacName",
			flavortext: "flavorText"
		};

		const section = args.section.toLowerCase();
		const profiletarget = (sectionMatches[section as keyof typeof sectionMatches]
			|| section) as SocialProfileProperty;

		profile.changeProperty(profiletarget, args.input).then(() => {
			ctx.reply(`Your ${profiletarget} has been updated to \`${args.input}\`.`);
		}).catch(() => {
			const error = new MessageEmbed()
				.setAuthor(
					ctx.author.username,
					ctx.author.avatarURL
				)
				.setTitle("Unknown Profile Section")
				.setDescription("Please check to ensure this is a correct profile section. If you think the specified profile section was valid, please make sure the value is too.")
				.setColor("RED");
			ctx.reply({ embeds: [error] });
		});
		return true;
	}
};

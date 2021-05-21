const Command = require('../../Struct/Command.js');

module.exports = class MoveCommand extends Command {
	constructor() {
		super('move', {
			aliases: ['move'],
			category: 'Staff',
			description: {
				info: 'Off-topic conversation in a channel? Use this command to move them.',
				usage: ['t)move ChannelMention'],
			},
			staffOnly: true,
			args: [
				{
					id: 'chnl',
					type: 'channelMention',
				},
			],
		});
	}
	async exec(message, { chnl }) {
		if (!chnl)
			return message.send({
				embeds: { description: "You didn't give me a channel." },
			});
		let embed = this.client
			.embed()
			.setAuthor(
				message.author.username,
				message.author.displayAvatarURL({ dynamic: true })
			);

		await message
			.send(
				embed
					.setDescription(
						'Please continue the conversation in <#' + chnl.id + '>'
					)
					.setThumbnail(
						'http://picsmine.com/wp-content/uploads/2017/04/Stop-Meme-stop-now.jpg'
					)
					.setTitle('Off-Topic Conversation!')
					.setColor('RED')
			)
			.then(() => {
				chnl.send(
					embed
						.setDescription(
							'Continuing conversation from <#' + message.channel.id + '>'
						)
						.setThumbnail(
							'http://www.quickmeme.com/img/dc/dc9a3d179c3d7f195c265e7e76f2a330547d096edfebcfa826eb3698d0019a0a.jpg'
						)
						.setTitle('Conversation Moved!')
						.setColor('GREEN')
				);
			});
		return message.delete();
	}
	async execSlash(message) {
		if (!message.member?.roles.cache.has(this.client.config.StaffRole))
			return message.reply("You can't use this command.", { ephemeral: true });
		if (message.options[0]?.channel.type === 'category')
			return message.reply(
				"You can't move a conversation to a category channel."
			);

		message.reply(
			this.client
				.embed()
				.setDescription(
					'Please continue the conversation in <#' +
						message.options[0]?.channel +
						'>'
				)
				.setThumbnail(
					'http://picsmine.com/wp-content/uploads/2017/04/Stop-Meme-stop-now.jpg'
				)
				.setTitle('Off-Topic Conversation!')
				.setColor('RED')
		);
		return message.options[0]?.channel.send(
			this.client
				.embed()
				.setDescription(
					'Continuing conversation from <#' + message.channel.id + '>'
				)
				.setThumbnail(
					'http://www.quickmeme.com/img/dc/dc9a3d179c3d7f195c265e7e76f2a330547d096edfebcfa826eb3698d0019a0a.jpg'
				)
				.setTitle('Conversation Moved!')
				.setColor('GREEN')
		);
	}
};

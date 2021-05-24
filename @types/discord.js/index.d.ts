declare module "discord.js" {
  interface Message {
    // @TODO: Remove once discord.js v13 is released
    lineReply: (message: string) => Promise<Message>
    lineReplyNoMention: (message: string) => Promise<Message>
  }
}

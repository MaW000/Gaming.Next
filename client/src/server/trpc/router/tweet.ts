import { protectedProcedure, router } from '../trpc';
import { tweetSchema } from '../../../components/ui/CreateTweet';

export const tweetRouter = router({
    create: protectedProcedure
    .input(tweetSchema)
    .mutation(({ctx, input}) => {
        const { prisma, session } = ctx
        const { text } = input

        const userId = session.user.id;

        return prisma.tweet.create({
            data: {
                text,
                author: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })
    }),
})
import React, { useState } from "react";
import { trpc } from '../../utils/trpc'
import { object, setErrorMap, string } from 'zod';

export const tweetSchema = object({
    text: string({
        required_error: 'Tweet text is required',
    })
    .min(10).max(280)
})

export function CreateTweet(){
    const [text, setText] = useState('')

    const {mutateAsync} = trpc.tweet.create.useMutation()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await tweetSchema.parse({ text });
        } catch (e) {
            setErrorMap(e.message);
            return
        }

        mutateAsync({ text })
    } 

    return (
        <>
      
        <form onSubmit={handleSubmit} className="flex w-full flex-col border-2 p-4 rounded-md mb-4 ">
            <textarea onChange={(e) => setText(e.target.value)} className="w-full p-4 shadow"/>
            <div className="mt-4 flex justify-end">
                <button className="bg-primary rounded-md px-4 py-2 text-white" type="submit">Tweet</button>
            </div>
        </form>
        </>
    )
    
}
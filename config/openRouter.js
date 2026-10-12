import { OpenRouter } from '@openrouter/sdk';

if(!process.env.OPENROUTER_API_KEY)
{
    throw new Error("API key is Missing");
}

export const openRouter = new OpenRouter({
  apiKey : process.env.OPENROUTER_API_KEY
 
});

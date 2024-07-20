import { NextResponse } from 'next/server';
import MistralClient from '@mistralai/mistralai';

const client = new MistralClient(process.env.MISTRAL_API_KEY);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const chatResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: message }],
    });

    const aiResponse = chatResponse.choices[0].message.content;

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

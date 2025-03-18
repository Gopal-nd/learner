'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export default async function FirstPhaseQuizz() {
    const session = await auth.api.getSession({
         headers:await headers(), 
    })


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
  
      
    
}
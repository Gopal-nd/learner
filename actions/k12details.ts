'use server'

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formSchema } from '@/schema/k12details';
import { headers } from 'next/headers';
import { z } from 'zod';

// Define the schema using Zod


// Server Action
export async function saveK12Details(formData :z.infer <typeof formSchema>) {
  try {
            const session = await auth.api.getSession({
        headers:await headers(), 
    });
        if(!session){
        return { success: false,};

        }
    // Validate data
    const validatedData = formSchema.parse(formData);

    // Check if K12Details already exists
    const existingData = await prisma.k12Details.findUnique({
      where: { userId: session.user.id },
    });

    if (existingData) {
      // Update existing data
      const updatedData = await prisma.k12Details.update({
        where: { userId: session.user.id },
        data: {
            city:validatedData.city,
            board:validatedData.board,
            grade:validatedData.grade,
            school:validatedData.school,
            stream:validatedData.stream,
            country:validatedData.country,
                }
      });
        console.log(updatedData)
      return { success: true, data: updatedData };
    } else {
      // Create new entry
      const newData = await prisma.k12Details.create({
        data: {
                    userId:session.user.id,
                    city:validatedData.city,
            board:validatedData.board,
            grade:validatedData.grade,
            school:validatedData.school,
            stream:validatedData.stream,
            country:validatedData.country,

                },
      });
      return { success: true, data: newData };
    }
  } catch (error) {
    return { success: false, message: error instanceof z.ZodError ? error.errors : error.message };
  }
}


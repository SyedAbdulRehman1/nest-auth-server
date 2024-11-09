// src/prisma/initial-setup.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InitialSetupService {
  constructor(private prisma: PrismaService) {}

  async createTeacher() {
    // Check if there’s already a teacher
    const existingTeacher = await this.prisma.user.findUnique({
      where: { email: 'teacher@school.com' },
    });

    if (!existingTeacher) {
      // Register a teacher if one doesn't exist
      const hashedPassword = await bcrypt.hash('teacher_password', 10); // Default password
      await this.prisma.user.create({
        data: {
          email: 'teacher@school.com', // Use your default teacher email
          password: hashedPassword,
          userType: 'TEACHER',
          role: 'TEACHER',
          emailVerified: true,
        },
      });
      console.log('Teacher registered successfully.');
    }
  }
}

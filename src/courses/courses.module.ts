import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ChaptersService } from './chapters/chapters.service';

@Module({
  imports: [JwtModule],
  controllers: [CoursesController],
  providers: [CoursesService, ChaptersService, PrismaService, AuthService],
})
export class CoursesModule {}

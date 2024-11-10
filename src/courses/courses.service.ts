import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
// import { CreateCourseDto } from '/dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCoursesByUser(userId: string) {
    try {
      return await this.prisma.course.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error in getCoursesByUser:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCourse(userId: string, createCourseDto: CreateCourseDto) {
    try {
      const { title } = createCourseDto;
      return await this.prisma.course.create({
        data: {
          userId,
          title,
        },
      });
    } catch (error) {
      console.error('[CREATE COURSE]', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create course',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getCourseByIdAndUser(courseId: string, userId: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
        include: {
          chapters: { orderBy: { position: 'asc' } },
          attachments: { orderBy: { createdAt: 'desc' } },
        },
      });

      return course;
    } catch (error) {
      console.error('Error in getCourseByIdAndUser:', error);
      throw new HttpException(
        'Error fetching course details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCourse(courseId: string, userId: string, updateData: any) {
    try {
      return this.prisma.course.update({
        where: {
          id: courseId,
          userId: userId,
        },
        data: updateData,
      });
    } catch (error) {
      console.error('Error in updateCourse:', error);
      throw new HttpException(
        'Failed to update course details.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateCourseImage(courseId: string, userId: string, imageUrl: string) {
    return this.prisma.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        imageUrl: imageUrl,
      },
    });
  }
  async getCourseOwner(courseId: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { userId: true },
    });
    return course?.userId === userId;
  }
}

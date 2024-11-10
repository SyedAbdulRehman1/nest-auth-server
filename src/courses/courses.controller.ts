import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Patch,
  UploadedFile,
  UseInterceptors,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { extname } from 'path';
import * as fs from 'fs';
import { ChaptersService } from './chapters/chapters.service';

//   import { SessionGuard } from '../auth/session.guard'; // Custom guard for session handling
//   import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
@UseGuards(JwtAuthGuard)

//   @UseGuards(SessionGuard) // Ensures that the user is authenticated
export class CoursesController {
  constructor(
    @Inject(CoursesService) private coursesService: CoursesService,
    @Inject(ChaptersService) private chaptersService: ChaptersService,
  ) {}

  @Get()
  async getCourses(@Req() req: Request) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const courses = await this.coursesService.getCoursesByUser(userId);
      return { courses };
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createCourse(
    @Req() req: Request,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    // console.log(req, 'reqqq');
    try {
      const userId = req.user?.id;
      const isTeacher = req.user?.userType === 'TEACHER';

      if (!userId || !isTeacher) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const course = await this.coursesService.createCourse(
        userId,
        createCourseDto,
      );
      return course;
    } catch (error) {
      console.error('[CREATE COURSE]', error);
      if (error instanceof PrismaClientValidationError) {
        console.error('[CREATE COURSE - Prisma Validation Error]', error);
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Prisma validation error',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

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

  @Get(':courseId')
  async getCourseDetails(
    @Param('courseId') courseId: string,
    @Query('userId') userId: string,
    @Req() req: Request,
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpException(
          'Unauthorized User ID is required',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const course = await this.coursesService.getCourseByIdAndUser(
        courseId,
        userId,
      );
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      return course;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw new HttpException(
        'Failed to fetch course details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateData: any,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const course = await this.coursesService.getCourseByIdAndUser(
        courseId,
        userId,
      );
      if (!course) {
        throw new HttpException(
          'Course not found or unauthorized access.',
          HttpStatus.NOT_FOUND,
        );
      }

      // Update the course details
      const updatedCourse = await this.coursesService.updateCourse(
        courseId,
        userId,
        updateData,
      );

      return updatedCourse;
    } catch (error) {
      console.error('Error updating course details:', error);
      throw new HttpException(
        'Failed to update course details.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':courseId/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const courseId = req.params.courseId;
          let uploadPath = '';

          if (file.mimetype.startsWith('image/')) {
            uploadPath = `./uploads/images/courses/${courseId}`;
          } else if (file.mimetype.startsWith('video/')) {
            uploadPath = `./uploads/videos/courses/${courseId}`;
          } else if (file.mimetype.startsWith('application/')) {
            uploadPath = `./uploads/docs/courses/${courseId}`;
          } else {
            cb(new Error('Unsupported file type'), '');
            return;
          }
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `file-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('courseId') courseId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const cleanedFilePath = file.path.replace(/\\/g, '/'); // Replace all backslashes with forward slashes
    const fileUrl = `/${cleanedFilePath}`;

    try {
      const updatedCourse = await this.coursesService.updateCourseImage(
        courseId,
        userId,
        fileUrl,
      );
      console.log(fileUrl, 'fileee');
      return {
        url: fileUrl,
        updatedCourse,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new HttpException(
        'Failed to upload file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':courseId/chapters')
  async createChapter(
    @Param('courseId') courseId: string,
    @Body() body: { title: string },
    @Req() req: Request,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new HttpException(
        'Unauthorized User ID is required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const courseOwner = await this.coursesService.getCourseOwner(
      courseId,
      userId,
    );

    if (!courseOwner) {
      throw new UnauthorizedException(
        'You are not authorized to add chapters to this course',
      );
    }

    const newPosition = await this.chaptersService.getNextPosition(courseId);

    const chapter = await this.chaptersService.create({
      title: body.title,
      courseId,
      position: newPosition,
    });

    return chapter;
  }
}

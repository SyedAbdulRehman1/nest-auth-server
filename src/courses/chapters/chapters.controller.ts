import {
  Controller,
  Get,
  Param,
  Redirect,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // For auth guard
import { PrismaService } from 'src/prisma/prisma.service';
// import { PrismaService } from './prisma.service'; // Assuming you have a Prisma service to interact with DB
// import { SessionService } from './session.service'; // Assuming you have a session management service

@Controller('chapters')
export class ChapterController {
  constructor(
    private readonly prisma: PrismaService, // For interacting with the database
  ) // private readonly sessionService: SessionService, // For session management
  {}

  @Get(':courseId/:chapterId')
  @UseGuards(AuthGuard('jwt')) // JWT or your custom AuthGuard
  async getChapter(
    @Param('courseId') courseId: string,
    @Param('chapterId') chapterId: string,
  ) {
    // Get user session (assuming you have a session service)
    // const userSession = await this.sessionService.getSession(); // Session service to retrieve user session info

    // if (!userSession?.userId) {
    //   throw new UnauthorizedException('Unauthorized');
    // }

    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { muxData: true },
    });

    if (!chapter || chapter.courseId !== courseId) {
      // Redirect if chapter or course is not found
      return { message: 'Chapter not found or unauthorized access' };
    }

    // Checking for required fields completion
    const requiredFields = [
      chapter.title,
      chapter.description,
      chapter.videoUrl,
    ];
    const completedFields = requiredFields.filter(Boolean).length;
    const totalFields = requiredFields.length;

    const isComplete = completedFields === totalFields;
    const completionText = `(${completedFields}/${totalFields})`;

    return {
      chapter,
      isComplete,
      completionText,
    };
  }
}

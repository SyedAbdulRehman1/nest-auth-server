import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChaptersService {
  constructor(private readonly prisma: PrismaService) {}

  // Get the next available position for the new chapter
  async getNextPosition(courseId: string) {
    const lastChapter = await this.prisma.chapter.findFirst({
      where: { courseId },
      orderBy: { position: 'desc' },
    });

    return lastChapter ? lastChapter.position + 1 : 1;
  }

  // Create a new chapter
  async create(data: { title: string; courseId: string; position: number }) {
    return this.prisma.chapter.create({
      data,
    });
  }
}

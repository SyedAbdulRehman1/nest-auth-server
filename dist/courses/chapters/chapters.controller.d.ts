import { PrismaService } from 'src/prisma/prisma.service';
import { ChaptersService } from './chapters.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Request } from 'express';
export declare class ChapterController {
    private readonly prisma;
    private readonly chaptersService;
    constructor(prisma: PrismaService, chaptersService: ChaptersService);
    getChapter(courseId: string, chapterId: string): Promise<{
        chapter: {
            muxData: {
                id: string;
                chapterId: string;
                assetId: string;
                playbackId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            isPublished: boolean;
            position: number;
            videoUrl: string;
            isFree: boolean;
            courseId: string;
        };
        isComplete: boolean;
        completionText: string;
    }>;
    getChapterData(courseId: string, chapterId: string, req: Request): Promise<{
        chapter: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            isPublished: boolean;
            position: number;
            videoUrl: string;
            isFree: boolean;
            courseId: string;
        };
        course: {
            price: number;
        };
        muxData: any;
        attachments: any[];
        nextChapter: any;
        userProgress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            chapterId: string;
            isCompleted: boolean;
        };
        purchase: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            courseId: string;
        };
    }>;
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<void>;
}

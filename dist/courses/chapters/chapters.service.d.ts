import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { MuxService } from './mux.service';
export declare class ChaptersService {
    private readonly prisma;
    private readonly muxService;
    constructor(prisma: PrismaService, muxService: MuxService);
    getNextPosition(courseId: string): Promise<number>;
    create(data: {
        title: string;
        courseId: string;
        position: number;
    }): Promise<{
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
    }>;
    getChapterWithCompletion(courseId: string, chapterId: string): Promise<{
        chapter: {
            muxData: {
                id: string;
                assetId: string;
                playbackId: string;
                chapterId: string;
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
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, userId: string): Promise<{
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
    }>;
    getChapterData(userId: string, courseId: string, chapterId: string): Promise<{
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
    private getSessionFromRequest;
}

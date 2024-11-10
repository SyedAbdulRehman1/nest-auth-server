import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChapterController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getChapter(courseId: string, chapterId: string): Promise<{
        message: string;
        chapter?: undefined;
        isComplete?: undefined;
        completionText?: undefined;
    } | {
        chapter: {
            muxData: {
                chapterId: string;
                id: string;
                assetId: string;
                playbackId: string;
            };
        } & {
            courseId: string;
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            position: number;
            isPublished: boolean;
            isFree: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        isComplete: boolean;
        completionText: string;
        message?: undefined;
    }>;
}

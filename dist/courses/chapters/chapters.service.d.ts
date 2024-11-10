import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChaptersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getNextPosition(courseId: string): Promise<number>;
    create(data: {
        title: string;
        courseId: string;
        position: number;
    }): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        position: number;
        isPublished: boolean;
        isFree: boolean;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

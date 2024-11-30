import { PrismaService } from 'src/prisma/prisma.service';
export declare class MuxService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadVideoToMux(videoUrl: string, chapterId: string): Promise<{
        id: string;
        chapterId: string;
        assetId: string;
        playbackId: string;
    }>;
}

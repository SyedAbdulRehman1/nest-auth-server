import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCoursesByUser(userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createCourse(userId: string, createCourseDto: CreateCourseDto): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCourseByIdAndUser(courseId: string, userId: string): Promise<{
        chapters: {
            id: string;
            title: string;
            description: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            videoUrl: string;
            isFree: boolean;
            courseId: string;
        }[];
        attachments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            courseId: string;
            url: string;
        }[];
    } & {
        id: string;
        userId: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCourse(courseId: string, userId: string, updateData: any): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCourseImage(courseId: string, userId: string, imageUrl: string): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCourseOwner(courseId: string, userId: string): Promise<boolean>;
}

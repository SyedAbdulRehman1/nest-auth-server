/// <reference types="multer" />
import { CoursesService } from './courses.service';
import { Request } from 'express';
import { CreateCourseDto } from './dto/create-course.dto';
import { ChaptersService } from './chapters/chapters.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class CoursesController {
    private coursesService;
    private chaptersService;
    constructor(coursesService: CoursesService, chaptersService: ChaptersService);
    getCourses(req: Request): Promise<{
        courses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            userId: string;
            description: string;
            imageUrl: string;
            price: number;
            isPublished: boolean;
            categoryId: string;
        }[];
    }>;
    createCourse(req: Request, createCourseDto: CreateCourseDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    getCourseDetails(courseId: string, userId: string, req: Request): Promise<{
        chapters: {
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
        }[];
        attachments: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
            url: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    getUniqueCourse(courseId: string, req: Request): Promise<{
        status: string;
        data: {
            chapters: {
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
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            userId: string;
            description: string;
            imageUrl: string;
            price: number;
            isPublished: boolean;
            categoryId: string;
        };
    }>;
    getCourseDetailsWithProgress(courseId: string, req: Request): Promise<{
        course: {
            chapters: ({
                userProgress: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    chapterId: string;
                    isCompleted: boolean;
                }[];
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
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            userId: string;
            description: string;
            imageUrl: string;
            price: number;
            isPublished: boolean;
            categoryId: string;
        };
        progressCount: number;
    }>;
    updateCourse(courseId: string, updateData: any, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    uploadFile(courseId: string, file: Express.Multer.File, req: Request): Promise<{
        url: string;
        updatedCourse: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            userId: string;
            description: string;
            imageUrl: string;
            price: number;
            isPublished: boolean;
            categoryId: string;
        };
    }>;
    createChapter(courseId: string, body: {
        title: string;
    }, req: Request): Promise<{
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
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<{
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
        message: string;
    }>;
    publishChapter(courseId: string, chapterId: string, req: Request): Promise<{
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
    unpublishChapter(courseId: string, chapterId: string, req: Request): Promise<{
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
    publishCourse(id: string, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    unpublishCourse(courseId: string, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    reorderChapters(courseId: string, list: {
        id: string;
        position: number;
    }[], req: Request): Promise<{
        message: string;
    }>;
}

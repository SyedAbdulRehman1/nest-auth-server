/// <reference types="multer" />
import { CoursesService } from './courses.service';
import { Request } from 'express';
import { CreateCourseDto } from './dto/create-course.dto';
import { ChaptersService } from './chapters/chapters.service';
export declare class CoursesController {
    private coursesService;
    private chaptersService;
    constructor(coursesService: CoursesService, chaptersService: ChaptersService);
    getCourses(req: Request): Promise<{
        courses: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
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
        userId: string;
        title: string;
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
            courseId: string;
            position: number;
            videoUrl: string;
            isFree: boolean;
        }[];
        attachments: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
            url: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    updateCourse(courseId: string, updateData: any, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
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
            userId: string;
            title: string;
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
        courseId: string;
        position: number;
        videoUrl: string;
        isFree: boolean;
    }>;
}

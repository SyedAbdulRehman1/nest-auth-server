import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCoursesByUser(userId: string): Promise<any>;
    createCourse(userId: string, createCourseDto: CreateCourseDto): Promise<any>;
    getCourseByIdAndUser(courseId: string, userId: string): Promise<any>;
    updateCourse(courseId: string, userId: string, updateData: any): Promise<any>;
    updateCourseImage(courseId: string, userId: string, imageUrl: string): Promise<any>;
}

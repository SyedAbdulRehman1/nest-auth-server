"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCoursesByUser(userId) {
        try {
            return await this.prisma.course.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            console.error('Error in getCoursesByUser:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCourse(userId, createCourseDto) {
        try {
            const { title } = createCourseDto;
            return await this.prisma.course.create({
                data: {
                    userId,
                    title,
                },
            });
        }
        catch (error) {
            console.error('[CREATE COURSE]', error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create course',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCourseByIdAndUser(courseId, userId) {
        try {
            const course = await this.prisma.course.findUnique({
                where: {
                    id: courseId,
                    userId: userId,
                },
                include: {
                    chapters: { orderBy: { position: 'asc' } },
                    attachments: { orderBy: { createdAt: 'desc' } },
                },
            });
            return course;
        }
        catch (error) {
            console.error('Error in getCourseByIdAndUser:', error);
            throw new common_1.HttpException('Error fetching course details', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCourse(courseId, userId, updateData) {
        try {
            return this.prisma.course.update({
                where: {
                    id: courseId,
                    userId: userId,
                },
                data: updateData,
            });
        }
        catch (error) {
            console.error('Error in updateCourse:', error);
            throw new common_1.HttpException('Failed to update course details.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCourseImage(courseId, userId, imageUrl) {
        return this.prisma.course.update({
            where: {
                id: courseId,
                userId: userId,
            },
            data: {
                imageUrl: imageUrl,
            },
        });
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map
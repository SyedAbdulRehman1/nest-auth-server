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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../../prisma/prisma.service");
let ChapterController = class ChapterController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getChapter(courseId, chapterId) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
            include: { muxData: true },
        });
        if (!chapter || chapter.courseId !== courseId) {
            return { message: 'Chapter not found or unauthorized access' };
        }
        const requiredFields = [
            chapter.title,
            chapter.description,
            chapter.videoUrl,
        ];
        const completedFields = requiredFields.filter(Boolean).length;
        const totalFields = requiredFields.length;
        const isComplete = completedFields === totalFields;
        const completionText = `(${completedFields}/${totalFields})`;
        return {
            chapter,
            isComplete,
            completionText,
        };
    }
};
__decorate([
    (0, common_1.Get)(':courseId/:chapterId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('chapterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getChapter", null);
ChapterController = __decorate([
    (0, common_1.Controller)('chapters'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapters.controller.js.map
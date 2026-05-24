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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { apiData, apiMessage, } from '../common/api-response.js';
import { ExamEngineService } from './exam-engine.service.js';
let ExamsController = class ExamsController {
    examEngineService;
    constructor(examEngineService) {
        this.examEngineService = examEngineService;
    }
    async startExam(body, actor) {
        return apiData(await this.examEngineService.startExam(body, actor), 'Sesi ujian berhasil dibuat');
    }
    async getActiveExam(actor) {
        return apiData(await this.examEngineService.getActiveExam(actor));
    }
    async getExamSessionDetail(examSessionId, actor) {
        return apiData(await this.examEngineService.getExamSessionDetail(examSessionId, actor));
    }
    async autosaveAnswer(examSessionId, examSessionQuestionId, body, actor) {
        return apiData(await this.examEngineService.autosaveAnswer(examSessionId, examSessionQuestionId, body, actor), 'Jawaban tersimpan otomatis');
    }
    async flagQuestion(examSessionId, examSessionQuestionId, body, actor) {
        await this.examEngineService.flagQuestion(examSessionId, examSessionQuestionId, body, actor);
        return apiMessage('Status ragu-ragu diperbarui');
    }
    async submitExam(examSessionId, body, actor) {
        return apiData(await this.examEngineService.submitExam(examSessionId, actor, body), 'Ujian berhasil dikumpulkan');
    }
    async logIntegrityEvent(examSessionId, body, actor) {
        await this.examEngineService.logIntegrityEvent(examSessionId, body, actor);
        return apiMessage('Integrity event recorded');
    }
};
__decorate([
    Post('start'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "startExam", null);
__decorate([
    Get('active'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "getActiveExam", null);
__decorate([
    Get(':examSessionId'),
    __param(0, Param('examSessionId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "getExamSessionDetail", null);
__decorate([
    Put(':examSessionId/answers/:examSessionQuestionId'),
    __param(0, Param('examSessionId')),
    __param(1, Param('examSessionQuestionId')),
    __param(2, Body()),
    __param(3, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "autosaveAnswer", null);
__decorate([
    Patch(':examSessionId/questions/:examSessionQuestionId/flag'),
    __param(0, Param('examSessionId')),
    __param(1, Param('examSessionQuestionId')),
    __param(2, Body()),
    __param(3, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "flagQuestion", null);
__decorate([
    Post(':examSessionId/submit'),
    __param(0, Param('examSessionId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "submitExam", null);
__decorate([
    Post(':examSessionId/integrity-events'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Param('examSessionId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "logIntegrityEvent", null);
ExamsController = __decorate([
    Controller('exams'),
    __metadata("design:paramtypes", [ExamEngineService])
], ExamsController);
export { ExamsController };
//# sourceMappingURL=exams.controller.js.map
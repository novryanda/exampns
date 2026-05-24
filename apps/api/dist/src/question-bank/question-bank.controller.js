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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiMessage, apiPaginated, } from '../common/api-response.js';
import { QuestionBankService } from './question-bank.service.js';
let QuestionBankController = class QuestionBankController {
    questionBankService;
    constructor(questionBankService) {
        this.questionBankService = questionBankService;
    }
    async listQuestions(query) {
        const result = await this.questionBankService.listQuestions(query);
        return apiPaginated(result.data, result.meta);
    }
    async createQuestion(body, actor) {
        const created = await this.questionBankService.createQuestion(body, actor);
        return apiData(created, 'Soal berhasil dibuat');
    }
    async getQuestionDetail(questionId) {
        return apiData(await this.questionBankService.getQuestionDetail(questionId));
    }
    async updateQuestion(questionId, body, actor) {
        await this.questionBankService.updateQuestion(questionId, body, actor);
        return apiMessage('Soal berhasil diperbarui');
    }
    async archiveQuestion(questionId, actor) {
        await this.questionBankService.archiveQuestion(questionId, actor);
        return apiMessage('Soal berhasil diarsipkan');
    }
};
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "listQuestions", null);
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "createQuestion", null);
__decorate([
    Get(':questionId'),
    __param(0, Param('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "getQuestionDetail", null);
__decorate([
    Patch(':questionId'),
    __param(0, Param('questionId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "updateQuestion", null);
__decorate([
    Delete(':questionId'),
    __param(0, Param('questionId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "archiveQuestion", null);
QuestionBankController = __decorate([
    Roles('ADMIN', 'SUPER_ADMIN'),
    Controller('admin/questions'),
    __metadata("design:paramtypes", [QuestionBankService])
], QuestionBankController);
export { QuestionBankController };
//# sourceMappingURL=question-bank.controller.js.map
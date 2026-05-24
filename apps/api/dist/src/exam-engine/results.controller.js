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
import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Res, Body, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiPaginated, } from '../common/api-response.js';
import { ExamEngineService } from './exam-engine.service.js';
let ResultsController = class ResultsController {
    examEngineService;
    constructor(examEngineService) {
        this.examEngineService = examEngineService;
    }
    async getResultDetail(examResultId, actor) {
        return apiData(await this.examEngineService.getResultDetail(examResultId, actor));
    }
    async getResultAnswers(examResultId, query, actor) {
        const result = await this.examEngineService.getResultAnswers(examResultId, actor, query);
        return apiPaginated(result.data, result.meta);
    }
    async getAiRecommendation(examResultId, actor, response) {
        const recommendation = await this.examEngineService.getAiRecommendation(examResultId, actor);
        if (recommendation.processing) {
            response.status(HttpStatus.ACCEPTED);
            return apiData(recommendation.data, 'AI Recommendation sedang diproses');
        }
        response.status(HttpStatus.OK);
        return apiData(recommendation.data);
    }
    async regenerateAiRecommendation(examResultId, body, actor) {
        return apiData(await this.examEngineService.regenerateAiRecommendation(examResultId, actor, body), 'Regenerasi rekomendasi AI dimulai');
    }
    async getExamHistory(query, actor) {
        const result = await this.examEngineService.getExamHistory(actor, query);
        return apiPaginated(result.data, result.meta);
    }
};
__decorate([
    Get('results/:examResultId'),
    __param(0, Param('examResultId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getResultDetail", null);
__decorate([
    Get('results/:examResultId/answers'),
    __param(0, Param('examResultId')),
    __param(1, Query()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getResultAnswers", null);
__decorate([
    Get('results/:examResultId/ai-recommendation'),
    __param(0, Param('examResultId')),
    __param(1, CurrentUser()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getAiRecommendation", null);
__decorate([
    Roles('ADMIN', 'SUPER_ADMIN'),
    Post('results/:examResultId/ai-recommendation/regenerate'),
    HttpCode(HttpStatus.ACCEPTED),
    __param(0, Param('examResultId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "regenerateAiRecommendation", null);
__decorate([
    Get('exams/history'),
    __param(0, Query()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResultsController.prototype, "getExamHistory", null);
ResultsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [ExamEngineService])
], ResultsController);
export { ResultsController };
//# sourceMappingURL=results.controller.js.map
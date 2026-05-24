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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { apiData, apiMessage, apiPaginated, } from '../common/api-response.js';
import { PdfImportService } from './pdf-import.service.js';
let PdfImportController = class PdfImportController {
    pdfImportService;
    constructor(pdfImportService) {
        this.pdfImportService = pdfImportService;
    }
    async uploadPdfForParsing(file, body, actor) {
        return apiData(await this.pdfImportService.uploadPdfForParsing(file, body, actor), 'PDF diterima dan sedang diproses');
    }
    async listPdfImportBatches(query) {
        const result = await this.pdfImportService.listPdfImportBatches(query);
        return apiPaginated(result.data, result.meta);
    }
    async getPdfImportBatchDetail(batchId) {
        return apiData(await this.pdfImportService.getPdfImportBatchDetail(batchId));
    }
    async getParsedQuestionDetail(parsedQuestionId) {
        return apiData(await this.pdfImportService.getParsedQuestionDetail(parsedQuestionId));
    }
    async updateParsedQuestion(parsedQuestionId, body, actor) {
        await this.pdfImportService.updateParsedQuestion(parsedQuestionId, body, actor);
        return apiMessage('Hasil parsing berhasil diperbarui');
    }
    async approveParsedQuestion(parsedQuestionId, body, actor) {
        return apiData(await this.pdfImportService.approveParsedQuestion(parsedQuestionId, body, actor), 'Parsed question disetujui dan masuk bank soal');
    }
    async rejectParsedQuestion(parsedQuestionId, body, actor) {
        await this.pdfImportService.rejectParsedQuestion(parsedQuestionId, body, actor);
        return apiMessage('Parsed question ditolak');
    }
};
__decorate([
    Post('pdf-imports'),
    HttpCode(HttpStatus.ACCEPTED),
    UseInterceptors(FileInterceptor('file')),
    __param(0, UploadedFile()),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "uploadPdfForParsing", null);
__decorate([
    Get('pdf-imports'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "listPdfImportBatches", null);
__decorate([
    Get('pdf-imports/:batchId'),
    __param(0, Param('batchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "getPdfImportBatchDetail", null);
__decorate([
    Get('parsed-questions/:parsedQuestionId'),
    __param(0, Param('parsedQuestionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "getParsedQuestionDetail", null);
__decorate([
    Patch('parsed-questions/:parsedQuestionId'),
    __param(0, Param('parsedQuestionId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "updateParsedQuestion", null);
__decorate([
    Post('parsed-questions/:parsedQuestionId/approve'),
    HttpCode(HttpStatus.CREATED),
    __param(0, Param('parsedQuestionId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "approveParsedQuestion", null);
__decorate([
    Post('parsed-questions/:parsedQuestionId/reject'),
    __param(0, Param('parsedQuestionId')),
    __param(1, Body()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PdfImportController.prototype, "rejectParsedQuestion", null);
PdfImportController = __decorate([
    Roles('ADMIN', 'SUPER_ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [PdfImportService])
], PdfImportController);
export { PdfImportController };
//# sourceMappingURL=pdf-import.controller.js.map
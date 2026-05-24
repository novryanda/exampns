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
import { Body, Controller, Get, Patch, Req, Res, } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { apiData, apiMessage, } from '../common/api-response.js';
import { MeService } from './me.service.js';
let MeController = class MeController {
    meService;
    constructor(meService) {
        this.meService = meService;
    }
    async getProfile(user) {
        return apiData(await this.meService.getProfile(user.id));
    }
    async updateProfile(user, body, request, response) {
        return apiData(await this.meService.updateProfile(user.id, request, response, body), 'Profile berhasil diperbarui');
    }
    async changePassword(user, body, request, response) {
        await this.meService.changePassword(user.id, request, response, body);
        return apiMessage('Password berhasil diperbarui');
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getProfile", null);
__decorate([
    Patch(),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __param(2, Req()),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "updateProfile", null);
__decorate([
    Patch('password'),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __param(2, Req()),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "changePassword", null);
MeController = __decorate([
    Controller('me'),
    __metadata("design:paramtypes", [MeService])
], MeController);
export { MeController };
//# sourceMappingURL=me.controller.js.map
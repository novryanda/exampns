import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((_data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser ?? null;
});
//# sourceMappingURL=current-user.decorator.js.map
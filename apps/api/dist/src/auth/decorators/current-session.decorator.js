import { createParamDecorator } from '@nestjs/common';
export const CurrentSession = createParamDecorator((_data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.auth?.session ?? null;
});
//# sourceMappingURL=current-session.decorator.js.map
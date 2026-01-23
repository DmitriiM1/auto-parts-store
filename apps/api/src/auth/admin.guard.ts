import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import type { Request } from 'express'

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>()
    const expected = process.env.ADMIN_TOKEN

    // Если токен не задан – в dev можно пропускать всех
    if (!expected) {
      return true
    }

    const headerToken =
      (req.headers['x-admin-token'] as string | undefined) ?? ''

    return headerToken === expected
  }
}
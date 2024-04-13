import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissionRouters = this.reflector.getAllAndOverride<string | string[]>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!permissionRouters) return true;
    else {
      //Quyền người dùng
      const { user } = context.switchToHttp().getRequest();
      const role = user?.role;
      if (!role || !role.status) return false;
      const permissions: string[] = role.permissions || [];
      // Nếu router chỉ có 1 quền
      if (typeof permissionRouters === 'string') {
        const allowed = permissionRouters.replace(/[\s\t]+/g, '');
        return permissions.includes(allowed);
      }
      // Nếu router có nhiều quyền
      for (let index = 0; index < permissionRouters?.length; index++) {
        const permissionRouter = permissionRouters[index].replace(/[\s\t]+/g, '');
        for (const permission of permissions) {
          if (permissionRouter == permission) return true;
        }
      }
      return false;
    }
  }
}

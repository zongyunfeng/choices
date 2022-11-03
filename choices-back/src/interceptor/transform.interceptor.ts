import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Record<any, any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Record<any, any>> | Promise<Observable<Record<any, any>>> {
    return next.handle().pipe(
      map((data) => {
        return {
          errCode: 0,
          errMsg: 'success',
          data,
        };
      }),
    );
  }
}

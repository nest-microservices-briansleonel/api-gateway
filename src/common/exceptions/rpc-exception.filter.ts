import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { IErrorResponse } from '../interfaces/error-response.interface';
import { isRpcError } from '../guards/is-rpc-error.guard';
import { IRpcError } from '../interfaces/rpc-error.interface';
import { Request, Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const rpcError = exception.getError();
    const { status, message } = this.normalizeError(rpcError);

    this.logger.error(
      `[${req.method}] ${req.url} → ${status}: ${JSON.stringify(message)}`,
    );

    const body: IErrorResponse = {
      statusCode: status,
      message,
      error: HttpStatus[status] ?? 'Unknown',
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    res.status(status).json(body);
  }

  private normalizeError(rpcError: string | object): IRpcError {
    if (isRpcError(rpcError)) {
      return rpcError;
    }

    if (rpcError.toString().includes('Empty response')) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      message: typeof rpcError === 'string' ? rpcError : 'Unexpected error',
    };
  }
}

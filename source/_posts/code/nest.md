---
title: Nestjs学习
categories: 开发
date: 2021-5-31 10:00:00
tags: 
 - 后台
---
## 入门
[中文文档](https://docs.nestjs.cn/7/firststeps)
`npm i -g @nestjs/cli`
`nest new project-name`

## 开发常见
跨域: 在main.ts文件中` app.enableCors();`
初始化：`nest g res filter-name [folder-name]`生成基本的代码结构
## 项目配置
### 规范接口
使用全局过滤，过滤错误结果 `nest g f filter-name [folder-name]` 生成全局过滤文件
```
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // const status = exception.getStatus();
        const message = exception.message;
        Logger.log('错误提示', message);
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send({
          data: message, // 获取全部的错误信息
          message: '请求失败',
          code: 1, // 自定义code
          url: request.originalUrl, // 错误的url地址
      });
    }
}

```

使用全局拦截，拦截正确结果 `nest g in filter-name [folder-name]` 生成全局拦截文件

```
import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
    data: T;
    code?:number,
}
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data,...params) => {
                // console.log(params);
                return {
                    data,
                    code: 0,
                    message: '请求成功',
                };
            }),
        );
    }
}
```

最后在main.ts中进行引入注入

```
  // 引用全局过滤
  app.useGlobalFilters(new HttpExceptionFilter());
  //拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
```

### 数据库引入
在 app.module.ts 中进行注入

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModule } from './page/page.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

```

在schema.ts文件中设置模版类型

```
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema()
export class Page extends Document {
    @Prop({type:Object,default:null})
    json: object;

    @Prop({default:''})
    js: string;

    @Prop({default:''})
    html: string;

    @Prop({default:''})
    script: string;

    @Prop({default:''})
    name: string;

    @Prop({default:[]})
    drawingItems: Array<any>;

    @Prop({type:Object,default:null})
    formConf: object;

}
export const Pagechema = SchemaFactory.createForClass(Page);
```

最后在service.ts文件中进行注入和操作

```
import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private readonly pageModel: Model<PageDocument>) {

  }
  async create(createPage: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel(createPage);
    return createdPage.save();
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find().exec()
  }

  findOne(id: string) {
    return this.pageModel.findOne({ _id: id },{__v:0});
  }

  update(id: string, updatePageDto: UpdatePageDto) {
    return this.pageModel.updateOne({ _id: id },updatePageDto);
  }

  async remove(id: string) {
    await this.pageModel.remove({ _id: id });
    return '删除成功'
  }
}

```

### 中间件
生成中间件文件 `nest g mi filter-name [folder-name]` 可用两种中间件形式，类或者函数

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // console.log("Request ......",req);
        next()
    }
}
// 函数式中间件
export function logger(req, res, next) {
    next();
  };
```

main.ts中注入中间件

```
import { logger } from './app.middleware';
// 引用中间件
  app.use(logger);

```
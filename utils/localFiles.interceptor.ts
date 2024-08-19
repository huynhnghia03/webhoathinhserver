import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Next, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { join } from 'path'; // Import the path module

interface LocalFilesInterceptorOptions {
    fieldName: string;
    path?: string;
}

function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        fileInterceptor: NestInterceptor;

        constructor() {
            const filesDestination = 'upload';
            const destinationPath = options.path ? join(filesDestination, options.path) : filesDestination;

            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, destinationPath.replace(/\\/g, '/')); // Normalize the path to use forward slashes
                    },
                    filename: (req, file, cb) => {
                        if (file)
                            cb(null, `${Date.now()}-${file.originalname}`);
                        else
                            cb(null, '');

                    }
                })
            };

            this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions))();
        }

        intercept(...args: Parameters<NestInterceptor['intercept']>) {
            return this.fileInterceptor.intercept(...args);
        }
    }
    return mixin(Interceptor);
}

export default LocalFilesInterceptor;

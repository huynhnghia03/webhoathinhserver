import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { join } from 'path';
import { promises as fs } from 'fs';

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
            console.log('Generated filename:', destinationPath);
            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination: async (req, file, cb) => {
                        try {
                            await fs.mkdir(destinationPath, { recursive: true });
                            cb(null, destinationPath); // Provide both arguments
                        } catch (error) {
                            console.error('Error creating directory:', error);
                            cb(error as Error, ''); // Provide both arguments, with an empty string as destination
                        }
                    },
                    filename: (req, file, cb) => {
                        const timestamp = Date.now().toString();
                        const filename = `${timestamp}-${file.originalname.trim().replace(/ /g, '')}`;
                        console.log('Generated filename:', filename);
                        cb(null, filename);
                    }
                }),
                fileFilter: (req, file, cb) => {
                    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/x-matroska'];
                    if (allowedMimeTypes.includes(file.mimetype)) {
                        cb(null, true);
                    } else {
                        cb(new Error('Invalid file type'), false);
                    }
                },
                limits: {
                    fileSize: 1000 * 1024 * 1024, // Limit file size to 1000MB (adjust as needed)
                },
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

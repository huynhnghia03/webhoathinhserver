// import { FileInterceptor } from '@nestjs/platform-express';
// import { Injectable, mixin, NestInterceptor, Next, Type } from '@nestjs/common';
// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
// import { diskStorage } from 'multer';
// import { join } from 'path'; // Import the path module

// interface LocalFilesInterceptorOptions {
//     fieldName: string;
//     path?: string;
// }

// function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
//     @Injectable()
//     class Interceptor implements NestInterceptor {
//         fileInterceptor: NestInterceptor;

//         constructor() {
//             const filesDestination = 'upload';
//             const destinationPath = options.path ? join(filesDestination, options.path) : filesDestination;

//             const multerOptions: MulterOptions = {
//                 storage: diskStorage({
//                     destination: (req, file, cb) => {
//                         cb(null, destinationPath.replace(/\\/g, '/')); // Normalize the path to use forward slashes
//                     },
//                     filename: (req, file, cb) => {
//                         console.log
//                         if (file)
//                             cb(null, `${Date.now()}-${file.originalname}`);
//                         else
//                             cb(null, '');

//                     }
//                 })
//             };

//             this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions))();
//         }

//         intercept(...args: Parameters<NestInterceptor['intercept']>) {
//             return this.fileInterceptor.intercept(...args);
//         }
//     }
//     return mixin(Interceptor);
// }

// export default LocalFilesInterceptor;
import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { join } from 'path'; // Import the path module
import { promises as fs } from 'fs'; // Import fs.promises for async file operations

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
                    destination: async (req, file, cb) => {
                        // Create directory if it does not exist
                        try {
                            await fs.mkdir(destinationPath, { recursive: true });
                            cb(null, destinationPath.replace(/\\/g, '/')); // Normalize the path to use forward slashes
                        } catch (error) {
                            cb(error, "");
                        }
                    },
                    filename: (req, file, cb) => {
                        const timestamp = Date.now().toString();
                        const filename = `${timestamp}-${file.originalname}`;
                        console.log(filename)
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
                }
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

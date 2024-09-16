// import { Injectable, Logger } from "@nestjs/common";
// import { exec } from "child_process";
// import { promisify } from 'util';

// const execPromise = promisify(exec);

// @Injectable()
// export class BackUpService {
//     private readonly logger = new Logger(BackUpService.name);
//     async backupDatabase() {
//         const date = new Date().toISOString().replace(/[:.]/g, '_');
//         console.log(new Date().toISOString())
//         const backupFile = `${process.env.BACKUPDIR}/mydatabase_backup_${date}.sql`;
//         const command = `pg_dump -U ${process.env.PGUSER} -h ${process.env.PGHOST} -p ${process.env.PORT} ${process.env.PGDATABASE} > ${backupFile}`;
//         try {
//             await execPromise(command);
//             this.logger.log(`Backup created successfully: ${backupFile}`);
//         } catch (error) {
//             this.logger.error('Error creating backup:', error);
//         }
//     }
// }
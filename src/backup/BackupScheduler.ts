import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { BackUpService } from "./backup.service";

@Injectable()
export class BackupScheduler {
    constructor(private readonly backupService: BackUpService) { }
    @Cron('1 1 * * * *')
    handleCron() {
        return this.backupService.backupDatabase()
    }
}
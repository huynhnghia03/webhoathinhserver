import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { BackUpService } from "./backup.service";

@Injectable()
export class BackupScheduler {
    constructor(private readonly backupService: BackUpService) { }
    @Cron('0 0 * * 0')
    handleCron() {
        return this.backupService.backupDatabase()
    }
}
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'entity/user.entity'; // Ensure correct path
import { AuthGuard } from './auth.guards';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        JwtModule.register({}),
    ],
    providers: [AuthGuard], // Ensure AuthGuard is listed here
    exports: [AuthGuard], // Export AuthGuard if used in other modules
})
export class GuardsModule { }

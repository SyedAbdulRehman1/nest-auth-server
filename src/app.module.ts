// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { InitialSetupService } from './prisma/initial-setup.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [AppController],

  providers: [InitialSetupService, AppService, UsersService],
})
export class AppModule implements OnModuleInit {
  constructor(private initialSetupService: InitialSetupService) {}

  async onModuleInit() {
    // Run initial setup when the application starts
    await this.initialSetupService.createTeacher();
  }
}

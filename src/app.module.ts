import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './user_auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule, PostsModule, CommentsModule, PrismaModule,
    JwtModule.register({
      global: true
    }),
  ],
  controllers: [],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { FriendsModule } from './friends/friends.module';
import { Friend } from './friends/entities/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'palette',
      port: 3306,
      username: 'root',
      password: 'palette',
      database: 'palette',
      synchronize: true,
      logging: false,
      entities: [User, Friend],
    }),
    UsersModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

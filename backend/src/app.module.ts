import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ActivityModule } from './activity/activity.module';
import { AuditModule } from './audit/audit.module';

// configuracion de la bd
@Module({
  imports: [AuthModule, ActivityModule,AuditModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port:3306,
    username:'paqueteria',
    password:'1234',
    database: 'paqueteria',
    autoLoadEntities:true,
    synchronize:false

  
  }),
  // jwt firmado con el acceso autorizado 
  JwtModule.register({
    global:true,
    secret:'secreto',
    signOptions:{
      expiresIn:'30min'
    }

  })
],
  controllers: [],
  providers: [],
})
export class AppModule {}

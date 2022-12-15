import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @Column()
  email: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  uid: string;

  @Column()
  name: string;

  @Column()
  email: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friends')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid_src: string;

  @Column()
  uid_dst: string;

  @Column()
  accepted: number;
}

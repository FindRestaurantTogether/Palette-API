import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friends')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 36,
  })
  uid_src: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  uid_dst: string;

  @Column()
  isAccepted: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('drugs')
export class Drug {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastFetched: Date;
} 
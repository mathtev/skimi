import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Level from './Level';
import Word from './Word';


@ObjectType()
@Entity()
class Translation extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Word, { defaultValue: [] })
  @ManyToOne(() => Word)
  @JoinColumn({ name: "enWordId", referencedColumnName: "id"})
  wordFrom: Word;

  @Field(() => Word, { defaultValue: [] })
  @ManyToOne(() => Word)
  @JoinColumn({ name: "deWordId", referencedColumnName: "id"})
  wordTo: Word;

  @Field(() => Level)
  @OneToOne(() => Level)
  @JoinColumn({ name: "levelId", referencedColumnName: "id"})
  level: Level;

  @Field(() => Int)
  @Column('integer')
  enWordId: number;

  @Field(() => Int)
  @Column('integer')
  deWordId: number;

  @Field(() => Int)
  @Column("integer")
  levelId: number;
}

export default Translation;

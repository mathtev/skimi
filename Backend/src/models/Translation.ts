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
  @JoinColumn({ name: "en_word_id", referencedColumnName: "id"})
  word_from: Word;

  @Field(() => Word, { defaultValue: [] })
  @ManyToOne(() => Word)
  @JoinColumn({ name: "de_word_id", referencedColumnName: "id"})
  word_to: Word;

  @Field(() => Level)
  @OneToOne(() => Level)
  @JoinColumn({ name: "level_id", referencedColumnName: "id"})
  level: Level;

  @Field(() => Int)
  @Column('integer')
  en_word_id: number;

  @Field(() => Int)
  @Column('integer')
  de_word_id: number;

  @Field(() => Int)
  @Column("integer")
  level_id: number;
}

export default Translation;

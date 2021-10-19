import { Field, ID, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Word } from '.';

@ObjectType()
@Entity()
class Translation extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Word, { defaultValue: [] })
  @ManyToOne(() => Word)
  @JoinColumn({ name: "de_word_id", referencedColumnName: "id"})
  word: Word;

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

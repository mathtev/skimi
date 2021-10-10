import { Field, ID, ObjectType } from 'type-graphql';
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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Word)
  @JoinColumn({ name: "de_word_id", referencedColumnName: "id"})
  word: Word;

  @Field(() => ID)
  @RelationId((translation: Translation) => translation.word)
  en_word_id: number;

  @Field(() => ID)
  @Column('integer')
  de_word_id: number;
}

export default Translation;
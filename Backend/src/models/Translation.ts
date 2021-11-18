import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Level from './Level';
import Sentence from './Sentence';
import TranslationSet from './TranslationSet';
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
  @TypeormLoader((type) => Word, (translation: Translation) => translation.enWordId)
  wordFrom: Word;

  @Field(() => Word, { defaultValue: [] })
  @ManyToOne(() => Word)
  @JoinColumn({ name: "deWordId", referencedColumnName: "id"})
  @TypeormLoader((type) => Word, (translation: Translation) => translation.deWordId)
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

  @Field(() => [TranslationSet], { defaultValue: [] })
  @OneToMany(type => TranslationSet, translationSet => translationSet.translation)
  translationSets: TranslationSet[];

  @Field(type => [Sentence], { defaultValue: [] })
  @OneToMany(type => Sentence, sentence => sentence.translation)
  sentences: Sentence[];
}

export default Translation;

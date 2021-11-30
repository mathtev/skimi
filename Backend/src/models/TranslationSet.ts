import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Set from './Set';
import Translation from './Translation';

@ObjectType()
@Entity()
class TranslationSet extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  translationId: number;

  @Field(() => Int)
  @Column()
  setId: number;

  @Field(() => Int, { nullable: true })
  @Column()
  skill: number;


  @Field(() => Set)
  @ManyToOne((type) => Set, (set) => set.translationSetGroup, { primary: true })
  @TypeormLoader((type) => Set, (translationSet: TranslationSet) => translationSet.setId)
  set: Set;

  @Field(() => Translation)
  @ManyToOne((type) => Translation, (translation) => translation.translationSetGroup, { primary: true })
  @TypeormLoader((type) => Translation, (translationSet: TranslationSet) => translationSet.translationId)
  translation: Translation;
}

export default TranslationSet;

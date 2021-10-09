import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Translation } from '.';

@ObjectType()
@Entity()
class Word extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column("integer")
  language_id: number;

  @Field()
  @Column("integer")
  level_id: number;

  @Field(type => [Translation], { defaultValue: [] })
  @OneToMany(type => Translation, translation => translation.word)
  translations: Translation[];
}

export default Word;
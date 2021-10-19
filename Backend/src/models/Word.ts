import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Translation } from '.';

@ObjectType()
@Entity()
class Word extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field(() => Int)
  @Column("integer")
  language_id: number;

  @Field(type => [Translation], { defaultValue: [] })
  @OneToMany(type => Translation, translation => translation.word)
  translations: Translation[];
}

export default Word;
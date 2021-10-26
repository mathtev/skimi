import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
class Sentence extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;


  @Field()
  @Column('text')
  word_text: string;

  @Field(() => Int)
  @Column("integer")
  word_id: number;
}

export default Sentence;
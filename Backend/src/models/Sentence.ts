import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Translation from './Translation';

@ObjectType()
@Entity()
class Sentence extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  textFrom: string;

  @Field()
  @Column('text')
  textTo: string;

  @Field(() => Int)
  @Column("integer")
  translationId: number;

  @Field(() => Translation, { defaultValue: [] })
  @ManyToOne(() => Translation)
  @JoinColumn({ name: "translationId", referencedColumnName: "id"})
  @TypeormLoader((type) => Translation, (sentence: Sentence) => sentence.translationId)
  translation: Translation;
}

export default Sentence;
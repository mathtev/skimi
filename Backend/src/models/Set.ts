import { Field, ID, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import Profile from './Profile';
import Translation from './Translation';

@ObjectType()
@Entity()
class Set extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Int)
  @Column('integer')
  profileId: number;

  @Field(() => Profile, { defaultValue: [] })
  @ManyToOne(() => Profile)
  profile: Profile;

  @Field(() => [Translation], { defaultValue: [] })
  @ManyToMany(() => Translation)
  @JoinTable({
    name: 'translation_set',
    joinColumn: {
      name: 'setId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'translationId',
      referencedColumnName: 'id',
    },
  })
  translations: Translation[];
}

export default Set;

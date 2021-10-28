import { Field, ID, Int, ObjectType } from 'type-graphql';
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
  created_at: Date;

  @Field(() => Int)
  @Column('integer')
  profile_id: number;

  @Field(() => Profile, { defaultValue: [] })
  @ManyToOne(() => Profile)
  @JoinColumn({ name: "set_id", referencedColumnName: "id"})
  profile: Profile;

  @ManyToMany(() => Translation)
  @JoinTable({
    name: "translation_set",
    joinColumn: {
        name: "set_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "translation_id",
        referencedColumnName: "id"
    }
})
  translations: Translation[];
}

export default Set;

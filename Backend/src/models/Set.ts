import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

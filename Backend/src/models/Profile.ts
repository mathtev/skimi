import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
class Profile extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('integer')
  estimated_level: number;

  @Field()
  @Column('text')
  name: string;

  @Field(() => Int)
  @Column("integer")
  user_id: number;
}

export default Profile;
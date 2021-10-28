import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Level from './Level';
import Set from './Set';
import User from './User';

@ObjectType()
@Entity()
class Profile extends BaseEntity {
  @Field(() => Int, {nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field(() => Int)
  @Column("integer")
  user_id: number;

  @Field(() => Int)
  @Column("integer")
  level_id: number;

  @Field(() => Level)
  @OneToOne(() => Level)
  @JoinColumn({ name: "level_id", referencedColumnName: "id"})
  level: Level;  

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id"})
  user: User;
  
  @Field(type => [Set], { defaultValue: [] })
  @OneToMany(type => Set, set => set.profile)
  sets: Set[];
}

export default Profile;
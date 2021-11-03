import { Field, ID, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
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
  userId: number;

  @Field(() => Int)
  @Column("integer")
  levelId: number;

  @Field(() => Level)
  @OneToOne(() => Level)
  @JoinColumn({ name: "levelId", referencedColumnName: "id"})
  level: Level;  

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id"})
  user: User;
  
  @Field(type => [Set], { defaultValue: [] })
  @OneToMany(type => Set, set => set.profile)
  @TypeormLoader((set: Set) => set.profileId, { selfKey: true })
  sets: Set[];
}

export default Profile;
import { EntityNotFoundError } from "../utils/customErrors";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import Lesson from "../models/Lesson";

type EntityTypes = typeof Lesson;
type EntityInstance = Lesson;

const entities: { [key: string]: EntityTypes } = {
  Lesson
};

export const findEntityById = async <T extends EntityTypes>(
  Entity: T,
  id: number | string,
  options?: FindOneOptions
): Promise<InstanceType<T>> => {
  const instance = await Entity.findOne(id, options);
  if (!instance) {
    throw new EntityNotFoundError(Entity.name);
  }
  return instance;
};

export const findAllEntities = async <T extends EntityTypes>(
  Entity: T,
  options?: FindOneOptions
): Promise<InstanceType<T>[]> => {
  const instances = await Entity.find(options);
  if (!instances) {
    throw new Error(`${Entity} entity not found`);
  }
  return instances;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(
  instance: T
): Promise<T> => {
  const Entity = entities[instance.constructor.name];

  if ("validations" in Entity) {
    //...
  }
  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityTypes>(
  Constructor: T,
  input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  return validateAndSaveEntity(instance as InstanceType<T>);
};

export const updateEntity = async <T extends EntityTypes>(
  Entity: T,
  id: number | string,
  input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
  const instance = await findEntityById(Entity, id);
  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};

export const deleteEntity = async <T extends EntityTypes>(
  Entity: T,
  id: number | string
): Promise<InstanceType<T>> => {
  const instance = await findEntityById(Entity, id);
  await instance.remove();
  return instance;
};
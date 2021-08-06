"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntity = exports.updateEntity = exports.createEntity = exports.validateAndSaveEntity = exports.findEntityOrThrow = void 0;
const Lesson_1 = __importDefault(require("../models/Lesson"));
const entities = {
    Lesson: Lesson_1.default
};
const findEntityOrThrow = (Entity, id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield Entity.findOne(id, options);
    if (!instance) {
        throw new Error(`=== ${Entity} entity not found`);
    }
    return instance;
});
exports.findEntityOrThrow = findEntityOrThrow;
const validateAndSaveEntity = (instance) => __awaiter(void 0, void 0, void 0, function* () {
    const Entity = entities[instance.constructor.name];
    if ("validations" in Entity) {
    }
    return instance.save();
});
exports.validateAndSaveEntity = validateAndSaveEntity;
const createEntity = (Constructor, input) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = Constructor.create(input);
    return exports.validateAndSaveEntity(instance);
});
exports.createEntity = createEntity;
const updateEntity = (Entity, id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield exports.findEntityOrThrow(Entity, id);
    Object.assign(instance, input);
    return exports.validateAndSaveEntity(instance);
});
exports.updateEntity = updateEntity;
const deleteEntity = (Entity, id) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = yield exports.findEntityOrThrow(Entity, id);
    yield instance.remove();
    return instance;
});
exports.deleteEntity = deleteEntity;
//# sourceMappingURL=typeorm.js.map
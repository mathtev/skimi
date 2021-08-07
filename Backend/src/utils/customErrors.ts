export class CustomError extends Error {
  constructor(
    public message: string = "No message",
    public code: string | number = "INTERNAL_ERROR",
    public status: number = 500,
  ) {
    super();
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(url: string) {
    super(`Route '${url}' does not exist.`, "ROUTE_NOT_FOUND", 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityName: string) {
    super(`Entity ${entityName} not found.`, "ENTITY_NOT_FOUND", 404);
  }
}
import { schema } from "./apollo/schema";
import { logger } from "./logger";

const typesCount = Object.values(schema.getTypeMap()).length;

logger.info(`Generating schema: ${typesCount} types found`);

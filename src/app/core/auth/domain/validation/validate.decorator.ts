import 'reflect-metadata';
import { ValidationError } from '../errors';
import { ValidationUtils as V } from './validation.utils';

declare const Reflect: {
  getOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any;
  defineMetadata(metadataKey: any, metadataValue: any, target: any, propertyKey?: string | symbol): void;
  getMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any;
};

type ValidatorFn = (value: any, paramName: string) => void;

/**
 * Options for the @Validate decorator
 */
interface ValidateOptions {
  /**
   * The validator function to use
   */
  validator: ValidatorFn;
  /**
   * Custom error message
   */
  message?: string;
  /**
   * Whether to allow null/undefined values
   * @default false
   */
  optional?: boolean;
}

/**
 * Metadata key for parameter validations
 */
const VALIDATE_METADATA_KEY = Symbol('validate');

/**
 * Decorator factory for method parameter validation
 */
function validate(options: ValidateOptions): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
    if (propertyKey === undefined) {
      throw new Error('Cannot use @validate decorator on a constructor parameter');
    }
    const existingValidations: Array<{
      index: number;
      options: ValidateOptions;
    }> = Reflect.getOwnMetadata(VALIDATE_METADATA_KEY, target, propertyKey) || [];

    existingValidations.push({
      index: parameterIndex,
      options,
    });

    Reflect.defineMetadata(
      VALIDATE_METADATA_KEY,
      existingValidations,
      target,
      propertyKey
    );
  };
}

/**
 * Validates that a string is not empty
 */
function NotEmpty(message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.notEmpty(value, paramName, message);
    },
    message,
  });
}

/**
 * Validates that a value is a valid email
 */
function IsEmail(message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.email(value, paramName, message);
    },
    message: message || 'Invalid email format',
  });
}

/**
 * Validates that a number is within a range
 */
function InRange(min: number, max: number, message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.inRange(value, paramName, min, max, message);
    },
    message: message || `Value must be between ${min} and ${max}`,
  });
}

/**
 * Validates that a string matches a regex pattern
 */
function Matches(pattern: RegExp, message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.matches(value, paramName, pattern, message);
    },
    message: message || 'Value does not match required pattern',
  });
}

/**
 * Validates that a string has a minimum length
 */
function MinLength(min: number, message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.minLength(value, paramName, min, message);
    },
    message: message || `Must be at least ${min} characters long`,
  });
}

/**
 * Validates that a string has a maximum length
 */
function MaxLength(max: number, message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.maxLength(value, paramName, max, message);
    },
    message: message || `Cannot be longer than ${max} characters`,
  });
}

/**
 * Validates that a value is one of the allowed values
 */
function IsIn<T>(allowedValues: readonly T[], message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      V.oneOf(value, paramName, allowedValues, message);
    },
    message: message || `Must be one of: ${allowedValues.join(', ')}`,
  });
}

/**
 * Validates that a value is a valid UUID
 */
function IsUUID(version?: 1 | 2 | 3 | 4 | 5, message?: string): ParameterDecorator {
  const patterns = {
    1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    2: /^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    3: /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  };

  const pattern = version ? patterns[version] : /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  return validate({
    validator: (value, paramName) => {
      V.matches(value, paramName, pattern, message || 'Invalid UUID format');
    },
    message: message || 'Invalid UUID format',
  });
}

/**
 * Validates that a value is a valid URL
 */
function IsUrl(message?: string): ParameterDecorator {
  return validate({
    validator: (value, paramName) => {
      try {
        new URL(value);
      } catch {
        throw new ValidationError(
          message || 'Invalid URL format',
          paramName,
          { value }
        );
      }
    },
    message: message || 'Invalid URL format',
  });
}

/**
 * Middleware to apply method parameter validations
 */
function validateParams(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const validations: Array<{
      index: number;
      options: ValidateOptions;
    }> = Reflect.getOwnMetadata(VALIDATE_METADATA_KEY, target, propertyKey) || [];

    for (const { index, options } of validations) {
      const paramValue = args[index];
      const paramName = getParamName(target, propertyKey, index) || `param${index}`;

      if (paramValue === undefined || paramValue === null) {
        if (!options.optional) {
          throw new ValidationError(
            options.message || `${paramName} is required`,
            paramName,
            { value: paramValue }
          );
        }
        continue;
      }

      try {
        options.validator(paramValue, paramName);
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error;
        }
        throw new ValidationError(
          options.message || `Validation failed for ${paramName}`,
          paramName,
          { value: paramValue, cause: error },
          error instanceof Error ? error : undefined
        );
      }
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

/**
 * Helper to get parameter names for better error messages
 */
function getParamName(target: any, propertyKey: string | symbol, index: number): string | undefined {
  if (typeof propertyKey === 'symbol') return undefined;
  
  const func = target[propertyKey];
  if (typeof func !== 'function') return undefined;

  const funcStr = func.toString();
  const paramMatch = funcStr.match(/\(([^)]*)\)/);
  if (!paramMatch) return undefined;

  const params = paramMatch[1].split(',').map((p: string) => p.trim().replace(/[\s,].*/, ''));
  return params[index];
}

export {
  validate,
  validateParams,
  NotEmpty,
  IsEmail,
  InRange,
  Matches,
  MinLength,
  MaxLength,
  IsIn,
  IsUUID,
  IsUrl,
};

export type { ValidateOptions };

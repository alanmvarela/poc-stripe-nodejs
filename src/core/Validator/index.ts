// Validator import
import { ValidatorFunction } from "./rules";

type Rules = {
  [key: string]: ValidatorFunction[];
};

export type ValidatorErrorMessages<T> = {
  [key in keyof T]?: string[];
};

type MakeValidator = <T>(rules: Rules) => (entity: unknown) => {
  hasErrors: boolean;
  errors: ValidatorErrorMessages<T>;
};

const makeValidator: MakeValidator =
  <T>(rules: Rules) =>
  (entity) => {
    const errors = Object.keys(rules).reduce<ValidatorErrorMessages<T>>(
      (accumulator, key) => {
        const errorMessages = rules[key]
          .map((rule) => rule(entity[key], key))
          .filter((message) => typeof message === "string");

        if (errorMessages.length) {
          accumulator[key] = errorMessages;
        }

        return accumulator;
      },
      {}
    );

    const result = {
      hasErrors: !!Object.keys(errors).length,
      errors,
    };

    return result;
  };

export default makeValidator;

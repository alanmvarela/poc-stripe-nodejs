export type ValidatorFunction = (value: unknown, key: string) => string | true;
export type Rule = (message?: string, ...rest: unknown[]) => ValidatorFunction;

export const notEmpty: Rule = (message) => (value: string, key) => {
  if (value.trim() === "") return message || `${key} can't be empty.`;

  return true;
};

export const isEmail: Rule = (message) => (value: string, key) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!value.match(emailRegex))
    return message || `${key} "${value}" is not a valid email.`;

  return true;
};

export const minLength: Rule =
  (message, minLength: number) => (value: string, key) => {
    if (value.length < minLength)
      return message || `Min length of ${key} is ${minLength}.`;

    return true;
  };

export const maxLength: Rule =
  (message, maxLength: number) => (value: string, key) => {
    if (value.length > maxLength)
      return message || `Max length of ${key} is ${maxLength}.`;

    return true;
  };

export const isDate: Rule = (message) => (value: string, key) => {
  if (Number.isNaN(Date.parse(value)))
    return message || `${key} is not a valid date.`;
  return true;
};

export const arrayRule: Rule =
  (message, validator: ValidatorFunction) => (value: string[], key) => {
    const errorMessages = value
      .map((element) => validator(element, key))
      .filter((result) => typeof result === "string")
      .join(" ");

    return errorMessages || true;
  };

export const isBoolean: Rule = (message) => (value: boolean, key) => {
  if (typeof value !== "boolean") return message || `${key} must be boolean.`;
  return true;
};

export const min: Rule = (message, min: number) => (value: number, key) => {
  if (value < min) return message || `Min length of ${key} is ${min}.`;

  return true;
};

export const max: Rule = (message, max: number) => (value: number, key) => {
  if (value > max) return message || `Max length of ${key} is ${max}.`;

  return true;
};

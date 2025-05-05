import { describe, test, expect } from "bun:test";
import { snakeKebabToCamel } from "../utils";

describe("snakeKebabToCamel", () => {
  // Test snake_case conversion
  test("converts snake_case to camelCase", () => {
    expect(snakeKebabToCamel("snake_case")).toBe("snakeCase");
    expect(snakeKebabToCamel("multiple_word_snake_case")).toBe("multipleWordSnakeCase");
    expect(snakeKebabToCamel("single_letter_s")).toBe("singleLetterS");
  });

  // Test kebab-case conversion
  test("converts kebab-case to camelCase", () => {
    expect(snakeKebabToCamel("kebab-case")).toBe("kebabCase");
    expect(snakeKebabToCamel("multiple-word-kebab-case")).toBe("multipleWordKebabCase");
    expect(snakeKebabToCamel("single-letter-k")).toBe("singleLetterK");
  });

  // Test mixed snake_case and kebab-case
  test("converts mixed snake_case and kebab-case to camelCase", () => {
    expect(snakeKebabToCamel("snake_and-kebab")).toBe("snakeAndKebab");
    expect(snakeKebabToCamel("kebab-and_snake")).toBe("kebabAndSnake");
    expect(snakeKebabToCamel("multiple_word-mixed-case_example")).toBe("multipleWordMixedCaseExample");
  });

  // Test edge cases
  test("handles edge cases correctly", () => {
    // Empty string
    expect(snakeKebabToCamel("")).toBe("");

    // No underscores or hyphens
    expect(snakeKebabToCamel("alreadycamelcase")).toBe("alreadycamelcase");
    expect(snakeKebabToCamel("PascalCase")).toBe("pascalcase");

    // Consecutive underscores or hyphens
    expect(snakeKebabToCamel("double__underscore")).toBe("double_Underscore");
    expect(snakeKebabToCamel("double--hyphen")).toBe("double-Hyphen");

    // Underscore or hyphen at the beginning
    expect(snakeKebabToCamel("_leading_underscore")).toBe("LeadingUnderscore");
    expect(snakeKebabToCamel("-leading-hyphen")).toBe("LeadingHyphen");

    // Underscore or hyphen at the end
    expect(snakeKebabToCamel("trailing_underscore_")).toBe("trailingUnderscore_");
    expect(snakeKebabToCamel("trailing-hyphen-")).toBe("trailingHyphen-");

    // Special characters
    expect(snakeKebabToCamel("special_@_character")).toBe("special_@Character");
    expect(snakeKebabToCamel("special-@-character")).toBe("special-@Character");

    // Numbers
    expect(snakeKebabToCamel("with_123_numbers")).toBe("with_123Numbers");
    expect(snakeKebabToCamel("with-123-numbers")).toBe("with-123Numbers");
  });
});

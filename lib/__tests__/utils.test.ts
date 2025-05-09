import { describe, test, expect } from "bun:test";
import {parseTemplateString, snakeKebabToCamel} from "../utils";

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

describe("parseTemplateString", () => {
  test("replaces a single placeholder", () => {
    const input = "Hello {{name}}!"
    const result = parseTemplateString(input, { name: "Alex" })
    expect(result).toBe("Hello Alex!")
  })

  test("replaces multiple placeholders", () => {
    const input = "Name: {{name}}, Age: {{age}}"
    const result = parseTemplateString(input, { name: "Alex", age: 30 })
    expect(result).toBe("Name: Alex, Age: 30")
  })

  test("replaces same placeholder multiple times", () => {
    const input = "{{word}} is the word. Yes, {{word}}!"
    const result = parseTemplateString(input, { word: "Test" })
    expect(result).toBe("Test is the word. Yes, Test!")
  })

  test("leaves unknown placeholders intact", () => {
    const input = "Hello {{name}}, your code is {{status}}"
    const result = parseTemplateString(input, { name: "Alex" })
    expect(result).toBe("Hello Alex, your code is {{status}}")
  })

  test("handles placeholders with spaces", () => {
    const input = "Hello {{ name }}!"
    const result = parseTemplateString(input, { name: "Alex" })
    expect(result).toBe("Hello Alex!")
  })

  test("works with numeric values", () => {
    const input = "You have {{count}} unread messages"
    const result = parseTemplateString(input, { count: 5 })
    expect(result).toBe("You have 5 unread messages")
  })

  test("works with empty values", () => {
    const input = "Field: {{empty}}"
    const result = parseTemplateString(input, { empty: "" })
    expect(result).toBe("Field: ")
  })

  test("does not replace if no match found", () => {
    const input = "No placeholders here"
    const result = parseTemplateString(input, { anything: "value" })
    expect(result).toBe("No placeholders here")
  })

  test("handles template with adjacent placeholders", () => {
    const input = "{{a}}{{b}}{{c}}"
    const result = parseTemplateString(input, { a: 1, b: 2, c: 3 })
    expect(result).toBe("123")
  })

  test("returns empty string when passed undefined", () => {
    const result = parseTemplateString(undefined, { name: "Alex" })
    expect(result).toBe("")
  })
});

---
title: Normalize Product Tags
slug: normalize-product-tags
category: typescript
type: data-transformation
difficulty: easy
penalty: 0
hasPreview: false
---

# Normalize Product Tags

## Focus areas

- array transformation
- string normalization
- defensive data handling
- small pure function design
- readability

## Task

You are given a list of products.
Each product contains a `tags` field, but the data is inconsistent.

Some tags may contain:

- leading or trailing whitespace
- duplicated values
- different letter casing
- empty strings
- non-meaningful separator noise

Your task is to implement a utility that normalizes the tags for each product.

The goal is to produce clean, predictable output that can safely be used elsewhere in the application.

Keep the solution small, practical, and easy to explain.

## Requirements

- trim whitespace around each tag
- remove empty tags
- normalize all tags to lowercase
- remove duplicates within the same product
- preserve the original product shape
- return a new array instead of mutating the input
- keep the solution as a small pure utility
- use TypeScript without `any`

## Optional edge cases

- a product may have no tags
- all tags for a product may become empty after cleanup
- duplicate tags may appear with different casing
- a tag may contain multiple internal spaces that should remain unchanged

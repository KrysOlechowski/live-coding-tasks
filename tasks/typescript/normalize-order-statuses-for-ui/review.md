# Review

## Findings

No functional issues found.

## Notes

- The normalization handles both `status` and `state`.
- Missing and unexpected values fall back safely to `"Unknown"`.
- Case-insensitive input such as `"PAID"` is handled correctly.
- The returned array is derived via `map`, so the input is not mutated.

## Residual risks

- The conflict rule for `status` vs `state` is a reasonable assumption, but it is still an assumption because the brief does not define precedence explicitly.
- The focus area mentions discriminated unions, but the task requirements do not actually require them, so not using one is acceptable here.

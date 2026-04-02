# Review

## Findings

1. [main.tsx:27](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-async-product-list-fetch-and-ui-state-issues/main.tsx#L27) You correctly noticed the missing `res.ok` check, but the more important production consequence is that a non-2xx response with JSON can still flow into the success path and produce inconsistent UI state instead of a proper error state.

2. [main.tsx:18](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-async-product-list-fetch-and-ui-state-issues/main.tsx#L18) You called out `visibleProducts` as derived state, which is correct, but you did not mention that `products` is also effectively duplicated state here because the component renders only `visibleProducts`. The state model is harder to keep consistent than it needs to be.

3. [main.tsx:24](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-async-product-list-fetch-and-ui-state-issues/main.tsx#L24) An important issue you missed is stale UI state across requests. The effect never clears `error` before a new load and never clears old data when a request is starting or fails, so the UI can show stale error or stale product data after category changes.

4. [main.tsx:24](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-async-product-list-fetch-and-ui-state-issues/main.tsx#L24) You mentioned unmount cleanup, but not the race-condition-adjacent problem when `categoryId` changes quickly. A slower old request can resolve after a newer one and overwrite the latest result.

5. [main.tsx:52](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-async-product-list-fetch-and-ui-state-issues/main.tsx#L52) You correctly noted unsafe optional data handling. This matters both for `product.price!.toFixed(2)` and for rendering `product.name` directly when the API can omit optional fields.

## Assessment

Your review caught several of the right issues:

- missing response validation
- derived `visibleProducts` state
- missing cleanup for in-flight requests
- unsafe optional field assumptions

That is a solid start. The main gap is that you did not identify the stale-state and request-ordering problems clearly enough, especially:

- stale error/data across retries or category changes
- older requests overwriting newer results
- the unnecessarily complex state model with both `products` and `visibleProducts`

Because an important async reliability issue was missed, this needs a light penalty suffix.

## Notes

- The strongest review would prioritize request lifecycle correctness first, then discuss maintainability of the state shape.
- Your current comments are directionally good, but they stop short of explaining how the broken states would actually appear in the UI.

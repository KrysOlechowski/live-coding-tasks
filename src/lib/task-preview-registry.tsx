import DashboardWidgetLoadingAndErrorStates from "../../tasks/react/dashboard-widget-loading-and-error-states/main";
import EditableOrderItemsPanelWithDerivedTotals from "../../tasks/react/editable-order-items-panel-with-derived-totals/main";
import ProductFiltersWithSharedStateAndActiveSummary from "../../tasks/react/product-filters-with-shared-state-and-active-summary/main";
import FixDuplicateSelectionInTagPicker from "../../tasks/debugging/fix-duplicate-selection-in-tag-picker/main";
import FixSearchFilteringLagByOneCharacter from "../../tasks/debugging/fix-search-filtering-lag-by-one-character/main";
import FixStaleCounterUpdates from "../../tasks/debugging/fix-stale-counter-updates/main";
import FixStaleSelectedUserDetails from "../../tasks/debugging/fix-stale-selected-user-details/main";
import ReviewAsyncProductListFetchAndUiStateIssues from "../../tasks/debugging/review-async-product-list-fetch-and-ui-state-issues/main";
import ReviewUserPanelStateAndEffectIssues from "../../tasks/debugging/review-user-panel-state-and-effect-issues/main";

export function renderTaskPreview(slug: string) {
  switch (slug) {
    case "dashboard-widget-loading-and-error-states":
      return <DashboardWidgetLoadingAndErrorStates />;
    case "editable-order-items-panel-with-derived-totals":
      return <EditableOrderItemsPanelWithDerivedTotals />;
    case "product-filters-with-shared-state-and-active-summary":
      return <ProductFiltersWithSharedStateAndActiveSummary />;
    case "fix-duplicate-selection-in-tag-picker":
      return <FixDuplicateSelectionInTagPicker />;
    case "fix-search-filtering-lag-by-one-character":
      return <FixSearchFilteringLagByOneCharacter />;
    case "fix-stale-counter-updates":
      return <FixStaleCounterUpdates />;
    case "fix-stale-selected-user-details":
      return <FixStaleSelectedUserDetails />;
    case "review-async-product-list-fetch-and-ui-state-issues":
      return <ReviewAsyncProductListFetchAndUiStateIssues />;
    case "review-user-panel-state-and-effect-issues":
      return <ReviewUserPanelStateAndEffectIssues />;
    default:
      return null;
  }
}

import { PublicProductDTO } from "@/db/data-access/public";

export type GridState = {
  products: PublicProductDTO[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
};

export type GridAction =
  | { type: "RESET"; payload: PublicProductDTO[] }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" }
  | { type: "APPEND_DATA"; payload: PublicProductDTO[] };

export function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case "RESET":
      return {
        products: action.payload,
        page: 2, // Reset to next page
        hasMore: action.payload.length > 0,
        isLoading: false,
      };

    case "START_LOADING":
      return { ...state, isLoading: true };

    case "STOP_LOADING":
      return { ...state, isLoading: false };

    case "APPEND_DATA": {
      // CRITICAL FIX: Deduplicate items based on ID
      const existingIds = new Set(state.products.map((p) => p.id));
      const newUniqueProducts = action.payload.filter(
        (p) => !existingIds.has(p.id),
      );

      return {
        ...state,
        products: [...state.products, ...newUniqueProducts],
        page: state.page + 1,
        hasMore: action.payload.length > 0,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}

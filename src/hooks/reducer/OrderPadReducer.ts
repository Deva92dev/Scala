import { parseBulkText, ParsedItem } from "@/lib/parsers";

export type OrderPadState = {
  input: string;
  stage: "input" | "preview" | "result";
  parsedItem: ParsedItem[];
  // result data
  lastBatchId: string | null;
  failedSkus: string[];
  addedCount: number;
};

export type OrderPadAction =
  | { type: "SET_INPUT"; payload: string }
  | { type: "PREVIEW_ORDER" }
  | { type: "EDIT_ORDER" }
  | {
      type: "SUBMIT_SUCCESS";
      payload: { batchId: string | null; failedSkus: string[]; count: number };
    }
  | { type: "RESET_FORM" };

export const initialState: OrderPadState = {
  input: "",
  stage: "input",
  parsedItem: [],
  lastBatchId: null,
  failedSkus: [],
  addedCount: 0,
};

export const orderPadReducer = (
  state: OrderPadState,
  action: OrderPadAction
): OrderPadState => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "PREVIEW_ORDER":
      const items = parseBulkText(state.input);
      if (items.length === 0) return state;
      return { ...state, parsedItem: items, stage: "preview" };

    case "EDIT_ORDER":
      return { ...state, stage: "input" };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        stage: "result",
        lastBatchId: action.payload.batchId,
        failedSkus: action.payload.failedSkus,
        addedCount: action.payload.count,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
};

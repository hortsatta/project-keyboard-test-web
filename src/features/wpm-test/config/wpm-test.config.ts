import { TestMode } from '../models/wpm-test.model';

export const timeSecondAmountList = [10, 30, 60, 120, 180];

export const wordAmountList = [30, 50, 100, 200, 300];

export const DEFAULT_TEST_OPTIONS = {
  [TestMode.Time]: {
    mode: TestMode.Time,
    timeWordAmount: timeSecondAmountList[2],
  },
  [TestMode.Word]: {
    mode: TestMode.Word,
    timeWordAmount: wordAmountList[2],
  },
  [TestMode.Zen]: {
    mode: TestMode.Zen,
    timeWordAmount: 0,
  },
};

export const DEFAULT_COMBO_COUNTER = {
  count: 0,
  highestCount: 0,
};

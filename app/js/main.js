import {
  setSearchFocus,
  showClearTextButton,
  clearSearchText,
  clearPushListener
} from "./searchBar.js";

import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine
} from "./searchResults.js";
import {
  getSearchTerm,
  retrieveSearchResults
} from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = grab("#search");
  search.addEventListener("input", showClearTextButton);
  const clear = grab("#clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);
  const form = grab("#searchBar");
  form.addEventListener("submit", submitTheSearch);
};

const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};

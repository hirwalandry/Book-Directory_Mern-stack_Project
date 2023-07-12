import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //finding the start index of the current page bh taking the current page and minus one and the answer be multiplied by page size that initialized
  const startIndex = (pageNumber - 1) * pageSize;
  // this return the items per page by using lodash in taking items array and slice it related to start index and page size then take the items values returned in one page
  return _(items).slice(startIndex).take(pageSize).value();
}

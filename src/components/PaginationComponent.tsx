/** @format */

import { Pagination } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setCurrentPage } from "../store/slices/paginationSlice";

export default function PaginationComponent() {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.pagination,
  );
  if (totalPages <= 1) return null;
  return (
    <Pagination
      value={currentPage}
      onChange={(page) => dispatch(setCurrentPage(page))}
      total={totalPages}
      mt='xl'
      style={{ display: "flex", justifyContent: "center" }}
    />
  );
}

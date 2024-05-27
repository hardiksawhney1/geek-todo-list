import { useState, useMemo, useEffect, useContext } from "react";
import styles from "./Tasktable.module.css";
import { filterbutton } from "../../assets_images";
import { useFirebase } from "../../context/Firebase";
import { useTask } from "../../context/TaskContext";

const tabsHorizontal = [
  { id: 1, title: "All" },
  { id: 2, title: "Pending" },
  { id: 3, title: "Completed" },
];
const TableReact = () => {
  const { taskArray, setTaskArray } = useTask();
  const { updateTaskStatus } = useTask();
  const [tempArray, setTempArray] = useState();

  const handleCheckboxChange = async (taskId, currentStatus) => {
    const newStatus = !currentStatus;
    await updateTaskStatus(taskId, newStatus);
    
  };
  const [latestTaskArray, setLatestTaskArray] = useState(taskArray);
  const { addTask } = useTask();
  useEffect(()=>{
    setLatestTaskArray(taskArray);
    
  },[taskArray]);
  // console.log(latestTaskArray);
  
  const [searchValue, setSearchValue] = useState();
  const [tasksToShow, setTasksToShow] = useState();
  const [productList, setProductList] = useState(latestTaskArray);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(productList?.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);
  function searchtaskArray(keyword) {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (!keyword == "") {
      const results = productList.filter((product) => {
        return (
          product.taskName.toLowerCase().includes(keyword) ||
          product.taskCategory.toLowerCase().includes(keyword) ||
          product.Product.toLowerCase().includes(keyword) ||
          product.Description.toLowerCase().includes(keyword) ||
          product.Price?.toString().toLowerCase().includes(keyword)
        );
      });
      setProductList(results);
      setRowsToShow(results.slice(0, rowsLimit));
      setCurrentPage(0);
      setTotalPage(Math.ceil(results?.length / rowsLimit));
      setCustomPagination(
        Array(Math.ceil(results?.length / rowsLimit)).fill(null)
      );
    } else {
      clearData();
    }
  }
  const clearData = () => {
    setSearchValue("");
    const sortedtaskArray = taskArray.slice().sort((a, b) => a.Price - b.Price);
    setProductList(sortedtaskArray);
    setRowsToShow(sortedtaskArray.slice(0, rowsLimit));
    setCustomPagination(
      Array(Math.ceil(taskArray?.length / rowsLimit)).fill(null)
    );
    setTotalPage(Math.ceil(taskArray?.length / rowsLimit));
  };
  const sortByColumn = (column, changeSortingColumn = true) => {
    if (column != "Price") {
      if (sortingColumn?.includes(column) && changeSortingColumn) {
        const sortData = productList
          .slice()
          .sort((a, b) =>
            b[column].toString().localeCompare(a[column].toString())
          );
        setRowsToShow(
          sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setProductList(sortData);
        }
      } else {
        const sortData = productList
          .slice()
          .sort((a, b) =>
            a[column].toString().localeCompare(b[column].toString())
          );
        setRowsToShow(
          sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
        );
        if (changeSortingColumn) {
          setProductList(sortData);
          setSortingColumn([`${column}`]);
        } else {
        }
      }
    } else {
      if (sortingColumn?.includes(column)) {
        const sortedtaskArray = productList
          .slice()
          .sort((a, b) => b.Price - a.Price);
        setRowsToShow(
          sortedtaskArray.slice(
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setProductList(sortedtaskArray);
        }
      } else {
        const sortedtaskArray = productList
          .slice()
          .sort((a, b) => a.Price - b.Price);
        setRowsToShow(
          sortedtaskArray.slice(
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([`${column}`]);
          setProductList(sortedtaskArray);
        }
      }
    }
    setActiveColumn([`${column}`]);
    // setCurrentPage(0);
  };
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = taskArray.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = productList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = taskArray.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, []);
  useEffect(() => {
    console.log(typeof latestTaskArray,"check")
    // setLatestTaskArray(taskArray);
    // const sortedtaskArray = taskArray.slice().sort((a, b) => a.Price - b.Price);
    setProductList(latestTaskArray);
    setRowsToShow(latestTaskArray.slice(0, rowsLimit));
  }, [latestTaskArray]);
  const [activeHorizontalTab, setActiveHorizontalTab] = useState(
    tabsHorizontal[0].id
  );


  useEffect(()=>{
    if(activeHorizontalTab===1){
      setLatestTaskArray(taskArray)
      console.log(activeHorizontalTab,"if")
    }
    if(activeHorizontalTab===2){
      const pendingTasks = taskArray.filter(task => !task.taskStatus);
      setLatestTaskArray(pendingTasks);      console.log(activeHorizontalTab,"if")
    }
    if(activeHorizontalTab===3){
      const pendingTasks = taskArray.filter(task => task.taskStatus);
      setLatestTaskArray(pendingTasks);
      console.log(activeHorizontalTab,"if")
    }
    console.log(activeHorizontalTab)

  },[activeHorizontalTab])
  return (
    <div className=" w-[93%] flex align-center m-auto items-center bg-white px-4  justify-center mt-[3vh] pl-[1.5vw] pr-[1.5vw]  pt-3 pb-14">
      <div className="w-full rpx-2">
        <div className={`${styles.tablenavbar} pb-3 pl-[1vw]`}>
          <p className="font-bold text-lg"> TASKS </p>
          <div className={styles.HorizontaltabsContainer}>
            <div className={styles.tabsHorizontal}>
              
              {tabsHorizontal.map((tabHorizontal) => (
                <div
                  key={tabHorizontal.id}
                  className={`${styles.tabHorizontal} ${
                    activeHorizontalTab === tabHorizontal.id
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => setActiveHorizontalTab(tabHorizontal.id)}
                  
                >
                  
                  {tabHorizontal.title}
                </div>

              ))}
            </div>
            {/* <img src={filterbutton} className={styles.filterbutton} /> */}
          </div>
        </div>


        {/* <div className="flex justify-end bg-[#222E3A]/[6%]  px-2  mt-2 py-2 border-2 border-b-0 border-black">
          <div className="px-2 bg-white py-3  rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2741 9.05133C11.1214 7.89518 11.5009 6.46176 11.3366 5.03784C11.1724 3.61391 10.4766 2.3045 9.38841 1.37157C8.30022 0.438638 6.8999 -0.0490148 5.4676 0.0061742C4.0353 0.0613632 2.67666 0.655324 1.66348 1.66923C0.650303 2.68313 0.0573143 4.0422 0.00315019 5.47454C-0.0510139 6.90687 0.437641 8.30685 1.37135 9.39437C2.30506 10.4819 3.61497 11.1768 5.03901 11.34C6.46305 11.5032 7.8962 11.1227 9.05174 10.2746H9.05087C9.07712 10.3096 9.10512 10.3428 9.13662 10.3752L12.5054 13.744C12.6694 13.9081 12.892 14.0004 13.1241 14.0005C13.3562 14.0006 13.5789 13.9085 13.7431 13.7444C13.9072 13.5803 13.9995 13.3578 13.9996 13.1256C13.9997 12.8935 13.9076 12.6709 13.7435 12.5067L10.3747 9.13796C10.3435 9.10629 10.3098 9.07704 10.2741 9.05046V9.05133ZM10.4999 5.68783C10.4999 6.31982 10.3754 6.94562 10.1335 7.5295C9.89169 8.11338 9.5372 8.6439 9.09032 9.09078C8.64344 9.53767 8.11291 9.89215 7.52903 10.134C6.94515 10.3759 6.31936 10.5003 5.68737 10.5003C5.05538 10.5003 4.42959 10.3759 3.84571 10.134C3.26183 9.89215 2.7313 9.53767 2.28442 9.09078C1.83754 8.6439 1.48305 8.11338 1.2412 7.5295C0.999349 6.94562 0.87487 6.31982 0.87487 5.68783C0.87487 4.41148 1.3819 3.1874 2.28442 2.28488C3.18694 1.38236 4.41102 0.875332 5.68737 0.875332C6.96372 0.875332 8.1878 1.38236 9.09032 2.28488C9.99284 3.1874 10.4999 4.41148 10.4999 5.68783Z"
                  fill="black"
                />
              </svg>
              <input
                type="text"
                className="max-w-[150px] text-sm bg-transparent focus:ring-0 border-transparent outline-none placeholder:text-black text-black w-[85%]"
                placeholder="Keyword Search"
                onChange={(e) => searchtaskArray(e.target.value)}
                value={searchValue}
              />
              <svg
                stroke="currentColor"
                fill="black"
                className={`text-black cursor-pointer ${
                  searchValue?.length > 0 ? "visible" : "invisible"
                }`}
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                onClick={clearData}
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </div>
          </div>
        </div> */}


        <div className="w-full flex justify-center items-center overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none">
          <table className=" text-center table-auto overflow-scroll md:overflow-auto w-full font-inter  ">
            <thead
              className={`rounded-lg text-base text-white bg-[#F1F1F5] font-semibold ${
                rowsToShow?.length > 0
                //   ? "border-b-0"
                //   : "border-b-2 border-black"
              }`}
            >
              <tr className="">
                <th className=" text-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  {/* ID */}
                </th>
                <th className=" text-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-[15vw] pl-[3vw]">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
                        activeColumn?.includes("taskName")
                          ? "text-black"
                          : "text-[#BCBDBE] group-hover:text-black rotate-180"
                      } ${
                        sortingColumn?.includes("taskName")
                          ? "rotate-180"
                          : "rotate-0"
                      }
           `}
                      onClick={() => sortByColumn("taskName")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1 text-center"
                      onClick={() => sortByColumn("taskName")}
                    >
                      TASK
                    </span>
                  </div>
                </th>
                <th className=" text-center py-3 px-3 flex items-center text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-[10vw]">
                  <svg
                    className={`w-4 h-4 cursor-pointer ${
                      activeColumn?.includes("taskCategory")
                        ? "text-black"
                        : "text-[#BCBDBE] group-hover:text-black rotate-180"
                    } ${
                      sortingColumn?.includes("taskCategory")
                        ? "rotate-180"
                        : "rotate-0"
                    } `}
                    onClick={() => sortByColumn("taskCategory")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span
                    className="cursor-pointer pl-1"
                    onClick={() => sortByColumn("taskCategory")}
                  >
                    CATEGORY
                  </span>
                </th>
                <th className=" text-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-[20vw] pl-[5vw]">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
                        activeColumn?.includes("taskTags")
                          ? "text-black"
                          : "text-[#BCBDBE] group-hover:text-black rotate-180"
                      } ${
                        sortingColumn?.includes("taskTags")
                          ? "rotate-180"
                          : "rotate-0"
                      } `}
                      onClick={() => sortByColumn("taskTags")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1"
                      onClick={() => sortByColumn("taskTags")}
                    >
                      TAGS
                    </span>
                  </div>
                </th>
                <th className=" text-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-[8vw] ">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
                        activeColumn?.includes("taskTime")
                          ? "text-black"
                          : "text-[#BCBDBE] group-hover:text-black rotate-180"
                      } ${
                        sortingColumn?.includes("taskTime")
                          ? "rotate-180"
                          : "rotate-0"
                      } `}
                      onClick={() => sortByColumn("taskTime")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1"
                      onClick={() => sortByColumn("taskTime")}
                    >
                      TIME
                    </span>
                  </div>
                </th>
                <th className=" text-center flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-[10vw]">
                  <svg
                    className={`w-4 h-4 cursor-pointer  ${
                      sortingColumn?.includes("taskDate")
                        ? "rotate-180"
                        : "rotate-0"
                    } ${
                      activeColumn?.includes("taskDate")
                        ? "text-black"
                        : "text-[#BCBDBE] group-hover:text-black rotate-180"
                    }`}
                    onClick={() => sortByColumn("taskDate")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span
                    className="cursor-pointer pl-1"
                    onClick={() => sortByColumn("taskDate")}
                  >
                    DUE DATE
                  </span>
                </th>
                <th className=" text-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group w-[10vw] ">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
                        activeColumn?.includes("taskStatus")
                          ? "text-black"
                          : "text-[#BCBDBE] group-hover:text-black rotate-180"
                      } ${
                        sortingColumn?.includes("taskStatus")
                          ? "rotate-180"
                          : "rotate-0"
                      } `}
                      onClick={() => sortByColumn("taskStatus")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1"
                      onClick={() => sortByColumn("taskStatus")}
                    >
                      STATUS
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {rowsToShow?.map((data, index) => (
                <tr
                  className={`${index % 2 == 0 ? "bg-white" : "bg-[#F1F1F1]"}`}
                  key={index}
                >
                  <td
                    className={`py-2 px-3 font-normal text-base max-w-[100px]  ${
                      index == 0 ? "" : index == rowsToShow?.length ? "" : ""
                    } whitespace-nowrap`}
                  >
                    {/* <input type="checkbox" /> */}

                    <label className={styles.checkboxContainer}>
                    <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={data?.taskStatus}
                  onChange={() => handleCheckboxChange(data.id, data.taskStatus)}
                />
                      <span className={styles.checkboxCustom}></span>
                    </label>
                  </td>
                  <td
                    className={`py-2 px-3 text-center font-normal text-base max-w-[100px]  ${
                      index == 0 ? "" : index == rowsToShow?.length ? "" : ""
                    } whitespace-nowrap`}
                  >
                    {data?.taskName}
                  </td>
                  <td
                    className={`py-2 px-3 text-center font-normal max-w-[100px]  text-base ${
                      index == 0
                        ? ""
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.taskCategory}
                  </td>
                  <td
                    className={`py-2 px-3 text-base text-center font-normal max-w-[100px]  ${
                      index === 0
                        ? ""
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.taskTags.join(", ")}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal max-w-[50px] text-center h-auto ${
                      index == 0
                        ? " "
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } `}
                  >
                    {data.taskTime}
                  </td>
                  <td
                    className={`py-5 px-4 text-base text-center font-normal ${
                      index == 0
                        ? ""
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}
                  >
                    {data?.taskDate}
                  </td>
                  <td
                    className={`py-5 px-4 text-base text-center font-normal ${
                      index == 0
                        ? ""
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}
                  >
                    {data?.taskStatus ? (
                      <div className="p-2 bg-green-50 text-[#3DD598] text-center">
                        COMPLETED
                      </div>
                    ) : (
                      <div className="p-2 bg-blue-50 text-[#50B5FF] text-center">
                        PENDING
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-2.5 px-1 items-center ${
            productList?.length > 0 ? "flex" : "hidden"
          }`}
        >
          <div className="text-lg">
            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage == totalPage - 1
              ? productList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {productList?.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                  currentPage == 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage == index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage == totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableReact;

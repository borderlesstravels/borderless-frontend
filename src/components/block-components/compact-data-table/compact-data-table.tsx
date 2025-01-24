import { useEffect, useState } from "react";
import { formatNumber } from "../../../services/utils/data-manipulation-utilits";
import MiniLoader from "../mini-loader/mini-loader";
import './compact-data-table.scss'


interface IColumns {
  Header: string,
  accessor: any,
  Cell?: any;
  numberMode?: boolean;
}
interface iTableProp {
  data: any[];
  totalCount: number;
  columns: IColumns[];
  refreshTable: Function;
  loadingState: 0 | 1 | 2;
  settings?: {
    hidePagination?: boolean;
    actionable?: boolean;
  }
  bulkSelect?: boolean;
  sendBulkSelect?: Function;
}
const CompactDataTables = ({data, totalCount, columns, refreshTable, loadingState, settings, bulkSelect, sendBulkSelect}: iTableProp) => {

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount/limit));
  const [active, setActive] = useState(false);
  const [selectionList, setSelectionList] = useState<number[]>([]);

  const updateLimit = (count: number) => {
    setPage(1);
    setLimit(count);
  }

  const updateBulkValue = (ev: any) => {
    const selected = ev.target.checked;
    const value = parseFloat(ev.target.value);
    if(selected) {
      setSelectionList((prevData) => [...prevData, value])
    } else {
      setSelectionList((prevData) => prevData.filter(id => id !== value));
    }
  }

  const updateSelectAll = (ev: any) => {
    const selected = ev.target.checked;
    const ids = data.map(item => item.id);
    if(selected) {
      setSelectionList(ids)
    } else {
      setSelectionList([]);
    }
  }

  const testWidthLarge = (): 1 | 2 | 3 => {
    let large: 1 | 2 | 3;
    const tableHolder = document.getElementById('compact-table-holder')?.clientWidth;
    if(tableHolder) {
      if(tableHolder > 750) {
        large = 3;
      } else if(tableHolder > 550) {
        large = 2;
      } else {
        large = 1
      }
    } else {
      large = 3
    }
    return large;
  }

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount/limit));
  }, [totalCount, limit]);

  useEffect(() => {
    setTimeout(() => setActive(true), 1000);
    if(active) {
      refreshTable({page, limit});
    }
  }, [page, limit]);
  useEffect(() => {
    if(sendBulkSelect) {
      sendBulkSelect(selectionList);
    }
  }, [selectionList]);

  return (
    <>
      {
        loadingState === 0 &&
        <MiniLoader/>
      }
      {
        loadingState === 1 &&
        <div className={"table-container" + (settings?.actionable ? ' pb-5' : '')} id="compact-table-holder">
          <table className="table">
            <thead className="table-head">
                <tr>
                  {bulkSelect && <th>
                    <input type="checkbox"
                      className="check-all"
                      onChange={updateSelectAll}
                      checked={selectionList.length === data.length}
                    />
                  </th>}
                  {columns.map((column: any, index: number) => (
                    <th key={index}>{column.Header}</th>
                  ))}
                </tr>
            </thead>
            <tbody>
              {data.map((row, index) => <tr key={index}>
                {
                  bulkSelect &&
                  <td>
                    <input type="checkbox"
                      value={row.id}
                      onChange={updateBulkValue}
                      checked={selectionList.includes(row.id)}
                    />
                  </td>
                }
                    {columns.map(
                      (cell: IColumns, index: number) => (
                        cell.Cell ?
                        <td key={index}>
                          <cell.Cell {...row} />
                        </td> :
                        <>
                          {
                            cell.numberMode ?
                            <td key={index} className="text-right">
                              {formatNumber(row[cell.accessor])}
                            </td> :
                            <td key={index}>
                              {row[cell.accessor]}
                            </td>
                          }
                        </>
                      )
                    )}
                  </tr>
              )}
            </tbody>
          </table>
          { data.length !== 0  && !settings?.hidePagination &&
            <div className="row p-0 m-0">
              <div className={"col-md-6 page-number-info" + (testWidthLarge() === 1 ? ' pt-1' : '')}>
                <span className="reduced purple-tx">Items per page:</span>
                <select
                  value={limit}
                  onChange={e => {
                    updateLimit(Number(e.target.value))
                  }}
                  className={testWidthLarge() === 1 ? 'tiny-fund p-0 ml-1' : ''}
                >
                  {[5, 10, 20, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                {
                  testWidthLarge() === 1 ?
                  limit > totalCount ? <span className="tiny-fund">{totalCount} of {totalCount}</span> : <span className="tiny-fund">{data.length} of {formatNumber(totalCount)}</span> :
                  limit > totalCount ? `${totalCount} of ${totalCount}` : `${data.length} of ${formatNumber(totalCount)}` 
                }
              </div>

              <div className={"col-md-6 pagination" + (testWidthLarge() < 3 ? ' tiny-magination' : '')}>
                <button type="button" className="btn btn-link btn-last" onClick={() => setPage(1)} disabled={page === 1}>
                  {'<<'}
                  {/* First */}
                </button>{' '}
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  {'<'}
                </button>{' '}

                <span>
                  <strong>
                    {page} | {formatNumber(totalPages)}
                  </strong>{' '}
                </span>

                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                  {'>'}
                </button>{' '}
                <button className="btn btn-link btn-last" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                  {'>>'}
                  {/* Last */}
                </button>
              
              </div>
            </div>
          }

          { data.length === 0 && <div className="text-center p-0 m-0 pb-4">No data available</div> }

        </div>
      }
      {
        loadingState === 2 &&
        <div className="py-5 text-center">
          <h2 className="py-4">Error in Loading</h2>
        </div>
      }
    </>
  )
}

export default CompactDataTables
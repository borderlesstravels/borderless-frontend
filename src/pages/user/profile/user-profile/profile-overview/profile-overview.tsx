import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ClassElement } from 'typescript';
import { ProfilePicture } from '../../../../../assets/images';
import CompactDataTables from '../../../../../components/block-components/compact-data-table/compact-data-table';
import { formatDate, formatNumber } from '../../../../../services/utils/data-manipulation-utilits';
import './profile-overview.scss';

function ProfileOverviewPage(props: any) {

  const [loadingState, setLoadingState] = useState<0 | 1 | 2>(0);

  const balances = [
    {name: 'Sky Balance', amount: 2000},
    {name: 'Skyflex Owed', amount: 500},
    {name: 'Flight Bonus', amount: 1300},
  ];
  const bills = [
    {name: 'Hotel Mumbai India', amount: 2000, dueDate: '2024-05-015'},
    {name: 'Air Peace Flight', amount: 500, dueDate: '2024-08-28'},
    {name: 'Shortlet Lekki', amount: 1300, dueDate: '2024-07-03'},
  ];
  const columns = [
    {
        Header: 'Transaction ID ',
        accessor:'id',
    },
    {
        Header: 'Booking Type',
        accessor:'booking_type',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: (data: any) => addColorToNumber(data)
    },
  ];
  const transactions = [
    {id: 'eyr3_394fd_2341', date: '08 Jan 2024', booking_type: 'Hotel Mumbai India', amount: 2000, dueDate: '2024-05-015'},
    {id: 'eyr3_394fd_2342', date: '11 May 2024', booking_type: 'Air Peace Flight', amount: 500, dueDate: '2024-08-28'},
    {id: 'eyr3_394fd_2343', date: '23 Feb 2024', booking_type: 'Shortlet Lekki', amount: 1300, dueDate: '2024-07-03'},
  ];

  const addColorToNumber = (cell: any) => {
    const code = cell.amount >= 0 ? 'green-tx' : 'red-tx';
    return(
      <div className={code}>${cell.amount}</div> 
    )
  }

  const refreshTable = (details: any) => {}

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingState(1);
  }, [props]);
  
  return (
    <div className='profile-overview'>
      <div className='user-view'>
        <div className='im-holder'>
          <div className='imh'>
            <img src={ProfilePicture} alt="" />
          </div>
          <h6>Miracle Enwere</h6>
        </div>
        <div className='splitter'></div>
        <div className='text-holder'>
          <div className='description-grid-40 pb-3'>
            <div className='icon-holder'>
              <FontAwesomeIcon icon={'user'} className='icon' />
            </div>
            <div className='txt-holder'>
              <h6>Username</h6>
              <p>Mj_Commissionar</p>
            </div>
          </div>
          <div className='description-grid-40 pb-3'>
            <div className='icon-holder'>
              <FontAwesomeIcon icon={'user'} className='icon' />
            </div>
            <div className='txt-holder'>
              <h6>Phone</h6>
              <p>+234 1234567890</p>
            </div>
          </div>
          <div className='description-grid-40 pb-3'>
            <div className='icon-holder'>
              <FontAwesomeIcon icon={'user'} className='icon' />
            </div>
            <div className='txt-holder'>
              <h6>Email</h6>
              <p>abc@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className='separator'></div>
      <div className='transactions'>
        <div className='row'>
          <div className='col-md-6 pb-3'>
            <h5 className='fainter-font'>Balances</h5>
            <div className='content-card'>
              <div className='mini-card-height'>
                {
                  balances.map((balance, index) => (
                    <div className='spread-info py-3 underline-btm' key={index}>
                      <h6 className='mb-0 increased-soft number-medium'>${formatNumber(balance.amount)}</h6>
                      <p className='reduced f600 fainter-tx mb-0'>{balance.name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='col-md-6 pb-3'>
            <h5 className='fainter-font'>Upcoming Bills</h5>
            <div className='content-card'>
              <div className='mini-card-height'>
                {
                  bills.map((bills, index) => (
                    <div className='spread-info py-3 underline-btm' key={index}>
                      <div className='spread-info'>
                        <div className='date-card'>
                          <span>May</span>
                          <h5 className='mb-0 number-bold'>15</h5>
                        </div>
                        <div className='px-3'>
                          <h6 className='mb-0 increased-soft number-bold'>{bills.name}</h6>
                          <span className='reduced faint-tx'>{formatDate(bills.dueDate)}</span>
                        </div>
                      </div>
                      <div className='amount-box number-medium'>${formatNumber(bills.amount)}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='col-md-12 py-3'>
            <div className='content-card2'>
              <div className='spread-info py-3'>
                <h5 className='h6 mb-0 f700 increased'>Recent Transactions</h5>
                <div className='search-table'>
                  <div className='input-holder'>
                    <input type="text" placeholder='Search' />
                  </div>
                  <div className='trigger-search'>
                    <FontAwesomeIcon icon={'search'} className='icon' />
                  </div>
                </div>
              </div>
              <CompactDataTables data={transactions} columns={columns} loadingState={loadingState} refreshTable={refreshTable} totalCount={transactions.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverviewPage;

import { Link, useLocation, useParams } from 'react-router-dom';
import elementStyles from './element.module.scss';
import styles from '../../App.module.scss';
import { ArrowLeft, More, SearchIcon } from '../../assets/icons';
import { Button, Input } from 'antd';
import { useGetElementLinksQuery } from '../../redux/dataSlice';
import DataTable from 'react-data-table-component';
import { useState } from 'react';

const { Search } = Input;

interface Element {
  name: string;
  elementId: number;
  suborganizationId: number;
  locationId: number;
  departmentId: number;
  employeeCategoryId: number;
  employeeCategoryValueId: number;
  employeeTypeId: number;
  employeeTypeValueId: number;
  jobTitleId: number;
  grade: number;
  gradeStep: number;
  unionId: number;
  amountType: string;
  amount: number;
  rate: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  automate: string;
  additionalInfo: [
    {
      lookupId: number;
      lookupValueId: number;
    }
  ];
}

const ElementLink = () => {
  const { id } = useParams();

  const [{ actionOpened, createModal }, setState] = useState({
    createModal: false,
    actionOpened: null,
  });

  const { data, error, isLoading } = useGetElementLinksQuery(id);

  const onSearch = (value: string) => console.log(value);

  const onOpenChange = (item: any) =>
    setState((prev) => ({
      ...prev,
      actionOpened: actionOpened === item.id ? null : item.id,
    }));

  const columns = [
    {
      name: 'Name',
      selector: (row: Element) => row.name,
    },
    {
      name: 'Sub-Organization',
      selector: (row: Element) => row.name,
    },
    {
      name: 'Department',
      selector: (row: Element) => row.name,
    },
    {
      name: 'Employee Category',
      selector: (row: Element) => row.name,
    },
    {
      name: 'Amount',
      selector: (row: Element) => row.name,
    },
    {
      name: 'Details',
      cell: (row: Element) => <Link to={''}>View Details</Link>,
    },
    {
      name: 'Action',
      cell: (row: Element) => {
        // const popItems = [
        //   {
        //     title: 'View Element Links',
        //     Icon: Show,
        //     data: row,
        //     onClick: () => navigate(`${row?.id}/link`, { state: row }),
        //   },
        //   { title: 'Edit Element', Icon: Edit },
        //   { title: 'Delete Element', Icon: Delete },
        // ];
        return (
          <div className={styles.moreOutlined}>
            {/* <Popconfirm
          title='Delete the task'
          description='Are you sure to delete this task?'
          onConfirm={confirm}
          onCancel={cancel}
          okText='Yes'
          cancelText='No'
        > */}
            {/* <Popover
              content={<PopupModalContent listItems={popItems} />}
              title={null}
              trigger='click'
              open={actionOpened === row?.id}
              onOpenChange={() => onOpenChange(row)}
            >
              <More />
            </Popover> */}

            {/* </Popconfirm> */}
            <More />
          </div>
        );
      },
    },
  ];

  const headerStyle = {
    background: '#2D416F',
    color: 'white',
  };

  return (
    <div
      className={`${elementStyles.contentWrapper} ${elementStyles.elementWrapper}`}
    >
      <p className={elementStyles.breadcrumbText}>
        Payroll Management <span className={styles.breadcrumb}>{'>'} </span>{' '}
        Elements setup <span className={styles.breadcrumb}>{'>'}</span> Elements
      </p>

      <div className={elementStyles.elementWrapper__elementContainer}>
        <h3>Element Details</h3>
        <div className={elementStyles.elementWrapper__elementManagement}>
          <Link to='/elements'>
            <ArrowLeft />
          </Link>
        </div>
        <div className={elementStyles.elementWrapper__dataTable}>
          {/* <DataTable
            columns={columns}
            pagination
            responsive
            // @ts-ignore
            data={data && data?.data?.content}
            customStyles={{
              headRow: {
                style: headerStyle,
              },
            }}
            progressPending={isLoading}
          /> */}
        </div>
      </div>

      <div className={elementStyles.elementWrapper__elementContainer}>
        <h3>Element Links</h3>
        <div className={elementStyles.elementWrapper__elementManagement}>
          <Search
            placeholder='Search for element'
            onSearch={onSearch}
            allowClear
            style={{
              width: 283,
            }}
            enterButton={
              <Button
                style={{
                  background: '#4BAA79',
                  color: 'white',
                  border: 'none',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon />
              </Button>
            }
          />
          <button
            className={elementStyles.elementWrapper__createButton}
            // onClick={toggleCreateModal}
          >
            Create Element +
          </button>
        </div>
        <div className={elementStyles.elementWrapper__dataTable}>
          <DataTable
            columns={columns}
            pagination
            responsive
            // @ts-ignore
            data={data && data?.data?.content}
            customStyles={{
              headRow: {
                style: headerStyle,
              },
            }}
            progressPending={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ElementLink;

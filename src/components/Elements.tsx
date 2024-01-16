import React, { useState } from 'react';
import styles from '../App.module.scss';
import DataTable from 'react-data-table-component';
import { message, Popconfirm, Popover } from 'antd';
import { More } from '../assets/icons';
import { capitalizeFirstLetter, formatDateTime } from '../utils';
import { useGetElementsQuery } from '../redux/dataSlice';
import ElementLookups from './ElementCategory';

interface Element {
  categoryId: number;
  categoryValueId: number;
  classificationId: number;
  classificationValueId: number;
  createdAt: string;
  description: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  id: string;
  modifiedBy: string;
  name: string;
  payFrequency: string;
  payRunId: number;
  payRunValueId: number;
  processingType: string;
  prorate: string;
  reportingName: string;
  status: string | boolean;
}

export default function Elements() {
  const { data, error, isLoading } = useGetElementsQuery();

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const confirm = (e: any) => {
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel = (e: any) => {
    console.log(e);
    message.error('Click on No');
  };

  // const handlePageChange = (page) => {
  //   fetchUsers(page);
  // };
  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   const response = await axios.get(
  //     `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`
  //   );
  //   setData(response.data.data);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };

  const columns = [
    {
      name: 'Name',
      selector: (row: Element) => row.name,
    },
    {
      name: 'Element Category',
      cell: ({ categoryId, categoryValueId }: Element) => (
        <ElementLookups lookupId={categoryId} lookupValueId={categoryValueId} />
      ),
    },
    {
      name: 'Element Classification',
      cell: ({ classificationId, classificationValueId }: Element) => (
        <ElementLookups
          lookupId={classificationId}
          lookupValueId={classificationValueId}
        />
      ),
    },
    {
      name: 'Status',
      selector: (row: Element) =>
        row?.status !== undefined
          ? row.status === true ||
            (row.status as string).toLowerCase() === 'active'
            ? 'Active'
            : capitalizeFirstLetter(row.status.toString())
          : '',
    },
    {
      name: 'Date & Time Modified',
      selector: (row: Element) => formatDateTime(row.createdAt.toString()),
    },
    {
      name: 'Modified By',
      selector: (row: Element) => row.modifiedBy.toString(),
    },
    {
      name: 'Action',
      cell: (row: Element) => (
        <div className={styles.moreOutlined}>
          {/* <Popconfirm
          title='Delete the task'
          description='Are you sure to delete this task?'
          onConfirm={confirm}
          onCancel={cancel}
          okText='Yes'
          cancelText='No'
        > */}
          <Popover
            content={<p onClick={hide}>Close</p>}
            title='Title'
            trigger='click'
            open={open}
            onOpenChange={handleOpenChange}
          >
            <More />
          </Popover>

          {/* </Popconfirm> */}
        </div>
      ),
    },
  ];

  const headerStyle = {
    background: '#2D416F',
    color: 'white',
  };

  return (
    <div className={`${styles.contentWrapper} ${styles.elementWrapper}`}>
      <p className={styles.breadcrumbText}>
        Payroll Management <span className={styles.breadcrumb}>{'>'} </span>{' '}
        Elements setup <span className={styles.breadcrumb}>{'>'}</span> Elements
      </p>
      <div className={styles.elementWrapper__elementContainer}>
        <h3>Elements</h3>
        <div className={styles.elementWrapper__elementManagement}>
          <button>Create Element +</button>
          <button className={styles.elementWrapper__createButton}>
            Create Element +
          </button>
        </div>
        <div className={styles.elementWrapper__dataTable}>
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
}

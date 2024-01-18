import React, { useState } from 'react';
import styles from '../../App.module.scss';
import DataTable from 'react-data-table-component';
import { message, Popconfirm, Modal, Popover } from 'antd';
import { Delete, Edit, More, Show, DateIcon } from '../../assets/icons';
import { capitalizeFirstLetter, formatDateTime } from '../../utils';
import { useGetElementsQuery } from '../../redux/dataSlice';
import ElementLookups from '../../components/ElementCategory';
import PopupModalContent from '../../components/PopupModalContent';
import FormModal from '../../components/Form/FormModal';

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
  const [{ actionOpened, createModal }, setState] = useState({
    createModal: false,
    actionOpened: null,
  });

  const onOpenChange = (item: any) =>
    setState((prev) => ({
      ...prev,
      actionOpened: actionOpened === item.id ? null : item.id,
    }));

  const confirm = (e: any) => {
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel = (e: any) => {
    console.log(e);
    message.error('Click on No');
  };

  const handleOk = () =>
    setState((prev) => ({
      ...prev,
      createModal: false,
    }));

  const handleCancel = () =>
    setState((prev) => ({
      ...prev,
      createModal: false,
    }));

  const toggleCreateModal = () =>
    setState((prev) => ({
      ...prev,
      createModal: true,
    }));

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
      cell: (row: Element) => {
        const popItems = [
          { title: 'View Element Links', Icon: Show },
          { title: 'Edit Element', Icon: Edit },
          { title: 'Delete Element', Icon: Delete },
        ];
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
            <Popover
              content={<PopupModalContent listItems={popItems} />}
              title={null}
              trigger='click'
              open={actionOpened === row?.id}
              onOpenChange={() => onOpenChange(row)}
            >
              <More />
            </Popover>

            {/* </Popconfirm> */}
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
    <div className={`${styles.contentWrapper} ${styles.elementWrapper}`}>
      <p className={styles.breadcrumbText}>
        Payroll Management <span className={styles.breadcrumb}>{'>'} </span>{' '}
        Elements setup <span className={styles.breadcrumb}>{'>'}</span> Elements
      </p>
      <div className={styles.elementWrapper__elementContainer}>
        <h3>Elements</h3>
        <div className={styles.elementWrapper__elementManagement}>
          <button>Create Element +</button>
          <button
            className={styles.elementWrapper__createButton}
            onClick={toggleCreateModal}
          >
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

      <FormModal
        createModal={createModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

import React, { useState } from 'react';
import styles from '../../App.module.scss';
import DataTable from 'react-data-table-component';
import { Button, Input, message, Popover } from 'antd';
import {
  Delete,
  Edit,
  FilterIcon,
  More,
  SearchIcon,
  Show,
} from '../../assets/icons';
import {
  capitalizeFirstLetter,
  ElementLookups,
  formatDateTime,
} from '../../utils';
import { useGetElementsQuery } from '../../redux/dataSlice';
import PopupModalContent from '../../components/PopupModalContent';
import FormModal from '../../components/Form/FormModal';
import elementStyles from './element.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

const { Search } = Input;

type Inputs = {
  name: string;
  classification: string;
  category: string;
  payrun: any;
  description: any;
  processingType: string;
  prorate: string;
  reportingName: string;
  status: string | boolean;
  modifiedBy: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  payFrequency: string;
};
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
  selectedMonths: [string];
}

const intialValues = {
  name: '',
  classification: '',
  category: 'string',
  payrun: '',
  description: '',
  processingType: '',
  prorate: '',
  reportingName: '',
  status: '',
  modifiedBy: 'Etiene Essenoh',
  effectiveEndDate: '',
  effectiveStartDate: '',
  payFrequency: '',
};

export default function Elements() {
  console.log('dhdjvhgfdvh');
  const location = useLocation();
  const {
    register,
    handleSubmit,
    // watch,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', defaultValues: intialValues });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { data, error, isLoading } = useGetElementsQuery();
  const [{ actionOpened, createModal }, setState] = useState({
    createModal: false,
    actionOpened: null,
  });

  const navigate = useNavigate();

  const onOpenChange = (item: any) =>
    setState((prev) => ({
      ...prev,
      actionOpened: actionOpened === item.id ? null : item.id,
    }));

  // const confirm = (e: any) => {
  //   console.log(e);
  //   message.success('Click on Yes');
  // };

  // const cancel = (e: any) => {
  //   console.log(e);
  //   message.error('Click on No');
  // };

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
      selector: (row: Element) => {
        if (row?.status !== undefined) {
          if (Array.isArray(row.status)) {
            return row.status.join(', ');
          } else if (
            typeof row.status === 'boolean' ||
            row.status === 'inactive'
          ) {
            return capitalizeFirstLetter(row.status.toString());
          } else if (row.status?.toLowerCase() === 'active') {
            return 'Active';
          } else if (typeof row.status === 'string') {
            return capitalizeFirstLetter(row.status);
          }
        }

        return '';
      },
    },
    {
      name: 'Date & Time Modified',
      selector: (row: Element) => formatDateTime(row.createdAt?.toString()),
    },
    {
      name: 'Modified By',
      selector: (row: Element) => row.modifiedBy?.toString(),
    },
    {
      name: 'Action',
      cell: (row: Element) => {
        const popItems = [
          {
            title: 'View Element Links',
            Icon: Show,
            data: row,
            onClick: () => navigate(`${row?.id}/link`, { state: row }),
          },
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

  const onSearch = (value: string) => console.log(value);

  return (
    <div
      className={`${elementStyles.contentWrapper} ${elementStyles.elementWrapper}`}
    >
      <p className={elementStyles.breadcrumbText}>
        <Link
          className={`${
            location.pathname === '/'
              ? elementStyles.breadcrumbLinkActive
              : elementStyles.breadcrumbLinkInActive
          }`}
          to='/products'
        >
          Payroll Management{' '}
        </Link>
        <span className={elementStyles.breadcrumbArrow}>&gt;</span>
        <Link
          className={`${
            location.pathname === '/'
              ? elementStyles.breadcrumbLinkActive
              : elementStyles.breadcrumbLinkInActive
          }`}
          to='/elements'
        >
          Elements setup
        </Link>
        <span className={elementStyles.breadcrumbArrow}>&gt;</span>
        <Link
          className={`${
            location.pathname === '/elements'
              ? elementStyles.breadcrumbLinkActive
              : elementStyles.breadcrumbLinkInActive
          }`}
          to='/elements'
        >
          Elements
        </Link>
      </p>
      <div className={elementStyles.elementWrapper__elementContainer}>
        <h3>Elements</h3>
        <div className={elementStyles.elementWrapper__elementManagement}>
          <div>
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
            <FilterIcon />
          </div>
          <button
            className={elementStyles.elementWrapper__createButton}
            onClick={toggleCreateModal}
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
            data={data?.data?.content || []}
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
        register={register}
        errors={errors}
        trigger={trigger}
        getValues={getValues}
        onSubmit={onSubmit}
        setValue={setValue}
        handleSubmit={handleSubmit}
        // defaultValues={defaultValues}
      />
    </div>
  );
}

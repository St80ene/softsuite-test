import React, { useState } from 'react';
import styles from '../../App.module.scss';
import DataTable from 'react-data-table-component';
import { App, Button, Input, Popover } from 'antd';
import {
  Delete,
  Edit,
  FilterIcon,
  More,
  SearchIcon,
  Show,
} from '../../assets/icons';
import {
  ElementLookups,
  capitalizeFirstLetter,
  formatDateTime,
} from '../../utils';
import { useGetElementsQuery } from '../../redux/dataSlice';
import PopupModalContent from '../../components/PopupModalContent';
import FormModal from '../../components/Form/FormModal';
import elementStyles from './element.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs, IElement } from '../../components/common/interfaces';
import axios from 'axios';

const { Search } = Input;

const intialValues = {
  name: '',
  classificationId: '',
  categoryId: 'string',
  payRunId: '',
  description: '',
  processingType: '',
  prorate: '',
  reportingName: '',
  status: '',
  modifiedBy: 'Etiene Essenoh',
  effectiveEndDate: '',
  effectiveStartDate: '',
  payFrequency: '',
  selectedMonths: [],
};

export default function Elements() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    // watch,
    trigger,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', defaultValues: intialValues });

  const { message } = App.useApp();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const {
    data,
    isLoading,
    refetch: elementsListRefresh,
  } = useGetElementsQuery();

  const [{ actionOpened, createModal }, setState] = useState<{
    createModal: boolean;
    actionOpened: boolean | null | string | number;
  }>({
    createModal: false,
    actionOpened: null,
  });

  const navigate = useNavigate();

  const onOpenChange = (item: any) =>
    setState((prev) => ({
      ...prev,
      actionOpened: actionOpened === item.id ? null : item.id,
    }));

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

  const handlePopConfirm = async (itemId: string | number) => {
    try {
      setState((prev) => ({
        ...prev,
        createModal: false,
      }));

      await axios.delete(
        ` https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${itemId}`
      );

      elementsListRefresh();
      message.success('Element has been deleted successfully');
    } catch (error) {
      // Handle any errors
      console.error('Error deleting item:', error);
    }
  };

  const handlePopConfirmCancel = () =>
    setState((prev) => ({
      ...prev,
      createModal: false,
    }));

  const toggleCreateModal = () =>
    setState((prev) => ({
      ...prev,
      createModal: true,
    }));

  const columns = [
    {
      name: 'Name',
      selector: (row: IElement) => row.name,
    },
    {
      name: 'Element Category',
      cell: ({ categoryId, categoryValueId }: IElement) => (
        <ElementLookups lookupId={categoryId} lookupValueId={categoryValueId} />
      ),
    },
    {
      name: 'Element Classification',
      cell: ({ classificationId, classificationValueId }: IElement) => (
        <ElementLookups
          lookupId={classificationId}
          lookupValueId={classificationValueId}
        />
      ),
    },
    {
      name: 'Status',
      selector: (row: IElement) => {
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
      selector: (row: IElement) => formatDateTime(row.createdAt?.toString()),
    },
    {
      name: 'Modified By',
      selector: (row: IElement) => row.modifiedBy?.toString(),
    },
    {
      name: 'Action',
      cell: (row: IElement) => {
        const popItems = [
          {
            title: 'View Element Links',
            Icon: Show,
            data: row,
            onClick: () => navigate(`${row?.id}/link`, { state: row }),
          },
          { title: 'Edit Element', Icon: Edit },
          {
            title: 'Delete Element',
            Icon: Delete,
            onClick: () => {
              setState((prev) => ({
                ...prev,
                actionOpened: actionOpened === row?.id ? null : false,
              }));
            },
            onConfirm: () => handlePopConfirm(row?.id),
            onCancel: handlePopConfirmCancel,
          },
        ];
        return (
          <div className={styles.moreOutlined}>
            <Popover
              content={<PopupModalContent listItems={popItems} />}
              title={null}
              trigger='click'
              open={actionOpened === row?.id}
              onOpenChange={() => onOpenChange(row)}
            >
              <More />
            </Popover>
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
        reset={reset}
        refresh={elementsListRefresh}
      />
    </div>
  );
}

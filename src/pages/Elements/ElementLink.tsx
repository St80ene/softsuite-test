import { Link, useLocation, useParams } from 'react-router-dom';
import elementStyles from './element.module.scss';
import styles from '../../App.module.scss';
import { ArrowLeft, More, SearchIcon } from '../../assets/icons';
import { Button, Input } from 'antd';
import { useGetElementLinksQuery } from '../../redux/dataSlice';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import {
  DepartmentLookup,
  ElementLookups,
  SubOrganizationLookup,
  capitalizeFirstLetter,
  formatLinkDateTime,
} from '../../utils';
import { IElement } from '../../components/common/interfaces';

const { Search } = Input;

const ElementLink = () => {
  const { id: pageId } = useParams();
  const { state: elementLinkDetails, pathname } = useLocation();

  const [{ actionOpened, createModal }, setState] = useState({
    createModal: false,
    actionOpened: null,
  });

  const { data, error, isLoading } = useGetElementLinksQuery({ id: pageId });

  const onSearch = (value: string) => console.log(value);

  const onOpenChange = (item: any) =>
    setState((prev) => ({
      ...prev,
      actionOpened: actionOpened === item.id ? null : item.id,
    }));

  const columns = [
    {
      name: 'Name',
      selector: (row: IElement) => row.name,
    },
    {
      name: 'Sub-Organization',
      cell: ({ suborganizationId }: IElement) => (
        <SubOrganizationLookup id={suborganizationId} />
      ),
    },
    {
      name: 'Department',
      cell: ({ suborganizationId, id }: IElement) => (
        <DepartmentLookup suborganizationId={suborganizationId} id={id} />
      ),
    },
    {
      name: 'Employee Category',
      cell: ({ employeeCategoryId, employeeCategoryValueId }: IElement) => (
        <ElementLookups
          lookupId={employeeCategoryId}
          lookupValueId={employeeCategoryValueId}
        />
      ),
    },
    {
      name: 'Amount',
      selector: (row: IElement) => row.amount,
    },
    {
      name: 'Details',
      cell: (row: IElement) => <Link to={''}>View Details</Link>,
    },
    {
      name: 'Action',
      cell: (row: IElement) => {
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
        <Link
          className={`${
            pathname === '/'
              ? elementStyles.breadcrumbLinkActive
              : elementStyles.breadcrumbLinkInActive
          }`}
          to='/'
        >
          Payroll Management{' '}
        </Link>
        <span className={elementStyles.breadcrumbArrow}>&gt;</span>
        <Link
          className={`${
            pathname === '/'
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
            pathname === '/elements'
              ? elementStyles.breadcrumbLinkActive
              : elementStyles.breadcrumbLinkInActive
          }`}
          to='/elements'
        >
          Elements
        </Link>
        <span className={elementStyles.breadcrumbArrow}>&gt;</span>
        <Link
          className={`${
            pathname === `/elements/${pageId}/link`
              ? elementStyles.breadcrumbLinkActive
              : elementStyles.breadcrumbLinkInActive
          }`}
          to={`/elements/${pageId}/link`}
        >
          Element Link
        </Link>
      </p>

      <div className={elementStyles.elementWrapper__elementContainer}>
        <div className={elementStyles.elementWrapper__elementManagement}>
          <Link to='/elements'>
            <ArrowLeft />
          </Link>
        </div>
        <h3>Element Details</h3>
        <div className={elementStyles.elementDetailsContainer}>
          {/* First row */}
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Element Name
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.name}
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Element Classification{' '}
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              <ElementLookups
                lookupId={elementLinkDetails?.classificationId}
                lookupValueId={elementLinkDetails?.classificationValueId}
              />
            </span>
          </div>

          {/* Next row */}

          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Element Category
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              <ElementLookups
                lookupId={elementLinkDetails?.categoryId}
                lookupValueId={elementLinkDetails?.categoryValueId}
              />
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Payrun
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {ElementLookups({
                lookupId: elementLinkDetails?.payRunId,
                lookupValueId: elementLinkDetails?.payRunValueId,
              })}
            </span>
          </div>

          {/* Next row */}

          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              description
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.description}
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              reporting Name
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.reportingName}
            </span>
          </div>

          {/* Next Row */}

          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Effective Start Date
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.effectiveStartDate &&
                formatLinkDateTime(elementLinkDetails?.effectiveStartDate)}
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Effective END Date
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.effectiveEndDate &&
                formatLinkDateTime(elementLinkDetails?.effectiveEndDate)}
            </span>
          </div>

          {/* Next row */}

          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              PROCESSING TYPE
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              <ElementLookups
                lookupId={elementLinkDetails?.categoryId}
                lookupValueId={elementLinkDetails?.categoryValueId}
              />
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              PAY frequency
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.payFrequency}
            </span>
          </div>

          {/* Next Row */}
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Pay Months
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.selectedMonths?.join(', ')}
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Prorate
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.prorate}
            </span>
          </div>

          {/* Next Row */}

          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            >
              Status
            </span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            >
              {elementLinkDetails?.status !== undefined
                ? elementLinkDetails.status === true ||
                  (elementLinkDetails.status as string).toLowerCase() ===
                    'active'
                  ? 'Active'
                  : capitalizeFirstLetter(elementLinkDetails.status.toString())
                : ''}
            </span>
          </div>
          <div
            className={elementStyles.elementDetailsContainer__elementContent}
          >
            <span
              className={elementStyles.elementDetailsContainer__elementHeading}
            ></span>
            <span
              className={
                elementStyles.elementDetailsContainer__elementDetailText
              }
            ></span>
          </div>
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

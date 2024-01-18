import { Link, useLocation, useParams } from 'react-router-dom';
import elementStyles from './element.module.scss';
import styles from '../../App.module.scss';
import { ArrowLeft, SearchIcon } from '../../assets/icons';
import { Button, Input } from 'antd';

const { Search } = Input;

const ElementLink = () => {
  const { id } = useParams();

  const location = useLocation();
  const data = location.state;
  // const rowData = state && state?.rowData;
  console.log('state', data);

  const onSearch = (value: string) => console.log(value);

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
    </div>
  );
};

export default ElementLink;

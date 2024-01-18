import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useGetElementLookupsCategoryAndValueQuery } from '../redux/dataSlice';
import { Spin } from 'antd';

interface ElementCategoryProps {
  lookupValueId: number;
  lookupId: number;
}

const ElementLookups: React.FC<ElementCategoryProps> = memo(
  ({ lookupId, lookupValueId }) => {
    const { data, isLoading } = useGetElementLookupsCategoryAndValueQuery({
      lookupId: lookupId.toString(),
      lookupValueId: lookupValueId.toString(),
    });

    return <div>{isLoading ? <Spin /> : <p>{data?.name || ''}</p>}</div>;
  }
);

ElementLookups.propTypes = {
  lookupId: PropTypes.number.isRequired,
  lookupValueId: PropTypes.number.isRequired,
};

export default ElementLookups;

import {
  useGetDepartmentQuery,
  useGetElementLookupsCategoryAndValueQuery,
  useGetElementLookupsQuery,
  useGetSubOrganizationQuery,
} from '../redux/dataSlice';

interface ElementCategoryProps {
  lookupValueId: number;
  lookupId: number;
}

export const formatDateTime = (dateString: string) => {
  const inputDate = new Date(dateString);

  interface DateOptions {
    [key: string]: any;
  }

  interface TimeOptions {
    [key: string]: any;
  }

  const dateOptions: DateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const timeOptions: TimeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return `${inputDate
    .toLocaleDateString(undefined, dateOptions)
    .replace(/\//g, '-')} || ${inputDate
    .toLocaleTimeString(undefined, timeOptions)
    .toLocaleUpperCase()}`;
};

export const formatLinkDateTime = (dateString: string) => {
  const inputDate = new Date(dateString);

  interface DateOptions {
    [key: string]: any;
  }

  interface TimeOptions {
    [key: string]: any;
  }

  const dateOptions: DateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const timeOptions: TimeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return `${inputDate
    .toLocaleDateString(undefined, dateOptions)
    .replace(/\//g, '-')}`;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ElementLookups = ({
  lookupId,
  lookupValueId,
}: ElementCategoryProps) => {
  const { data } = useGetElementLookupsCategoryAndValueQuery({
    lookupId: lookupId.toString(),
    lookupValueId: lookupValueId.toString(),
  });

  return data?.name;
};

export const DepartmentLookup = ({
  suborganizationId,
  id,
}: {
  suborganizationId: any;
  id: any;
}) => {
  const { data } = useGetDepartmentQuery({
    suborganizationId: suborganizationId.toString(),
    id: id.toString(),
  });

  return data?.name;
};

export const SubOrganizationLookup = (id: any) => {
  const { data } = useGetSubOrganizationQuery(id.toString());

  return data?.name;
};

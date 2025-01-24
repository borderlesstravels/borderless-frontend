import { toast } from "react-toastify";

export interface IFilter {
  max: number | undefined;
  min: number | undefined;
  earlyestTime: string;
  latestTime: string;
  airlines: string[];
}
export const initialFilter = () => {
    return {
        max: 0,
        min: 0,
        earlyestTime: '',
        latestTime: '',
        airlines: [],
    };
}

export const validateAirlineFIlterInputs = (key: string, newFilter: IFilter, value?: string) => {
  let changed = false;
  let filter = {...newFilter};
  const {min, max, earlyestTime, latestTime, airlines} = newFilter;
  if(key === 'min' && parseFloat(`${min}`) && parseFloat(`${max}`) && parseFloat(`${min}`) > parseFloat(`${max}`)) {
    toast.error('Minimum value can not be greater maximum');
    filter.min = newFilter.max;
    changed = true;
  }
  if(key === 'max' && parseFloat(`${min}`) && parseFloat(`${max}`) && parseFloat(`${max}`) < parseFloat(`${min}`)) {
    toast.error('Maximum value can not be less minimum');
    filter.max = newFilter.min;
    changed = true;
  }
  if(key === 'earlyestTime' && value && latestTime && parseFloat(value || earlyestTime) > parseFloat(latestTime)) {
    toast.error('Earliest time can not be after latest time');
    filter.earlyestTime = newFilter.latestTime;
    changed = true;
  }
  if(key === 'latestTime' && value && earlyestTime && parseFloat(value || latestTime) < parseFloat(earlyestTime)) {
    toast.error('Latest time can not be before earliest time');
    filter.latestTime = newFilter.earlyestTime;
    changed = true;
  }
  return {updatedFilter: filter, changed};
}
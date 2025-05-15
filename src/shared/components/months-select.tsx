import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

const MONTH_OPTIONS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

interface MonthSelectProps {
  control: any;
  name: string;
  label?: string;
  defaultValue?: any;
}

export const MonthSelect = ({ control, name, label = 'Месяц', defaultValue = '' }: MonthSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl fullWidth margin={'normal'}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select labelId={`${name}-label`} label={label} {...field}>
            <MenuItem value="">
              <em>Не выбран</em>
            </MenuItem>
            {MONTH_OPTIONS.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

interface MonthSelectRawProps {
  onChange: (e) => void;
  value: any;
}

export const MonthSelectRaw = ({ onChange, value }: MonthSelectRawProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="month-label">Месяц</InputLabel>
      <Select labelId="month-label" value={value} label="Месяц" onChange={onChange}>
        <MenuItem value="">
          <em>Не выбран</em>
        </MenuItem>
        {MONTH_OPTIONS.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

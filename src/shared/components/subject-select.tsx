import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

const SUBJECT_OPTIONS = [
  'Информатика',
  'Математика профильная',
  'Математика базовая',
  'Математика',
  'Физика',
  'Русский язык',
  'Английский язык',
  'Литература',
  'Биология',
  'Химия',
  'История',
  'Обществознание',
];

interface SubjectSelectProps {
  control: any;
  name: string;
  label?: string;
  defaultValue?: any;
}

export const SubjectSelect = ({ control, name, label = 'Предмет', defaultValue = '' }: SubjectSelectProps) => {
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
            {SUBJECT_OPTIONS.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

interface SubjectSelectRawProps {
  onChange: (e) => void;
  value: any;
}

export const SubjectSelectRaw = ({ onChange, value }: SubjectSelectRawProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="subject-label">Предмет</InputLabel>
      <Select labelId="subject-label" value={value} label="Предмет" onChange={onChange}>
        <MenuItem value="">
          <em>Не выбран</em>
        </MenuItem>
        {SUBJECT_OPTIONS.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

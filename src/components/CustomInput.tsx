import React, { FC } from 'react';
import { TextField } from '@material-ui/core';

interface OwnProps {
	register: any;
	handleChange: (e: any) => void;
	errors: any;
	name: string;
	title: string;
	placeHolder?: string;
	handleOnKeyPress?: (e: any) => void;
	required?: boolean;
}

type Props = OwnProps;

const CustomInput: FC<Props> = ({
	register,
	handleChange,
	errors,
	name,
	title,
	placeHolder,
	handleOnKeyPress,
	required = false,
}) => {
	return (
		<>
			<TextField
				required={required}
				name={name}
				inputRef={register}
				onChange={handleChange}
				variant="outlined"
				error={!!errors?.[name]}
				helperText={errors?.[name]?.message}
				placeholder={placeHolder}
				label={title}
				onKeyPress={handleOnKeyPress}
				fullWidth
			/>
		</>
	);
};

export default CustomInput;

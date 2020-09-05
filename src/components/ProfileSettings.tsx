import React, { FC, ChangeEvent } from 'react';
import { TextField, Button, Paper, FormGroup } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from './CustomInput';
import MuiAutoComplete from './CountryAutocomplete';

interface ProfileSettings {
	firstName: string;
	lastName: string;
	email: string;
	country: any;
}

const DefaultForm = {
	firstName: '',
	lastName: '',
	email: '',
	country: null,
};

const countries = [
	{ _id: 1, name: 'Country 1' },
	{ _id: 2, name: 'Country 2' },
	{ _id: 3, name: 'Country 3' },
];

const ProfileSettings: FC = () => {
	const { register, formState, setValue, errors, getValues, trigger, reset, control } = useForm<
		typeof DefaultForm
	>({
		defaultValues: DefaultForm,
		mode: 'onBlur',
	});

	const { firstName, lastName, email } = getValues();

	const getOpObj = (option: any) => {
		if (!option._id) option = countries.find((op) => op._id === option);
		return option;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name, e.target.value);
		// trigger();
	};

	const onSaveProfile = () => {
		console.log('data', getValues());
		console.log('Errors', errors);
	};

	const onKeyPress = (e: any) => {
		if (!/^[a-zA-Z0-9]$/.test(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<Paper className="App">
			<FormGroup>
				<TextField
					required
					name="firstName"
					inputRef={register({
						required: 'First Name Required',
						maxLength: {
							value: 50,
							message: 'First Name must be less than 50 characters',
						},
						pattern: {
							value: /[a-zA-z]/,
							message: 'First Name must include on letters',
						},
					})}
					onChange={handleChange}
					variant="outlined"
					error={!!errors?.firstName}
					helperText={errors?.firstName?.message}
					placeholder="First Name"
				/>
				<TextField
					required
					name="lastName"
					inputRef={register({
						required: 'Last Name Required',
						maxLength: {
							value: 50,
							message: 'Last Name must be less than 50 characters',
						},
						pattern: {
							value: /[a-zA-z]/,
							message: 'Last Name must include on letters',
						},
					})}
					onChange={handleChange}
					variant="outlined"
					error={!!errors?.lastName}
					helperText={errors?.lastName?.message}
					placeholder="Last Name"
				/>

				<CustomInput
					register={register({ required: 'Email Required' })}
					name="email"
					errors={errors}
					handleChange={handleChange}
					title="Email"
					placeHolder="Email"
					handleOnKeyPress={onKeyPress}
					required
				/>

				<Controller
					name="country"
					as={
						<Autocomplete
							options={countries}
							getOptionLabel={(option) => getOpObj(option)?.name}
							getOptionSelected={(option, value) => {
								return option._id === getOpObj(value)?._id;
							}}
							renderInput={(params) => <TextField {...params} label="Country" />}
						/>
					}
					onChange={([, obj]) => getOpObj(obj)?._id}
					control={control}
					defaultValue={null}
				/>

				<Button onClick={onSaveProfile} variant="contained">
					Save Profile
				</Button>
				<Button onClick={() => reset(DefaultForm)} variant="contained">
					Reset
				</Button>
			</FormGroup>
		</Paper>
	);
};

export default ProfileSettings;

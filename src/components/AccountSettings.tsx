import React, { useState, ChangeEvent } from 'react';
import MuiAutoComplete from './CountryAutocomplete';
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';

const defaultValues = {
	country: null,
	state: null,
	email: null,
};

const AccountSettings = () => {
	const { handleSubmit, reset, control, errors, register, setValue } = useForm({ defaultValues });
	const [data, setData] = useState(null);

	const onSubmit = (data) => {
		setData(data);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name, e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div style={{ margin: '30px' }}>
					<MuiAutoComplete
						control={control}
						name="country"
						placeholder="Choose a country"
						rules={{
							required: 'Country is required.',
						}}
						error={!!errors?.country}
						message={errors?.country?.message}
						required
					/>
				</div>
				<div style={{ margin: '30px' }}>
					<MuiAutoComplete
						control={control}
						name="state"
						placeholder="Choose a state"
						rules={{
							required: 'State is required.',
						}}
						error={!!errors?.state}
						message={errors?.state?.message}
						required
					/>
				</div>

				<div style={{ margin: '30px' }}>
					<CustomInput
						register={register({ required: 'Email Required' })}
						name="email"
						errors={errors}
						handleChange={handleChange}
						title="Email"
					/>
				</div>

				<div style={{ margin: '30px' }}>{data && JSON.stringify(data)}</div>
				
				<div style={{display: "flex"}}>
					<button
						className="button buttonBlack"
						type="button"
						onClick={() => {
							reset(defaultValues);
						}}>
						Reset Form
					</button>
					<button className="button">submit</button>
				</div>
			</form>
		</div>
	);
};

export default AccountSettings;

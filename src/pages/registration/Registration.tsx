import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { customerService } from '../../services/customer.service.ts';
import { loginValidation } from '../../validators/login-validation.ts';
import { passwordValidation } from '../../validators/password-validation.ts';
import { repeatPasswordValidation } from '../../validators/repeat-password-validation.ts';
import styles from './registration.module.scss';

type RegistrationForm = {
  email: string;
  registerPassword: string;
  repeatPassword: string;
};

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      registerPassword: '',
      repeatPassword: '',
    },
  });

  const passwordValue = watch('registerPassword');

  const onSubmit: SubmitHandler<RegistrationForm> = async ({
    email,
    registerPassword,
  }) => {
    const { statusCode } = await customerService.registration({
      email,
      password: registerPassword,
    });
    if (statusCode === 201) {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Регистрация на сайте</h3>
        <Input
          {...register('email', loginValidation())}
          placeholder="Enter email"
          type="text"
          error={errors.email}
        />
        <Input
          {...register('registerPassword', passwordValidation())}
          placeholder="Enter password"
          type="password"
          error={errors.registerPassword}
        />
        <Input
          {...register(
            'repeatPassword',
            repeatPasswordValidation(passwordValue),
          )}
          placeholder="Repeat password"
          type="password"
          error={errors.repeatPassword}
        />
        <Button className={styles.button}>Регистрация</Button>
        <div className={styles.submit}>
          <div className={styles.accaunt}>Уже есть аккаунт?</div>
          <Link className={styles.login} to="/login">
            Войдите
          </Link>
        </div>
      </form>
      <div className={styles.picbox}></div>
    </div>
  );
};

export default Registration;

// <fieldset className={styles.fieldset}>
//   <legend>Личная информация</legend>
//   <div className={styles.inputContainer}>
//     <label htmlFor="registration-email">Email</label>
//     <input
//         className={styles.input}
//         id="registration-email"
//         type="text"
//         name="registration-email"
//         placeholder="Enter email"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="first-name">First Name</label>
//     <input
//         className={styles.input}
//         id="first-name"
//         type="text"
//         name="first-name"
//         placeholder="Enter First Name"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="last-name">Last Name</label>
//     <input
//         className={styles.input}
//         id="last-name"
//         type="text"
//         name="last-name"
//         placeholder="Enter Last Name"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="date-birth">Date birth</label>
//     <input
//         className={styles.input}
//         id="date-birth"
//         type="date"
//         name="date-birth"
//         placeholder="Enter datebirth"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="registration-password">Password</label>
//     <input
//         className={styles.input}
//         id="registration-password"
//         type="password"
//         name="registration-password"
//         placeholder="Enter password"
//     />
//     <label>
//       <input className="checkbox-original" type="checkbox"/>
//       <span className="checkbox-custom"></span>
//     </label>
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="registration-confirm-password">
//       Confirm password
//     </label>
//     <input
//         className={styles.input}
//         id="registration-confirm-password"
//         type="password"
//         name="registration-confirm-password"
//         placeholder="Confirm password"
//     />
//     <label>
//       <input className="checkbox-original" type="checkbox"/>
//       <span className="checkbox-custom"></span>
//     </label>
//   </div>
// </fieldset>
// <fieldset className={styles.fieldset}>
//   <legend>Адрес доставки</legend>
//   <div className={styles.inputContainer}>
//     <label htmlFor="shipping-country">Shipping country</label>
//     <select
//         className={styles.input}
//         id="shipping-country"
//         name="shipping-country"
//     >
//       <option className={styles.options}>Select country</option>
//       <option className={styles.option} value="BY">
//         Belarus
//       </option>
//       <option className={styles.option} value="LT">
//         Lithuania
//       </option>
//       <option className={styles.option} value="LV">
//         Latvia
//       </option>
//       <option className={styles.option} value="PL">
//         Poland
//       </option>
//       <option className={styles.option} value="RU">
//         Russia
//       </option>
//       <option className={styles.option} value="UA">
//         Ukraine
//       </option>
//     </select>
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="shipping-postal">Postal</label>
//     <input
//         className={styles.input}
//         id="shipping-postal"
//         type="text"
//         name="shipping-postal"
//         placeholder="Enter postal"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="shipping-city">Shipping city</label>
//     <input
//         className={styles.input}
//         id="shipping-city"
//         type="text"
//         name="shipping-city"
//         placeholder="Enter shipping city"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="shipping-street">Shipping street</label>
//     <input
//         className={styles.input}
//         id="shipping-street"
//         type="text"
//         name="shipping-street"
//         placeholder="Enter shipping street"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="shipping-street-number">Street number</label>
//     <input
//         className={styles.input}
//         id="shipping-street-number"
//         type="text"
//         name="shipping-street-number"
//         placeholder="Enter street number"
//     />
//   </div>
//   <div className="checkbox-wrapper">
//     <div className="checkbox-container">
//       <input id="shipping-checkbox-default" type="checkbox"/>
//       <label htmlFor="shipping-checkbox-default">
//         Set default address
//       </label>
//     </div>
//   </div>
//   <div className="checkbox-wrapper">
//     <div className="checkbox-container">
//       <input id="shipping-checkbox" type="checkbox"/>
//       <label htmlFor="shipping-checkbox">
//         Select only this address
//       </label>
//     </div>
//   </div>
// </fieldset>
// <fieldset className={styles.fieldset}>
//   <legend>Адрес для выставления счета</legend>
//   <div className={styles.inputContainer}>
//     <label htmlFor="billing-country">Billing country</label>
//     <select
//         className={styles.input}
//         id="billing-country"
//         name="billing-country"
//     >
//       <option className={styles.options}>Select country</option>
//       <option className={styles.option} value="BY">
//         Belarus
//       </option>
//       <option className={styles.option} value="LT">
//         Lithuania
//       </option>
//       <option className={styles.option} value="LV">
//         Latvia
//       </option>
//       <option className={styles.option} value="PL">
//         Poland
//       </option>
//       <option className={styles.option} value="RU">
//         Russia
//       </option>
//       <option className={styles.option} value="UA">
//         Ukraine
//       </option>
//     </select>
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="billing-postal">Postal</label>
//     <input
//         className={styles.input}
//         id="billing-postal"
//         type="text"
//         name="billing-postal"
//         placeholder="Enter postal"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="billing-city">Billing city</label>
//     <input
//         className={styles.input}
//         id="billing-city"
//         type="text"
//         name="billing-city"
//         placeholder="Enter billing city"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="billing-street">Billing street</label>
//     <input
//         className={styles.input}
//         id="billing-street"
//         type="text"
//         name="billing-street"
//         placeholder="Enter billing street"
//     />
//   </div>
//   <div className={styles.inputContainer}>
//     <label htmlFor="billing-street-number">Street number</label>
//     <input
//         className={styles.input}
//         id="billing-street-number"
//         type="text"
//         name="billing-street-number"
//         placeholder="Enter street number"
//     />
//   </div>
//   <div className="checkbox-wrapper">
//     <div className="checkbox-container">
//       <input id="billing-checkbox-default" type="checkbox"/>
//       <label htmlFor="billing-checkbox-default">
//         Set default address
//       </label>
//     </div>
//   </div>
//   <div className="checkbox-wrapper">
//     <div className="checkbox-container">
//       <input id="billing-checkbox" type="checkbox"/>
//       <label htmlFor="billing-checkbox">Select only this address</label>
//     </div>
//   </div>
// </fieldset>

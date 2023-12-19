import { useState, useRef } from 'react';
import {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordConfirm
} from '../utils/formValidation';

const useFieldRefs = (fields) => {
  const fieldRefs = {};

  Object.keys(fields).forEach((fieldName) => {
    fieldRefs[fieldName] = useRef(null);
  })
  return fieldRefs;
}
export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const [inputErrors, setInputErrors] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const fieldRefs = useFieldRefs(initial);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs({...inputs, [name]: value});
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'name' : {
        return setInputErrors({...inputErrors, [name]: validateName(value)});
      }
      case 'username': {
        return setInputErrors({...inputErrors, [name]: validateUsername(value)});
      }
      case 'email' : {
        return setInputErrors({...inputErrors, [name]: validateEmail(value)});
      }
      case 'password' : {
        return setInputErrors({...inputErrors, [name]: validatePassword(value)});
      }
      case 'passwordConfirm' : {
        return setInputErrors({...inputErrors, [name]: validatePasswordConfirm(value, inputs.password)});
      }
      default : {
        return 
      }
    }
  }

  function resetForm() {
    setInputs(initial);
    setInputErrors(initial);
    setIsLoading(false);
    setServerErrors(null);
  }

  function clearForm() {
    const inputsCopy = {...inputs}
    let newInputsState = {};
    Object.keys(inputsCopy).forEach((fieldName) => {
      newInputsState[fieldName] = '';
    })
    setInputs(newInputsState);
  }

  return {
    inputs,
    inputErrors,
    fieldRefs,
    isLoading,
    serverErrors,
    setInputErrors,
    setIsLoading,
    handleChange,
    handleBlur,
    resetForm,
    clearForm
  }
}
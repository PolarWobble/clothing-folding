import { useState } from "react";

import { 
    signInWIthGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';


import FormInput from "../form-input/form-input.component";

import {SignInContainer, ButtonContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWIthGooglePopup();
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            if(error.code === "auth/invalid-credential") {
                alert('Email or password incorrect');
            }
            else{
                console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };


    return(
        <SignInContainer>
            <h2>Sign In Page</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />

                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />

                <ButtonContainer>
                    <Button type="submit" >Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonContainer>
            </form>
            
        </SignInContainer>
    )
}

export default SignInForm;
import { useState } from "react";

import { 
    signInWIthGooglePopup, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import Button from '../button/button.component';
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWIthGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            console.log(user);
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
        <div className="sign-in-container">
            <h2>Sign In Page</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required />

                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />

                <div className="buttons-container">
                    <Button buttonType='' type="submit" >Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
            
        </div>
    )
}

export default SignInForm;
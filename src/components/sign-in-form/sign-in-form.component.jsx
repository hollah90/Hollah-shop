import { useState } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import '../sign-in-form/sign-in-form.style.scss'
import Button from '../botton/button.component'

const defaultFormFields = {
     email: '',
     password: '',
}

const SignInForm = () => {

     const [formFields, setFormFields] = useState(defaultFormFields)
     const { email, password } = formFields


     const resetFormFields = () => {
          setFormFields(defaultFormFields)
     }

     const signInWithGoogle = async () => {
          const { user } = await signInWithGooglePopup();
          await createUserDocumentFromAuth(user)
     };

     const handleSubmit = async (event) => {
          event.preventDefault();

          try {
               resetFormFields();

          } catch (error) { }
     }

     const handleChange = (event) => {
          const { name, value } = event.target;

          setFormFields({ ...formFields, [name]: value })

     }


     return (
          <div className="sign-up-container">
               <h2>Already have an account</h2>
               <span>Sign in with your email and password</span>
               <form onSubmit={handleSubmit}>


                    <FormInput
                         label="Email"
                         type="email"
                         required
                         onChange={handleChange}
                         name="email"
                         value={email} />


                    <FormInput
                         label="Password"
                         type="password"
                         required
                         onChange={handleChange}
                         name="password"
                         value={password} />

                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
               </form>
          </div>
     )
}

export default SignInForm;
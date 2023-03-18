import {Field, Formik} from 'formik'
import s from './ProfileInfo.module.css';
import * as yup from 'yup'

export const ProfileDataForm = ( props ) => {
    const validationSchema =  yup.object().shape({
        fullName: yup.string().required('Required field'),
        aboutMe: yup.string().required('Required field'),
    });
            
    return <div>
        <Formik
        initialValues={{
            fullName: props.profile.fullName || '',
            lookingForAJob: props.profile.lookingForAJob,
            aboutMe: props.profile.aboutMe || '',
            lookingForAJobDescription: props.profile.lookingForAJobDescription || '',
        }}
        
        validateOnBlur
        onSubmit={(values) =>(props.onSubmit(values))}
        validationSchema={validationSchema}
        >
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
        <div className='form'>
            <div>
                <Field 
                    onClick={handleSubmit}
                    type="submit"
                    name='form'
                    value={'Save'}
                    disabled={!isValid}/>
            </div>
            
            <div>
                <label htmlFor='fullName'>Full name:</label>
                <Field 
                    type="text"
                    name={'fullName'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder='fullName'/> 
                <div>{errors.fullName && <p>{errors.fullName}</p>}</div>
            </div>

            <div>
                <label htmlFor='lookingForAJob'>Looking for a job:</label>
                <Field 
                    type={"checkbox"}
                    name={'lookingForAJob'}
                    onChange={handleChange}/>
            </div>

            <div>
                {values.lookingForAJob && 
                <div>
                    <label htmlFor='lookingForAJobDescription'>My professionals skills:</label> 
                    <Field
                        component={'textarea'}
                        type="text"
                        name={'lookingForAJobDescription'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lookingForAJobDescription}
                        placeholder='lookingForAJobDescription'/>
                    <div>{errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription}</p>}</div>
                </div>}
            </div>

            <div>
                <label htmlFor='aboutMe'>About me:</label>
                <Field
                    component={'textarea'}
                    type="text"
                    name={'aboutMe'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aboutMe}
                    placeholder='aboutMe'/>
                <div>{errors.aboutMe && <p>{errors.aboutMe}</p>}</div>
            </div>
        </div>
        )}
        </Formik>

    </div>
};

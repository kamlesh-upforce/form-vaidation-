// src/PostalCodeForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Comprehensive regex pattern for postal codes from all major countries
// Supports formats from: US, Canada, UK, India, Australia, Germany, France, Italy, Spain,
// Netherlands, Brazil, Japan, China, South Korea, Mexico, Argentina, South Africa, New Zealand,
// Sweden, Norway, Denmark, Finland, Poland, Russia, Turkey, Israel, Singapore, Malaysia,
// Thailand, Philippines, Indonesia, Vietnam, and many more
// Order: Most specific patterns first (with hyphens/spaces), then general numeric patterns
const globalPostalCodeRegex = /^(\d{5}-\d{4}|\d{5}-\d{3}|\d{3}-\d{4}|\d{2}-\d{3}|\d{4} [A-Z]{2}|\d{3} \d{2}|[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d|[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}|[A-Z]\d{4}[A-Z]{3}|\d{7}|\d{6}|\d{5}|\d{4})$/i;

const ValidationSchema = Yup.object().shape({
  zipCode: Yup.string()
  .required('Postal/Zip Code is required')
  .matches(
    globalPostalCodeRegex,
    'Invalid format. Please enter a valid postal code from any country (e.g., 12345, A1A 1A1, SW1A 0AA, 110001, 1234 AB, 123-4567).'
  )
  .min(3, 'Code is too short') // Minimum length for basic protection
  .max(15, 'Code is too long'),
  
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
});



const PostalCodeForm = () => {
  const initialValues = {
    name: '',
    zipCode: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form Submitted!', values);
    alert(`Success! Data: ${JSON.stringify(values, null, 2)}`);
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Form Validation Example</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            
            {/* Name Field */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name">Name</label>
              <Field 
                name="name" 
                type="text" 
                placeholder="Enter your name"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  boxSizing: 'border-box',
                  borderColor: errors.name && touched.name ? 'red' : '#ccc'
                }}
              />
              <ErrorMessage 
                name="name" 
                component="div" 
                style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
              />
            </div>
            
            {/* Zip/Postal Code Field */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="zipCode">Postal/Zip Code</label>
              <Field 
                name="zipCode" 
                type="text" 
                placeholder="e.g., 12345, A1A 1A1, SW1A 0AA, 110001, 1234 AB" 
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  boxSizing: 'border-box',
                  borderColor: errors.zipCode && touched.zipCode ? 'red' : '#ccc'
                }}
              />
              <ErrorMessage 
                name="zipCode" 
                component="div" 
                style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              style={{ padding: '10px 15px', backgroundColor: isSubmitting ? '#ccc' : 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostalCodeForm;
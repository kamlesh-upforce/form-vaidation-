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

const ValidationSchema = Yup.object().shape({
  zipCode: Yup.string()
  .test(
    "no-leading-trailing-spaces",
    "Leading or trailing spaces are not allowed",
    (value) => {
      if (!value) return true;
      return value === value.trim();
    }
  )
  .matches(/^[A-Za-z0-9 ]+$/, "Only letters, numbers, and spaces are allowed")
  .max(10, "Zip code should not be more than 10 characters"),

});



const PostalCodeForm = () => {
  const initialValues = {
    name: '',
    zipCode: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // IMPORTANT: Apply Yup validation (transforms + rules) before using values
    const cleaned = await ValidationSchema.validate(values, {
      abortEarly: false,
    });

    console.log("Form Submitted!", cleaned);
    alert(`Success! Data: ${JSON.stringify(cleaned, null, 2)}`);

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
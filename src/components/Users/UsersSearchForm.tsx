import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { FilterType } from "types/types";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (ilter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const onSubmit = (
    values: FilterType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    onFilterChanged(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "", friend: null }}
        validate={usersSearchFormValidate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field type="checkbox" name="friend" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsersSearchForm;

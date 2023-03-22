import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { FilterType } from "types/types";
import { useSelector } from "react-redux";
import { getFilter } from "redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (ilter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
  const filter = useSelector(getFilter);

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
        enableReinitialize
        initialValues={{ term: filter.term, friend: filter.friend }}
        validate={usersSearchFormValidate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />

            <Field as="select" name="friend">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>

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

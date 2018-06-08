import React from 'react';
import { Input, Modal, Header } from 'semantic-ui-react';
import { FlatButton } from '@innovic/components/shared';
import { Formik } from 'formik';
import Plasma, { Firestore } from '@innovic/plasma';
import firebase from 'firebase';
import SalesOrderItemModalButton from './SalesOrderItemModalButton.js';

const SalesOrderForm = props => {
  let defaultData = { id: undefined, customer: '', customerReference: '' };
  const { set, data = defaultData, batch } = props;
  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={set}
        render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Input type="text" name="customer" onChange={handleChange} onBlur={handleBlur} value={values.customer} />
            {touched.customer && errors.customer && <div>{errors.customer}</div>}
            <Input
              type="password"
              name="customerReference"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.customerReference}
            />
            {touched.customerReference && errors.customerReference && <div>{errors.customerReference}</div>}
            <FlatButton type="submit" disabled={isSubmitting}>
              Submit
            </FlatButton>
          </form>
        )}
      />
      <Firestore.Collection path={`salesOrders/${data.id}/salesOrderItems`} schemaless>
        {({ collection, isLoading, error }) =>
          collection.map((soi, index) => {
            return (
              <SalesOrderItemModalButton salesOrderId={data.id} key={index} data={{ ...soi }} parentBatch={batch} />
            );
          })
        }
      </Firestore.Collection>

      {data.id ? (
        <SalesOrderItemModalButton salesOrderId={data.id} parentBatch={batch} />
      ) : (
        'please SAVE the sales order to add sales items in it'
      )}
    </React.Fragment>
  );
};

export default SalesOrderForm;